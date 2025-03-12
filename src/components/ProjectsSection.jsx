import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink  } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import layout from '../data';
import { 
  SiReact, 
  SiNodedotjs, 
  SiMongodb,
  SiNextdotjs,
  SiThreedotjs,
  SiTailwindcss,
  SiFirebase,
  SiTypescript,
  SiPrisma,
  SiPostgresql,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiPython,
  SiDjango,
  SiFlask,
  SiDocker,
  SiGit,
  SiRedux,
  SiGraphql,
  SiExpress,
  SiFigma,
  SiFramer,
  SiStyledcomponents,
  SiWebgl,
  SiSupabase,
  SiOpenai,
} from 'react-icons/si';

const ProjectsSection = ({ theme = 'light' }) => {
  const isDark = theme === 'dark';
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const { projects } = layout;

  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const techIcons = {
    React: SiReact,
    "Node.js": SiNodedotjs,
    MongoDB: SiMongodb,
    "Next.js": SiNextdotjs,
    "Three.js": SiThreedotjs,
    "Tailwind CSS": SiTailwindcss,
    Firebase: SiFirebase,
    Express: SiExpress,
    Figma: SiFigma,
    Git: SiGit,
    Docker: SiDocker,
    TypeScript: SiTypescript,
    JavaScript: SiJavascript,
    HTML5: SiHtml5,
    CSS3: SiCss3,
    Python: SiPython,
    Django: SiDjango,
    Flask: SiFlask,
    Redux: SiRedux,
    GraphQL: SiGraphql,
    Postgresql: SiPostgresql,
    Prisma: SiPrisma,
    "Framer Motion": SiFramer,
    "Styled Components": SiStyledcomponents,
    "WebGL": SiWebgl,
    "Html": SiHtml5,
    "supabase": SiSupabase,
    "gemine ai": FaGoogle
  };
  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const projectVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      y: -50,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  const styles = {
    section: {
      width: '100%',
      minHeight: '100vh',
      padding: isMobile ? '3rem 1rem' : '6rem 2rem',
      position: 'relative',
      zIndex: 2,
      background: isDark ? 'rgba(18, 18, 18, 0.40)' : 'rgba(255, 255, 255, 0.40)',
      backdropFilter: 'blur(10px)',
      pointerEvents: 'all',
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto',
      pointerEvents: 'all',
      position: 'relative',
      zIndex: 3,
    },
    heading: {
      color: isDark ? '#FFD700' : '#333333',
      textAlign: 'center',
      marginBottom: '3rem',
      fontSize: 'clamp(1.5rem, 4vw, 3rem)',
      fontWeight: 'bold',
      textTransform: 'uppercase',
      letterSpacing: '0.1em',
      textShadow: isDark 
        ? '2px 2px 4px rgba(255,215,0,0.3)' 
        : '2px 2px 4px rgba(0,0,0,0.1)',
      pointerEvents: 'auto',
    },
    projectsContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      overflowX: isMobile ? 'hidden' : 'auto',
      overflowY: isMobile ? 'auto' : 'hidden',
      gap: 'clamp(1rem, 2vw, 2rem)',
      padding: isMobile 
        ? '0 clamp(0.5rem, 2vw, 1rem)' 
        : 'clamp(1rem, 2vw, 2rem) 0',
      scrollSnapType: isMobile ? 'y mandatory' : 'x mandatory',
      WebkitOverflowScrolling: 'touch',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      pointerEvents: 'all',
      alignItems: isMobile ? 'center' : 'flex-start',
      position: 'relative',
      zIndex: 4,
    }
  };

  const ProjectCard = ({ project }) => (
    <motion.div
      layout
      key={`${project.id}-${currentTheme}`}
      variants={projectVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      whileHover={{ 
        y: isMobile ? 0 : -10,
        x: isMobile ? -5 : 0,
        transition: { duration: 0.3 },
        boxShadow: isDark 
          ? '0 8px 30px rgba(255,215,0,0.2)' 
          : '0 8px 30px rgba(0,0,0,0.15)'
      }}
      style={{
        width: isMobile ? '100%' : 'clamp(280px, 80vw, 400px)',
        flex: isMobile ? '0 0 auto' : '0 0 clamp(280px, 80vw, 400px)',
        scrollSnapAlign: 'start',
        borderRadius: '12px',
        overflow: 'hidden',
        background: isDark ? '#1a1a1a' : '#ffffff',
        pointerEvents: 'all',
        marginBottom: isMobile ? 'clamp(1rem, 2vw, 2rem)' : 0,
        position: 'relative',
        zIndex: 5,
      }}
    >
      <motion.div 
        whileHover={{ scale: 1.05 }}
        style={{
          height: 'clamp(180px, 30vw, 250px)',
          overflow: 'hidden',
          position: 'relative',
        }}
      >

      <img 
      src={project.image} 
      alt={project.title}
      style={{
        width: '100%',
        height: '100%',
        // objectFit: 'cover',
        overflow: 'hidden',
        aspectRatio: '16/9',
        transition: 'transform 0.3s ease'
      }}
    />
      </motion.div>

      <div style={{ padding: 'clamp(1rem, 2vw, 1.5rem)' }}>
        <motion.h3 
          whileHover={{ scale: 1.02 }}
          style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            fontWeight: 'bold',
            color: isDark ? '#FFD700' : '#333333',
            marginBottom: 'clamp(0.5rem, 1vw, 1rem)',
          }}
        >
          {project.title}
        </motion.h3>
        
        <p style={{
          color: isDark ? '#ffffff' : '#666666',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
          lineHeight: '1.6',
          fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
        }}>
          {project.description}
        </p>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'clamp(0.5rem, 1vw, 1rem)',
          marginBottom: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {project.technologies.map((tech) => {
            const Icon = techIcons[tech];
            return Icon ? (
              <motion.div
                key={`${tech}-${currentTheme}`}
                whileHover={{ 
                  scale: 1.2,
                  color: isDark ? '#FFD700' : '#333333'
                }}
                style={{
                  color: isDark ? '#FFD700' : '#666666',
                  fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
                }}
              >
                <Icon />
              </motion.div>
            ) : null;
          })}
        </div>

        <div style={{
          display: 'flex',
          gap: 'clamp(0.5rem, 1vw, 1rem)',
          justifyContent: 'flex-end',
        }}>
          <motion.a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.1,
              color: isDark ? '#FFD700' : '#000000'
            }}
            style={{
              color: isDark ? '#FFD700' : '#333333',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            }}
          >
            <FiGithub />
          </motion.a>
          <motion.a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ 
              scale: 1.1,
              color: isDark ? '#FFD700' : '#000000'
            }}
            style={{
              color: isDark ? '#FFD700' : '#333333',
              fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)',
            }}
          >
            <FiExternalLink />
          </motion.a>
        </div>
      </div>
    </motion.div>
  );

  // Hide scrollbar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .projects-scroll-container::-webkit-scrollbar {
        display: none;
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <section style={styles.section}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`container-${currentTheme}`}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={containerVariants}
          style={styles.container}
        >
          <motion.h2
            key={`heading-${currentTheme}`}
            variants={projectVariants}
            style={styles.heading}
          >
            {projects.title}
          </motion.h2>

          <motion.div 
            key={`projects-${currentTheme}`}
            className="projects-scroll-container"
            style={styles.projectsContainer}
            drag={isMobile ? false : "x"}
            dragConstraints={!isMobile ? { 
              right: 0,
              left: -(projects?.items?.length * 420 - window.innerWidth + 40)
            } : undefined}
            dragElastic={0.1}
          >
            <AnimatePresence>
              {projects?.items?.map((project) => (
                <ProjectCard key={`${project.id}-${currentTheme}`} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default ProjectsSection;