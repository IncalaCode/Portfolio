import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data';

const styles = {
  section: {
    width: '100%',
    minHeight: '100vh',
    padding: 'clamp(1rem, 1vw, 1rem)',
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '50vh',
  },
  container: {
    width: '100%',
    maxWidth: '1400px',
    position: 'relative',
    zIndex: 3,
  },
  heading: {
    fontSize: 'clamp(1.5rem, 1vw, 2rem)',
    fontWeight: 'bold',
    marginBottom: '2rem',
    textAlign: 'left',
  },
  divider: {
    width: '100%',
    height: '1px',
    margin: '2rem 0',
  },
};

const containerVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3
    }
  }
};

const elementVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

const CircularProgress = ({ percentage, icon: Icon, name, isDark, index }) => {
  // Calculate the circumference for precise stroke-dasharray
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <motion.div
      custom={index}
      variants={{
        hidden: { scale: 0.8, opacity: 0 },
        visible: i => ({
          scale: 1,
          opacity: 1,
          transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" }
        })
      }}
      whileHover={{ scale: 1.05 }}
      style={{
        position: 'relative',
        width: '80px',
        height: '80px',
        margin: '10px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* Outer glow effect on hover */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          background: isDark 
            ? 'radial-gradient(circle, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0) 70%)' 
            : 'radial-gradient(circle, rgba(51,51,51,0.1) 0%, rgba(51,51,51,0) 70%)',
          filter: 'blur(8px)',
          zIndex: 0,
        }}
      />

      {/* Main SVG container */}
      <svg width="100%" height="100%" viewBox="0 0 100 100" style={{ position: 'relative', zIndex: 1 }}>
        {/* Background track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill={isDark ? 'rgba(26, 26, 26, 0.8)' : 'rgba(245, 245, 245, 0.8)'}
          stroke={isDark ? 'rgba(255,215,0,0.1)' : 'rgba(0,0,0,0.1)'}
          strokeWidth="2"
        />
        
        {/* Progress arc */}
        <motion.path
          d={`
            M 50 10
            A ${radius} ${radius} 0 ${percentage > 50 ? 1 : 0} 1 ${50 + radius * Math.sin(2 * Math.PI * percentage / 100)} ${50 - radius * Math.cos(2 * Math.PI * percentage / 100)}
          `}
          fill="none"
          stroke={isDark ? '#FFD700' : '#333333'}
          strokeWidth="4"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: percentage / 100 }}
        />
        
        {/* Animated dots along the progress path */}
        <motion.circle
          cx="50"
          cy="10"
          r="3"
          fill={isDark ? '#FFD700' : '#333333'}
          animate={{
            cx: [
              50,
              ...Array.from({ length: 10 }).map((_, i) => {
                const angle = (percentage / 100) * 2 * Math.PI * (i + 1) / 10;
                return 50 + radius * Math.sin(angle);
              }),
              50 + radius * Math.sin(2 * Math.PI * percentage / 100)
            ],
            cy: [
              10,
              ...Array.from({ length: 10 }).map((_, i) => {
                const angle = (percentage / 100) * 2 * Math.PI * (i + 1) / 10;
                return 50 - radius * Math.cos(angle);
              }),
              50 - radius * Math.cos(2 * Math.PI * percentage / 100)
            ],
            scale: [1, 1.5, 1],
            opacity: [0, 1, 0.8]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 1
          }}
        />
      </svg>
      
      {/* Icon in the center */}
      <motion.div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: isDark ? 'rgba(26, 26, 26, 0.9)' : 'rgba(255, 255, 255, 0.9)',
          boxShadow: isDark 
            ? '0 2px 8px rgba(255,215,0,0.2)' 
            : '0 2px 8px rgba(0,0,0,0.1)',
          zIndex: 2,
        }}
        whileHover={{
          boxShadow: isDark 
            ? '0 4px 12px rgba(255,215,0,0.3)' 
            : '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        <Icon 
          style={{
            fontSize: '1.4rem',
            color: isDark ? '#FFD700' : '#333333',
          }}
        />
      </motion.div>
      
      {/* Skill name tooltip */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        whileHover={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: isDark ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          padding: '6px 12px',
          borderRadius: '6px',
          boxShadow: isDark 
            ? '0 4px 12px rgba(0,0,0,0.3)' 
            : '0 4px 12px rgba(0,0,0,0.1)',
          zIndex: 10,
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontSize: '0.8rem',
          fontWeight: 'bold',
          color: isDark ? '#FFD700' : '#333333',
          whiteSpace: 'nowrap',
        }}>
          {name}
        </span>
        
        {/* Tooltip arrow */}
        <div style={{
          position: 'absolute',
          bottom: '-6px',
          left: '50%',
          transform: 'translateX(-50%) rotate(45deg)',
          width: '12px',
          height: '12px',
          background: isDark ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        }} />
      </motion.div>
    </motion.div>
  );
};

