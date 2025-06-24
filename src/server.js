/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import pdf from 'pdf-parse';

// ES module equivalents of __dirname and __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: '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'
});

// Initialize Pinecone
const pinecone = new Pinecone({
  apiKey: 'pcsk_2NbqHe_JMjdJ1ixaBoGiSxeVJEbDTWYCUM9J8MAJdHsuuaqT8NPvocKZBNdRfzrqmuML7D'
});

// CONVERSATION MEMORY SYSTEM
class ConversationMemory {
  constructor() {
    this.sessions = new Map();
    this.maxMemorySize = 10; // Keep last 10 interactions per session
    this.sessionTimeout = 30 * 60 * 1000; // 30 minutes
  }

  // Get or create session
  getSession(sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        id: sessionId,
        messages: [],
        context: {},
        lastActivity: Date.now(),
        userProfile: {}
      });
    }
    
    const session = this.sessions.get(sessionId);
    session.lastActivity = Date.now();
    return session;
  }

  // Add message to session
  addMessage(sessionId, role, content, metadata = {}) {
    const session = this.getSession(sessionId);
    
    session.messages.push({
      role,
      content,
      timestamp: Date.now(),
      metadata
    });

    // Keep only recent messages
    if (session.messages.length > this.maxMemorySize) {
      session.messages = session.messages.slice(-this.maxMemorySize);
    }

    return session;
  }

  // Get conversation context for RAG
  getConversationContext(sessionId) {
    const session = this.getSession(sessionId);
    
    // Get recent messages for context
    const recentMessages = session.messages.slice(-6); // Last 6 messages
    const contextString = recentMessages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    return {
      recentContext: contextString,
      messageCount: session.messages.length,
      userProfile: session.userProfile
    };
  }

  // Update user profile based on conversation
  updateUserProfile(sessionId, updates) {
    const session = this.getSession(sessionId);
    session.userProfile = { ...session.userProfile, ...updates };
  }

  // Clean up old sessions
  cleanupSessions() {
    const now = Date.now();
    for (const [sessionId, session] of this.sessions.entries()) {
      if (now - session.lastActivity > this.sessionTimeout) {
        this.sessions.delete(sessionId);
      }
    }
  }
}

// Initialize memory system
const conversationMemory = new ConversationMemory();

// Clean up sessions periodically
setInterval(() => {
  conversationMemory.cleanupSessions();
}, 5 * 60 * 1000); // Every 5 minutes

// Pinecone configuration
const INDEX_NAME = 'kastarta-rag-index';
const NAMESPACE = 'kastarta-docs';
let pineconeIndex;

// OFFICIAL CONTACT INFORMATION - NEVER GENERATE THIS
const OFFICIAL_CONTACT_INFO = {
  phone: {
    airtel: '+260772383806',
    mtn: '+260 96873678'
  },
  email: {
    general: 'info@emeraldfinanceltd.com',
    support: 'ka\'starta@emeraldfinanceltd.com'
  },
  liveChat: {
    platforms: ['WhatsApp', 'Facebook', 'Instagram', 'Website']
  }
};

// Initialize Pinecone index
async function initializePinecone() {
  try {
    pineconeIndex = pinecone.index(INDEX_NAME);
    console.log('✅ Pinecone index "kastarta-rag-index" initialized successfully');
    console.log(`📂 Using namespace: ${NAMESPACE}`);
    
    await initializeKnowledgeBase();
  } catch (error) {
    console.error('❌ Error initializing Pinecone:', error);
    console.log('📝 Make sure your "kastarta-rag-index" index is accessible');
  }
}

// Create src directory and knowledge base file if they don't exist
const srcDir = path.join(__dirname, 'src');
if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

