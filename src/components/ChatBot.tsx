import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface ChatBotProps {
  darkMode: boolean;
}

const ChatBot: React.FC<ChatBotProps> = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today?', sender: 'bot' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { text: inputMessage, sender: 'user' }]);
    const userMessage = inputMessage;
    setInputMessage('');

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = getAIResponse(userMessage);
      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  const getAIResponse = (message: string) => {
    const responses: { [key: string]: string } = {
      'hello': 'Hi! I\'m your portfolio assistant. I can tell you about the projects, skills, and experience showcased here. What would you like to know?',
      'hi': 'Hello! I\'m your portfolio assistant. I can tell you about the projects, skills, and experience showcased here. What would you like to know?',
      'noob': 'Not at all! I\'m actually a sophisticated AI assistant designed to help visitors learn more about this portfolio and its projects. What would you like to know?',
      'who': 'This portfolio website belongs to Nanashi, a skilled developer with expertise in web development, particularly in React, TypeScript, and modern web technologies.',
      'owner': 'This portfolio website belongs to Nanashi, a skilled developer with expertise in web development, particularly in React, TypeScript, and modern web technologies.',
      'what can you do': 'I can help you with:\n1. Information about projects\n2. Technical skills and expertise\n3. Contact information\n4. Background and experience\nWhat would you like to know more about?',
      'help': 'I can help you with:\n1. Information about projects\n2. Technical skills and expertise\n3. Contact information\n4. Background and experience\nWhat would you like to know more about?',
      'projects': 'Some notable projects include the Crimson Shop e-commerce platform. Would you like to know more about any specific project?',
      'skills': 'The key skills include:\n- Frontend: React, TypeScript, Tailwind CSS\n- Animation: Framer Motion\n- Version Control: Git\n- And more!\nWhich skill would you like to know more about?',
      'contact': 'You can get in touch through:\n- Email\n- GitHub\n- Facebook\nWould you like any specific contact information?',
      'bye': 'Thanks for chatting! If you have any more questions later, feel free to come back. Have a great day!',
      'default': 'I\'d be happy to help! I can tell you about projects, skills, contact information, or general background. What interests you?'
    };

    message = message.toLowerCase();
    for (let key in responses) {
      if (message.includes(key)) {
        return responses[key];
      }
    }
    return responses.default;
  };

  return (
    <div className="fixed bottom-0 right-0 z-50">
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className={`fixed bottom-6 right-6 p-4 rounded-full ${
              darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
            } text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className={`fixed bottom-6 right-6 w-80 sm:w-96 ${
              darkMode ? 'bg-gray-800' : 'bg-white'
            } rounded-lg shadow-xl overflow-hidden border ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}
          >
            {/* Header */}
            <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-blue-500'} text-white flex justify-between items-center`}>
              <h3 className="font-semibold">Chat Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-opacity-20 hover:bg-black rounded p-1 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div 
              className={`h-96 overflow-y-auto p-4 ${
                darkMode ? 'bg-gray-800 text-white' : 'bg-gray-50 text-gray-900'
              }`}
            >
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}
                >
                  <div
                    className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? darkMode
                          ? 'bg-blue-600 text-white'
                          : 'bg-blue-500 text-white'
                        : darkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-white text-gray-800'
                    } shadow-sm`}
                  >
                    <p className="whitespace-pre-line">{message.text}</p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className={`p-4 ${darkMode ? 'bg-gray-700' : 'bg-white'} border-t ${darkMode ? 'border-gray-600' : 'border-gray-200'}`}>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className={`flex-1 p-2 rounded-lg ${
                    darkMode
                      ? 'bg-gray-800 text-white border-gray-600'
                      : 'bg-gray-100 text-gray-800 border-gray-200'
                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                <motion.button
                  onClick={handleSendMessage}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg ${
                    darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
                  } text-white transition-colors duration-300`}
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatBot;
