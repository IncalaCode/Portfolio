import { useEffect, useRef, useState } from 'react';
import './TubesCursor.css';

const TubesCursor = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tubesAppRef = useRef<any>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // Initialize theme
    const savedTheme = localStorage.getItem('theme');
    const isDark = savedTheme === 'dark' || savedTheme === null;
    setDarkMode(isDark);

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      setDarkMode(isDark);
      
      // Update tubes colors
      if (tubesAppRef.current && tubesAppRef.current.tubes) {
        if (isDark) {
          tubesAppRef.current.tubes.setColors(['#FFD700', '#FFA500', '#FF8C00']);
          tubesAppRef.current.tubes.setLightsColors(['#FFD700', '#FFA500', '#FF8C00', '#FFFF00']);
        } else {
          tubesAppRef.current.tubes.setColors(['#000000', '#2c2c2c', '#1a1a1a']);
          tubesAppRef.current.tubes.setLightsColors(['#000000', '#2c2c2c', '#FFD700', '#1a1a1a']);
        }
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Wait for next frame to ensure canvas is in DOM
    requestAnimationFrame(() => {
      // Get actual rendered size
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas internal size
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      console.log('Canvas dimensions:', canvas.width, canvas.height);

      // Only load if dimensions are valid
      if (canvas.width > 0 && canvas.height > 0) {
        const script = document.createElement('script');
        script.type = 'module';
        script.textContent = `
          import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
          
          const canvas = document.getElementById('tubes-canvas');
          if (canvas && canvas.width > 0 && canvas.height > 0) {
            try {
              const app = TubesCursor(canvas, {
                tubes: {
                  colors: ["#FFD700", "#FFA500", "#FF8C00"],
                  lights: {
                    intensity: 200,
                    colors: ["#FFD700", "#FFA500", "#FF8C00", "#FFFF00"]
                  }
                }
              });
              
              canvas.style.setProperty('background', 'transparent', 'important');
              canvas.style.setProperty('background-color', 'transparent', 'important');
              
              window.tubesApp = app;
              console.log('Tubes cursor initialized');
            } catch (error) {
              console.error('Tubes cursor initialization error:', error);
            }
          } else {
            console.error('Canvas dimensions invalid:', canvas.width, canvas.height);
          }
        `;
        document.body.appendChild(script);

        // Check for initialization
        const checkInterval = setInterval(() => {
          if ((window as any).tubesApp) {
            tubesAppRef.current = (window as any).tubesApp;
            clearInterval(checkInterval);
            canvas.style.setProperty('background', 'transparent', 'important');
            canvas.style.setProperty('background-color', 'transparent', 'important');
          }
        }, 100);

        // Cleanup check after 5 seconds
        setTimeout(() => clearInterval(checkInterval), 5000);
      } else {
        console.error('Canvas not ready, dimensions:', canvas.width, canvas.height);
      }
    });

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tubesAppRef.current) {
        tubesAppRef.current = null;
      }
    };
  }, []);

  return <canvas id="tubes-canvas" ref={canvasRef}></canvas>;
};

export default TubesCursor;
