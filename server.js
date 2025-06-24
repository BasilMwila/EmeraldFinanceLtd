/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable no-undef */
// server.js
import express, { json } from 'express';
import { createPool, createConnection } from 'mysql2/promise';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import validator from 'validator';
const { isEmail, escape, normalizeEmail } = validator;

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Stricter rate limiting for waitlist endpoint
const waitlistLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // limit each IP to 5 waitlist submissions per hour
  message: 'Too many waitlist submissions, please try again later.'
});

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // limit each IP to 10 contact submissions per hour
  message: 'Too many contact form submissions, please try again later.'
});

const cors = require("cors");

const allowedOrigins = ["https://skidmo.net", "https://www.skidmo.net"];

app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:5173', 'https://skidmo.net'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Database configuration
// Connection configuration (for single connections)
const dbConfig = {
  host: 'ls-ec6b7904665d6c2a7b368f3a7d076dfb00544b86.c74wk6wsmctw.ap-south-1.rds.amazonaws.com',
  user: 'dbmasteruser',
  password: '$Ru$czO2{FlRb-r#{RP077B7-c[-h?<o',
  database: process.env.DB_NAME || 'skidmo_prelaunch',
  connectTimeout: 60000,        // Connection timeout (correct)
  ssl: {
    rejectUnauthorized: false
  },
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
};

// Connection pool configuration (recommended for servers)
const poolConfig = {
  host: 'ls-ec6b7904665d6c2a7b368f3a7d076dfb00544b86.c74wk6wsmctw.ap-south-1.rds.amazonaws.com',
  user: 'dbmasteruser',
  password: '$Ru$czO2{FlRb-r#{RP077B7-c[-h?<o',
  database: process.env.DB_NAME || 'skidmo_prelaunch',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  ssl: {
    rejectUnauthorized: false
  }
};

// Usage examples:

// For single connection:
async function connectSingle() {
  try {
    const connection = await createConnection(dbConfig);
    console.log('Database connected successfully');
    return connection;
  } catch (error) {
    console.error('Database connection failed:', error.message);
    throw error;
  }
}

// For connection pool (recommended for servers):
const pool = createPool(poolConfig);

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Database pool connected successfully');
    connection.release();
    return pool;
  } catch (error) {
    console.error('Database pool connection failed:', error.message);
    throw error;
  }
}

// Database initialization
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    
    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS skidmo_prelaunch`);
    await connection.query(`USE skidmo_prelaunch`);
    
    // Create waitlist table
    const createWaitlistTableQuery = `
      CREATE TABLE IF NOT EXISTS waitlist (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        lodge_name VARCHAR(255) NOT NULL,
        contact_number VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_created_at (created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;
    
    // Create contact_feedback table
    const createContactTableQuery = `
      CREATE TABLE IF NOT EXISTS contact_feedback (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message TEXT NOT NULL,
        inquiry_type ENUM(
          'general',
          'partnership', 
          'investment',
          'property',
          'support',
          'media'
        ) NOT NULL DEFAULT 'general',
        status ENUM(
          'new',
          'in_progress', 
          'resolved',
          'closed'
        ) NOT NULL DEFAULT 'new',
        priority ENUM(
          'low',
          'medium',
          'high',
          'urgent'
        ) NOT NULL DEFAULT 'medium',
        ip_address VARCHAR(45),
        user_agent TEXT,
        responded_at TIMESTAMP NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        
        INDEX idx_email (email),
        INDEX idx_inquiry_type (inquiry_type),
        INDEX idx_status (status),
        INDEX idx_created_at (created_at),
        INDEX idx_status_created (status, created_at)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `;
    
    await connection.execute(createWaitlistTableQuery);
    await connection.execute(createContactTableQuery);
    connection.release();
    
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Database initialization error:', error);
    throw error;
  }
}

