import React from 'react';
import { motion } from 'framer-motion';
import layout from '../data';

const Footer = ({ theme }) => {
  const iconVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 400,
      }
    }
  };

  const socialLinks = layout.socialLinks;
  return (
    <footer 
      className="footer-container"
      style={{
        position: 'relative',
        padding: '2rem',
        backgroundColor: theme === 'light' ? '#ffffff' : '#1a1a1a',
        color: theme === 'light' ? '#1a1a1a' : '#FFD700', // Changed to gold for dark mode
        transition: 'background-color 0.3s, color 0.3s'
      }}
    >
      <div className="social-icons" 
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '2rem',
          alignItems: 'center'
        }}
      >
        {socialLinks.map((social, index) => (
          <motion.a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            variants={iconVariants}
            whileHover="hover"
            style={{
              fontSize: '1.5rem',
              color: theme === 'light' ? '#1a1a1a' : '#FFD700', // Changed to gold for dark mode
              cursor: 'pointer'
            }}
            aria-label={social.label}
          >
            {social.icon}
          </motion.a>
        ))}
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '1rem',
          textAlign: 'center',
          fontSize: '0.9rem',
          color: theme === 'light' ? '#1a1a1a' : '#FFD700' // Changed to gold for dark mode
        }}
      >
        © {new Date().getFullYear()} {layout.hero.title}. All rights reserved.
      </motion.p>
    </footer>
  );
};

export default Footer;