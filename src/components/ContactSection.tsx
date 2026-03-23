import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedLogo from './ui/logosolve';
import './ContactSection.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const [isDark, setIsDark] = useState(true);
  const footerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!footerRef.current || !pathRef.current) return;

    ScrollTrigger.create({
      trigger: footerRef.current,
      start: 'top bottom',
      end: 'top center',
      toggleActions: 'play none none reverse',
      onEnter: () => {
        // Animate the wave bouncing
        gsap.fromTo(
          pathRef.current,
          { 
            attr: { d: 'M0,150 C300,200 600,100 1139,150 C1678,200 1978,100 2278,150 L2278,683 L0,683 Z' }
          },
          {
            duration: 1.5,
            attr: { d: 'M0,0 C300,80 600,-20 1139,0 C1678,20 1978,-20 2278,0 L2278,683 L0,683 Z' },
            ease: 'elastic.out(1, 0.5)',
            overwrite: true,
          }
        );
      },
      onLeaveBack: () => {
        gsap.to(pathRef.current, {
          duration: 0.5,
          attr: { d: 'M0,150 C300,200 600,100 1139,150 C1678,200 1978,100 2278,150 L2278,683 L0,683 Z' },
          ease: 'power2.in',
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div id="contact" className={`contact-section ${isDark ? 'dark-mode' : 'light-mode'}`}>
      <div className="footer" ref={footerRef}>
        <svg
          preserveAspectRatio="none"
          id="footer-img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 2278 683"
        >
          <defs>
            <linearGradient
              id="grad-1"
              x1="0"
              y1="0"
              x2="2278"
              y2="683"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.2" stopColor={isDark ? "#FFD700" : "#f9f182ff"} />
              <stop offset="0.5" stopColor={isDark ? "#FFD700" : "#FFD700"} />
              <stop offset="0.8" stopColor={isDark ? "#FFD700" : "#FFA500"} />
            </linearGradient>
          </defs>
          <path
            ref={pathRef}
            className="footer-svg"
            id="bouncy-path"
            fill="url(#grad-1)"
            d="M0,0 C300,80 600,-20 1139,0 C1678,20 1978,-20 2278,0 L2278,683 L0,683 Z"
          />
        </svg>

        <div className="footer-content">
          <div className="footer-links">
            <a href="#home" className="footer-link">HOME</a>
            <a href="#about" className="footer-link">ABOUT US</a>
            <a href="#projects" className="footer-link">PROJECTS</a>
            <a href="#contact" className="footer-link">CONTACT</a>
          </div>

          <div className="footer-info">
            <div className="footer-section">
              <h3>Get in Touch</h3>
              <p>Email: kalebademkisho@gmail.com</p>
              <p>Phone: +251 925 319 177</p>
              <p className="email-note">Send us an email and we'll respond immediately</p>
            </div>

            <div className="footer-section">
              <h3>Follow Me</h3>
              <div className="social-links">
                <a href="https://github.com/IncalaCode" target="_blank" rel="noopener noreferrer">GitHub</a>
                {/* <a href="https://linkedin.com/in/kalebademkisho" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="https://twitter.com/kalebademkisho" target="_blank" rel="noopener noreferrer">Twitter</a> */}
              </div>
            </div>

            <div className="footer-section">
              <h3>Company</h3>
              <a 
                href="https://solve-sphere-sc.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="project-link-container"
              >
                <AnimatedLogo className="w-12 h-12" />
                <span className="project-name">SolveSphere</span>
              </a>
              <p>Email: solvesphere999@gmail.com</p>
              <p>Location: Sidama - Hawassa , Ethiopia</p>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Kaleb Adem. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
