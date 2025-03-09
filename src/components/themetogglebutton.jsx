import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { buttonVariants, iconVariants } from '../animations/variants';

export default function  themeToggleButton ({toggleTheme, theme}) {

  return (
    <>
          <motion.button 
            onClick={toggleTheme}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              zIndex: 100,
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme === 'light' 
                ? 'rgba(51, 51, 51, 0.8)' 
                : 'rgba(255, 255, 255, 0.8)',
              color: theme === 'light' ? '#fff' : '#333',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)'
            }}
            initial={false}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={iconVariants}
              >
                {theme === 'light' ? (
                  <FiMoon size={24} />
                ) : (
                  <FiSun size={24} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          </>
  );
};