import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader } from 'lucide-react';
import MessageBubble from './MessageBubble';
import ExpandableResponse from './ExpandableResponse';
import { useAI } from '../../contexts/AIContext';
import styles from '../../styles/Chat.module.css';

function ChatInterface() {
  const [input, setInput] = useState('');
  const { messages, sendMessage, isAnalyzing } = useAI();
  const messagesEndRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const dummyCommands = [
    "Analyze AAPL stock",
    "Compare TSLA and F stocks",
    "Show me the S&P 500 performance",
    "What's my portfolio risk?",
    "Recommend dividend stocks"
  ];

  return (
    <div className={styles.chatInterface}>
      <div className={styles.messageList}>
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {msg.sender === 'ai' ? (
                <ExpandableResponse
                  response={msg.text}
                  reasoningProcess={msg.reasoningProcess}
                />
              ) : (
                <MessageBubble message={msg} />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
      <motion.form 
        onSubmit={handleSubmit} 
        className={styles.inputForm}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your financial question..."
          className={styles.input}
        />
        <motion.button 
          type="submit" 
          className={styles.sendButton}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? <Loader className={styles.spinner} /> : <Send size={20} />}
        </motion.button>
      </motion.form>
      <div className={styles.suggestionContainer}>
        <p>Try asking:</p>
        <div className={styles.suggestions}>
          {dummyCommands.map((command, index) => (
            <motion.button
              key={index}
              className={styles.suggestionButton}
              onClick={() => sendMessage(command)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {command}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ChatInterface;