// Validation functions
function validateWaitlistData(data) {
  const errors = {};
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  if (!data.email || !isEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }
  
  if (!data.lodgeName || data.lodgeName.trim().length < 2) {
    errors.lodgeName = 'Lodge/Hotel name must be at least 2 characters long';
  }
  
  if (!data.contactNumber || data.contactNumber.trim().length < 10) {
    errors.contactNumber = 'Please provide a valid contact number';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

function validateContactData(data) {
  const errors = {};
  const validInquiryTypes = ['general', 'partnership', 'investment', 'property', 'support', 'media'];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  if (!data.email || !isEmail(data.email)) {
    errors.email = 'Please provide a valid email address';
  }
  
  if (!data.subject || data.subject.trim().length < 5) {
    errors.subject = 'Subject must be at least 5 characters long';
  }
  
  if (data.subject && data.subject.trim().length > 500) {
    errors.subject = 'Subject must be less than 500 characters';
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  if (data.message && data.message.trim().length > 5000) {
    errors.message = 'Message must be less than 5000 characters';
  }
  
  if (data.inquiryType && !validInquiryTypes.includes(data.inquiryType)) {
    errors.inquiryType = 'Invalid inquiry type';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Sanitize input data
function sanitizeData(data) {
  return {
    name: escape(data.name.trim()),
    email: normalizeEmail(data.email.trim()),
    lodgeName: escape(data.lodgeName?.trim() || ''),
    contactNumber: data.contactNumber?.trim().replace(/[^\d\s\-\+\(\)]/g, '') || ''
  };
}

function sanitizeContactData(data) {
  return {
    name: escape(data.name.trim()),
    email: normalizeEmail(data.email.trim()),
    subject: escape(data.subject.trim()),
    message: escape(data.message.trim()),
    inquiryType: data.inquiryType || 'general'
  };
}

// Utility function to get client IP
function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0] ||
         req.headers['x-real-ip'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         req.ip ||
         'unknown';
}

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// ===================
// WAITLIST ENDPOINTS
// ===================

// Get all waitlist entries (admin endpoint - you might want to add authentication)
app.get('/api/waitlist', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, email, lodge_name, contact_number, created_at FROM waitlist ORDER BY created_at DESC'
    );
    
    res.json({
      success: true,
      data: rows,
      count: rows.length
    });
  } catch (error) {
    console.error('Error fetching waitlist:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch waitlist data'
    });
  }
});

// Add to waitlist
app.post('/api/waitlist', waitlistLimiter, async (req, res) => {
  try {
    const { name, email, lodgeName, contactNumber } = req.body;
    
    // Validate input
    const validation = validateWaitlistData({ name, email, lodgeName, contactNumber });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    // Sanitize data
    const sanitizedData = sanitizeData({ name, email, lodgeName, contactNumber });
    
    // Check if email already exists
    const [existingUser] = await pool.execute(
      'SELECT id FROM waitlist WHERE email = ?',
      [sanitizedData.email]
    );
    
    if (existingUser.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered in our waitlist'
      });
    }
    
    // Insert new waitlist entry
    const [result] = await pool.execute(
      'INSERT INTO waitlist (name, email, lodge_name, contact_number) VALUES (?, ?, ?, ?)',
      [sanitizedData.name, sanitizedData.email, sanitizedData.lodgeName, sanitizedData.contactNumber]
    );
    
    // Log successful registration (without sensitive data)
    console.log(`New waitlist registration: ID ${result.insertId}, Email: ${sanitizedData.email}`);
    
    res.status(201).json({
      success: true,
      message: 'Successfully added to waitlist',
      data: {
        id: result.insertId,
        name: sanitizedData.name,
        email: sanitizedData.email,
        lodgeName: sanitizedData.lodgeName
      }
    });
    
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Email already registered in our waitlist'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to add to waitlist. Please try again.'
    });
  }
});