const AboutMeSection = ({ theme = 'light' }) => {
  const [screenSize, setScreenSize] = useState({
    width: window.innerWidth,
    isMobile: window.innerWidth <= 768,
    isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
  });
  const [currentTheme, setCurrentTheme] = useState(theme);
  const isDark = currentTheme === 'dark';

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        width,
        isMobile: width <= 768,
        isTablet: width > 768 && width <= 1024,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine number of columns based on screen size
  const getGridColumns = () => {
    if (screenSize.isMobile) return 2;
    if (screenSize.isTablet) return 3;
    if (screenSize.width > 1024 && screenSize.width <= 1440) return 4;
    return 5; // For very large screens
  };

  const skills = data.skills_list;

  return (
    <section style={{
      ...styles.section,
    }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`container-${currentTheme}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={styles.container}
        >
          {/* Single Card Container */}
          <motion.div
            variants={elementVariants}
            style={{
              background: isDark ? '#1a1a1a' : '#ffffff',
              borderRadius: '12px',
              padding: 'clamp(1.5rem, 3vw, 2.5rem)',
              boxShadow: isDark 
                ? '0 8px 30px rgba(255,215,0,0.1)' 
                : '0 8px 30px rgba(0,0,0,0.1)',
            }}
          >
            {/* About Me Section */}
            <motion.div variants={elementVariants}>
              <motion.h2 style={{
                ...styles.heading,
                color: isDark ? '#FFD700' : '#333333',
              }}>
                About Me
              </motion.h2>
              <motion.div
                variants={elementVariants}
                style={{
                  color: isDark ? '#ffffff' : '#666666',
                  fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                  lineHeight: 1.8,
                }}
              >
                <p style={{ marginBottom: '1rem' }}>
                  I'm Kaleb Adem, a passionate full-stack developer in React, Flutter, Laravel, Django, and smart automation technologies. I love creating real-time applications, automation tools, and interactive UI experiences that push the boundaries of innovation.
                </p>
                <p style={{ marginBottom: '1rem' }}>
                  I enjoy tackling new challenges and continuously learning cutting-edge technologies. Whether I'm collaborating on a team project or working solo, I always focus on delivering clean, efficient code and a seamless user experience.
                </p>
              </motion.div>
            </motion.div>

            {/* Divider */}
            <motion.div 
              variants={elementVariants}
              style={{
                ...styles.divider,
                background: isDark ? 'rgba(255,215,0,0.2)' : 'rgba(0,0,0,0.1)',
              }}
            />

            {/* Skills Section */}
            <motion.div variants={elementVariants}>
              <motion.h2 style={{
                ...styles.heading,
                color: isDark ? '#FFD700' : '#333333',
              }}>
                Skills
              </motion.h2>

              <motion.div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
                gap: '1rem',
                justifyItems: 'center',
                alignItems: 'center',
              }}>
                {skills.map((skill, index) => (
                  <CircularProgress
                    key={skill.name}
                    percentage={skill.level}
                    icon={skill.icon}
                    name={skill.name}
                    isDark={isDark}
                    index={index}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default AboutMeSection;