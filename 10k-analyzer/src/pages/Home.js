import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, TrendingUp, DollarSign, ChevronDown } from 'lucide-react';
import styles from './Home.module.css';

function Home() {
  const { user } = useAuth();
  const [expandedFeature, setExpandedFeature] = useState(null);
  const canvasRef = useRef(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  const features = [
    {
      title: "Advanced Analytics",
      icon: BarChart2,
      description: "Dive deep into financial data with our cutting-edge AI analysis.",
      details: "Our advanced analytics engine processes vast amounts of financial data, including historical trends, market indicators, and company-specific metrics to provide you with comprehensive insights."
    },
    {
      title: "Predictive Insights",
      icon: TrendingUp,
      description: "Stay ahead of market trends with our AI-powered predictions.",
      details: "Leveraging machine learning algorithms, we analyze patterns and correlations in financial data to forecast potential market movements and company performance."
    },
    {
      title: "Investment Recommendations",
      icon: DollarSign,
      description: "Get personalized investment advice based on thorough analysis.",
      details: "Our AI considers your investment goals, risk tolerance, and market conditions to provide tailored investment recommendations, helping you make informed decisions."
    }
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let dots = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initDots(); // Reinitialize dots when resizing
    };

    const initDots = () => {
      const dotCount = Math.floor((canvas.width * canvas.height) / 10000); // Adjust dot density
      dots = Array(dotCount).fill().map(() => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
      }));
    };

    const drawDots = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(52, 152, 219, 0.2)';
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wrap around the screen
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;
      });

      animationFrameId = requestAnimationFrame(drawDots);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial canvas setup and dot initialization
    drawDots();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <motion.div 
      className={styles.container}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <canvas ref={canvasRef} className={styles.backgroundCanvas} />
      <motion.h1 className={styles.title} variants={itemVariants}>
        Welcome to 10-K Analyzer
      </motion.h1>
      <motion.p className={styles.subtitle} variants={itemVariants}>
        Harness the power of AI to analyze 10-K reports and get data-driven investment recommendations.
      </motion.p>
      <motion.div className={styles.features} variants={itemVariants}>
        {features.map((feature, index) => (
          <motion.div 
            key={index}
            className={`${styles.featureItem} ${expandedFeature === index ? styles.active : ''}`}
            onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <feature.icon size={48} className={styles.featureIcon} />
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
            <AnimatePresence>
              {expandedFeature === index && (
                <motion.div 
                  className={styles.featureDetails}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <p>{feature.details}</p>
                </motion.div>
              )}
            </AnimatePresence>
            <ChevronDown 
              className={`${styles.chevron} ${expandedFeature === index ? styles.rotated : ''}`} 
              size={24} 
            />
          </motion.div>
        ))}
      </motion.div>
      <motion.div variants={itemVariants} className={styles.ctaContainer}>
        {user ? (
          <Link to="/dashboard" className={styles.button}>Go to Dashboard</Link>
        ) : (
          <>
            <Link to="/login" className={styles.button}>Get Started</Link>
            <Link to="/demo" className={styles.secondaryButton}>View Demo</Link>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

export default Home;