// Get waitlist statistics
app.get('/api/waitlist/stats', async (req, res) => {
  try {
    const [totalCount] = await pool.execute('SELECT COUNT(*) as total FROM waitlist');
    const [recentCount] = await pool.execute(
      'SELECT COUNT(*) as recent FROM waitlist WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );
    
    res.json({
      success: true,
      data: {
        totalRegistrations: totalCount[0].total,
        recentRegistrations: recentCount[0].recent
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

// ===================
// CONTACT ENDPOINTS
// ===================

// Submit contact form
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, inquiryType } = req.body;
    
    // Validate input
    const validation = validateContactData({ name, email, subject, message, inquiryType });
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validation.errors
      });
    }
    
    // Sanitize data
    const sanitizedData = sanitizeContactData({ name, email, subject, message, inquiryType });
    
    // Get client information
    const clientIP = getClientIP(req);
    const userAgent = req.headers['user-agent'] || '';
    
    // Insert new contact submission
    const [result] = await pool.execute(
      `INSERT INTO contact_feedback 
       (name, email, subject, message, inquiry_type, ip_address, user_agent) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        sanitizedData.name,
        sanitizedData.email,
        sanitizedData.subject,
        sanitizedData.message,
        sanitizedData.inquiryType,
        clientIP,
        userAgent
      ]
    );
    
    // Log successful submission (without sensitive data)
    console.log(`New contact submission: ID ${result.insertId}, Type: ${sanitizedData.inquiryType}, Email: ${sanitizedData.email}`);
    
    res.status(201).json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you within 24 hours.',
      data: {
        id: result.insertId,
        name: sanitizedData.name,
        email: sanitizedData.email,
        subject: sanitizedData.subject,
        inquiryType: sanitizedData.inquiryType
      }
    });
    
  } catch (error) {
    console.error('Error submitting contact form:', error);
    
    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again or contact us directly via email.'
    });
  }
});

// Get all contact submissions (admin endpoint)
app.get('/api/contact', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const status = req.query.status;
    const inquiryType = req.query.inquiryType;
    const offset = (page - 1) * limit;
    
    // Build WHERE clause
    let whereClause = '';
    const queryParams = [];
    
    if (status) {
      whereClause += ' WHERE status = ?';
      queryParams.push(status);
    }
    
    if (inquiryType) {
      whereClause += (whereClause ? ' AND' : ' WHERE') + ' inquiry_type = ?';
      queryParams.push(inquiryType);
    }
    
    // Get total count
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM contact_feedback${whereClause}`,
      queryParams
    );
    
    // Get paginated results
    const [rows] = await pool.execute(
      `SELECT id, name, email, subject, message, inquiry_type, status, priority, 
              ip_address, created_at, updated_at, responded_at
       FROM contact_feedback${whereClause}
       ORDER BY 
         CASE priority 
           WHEN 'urgent' THEN 1
           WHEN 'high' THEN 2 
           WHEN 'medium' THEN 3
           WHEN 'low' THEN 4
         END,
         created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, limit, offset]
    );
    
    res.json({
      success: true,
      data: rows,
      pagination: {
        page,
        limit,
        total: countResult[0].total,
        totalPages: Math.ceil(countResult[0].total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submissions'
    });
  }
});

// Get single contact submission (admin endpoint)
app.get('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const [rows] = await pool.execute(
      `SELECT id, name, email, subject, message, inquiry_type, status, priority,
              ip_address, user_agent, created_at, updated_at, responded_at
       FROM contact_feedback WHERE id = ?`,
      [id]
    );
    
    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    res.json({
      success: true,
      data: rows[0]
    });
  } catch (error) {
    console.error('Error fetching contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact submission'
    });
  }
});

// Update contact submission status (admin endpoint)
app.patch('/api/contact/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, priority } = req.body;
    
    const validStatuses = ['new', 'in_progress', 'resolved', 'closed'];
    const validPriorities = ['low', 'medium', 'high', 'urgent'];
    
    let updateFields = [];
    let updateValues = [];
    
    if (status && validStatuses.includes(status)) {
      updateFields.push('status = ?');
      updateValues.push(status);
      
      // Set responded_at if status is being changed from 'new'
      if (status !== 'new') {
        updateFields.push('responded_at = COALESCE(responded_at, NOW())');
      }
    }
    
    if (priority && validPriorities.includes(priority)) {
      updateFields.push('priority = ?');
      updateValues.push(priority);
    }
    
    if (updateFields.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No valid fields to update'
      });
    }
    
    updateValues.push(id);
    
    const [result] = await pool.execute(
      `UPDATE contact_feedback SET ${updateFields.join(', ')}, updated_at = NOW() WHERE id = ?`,
      updateValues
    );
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'Contact submission not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact submission updated successfully'
    });
  } catch (error) {
    console.error('Error updating contact submission:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact submission'
    });
  }
});

// Get contact statistics
app.get('/api/contact/stats', async (req, res) => {
  try {
    const [totalCount] = await pool.execute('SELECT COUNT(*) as total FROM contact_feedback');
    const [statusCounts] = await pool.execute(
      'SELECT status, COUNT(*) as count FROM contact_feedback GROUP BY status'
    );
    const [inquiryTypeCounts] = await pool.execute(
      'SELECT inquiry_type, COUNT(*) as count FROM contact_feedback GROUP BY inquiry_type'
    );
    const [recentCount] = await pool.execute(
      'SELECT COUNT(*) as recent FROM contact_feedback WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)'
    );
    const [priorityCounts] = await pool.execute(
      'SELECT priority, COUNT(*) as count FROM contact_feedback WHERE status IN ("new", "in_progress") GROUP BY priority'
    );
    
    res.json({
      success: true,
      data: {
        totalSubmissions: totalCount[0].total,
        recentSubmissions: recentCount[0].recent,
        statusBreakdown: statusCounts.reduce((acc, row) => {
          acc[row.status] = row.count;
          return acc;
        }, {}),
        inquiryTypeBreakdown: inquiryTypeCounts.reduce((acc, row) => {
          acc[row.inquiry_type] = row.count;
          return acc;
        }, {}),
        priorityBreakdown: priorityCounts.reduce((acc, row) => {
          acc[row.priority] = row.count;
          return acc;
        }, {})
      }
    });
  } catch (error) {
    console.error('Error fetching contact stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact statistics'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  await pool.end();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  await pool.end();
  process.exit(0);
});

// Start server
async function startServer() {
  try {
    await initializeDatabase();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
