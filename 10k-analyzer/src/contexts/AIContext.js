import React, { createContext, useContext, useState, useCallback } from 'react';

const AIContext = createContext();

export function AIProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const dummyResponses = {
    "Analyze AAPL stock": {
      response: "Based on recent performance, AAPL stock shows strong growth potential. The company's innovative product line and solid financials make it an attractive investment option.",
      reasoningProcess: {
        "Data Collection": [
          "Gathered historical stock price data",
          "Analyzed financial statements",
          "Reviewed market trends and competitor analysis"
        ],
        "Financial Analysis": {
          "Revenue Growth": "15% year-over-year",
          "Profit Margins": "Stable at 21%",
          "Debt-to-Equity Ratio": "Improved from 1.2 to 0.8"
        },
        "Market Position": [
          "Leader in smartphone market",
          "Growing services segment",
          "Strong brand loyalty"
        ],
        "Risk Assessment": [
          "Potential supply chain disruptions",
          "Regulatory challenges in certain markets",
          "Intense competition in the tech sector"
        ],
        "Conclusion": "Overall positive outlook based on financial strength and market position"
      }
    },
    "Compare TSLA and F stocks": {
      response: "TSLA has shown higher volatility and growth potential, while F offers more stability and dividends. TSLA is focused on electric vehicles, while F is transitioning its lineup. Consider your risk tolerance when choosing between them.",
      reasoningProcess: {
        "Comparative Analysis": {
          "Market Cap": "TSLA: $600B, F: $50B",
          "P/E Ratio": "TSLA: 100, F: 15",
          "Revenue Growth": "TSLA: 40%, F: 10%"
        },
        "Business Model": {
          "TSLA": ["Pure EV play", "Tech-focused", "Direct sales model"],
          "F": ["Traditional automaker", "Transitioning to EVs", "Dealer network"]
        },
        "Risk Factors": {
          "TSLA": ["High valuation", "Production scalability", "Increasing competition"],
          "F": ["Legacy costs", "Slower EV transition", "Debt levels"]
        },
        "Investment Profile": {
          "TSLA": "High growth, high risk",
          "F": "Value stock with dividend yield"
        },
        "Conclusion": "Choice depends on investor's risk tolerance and investment goals"
      }
    },
    // Add more dummy responses with reasoning processes here
  };

  const sendMessage = useCallback(async (text) => {
    const userMessage = { text, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    let aiResponse;
    if (text in dummyResponses) {
      aiResponse = dummyResponses[text];
    } else {
      aiResponse = {
        response: "I'm sorry, I don't have specific information about that. Is there anything else I can help you with regarding financial analysis or investment strategies?",
        reasoningProcess: {
          "Query Analysis": "Unable to match query with predefined responses",
          "Fallback Action": "Provide generic response and offer further assistance"
        }
      };
    }

    setIsAnalyzing(false);

    const aiMessage = { text: aiResponse.response, sender: 'ai', reasoningProcess: aiResponse.reasoningProcess };
    setMessages(prevMessages => [...prevMessages, aiMessage]);
  }, []);

  const value = {
    messages,
    sendMessage,
    isAnalyzing
  };

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>;
}

export function useAI() {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
}