import React, { useState, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { Physics } from "@react-three/cannon";
import Clump, { ThemeProvider } from './components/Clump';
import Pointer from './components/Pointer';
import HeroSection from './components/HeroSection';
import layout from './data';
import ThemeToggleButton from './components/themetogglebutton';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/footer';
import AboutMeSection from './components/AboutMeSection';

const App = () => {
  const { canvas, balls } = layout;
  const clumpRef = useRef();
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="app-container" style={{ position: 'relative', width: '100%', minHeight: '200vh', overflow: 'hidden' }}>
      <ThemeToggleButton theme={theme} toggleTheme={toggleTheme} />
      {/* Canvas container - full screen */}
      <div className="canvas-container" style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0 }}>
        <ThemeProvider initialMode={theme}>
          <Canvas 
            shadows 
            gl={{ antialias: true }} 
            dpr={[1, 1.5]} 
            camera={canvas.camera}
            style={{ background: theme === 'light' ? canvas.background : '#121212' }}
          >
            <ambientLight 
              intensity={theme === 'light' 
                ? canvas.lighting.ambient.intensity 
                : canvas.lighting.ambient.intensity * 0.7} 
            />
            <spotLight 
              intensity={theme === 'light' 
                ? canvas.lighting.spot.intensity 
                : canvas.lighting.spot.intensity * 0.8} 
              angle={canvas.lighting.spot.angle} 
              penumbra={canvas.lighting.spot.penumbra} 
              position={canvas.lighting.spot.position} 
              castShadow 
              shadow-mapSize={canvas.lighting.spot.shadowMapSize} 
            />
            <Physics 
              gravity={canvas.physics.gravity} 
              iterations={canvas.physics.iterations}
            >
              <Pointer />
              <Clump 
                ref={clumpRef}
                count={balls.count}
                size={balls.size}
                forceMultiplier={balls.forceMultiplier}
                initialSpread={balls.initialSpread}
              />
            </Physics>
            <Environment files={"/adamsbridge.hdr"} />
          </Canvas>
        </ThemeProvider>
      </div>
    
          <HeroSection theme={theme} />
          <AboutMeSection theme={theme} />
          <ProjectsSection theme={theme} />
          <Footer theme={theme} />
      </div>

  );
};

export default App;