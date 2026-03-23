import { useState, useEffect, useRef } from 'react';
import { AnimatedThemeToggler } from './ui/animated-theme-toggler';
import { CpuArchitecture } from './ui/cpu-architecture';
import { Menu } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './HeroSection.css';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Create audio element with local audio file
    const audio = new Audio('/the_mountain-technology-485572.mp3');
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
  
  const heroContentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const menuOverlayRef = useRef<HTMLDivElement>(null);
  const menuHeaderRef = useRef<HTMLDivElement>(null);
  const menuItemsRef = useRef<HTMLDivElement>(null);
  const cpuBackgroundRef = useRef<HTMLDivElement>(null);
  const heroContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || savedTheme === null;
    
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setDarkMode(isDark);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Play audio after user has interacted (after loading page)
    // The loading page provides the required user interaction
    const playAudio = async () => {
      if (audioRef.current) {
        try {
          await audioRef.current.play();
          setAudioPlaying(true);
        } catch (error) {
          console.log('Audio autoplay prevented. User can click the audio button to play.');
        }
      }
    };

    // Delay to ensure loading animation has completed and user has interacted
    const timer = setTimeout(playAudio, 5500); // After 5 second loading + 0.5s buffer

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    // GSAP animations on mount
    const ctx = gsap.context(() => {
      // Animate navigation buttons
      gsap.from(navRef.current?.children || [], {
        y: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      });

      // Split title into characters for animation
      if (titleRef.current) {
        const text = titleRef.current.textContent || '';
        titleRef.current.innerHTML = text
          .split('')
          .map((char, i) => `<span class="char" style="display: inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        gsap.from(titleRef.current.querySelectorAll('.char'), {
          y: 100,
          opacity: 0,
          rotationX: -90,
          duration: 0.8,
          stagger: 0.05,
          ease: 'back.out(1.7)',
          delay: 0.3
        });
      }

      // Animate subtitle with scale
      gsap.from(subtitleRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 1,
        ease: 'elastic.out(1, 0.5)',
        delay: 1.2
      });

      // Animate description
      gsap.from(descriptionRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.5
      });

      // Continuous floating animation for hero content
      gsap.to(heroContentRef.current, {
        y: -15,
        duration: 2.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    // Scroll animation - keep CPU fixed, let content scroll over it
    if (cpuBackgroundRef.current && heroContainerRef.current) {
      // No animation for CPU - it stays fixed
      // The about section will scroll over it naturally
    }
  }, []);

  useEffect(() => {
    if (menuOpen && menuOverlayRef.current) {
      // Opening menu - animate from top to bottom
      gsap.fromTo(
        menuOverlayRef.current,
        { 
          clipPath: 'inset(0% 0% 100% 0%)'
        },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 0.8,
          ease: 'power3.inOut'
        }
      );

      // Animate menu header
      if (menuHeaderRef.current) {
        gsap.fromTo(
          menuHeaderRef.current.children,
          {
            y: -50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.3
          }
        );
      }

      // Animate menu items
      if (menuItemsRef.current) {
        gsap.fromTo(
          menuItemsRef.current.children,
          {
            y: 50,
            opacity: 0
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            delay: 0.5
          }
        );
      }
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    if (!menuOpen) {
      setMenuOpen(true);
    } else {
      // Closing menu - animate from bottom to top
      if (menuOverlayRef.current) {
        gsap.to(menuOverlayRef.current, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.6,
          ease: 'power3.inOut',
          onComplete: () => setMenuOpen(false)
        });
      }
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
    } else {
      audioRef.current.play().catch(error => {
        console.log('Audio play failed:', error);
      });
      setAudioPlaying(true);
    }
  };

  return (
    <div className={`hero-container ${!darkMode ? 'light-mode' : ''}`} ref={heroContainerRef} id="home">
      {/* CPU Architecture Background */}
      <div className="cpu-background" ref={cpuBackgroundRef}>
        <CpuArchitecture 
          className={!darkMode ? 'text-gray-400' : 'text-gray-600'}
          text="DEV"
          textColor={darkMode ? '#FFD700' : '#000000'}
          animateText={true}
          animateLines={true}
          animateMarkers={true}
        />
      </div>

      {/* Top Right Navigation */}
      <div className="top-nav" ref={navRef}>
        <div className="nav-item">
          <button 
            className={`nav-btn audio-btn ${audioPlaying ? 'playing' : ''}`} 
            onClick={toggleAudio}
            aria-label="Toggle Audio"
          >
            <div className="audio-line"></div>
            <div className="audio-wave">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        
        <div className="nav-item">
          <AnimatedThemeToggler className="theme-toggle-btn" iconSize={16} />
        </div>
        
        <div className="nav-item">
          <button className="nav-btn menu-btn" onClick={toggleMenu} aria-label="Menu">
            <Menu size={16} />
          </button>
        </div>
      </div>

      {/* Full Screen Menu Overlay */}
      <div 
        ref={menuOverlayRef}
        className={`menu-overlay ${!darkMode ? 'light-mode' : ''}`}
        style={{ display: menuOpen ? 'flex' : 'none' }}
      >
        <div className="menu-header" ref={menuHeaderRef}>
          <button className="menu-action-btn talk-btn">
            LET'S TALK
            <span className="dot"></span>
          </button>
          
          <button className="menu-action-btn close-btn" onClick={toggleMenu}>
            CLOSE
            <span className="dots">
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        <nav className="menu-content" ref={menuItemsRef}>
          <a href="#home" className="menu-item" onClick={toggleMenu}>
            HOME
          </a>
          <a href="#about" className="menu-item" onClick={toggleMenu}>
            ABOUT US
            <span className="menu-dot"></span>
          </a>
          <a href="#projects" className="menu-item" onClick={toggleMenu}>
            PROJECTS
          </a>
          <a href="#contact" className="menu-item" onClick={toggleMenu}>
            CONTACT
          </a>
        </nav>
      </div>

      {/* Bottom Left Info */}
      <div className="bottom-left-info">
        <div className="info-stack">
          <span className="info-title">FULL STACK DEVELOPER</span>
          <span className="info-name">Kaleb Adem</span>
          <span className="info-role">Specialized in Backend</span>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
