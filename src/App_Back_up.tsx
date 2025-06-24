import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Zap, MessageCircle } from 'lucide-react';

const CustomerCareChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hello! I'm your AI customer care assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Replace with your actual backend endpoint
      const response = await fetch('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.response || "I'm sorry, I couldn't process your request at the moment. Please try again.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm experiencing technical difficulties. Please try again in a moment.",
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-lime-50 via-white to-lime-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-lime-600 to-lime-500 shadow-lg border-b-4 border-lime-400">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 animate-pulse">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Customer Care Assistant</h1>
              <p className="text-lime-100">Powered by AI • Always here to help</p>
            </div>
            <div className="ml-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-200px)] flex flex-col">
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 scrollbar-thin scrollbar-thumb-lime-300 scrollbar-track-lime-100">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              } animate-fadeIn`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-lime-500 to-lime-600 hover:scale-110 transition-transform'
                    : 'bg-gradient-to-br from-gray-600 to-gray-700 hover:scale-110 transition-transform'
                }`}
              >
                {message.sender === 'user' ? (
                  <User className="w-6 h-6 text-white" />
                ) : (
                  <Bot className="w-6 h-6 text-white" />
                )}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-[70%] ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-br from-lime-500 to-lime-600 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300'
                    : 'bg-white text-gray-800 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100'
                } rounded-2xl px-4 py-3 relative group`}
              >
                <div className="text-sm leading-relaxed">{message.text}</div>
                <div
                  className={`text-xs mt-2 opacity-70 ${
                    message.sender === 'user' ? 'text-lime-100' : 'text-gray-500'
                  }`}
                >
                  {message.timestamp}
                </div>
                
                {/* Message tail */}
                <div
                  className={`absolute top-4 w-3 h-3 transform rotate-45 ${
                    message.sender === 'user'
                      ? 'bg-lime-500 -right-1'
                      : 'bg-white -left-1 border-l border-b border-gray-100'
                  }`}
                ></div>
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start space-x-3 animate-fadeIn">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center shadow-lg">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div className="bg-white rounded-2xl px-4 py-3 shadow-lg border border-gray-100 relative">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin text-lime-500" />
                  <span className="text-gray-600 text-sm">Thinking...</span>
                </div>
                <div className="absolute top-4 w-3 h-3 bg-white -left-1 transform rotate-45 border-l border-b border-gray-100"></div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-lime-200 p-4 backdrop-blur-sm">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here..."
                className="w-full resize-none border-0 focus:ring-0 focus:outline-none text-gray-800 placeholder-gray-400 bg-transparent max-h-32 scrollbar-thin scrollbar-thumb-lime-300"
                rows={1}
                style={{
                  minHeight: '24px',
                  height: 'auto',
                }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
                disabled={isLoading}
              />
            </div>
            <button
              onClick={sendMessage}
              disabled={!inputMessage.trim() || isLoading}
              className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-white p-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg flex items-center justify-center min-w-[48px]"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </button>
          </div>
          
          {/* Quick Actions */}
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-gray-100">
            <Zap className="w-4 h-4 text-lime-500" />
            <span className="text-xs text-gray-500 font-medium">Quick help:</span>
            <div className="flex space-x-2">
              {['Account Help', 'Billing', 'Technical Support'].map((topic) => (
                <button
                  key={topic}
                  onClick={() => setInputMessage(`I need help with ${topic.toLowerCase()}`)}
                  className="px-3 py-1 bg-lime-100 hover:bg-lime-200 text-lime-700 text-xs rounded-full transition-colors duration-200 hover:scale-105 transform"
                >
                  {topic}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-thumb-lime-300::-webkit-scrollbar-thumb {
          background-color: #bef264;
          border-radius: 9999px;
        }
        
        .scrollbar-track-lime-100::-webkit-scrollbar-track {
          background-color: #ecfccb;
          border-radius: 9999px;
        }
      `}</style>
    </div>
  );
};

export default CustomerCareChat;