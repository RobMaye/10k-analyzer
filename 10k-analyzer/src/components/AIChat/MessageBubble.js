import React from 'react';
import { User, Bot } from 'lucide-react';
import styles from '../../styles/Chat.module.css';

function MessageBubble({ message }) {
  const { text, sender } = message;
  const isAI = sender === 'ai';

  return (
    <div className={`${styles.messageBubble} ${isAI ? styles.ai : styles.user}`}>
      <div className={styles.avatar}>
        {isAI ? <Bot size={24} /> : <User size={24} />}
      </div>
      <div className={styles.messageContent}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default MessageBubble;