import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import styles from './Analysis.module.css';

const ChatWindow = ({ messages, onNewMessage }) => {
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onNewMessage(input);
      setInput('');
    }
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.chatHeader}>
        <MessageSquare className={styles.chatIcon} />
        <h2 className={styles.chatTitle}>AI Financial Assistant</h2>
      </div>
      <div ref={chatRef} className={styles.messageContainer}>
        {messages.map((msg, idx) => (
          <div key={idx} className={`${styles.message} ${styles[msg.sender]}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.input}
          placeholder="Ask about financial analysis..."
        />
        <button type="submit" className={styles.sendButton}>
          <Send className={styles.sendIcon} />
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;