// ENHANCED Knowledge base with proper contact info weighting
const kaStartaKnowledgeChunks = [
  {
    id: 'kastarta_contact_info_primary',
    content: `OFFICIAL Ka'Starta Contact Information:
📞 Call Center Numbers:
- Airtel Users: +260772383806
- MTN Users: +260 96873678

📧 Email Support:
- General Inquiries: info@emeraldfinanceltd.com
- Loan Assistance: ka'starta@emeraldfinanceltd.com

💬 Live Chat Support:
Available on WhatsApp, Facebook, Instagram, and our Website

For any questions about loans, repayments, or technical issues, please use these official contact channels.`,
    metadata: {
      section: 'Contact Information',
      provider: 'Both',
      keywords: ['contact', 'support', 'phone', 'email', 'live chat', 'customer service'],
      category: 'contact_info',
      weight: 10.0 // High weight for contact queries
    }
  },
  {
    id: 'kastarta_chunk_1',
    content: "Ka'Starta Nano Loans airtel is a fast and convenient micro-lending service that provides small loans instantly via airtel mobile. We specialize in helping individuals and small businesses access quick credit to handle emergencies or bridge short-term financial gaps.",
    metadata: {
      section: 'Overview',
      provider: 'Airtel',
      keywords: ['micro-lending', 'instant loans', 'emergency credit', 'small business'],
      category: 'service_description',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_2',
    content: "Our nano loan amounts typically range from ZMW 50 to ZMW 500 depending on your credit history, usage patterns, and repayment behavior. First-time users may start with smaller amounts and grow their loan limits over time.",
    metadata: {
      section: 'Loan Amounts',
      provider: 'Airtel',
      keywords: ['ZMW 50', 'ZMW 500', 'credit history', 'loan limits'],
      category: 'loan_terms',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_3',
    content: "The standard repayment period is 7 to 30 days depending on the loan size. The due date will be clearly shown in your loan confirmation message and dashboard.",
    metadata: {
      section: 'Repayment Period',
      provider: 'Airtel',
      keywords: ['7 days', '30 days', 'repayment period', 'due date'],
      category: 'loan_terms',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_4',
    content: "Ka'Starta offers transparent and flat fees, typically ranging from 12% for 7 days, 18% for 14 days, 21% for 21 days and 22% for 30 days on Airtel. There are no hidden charges, all fees are disclosed upfront before confirmation.",
    metadata: {
      section: 'Interest Rates',
      provider: 'Airtel',
      keywords: ['12%', '18%', '21%', '22%', 'transparent fees', 'no hidden charges'],
      category: 'pricing',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_5',
    content: "You need: A valid NRC or Passport, A registered and active mobile money account, A history of prompt repayments (for higher loan limits)",
    metadata: {
      section: 'Eligibility',
      provider: 'Airtel',
      keywords: ['NRC', 'Passport', 'mobile money', 'eligibility requirements'],
      category: 'requirements',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_6',
    content: "You can apply via USSD code on Airtel (*115#). Steps: 1. Dial *115# 2. Select option 5, 'Na Sova Loan' 3. Select option 5, 'Ka'starta Loan' 4. Select option 1, 'Request Loan' 5. Select option 1 to select amount and loan tenure 6. Enter Mobile Money Pin",
    metadata: {
      section: 'Application Process',
      provider: 'Airtel',
      keywords: ['*115#', 'USSD', 'Na Sova Loan', 'application steps'],
      category: 'process',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_7',
    content: "You can repay your loan using Mobile money (Airtel). Steps: 1. Dial *115# 2. Select option 5, 'Na Sova Loan' 3. Select option 5, 'Ka'starta Loan' 4. Select option 1, 'Repay Loan' 5. Select option 1, 'Repay full amount' 6. Enter Mobile Money Pin. Automatic deduction on the due date (ensure funds are available). We will send you reminders before the due date.",
    metadata: {
      section: 'Repayment Process',
      provider: 'Airtel',
      keywords: ['repay loan', 'automatic deduction', 'reminders', 'mobile money'],
      category: 'process',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_8',
    content: "Late repayment may result in: Penalty fees at 0.73% per day, from the day of defaulting for a period of three months, Reduced future loan limits, Temporary suspension of access to Ka'Starta services, Potential listing with the credit reference bureau (CRB). We encourage early or on-time repayments to maintain a good credit score.",
    metadata: {
      section: 'Late Payment Consequences',
      provider: 'Airtel',
      keywords: ['penalty fees', '0.73%', 'CRB', 'credit score', 'late payment'],
      category: 'penalties',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_9',
    content: "Ka'Starta Loans is a digital micro term loan product launched by Emerald Finance Limited in partnership with MTN Zambia (MTN Money) to drive financial inclusion and provide affordable access to credit for MTN Mobile Money subscribers in Zambia.",
    metadata: {
      section: 'MTN Overview',
      provider: 'MTN',
      keywords: ['Emerald Finance', 'MTN Money', 'financial inclusion', 'digital loans'],
      category: 'service_description',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_10',
    content: "MTN loan amounts typically range from ZMW 50 to ZMW 1,000, depending on your credit history, usage patterns, and repayment behavior. First-time users may start with smaller amounts and grow their limits over time.",
    metadata: {
      section: 'MTN Loan Amounts',
      provider: 'MTN',
      keywords: ['ZMW 50', 'ZMW 1000', 'credit history', 'MTN loans'],
      category: 'loan_terms',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_11',
    content: "MTN Ka'Starta Loans offers transparent and flat fees, typically ranging between 15% to 22% depending on the loan term and amount. E.g 7 days =15%, 14days=18%, 21 days = 20% and 30 days= 22%. There are no hidden charges all fees are disclosed upfront before confirmation.",
    metadata: {
      section: 'MTN Interest Rates',
      provider: 'MTN',
      keywords: ['15%', '18%', '20%', '22%', 'MTN fees', 'transparent pricing'],
      category: 'pricing',
      weight: 1.0
    }
  },
  {
    id: 'kastarta_chunk_12',
    content: "MTN application via USSD: 1. Dial *115# to access MTN Mobile Money 2. Select Kongola & Savings 6 3. Select Kongola 2 4. Select Ka'Starta 4 5. Select 1 accept 6. Enter your Mobile Money PIN to opt in and accept the Terms and Conditions",
    metadata: {
      section: 'MTN Application Process',
      provider: 'MTN',
      keywords: ['*115#', 'Kongola', 'MTN application', 'terms and conditions'],
      category: 'process',
      weight: 1.0
    }
  }
];

// Write knowledge base to file
const knowledgeBasePath = path.join(srcDir, 'kastarta_knowledge.txt');
const comprehensiveKnowledgeBase = kaStartaKnowledgeChunks.map(chunk => 
  `${chunk.metadata.section} (${chunk.metadata.provider}):\n${chunk.content}\n`
).join('\n---\n\n');

if (!fs.existsSync(knowledgeBasePath)) {
  fs.writeFileSync(knowledgeBasePath, comprehensiveKnowledgeBase, 'utf8');
  console.log('📄 Ka\'Starta comprehensive knowledge base file created');
}

// Multer configuration for file uploads
const uploadsDir = './uploads';
const upload = multer({ dest: uploadsDir });

// CONTACT INFO DETECTION FUNCTION
function detectContactInfoRequest(query) {
  const contactKeywords = [
    'contact', 'phone', 'number', 'email', 'support', 'help', 'call', 'reach',
    'customer service', 'assistance', 'whatsapp', 'facebook', 'instagram',
    'live chat', 'how to contact', 'get in touch'
  ];
  
  const queryLower = query.toLowerCase();
  return contactKeywords.some(keyword => queryLower.includes(keyword));
}

// ENHANCED CONTACT INFO RETRIEVAL
function getOfficialContactInfo() {
  return `📞 **Call Center:**
- Airtel: ${OFFICIAL_CONTACT_INFO.phone.airtel}
- MTN: ${OFFICIAL_CONTACT_INFO.phone.mtn}

📧 **Email:**
- General Inquiries: ${OFFICIAL_CONTACT_INFO.email.general}
- Loan Assistance: ${OFFICIAL_CONTACT_INFO.email.support}

💬 **Live Chat:**
- Available on ${OFFICIAL_CONTACT_INFO.liveChat.platforms.join(', ')}

For further assistance or more detailed inquiries, feel free to contact us through any of these channels.`;
}

// Function to initialize knowledge base in Pinecone
async function initializeKnowledgeBase() {
  try {
    if (!pineconeIndex) {
      console.log('⚠️ Pinecone index not initialized, skipping knowledge base setup');
      return;
    }

    const stats = await pineconeIndex.describeIndexStats();
    const existingVectors = stats.namespaces[NAMESPACE]?.vectorCount || 0;
    
    if (existingVectors >= kaStartaKnowledgeChunks.length) {
      console.log(`📚 Knowledge base already exists in Pinecone with ${existingVectors} vectors`);
      return;
    }

    console.log('📤 Initializing comprehensive Ka\'Starta knowledge base...');
    console.log(`📊 Processing ${kaStartaKnowledgeChunks.length} knowledge chunks...`);
    
    const vectors = [];
    
    for (let i = 0; i < kaStartaKnowledgeChunks.length; i++) {
      const chunk = kaStartaKnowledgeChunks[i];
      console.log(`🔄 Processing chunk ${i + 1}/${kaStartaKnowledgeChunks.length}: ${chunk.metadata.section}`);
      
      const embedding = await generateEmbedding(chunk.content);
      vectors.push({
        id: chunk.id,
        values: embedding,
        metadata: {
          documentId: 'kastarta_comprehensive_kb',
          filename: 'kastarta_knowledge_comprehensive.txt',
          content: chunk.content,
          section: chunk.metadata.section,
          provider: chunk.metadata.provider,
          keywords: chunk.metadata.keywords.join(', '),
          category: chunk.metadata.category,
          weight: chunk.metadata.weight || 1.0,
          chunkIndex: i,
          createdAt: new Date().toISOString()
        }
      });
    }
    
    const batchSize = 10;
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await storeVectorsInPinecone(batch);
      console.log(`✅ Stored batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(vectors.length/batchSize)}`);
      
      if (i + batchSize < vectors.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    console.log(`🎉 Knowledge base initialized successfully with ${vectors.length} comprehensive chunks`);
    
  } catch (error) {
    console.error('❌ Error initializing knowledge base:', error);
  }
}

// Utility function to split text into chunks
function splitTextIntoChunks(text, chunkSize = 1000, overlap = 200) {
  const chunks = [];
  let start = 0;
  
  while (start < text.length) {
    const end = Math.min(start + chunkSize, text.length);
    chunks.push(text.slice(start, end));
    start = end - overlap;
    
    if (start >= text.length) break;
  }
  
  return chunks;
}

// Function to parse JSON document format
function parseJSONDocument(text) {
  try {
    const data = JSON.parse(text);
    if (Array.isArray(data)) {
      return data.map(item => {
        const title = item.title || '';
        const content = item.content || '';
        return `${title}\n${content}`;
      });
    }
    return [text];
  } catch (error) {
    console.log('Not a JSON document, treating as plain text');
    return splitTextIntoChunks(text);
  }
}

// Function to generate embeddings
async function generateEmbedding(text) {
  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
      dimensions: 1024
    });
    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

// Function to store vectors in Pinecone
async function storeVectorsInPinecone(vectors) {
  try {
    await pineconeIndex.namespace(NAMESPACE).upsert(vectors);
    console.log(`✅ Successfully stored ${vectors.length} vectors in Pinecone namespace: ${NAMESPACE}`);
  } catch (error) {
    console.error('❌ Error storing vectors in Pinecone:', error);
    throw error;
  }
}

// Function to search similar vectors in Pinecone
async function searchSimilarVectors(queryEmbedding, topK = 5) {
  try {
    const queryResponse = await pineconeIndex.namespace(NAMESPACE).query({
      vector: queryEmbedding,
      topK: topK,
      includeMetadata: true,
      includeValues: false
    });
    
    return queryResponse.matches || [];
  } catch (error) {
    console.error('❌ Error querying Pinecone:', error);
    throw error;
  }
}

// ENHANCED DOCUMENT RETRIEVAL WITH CONTACT INFO PRIORITY
async function findRelevantDocuments(query, topK = 5) {
  try {
    const queryEmbedding = await generateEmbedding(query);
    let matches = await searchSimilarVectors(queryEmbedding, topK);
    
    // If contact info is requested, prioritize contact info chunks
    if (detectContactInfoRequest(query)) {
      matches = matches.sort((a, b) => {
        const aIsContact = a.metadata.category === 'contact_info';
        const bIsContact = b.metadata.category === 'contact_info';
        
        if (aIsContact && !bIsContact) return -1;
        if (!aIsContact && bIsContact) return 1;
        
        // Apply weight-based sorting
        const weightA = a.metadata.weight || 1.0;
        const weightB = b.metadata.weight || 1.0;
        
        return (weightB * b.score) - (weightA * a.score);
      });
    }
    
    return matches.map(match => ({
      content: match.metadata.content,
      filename: match.metadata.filename,
      section: match.metadata.section,
      provider: match.metadata.provider,
      category: match.metadata.category,
      keywords: match.metadata.keywords,
      weight: match.metadata.weight || 1.0,
      similarity: match.score,
      chunkIndex: match.metadata.chunkIndex
    }));
  } catch (error) {
    console.error('Error finding relevant documents:', error);
    return [];
  }
}

// ENHANCED RAG RESPONSE WITH MEMORY AND CONTACT INFO PROTECTION
async function generateRAGResponse(query, relevantDocs, sessionId = null) {
  // Handle contact info requests specially
  if (detectContactInfoRequest(query)) {
    const hasContactInfo = relevantDocs.some(doc => doc.category === 'contact_info');
    if (hasContactInfo) {
      // Use official contact info
      return `Here is the official Ka'Starta contact information:\n\n${getOfficialContactInfo()}`;
    }
  }
  
  if (relevantDocs.length === 0) {
    return `I don't have enough information in my Ka'Starta knowledge base to answer your question. Please contact our support team:\n\n${getOfficialContactInfo()}`;
  }

  // Get conversation context if session provided
  let conversationContext = '';
  if (sessionId) {
    const context = conversationMemory.getConversationContext(sessionId);
    if (context.recentContext) {
      conversationContext = `\nRecent conversation context:\n${context.recentContext}\n`;
    }
  }

  const context = relevantDocs.map((doc, index) => 
    `[${doc.provider} - ${doc.section}] ${doc.content}`
  ).join('\n\n');
  
  const prompt = `You are Ka'Starta's official customer care assistant. Use ONLY the following verified Ka'Starta information to answer the customer's question accurately and helpfully.

CRITICAL INSTRUCTIONS:
- NEVER generate, invent, or create contact information
- If asked for contact details, ONLY use the official contact information provided in the knowledge base
- If contact information is not in the provided context, respond with "Please check our official channels for current contact information"
- Base your response ONLY on the provided Ka'Starta information
- Maintain conversation continuity using the context provided

Available Ka'Starta Information:
${context}
${conversationContext}

Customer Question: ${query}

Response Guidelines:
- Answer based ONLY on the provided Ka'Starta information
- Be specific about loan amounts, interest rates, processes, and requirements  
- Distinguish between Airtel and MTN services when relevant
- Include specific USSD codes and step-by-step processes when applicable
- If the information doesn't fully answer the question, mention what you do know and suggest contacting support
- Be professional, helpful, and accurate
- Use emojis appropriately to make the response friendly
- Reference previous conversation if relevant

Ka'Starta Assistant Response:`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are Ka'Starta's official customer care assistant. NEVER generate contact information - only use what's provided in the knowledge base. Provide accurate information about Ka'Starta loan services based only on the provided context. Be helpful, professional, and maintain conversation continuity."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 600,
      temperature: 0.1, // Even lower temperature for more consistent responses
    });
    
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating response:', error);
    throw error;
  }
}

// Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    pineconeConnected: !!pineconeIndex,
    knowledgeChunks: kaStartaKnowledgeChunks.length,
    activeSessions: conversationMemory.sessions.size
  });
});

// Get index stats from Pinecone
app.get('/api/documents', async (req, res) => {
  try {
    const stats = await pineconeIndex.describeIndexStats();
    res.json({
      totalVectors: stats.totalVectorCount,
      dimension: stats.dimension,
      indexFullness: stats.indexFullness,
      namespaces: stats.namespaces,
      currentNamespace: NAMESPACE,
      namespaceVectors: stats.namespaces[NAMESPACE]?.vectorCount || 0,
      knowledgeChunksAvailable: kaStartaKnowledgeChunks.length,
      categories: [...new Set(kaStartaKnowledgeChunks.map(c => c.metadata.category))],
      providers: [...new Set(kaStartaKnowledgeChunks.map(c => c.metadata.provider))],
      activeSessions: conversationMemory.sessions.size
    });
  } catch (error) {
    console.error('Error getting index stats:', error);
    res.status(500).json({ error: 'Failed to get document stats' });
  }
});

// Get session history
app.get('/api/sessions/:sessionId', (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = conversationMemory.getSession(sessionId);
    
    res.json({
      sessionId: session.id,
      messageCount: session.messages.length,
      lastActivity: new Date(session.lastActivity).toISOString(),
      userProfile: session.userProfile,
      recentMessages: session.messages.slice(-5) // Last 5 messages
    });
  } catch (error) {
    console.error('Error getting session:', error);
    res.status(500).json({ error: 'Failed to get session data' });
  }
});

// Upload and process document
app.post('/api/upload', upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    if (!pineconeIndex) {
      return res.status(500).json({ error: 'Pinecone index not initialized' });
    }
    
    const filePath = req.file.path;
    const filename = req.file.originalname;
    let text = '';
    
    if (path.extname(filename).toLowerCase() === '.pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const pdfData = await pdf(dataBuffer);
      text = pdfData.text;
    } else if (path.extname(filename).toLowerCase() === '.txt') {
      text = fs.readFileSync(filePath, 'utf8');
    } else {
      return res.status(400).json({ error: 'Unsupported file type. Please upload PDF or TXT files.' });
    }
    
    let chunks;
    if (filename.includes('.json') || text.trim().startsWith('[') || text.trim().startsWith('{')) {
      chunks = parseJSONDocument(text);
    } else {
      chunks = splitTextIntoChunks(text);
    }
    
    const documentId = Date.now().toString();
    const vectors = [];
    
    for (let i = 0; i < chunks.length; i++) {
      const embedding = await generateEmbedding(chunks[i]);
      vectors.push({
        id: `${documentId}_${i}`,
        values: embedding,
        metadata: {
          documentId,
          filename,
          content: chunks[i],
          chunkIndex: i,
          createdAt: new Date().toISOString(),
          source: 'uploaded_document',
          weight: 1.0
        }
      });
    }
    
    await storeVectorsInPinecone(vectors);
    fs.unlinkSync(filePath);
    
    res.json({
      message: 'Document uploaded and processed successfully',
      documentId,
      chunksProcessed: chunks.length,
      filename,
      vectorsStored: vectors.length
    });
    
  } catch (error) {
    console.error('Error processing document:', error);
    res.status(500).json({ error: 'Failed to process document: ' + error.message });
  }
});

