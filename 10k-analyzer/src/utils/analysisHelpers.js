export const processMessage = (message) => {
    if (message.toLowerCase().includes('analyze apple')) {
      return 'Analyzing Apple (AAPL) stock...';
    } else if (message.toLowerCase().includes('compare tesla and ford')) {
      return 'Analyzing Tesla (TSLA) vs Ford (F) stocks...';
    }
    return 'I\'m sorry, I don\'t understand that command. Try asking to analyze a specific stock or compare two stocks.';
  };
  
  export const triggerAnalysis = (subject) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 5000);
    });
  };