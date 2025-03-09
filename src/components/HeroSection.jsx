import React ,{ useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import data from '../data';

// Styled components for theme transitions
const StyledContainer = styled(motion.div)`
  transition: all 0.5s ease-in-out;
  * {
    transition: all 0.5s ease-in-out;
  }
`;

const ScrollIndicator = styled(motion.div)`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  cursor: pointer;
  pointer-events: auto;
  z-index: 100;
`;

const WaveCircle = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid ${props => props.isDark ? '#FFD700' : '#333333'};
  opacity: 0;
  animation: wave 2s infinite;
  
  &:nth-child(2) {
    animation-delay: 0.5s;
  }

  &:nth-child(3) {
    animation-delay: 1s;
  }

  @keyframes wave {
    0% {
      transform: scale(1);
      opacity: 0.8;
    }
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }
`;

const IconWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const HeroSection = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const showThreshold = 100; // Adjust this value to change when the indicator disappears
      
      setIsVisible(currentScrollY < showThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const styles = {
    container: {
      position: 'relative',
      top: '40px',
      left: '25px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '2rem',
      zIndex: 10,
      pointerEvents: 'none',
      transition: 'all 0.5s ease-in-out',
      '@media (maxwidth: 768px)': {
        top: '20px',
        left: '20px',
      }
    },
    avatarContainer: {
      position: 'relative',
      width: '180px',
      height: '180px',
      borderRadius: '50%',
      overflow: 'hidden',
      border: `4px solid ${isDark ? '#FFD700' : '#333333'}`,
      boxShadow: `0 0 20px ${isDark ? 'rgba(255,215,0,0.3)' : 'rgba(0,0,0,0.2)'}`,
      pointerEvents: 'auto',
      transition: 'all 0.5s ease-in-out',
      '@media (maxwidth: 768px)': {
        width: '120px',
        height: '120px',
      }
    },
    avatar: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'all 0.5s ease-in-out',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.5rem',
      position: 'relative',
      paddingLeft: '1rem',
      pointerEvents: 'none',
      transition: 'all 0.5s ease-in-out',
    },
    name: {
      fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
      fontWeight: '800',
      margin: '0',
      color: isDark ? '#FFD700' : '#333333',
      textShadow: isDark 
        ? '2px 2px 4px rgba(0,0,0,0.3), 0 0 10px rgba(255,215,0,0.5)' 
        : '2px 2px 4px rgba(0,0,0,0.2)',
      letterSpacing: '-0.02em',
      lineHeight: '1.2',
      position: 'relative',
      zIndex: 2,
      pointerEvents: 'auto',
      transition: 'all 0.5s ease-in-out',
    },
    role: {
      fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
      fontWeight: '600',
      margin: '0',
      color: isDark ? '#FFD700' : '#666666',
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      position: 'relative',
      paddingLeft: '2rem',
      textShadow: isDark 
        ? '1px 1px 2px rgba(0,0,0,0.3)' 
        : '1px 1px 2px rgba(255,255,255,0.3)',
      pointerEvents: 'auto',
      transition: 'all 0.5s ease-in-out',
      '&::before': {
        content: '""',
        position: 'absolute',
        left: 0,
        top: '50%',
        width: '1.5rem',
        height: '2px',
        background: isDark ? '#FFD700' : '#666666',
        transform: 'translateY(-50%)',
        transition: 'all 0.5s ease-in-out',
      }
    },
    quote: {
      fontSize: 'clamp(1rem, 1.5vw, 1.1rem)',
      fontWeight: '500',
      margin: '1rem 0 0 0',
      color: isDark ? 'rgba(255,255,255,0.9)' : 'rgba(51,51,51,0.9)',
      fontStyle: 'italic',
      maxWidth: '380px',
      position: 'relative',
      paddingLeft: '1.5rem',
      borderLeft: `3px solid ${isDark ? '#FFD700' : '#666666'}`,
      textShadow: isDark 
        ? '1px 1px 2px rgba(0,0,0,0.3)' 
        : '1px 1px 2px rgba(255,255,255,0.3)',
      pointerEvents: 'auto',
      transition: 'all 0.5s ease-in-out',
      '&::before': {
        content: '"❝"',
        position: 'absolute',
        left: '-1.5rem',
        top: '-0.5rem',
        fontSize: '2rem',
        color: isDark ? '#FFD700' : '#666666',
        opacity: 0.5,
        transition: 'all 0.5s ease-in-out',
      }
    },
    // New style for scroll icon
    scrollIcon: {
      color: isDark ? '#FFD700' : '#333333',
      fontSize: '20px', // Slightly smaller to fit better in the circle
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.5s ease-in-out',
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      x: -50,
      transition: {
        duration: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3
      }
    }
  };

  const scrollIndicatorVariants = {
    hidden: { 
      y: 50,
      opacity: 0,
      // transition: {
      //   duration: 0.3,
      //   ease: "easeInOut"
      // }
    },
    visible: {
      y: 50,
      opacity: 1,
      // transition: {
      //   duration: 0.3,
      //   ease: "easeInOut"
      // }
    },
    bounce: {
      y: [0, 0, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const handleScrollClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence mode="wait">
      <StyledContainer
        key={theme}
        className="hero-section"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
        style={styles.container}
      >
        <motion.div 
          variants={itemVariants}
          style={styles.avatarContainer}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <img 
            src={data.hero.avatar}
            alt="Kaleb Adem"
            style={styles.avatar}
          />
        </motion.div>

        <div style={styles.textContainer}>
          <motion.h1 
            variants={itemVariants}
            style={styles.name}
            whileHover={{ 
              scale: 1.02,
              textShadow: isDark 
                ? '2px 2px 8px rgba(255,215,0,0.6)' 
                : '2px 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            {data.hero.title}
          </motion.h1>
          
          <motion.h2 
            variants={itemVariants}
            style={styles.role}
            whileHover={{ 
              x: 10,
              color: isDark ? '#FFA500' : '#333333'
            }}
          >
            {data.hero.subtitle}
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            style={styles.quote}
            whileHover={{ 
              scale: 1.01,
              borderLeftWidth: '5px'
            }}
          >
            "{data.hero.quote}"
          </motion.p>
        </div>
        <AnimatePresence>
          {isVisible && (
            <ScrollIndicator 
              onClick={handleScrollClick}
              initial="hidden"
              animate={["visible", "bounce"]}
              exit="hidden"
              variants={scrollIndicatorVariants}
            >
              <WaveCircle isDark={isDark} />
              <WaveCircle isDark={isDark} />
              <WaveCircle isDark={isDark} />
              <IconWrapper
                style={styles.scrollIcon}
              >
                <FaChevronDown />
              </IconWrapper>
            </ScrollIndicator>
          )}
        </AnimatePresence>
      </StyledContainer>
    </AnimatePresence>
  );
};

export default HeroSection;