// Enhanced chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    if (!pineconeIndex) {
      return res.status(500).json({ error: 'Pinecone index not initialized' });
    }
    
    // Find relevant documents using Pinecone with higher topK for better context
    const relevantDocs = await findRelevantDocuments(message, 5);
    
    console.log('Query:', message);
    console.log('Relevant docs found:', relevantDocs.length);
    console.log('Docs:', relevantDocs.map(d => ({
      section: d.section,
      provider: d.provider,
      similarity: d.similarity.toFixed(3)
    })));
    
    // Generate response using RAG
    const response = await generateRAGResponse(message, relevantDocs);
    
    res.json({
      response,
      relevantDocuments: relevantDocs.length,
      sources: relevantDocs.map(doc => ({
        section: doc.section,
        provider: doc.provider,
        category: doc.category,
        filename: doc.filename,
        similarity: doc.similarity.toFixed(3),
        chunkIndex: doc.chunkIndex
      })),
      query: message
    });
    
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Failed to generate response: ' + error.message });
  }
});

// Clear all vectors from Pinecone namespace
app.delete('/api/documents', async (req, res) => {
  try {
    if (!pineconeIndex) {
      return res.status(500).json({ error: 'Pinecone index not initialized' });
    }
    
    // Delete all vectors in the specific namespace
    await pineconeIndex.namespace(NAMESPACE).deleteAll();
    res.json({ message: `All documents cleared from Pinecone namespace: ${NAMESPACE}` });
  } catch (error) {
    console.error('Error clearing documents:', error);
    res.status(500).json({ error: 'Failed to clear documents' });
  }
});

// Reinitialize knowledge base endpoint (useful for updates)
app.post('/api/reinitialize-kb', async (req, res) => {
  try {
    console.log('🔄 Manually reinitializing knowledge base...');
    await initializeKnowledgeBase();
    res.json({ 
      message: 'Knowledge base reinitialized successfully',
      chunksProcessed: kaStartaKnowledgeChunks.length
    });
  } catch (error) {
    console.error('Error reinitializing knowledge base:', error);
    res.status(500).json({ error: 'Failed to reinitialize knowledge base: ' + error.message });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Ka'Starta RAG Customer Care Server is running on port ${PORT}`);
  console.log(`📚 Knowledge base contains ${kaStartaKnowledgeChunks.length} comprehensive chunks`);
  await initializePinecone();
  console.log(`🔗 API endpoints:`);
  console.log(`   - POST /api/chat - Chat with the Ka'Starta assistant`);
  console.log(`   - POST /api/upload - Upload additional documents`);
  console.log(`   - GET /api/documents - View index stats`);
  console.log(`   - DELETE /api/documents - Clear all documents`);
  console.log(`   - POST /api/reinitialize-kb - Reinitialize knowledge base`);
});

export default app;