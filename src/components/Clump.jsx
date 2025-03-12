import * as React from 'react';
import * as THREE from 'three';
import { useSphere } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

// Create a theme context
const ThemeContext = React.createContext({ 
  mode: 'light',
  toggleTheme: () => {} 
});

export const ThemeProvider = ({ children, initialMode = 'light' }) => {
  const [mode, setMode] = React.useState(initialMode);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  
  React.useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);
  
  const toggleTheme = React.useCallback(() => {
    setIsTransitioning(true);
    setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    
    // Increase timeout to ensure physics engine has time to initialize
    const timeoutId = setTimeout(() => {
      setIsTransitioning(false);
    }, 200);
    
    return () => clearTimeout(timeoutId);
  }, []);

  const value = React.useMemo(() => ({
    mode,
    toggleTheme,
    isTransitioning
  }), [mode, toggleTheme, isTransitioning]);
  
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to use theme
export const useTheme = () => React.useContext(ThemeContext);

const rfs = THREE.MathUtils.randFloatSpread;
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);

const Clump = React.forwardRef(({ 
  mat = new THREE.Matrix4(), 
  vec = new THREE.Vector3(), 
  count = 40,
  size = 1,
  forceMultiplier = -40,
  initialSpread = 20,
  textureUrl = "./cross.jpg",
  config,
  ...props 
}, forwardedRef) => {
  const { viewport } = useThree();
  const { width } = viewport;
  const { mode, isTransitioning } = useTheme();
  
  // Configuration
  const effectiveCount = config?.count || count;
  const effectiveSize = config?.size || size;
  const effectiveForceMultiplier = config?.forceMultiplier || forceMultiplier;
  const effectiveInitialSpread = config?.initialSpread || initialSpread;
  
  const responsiveCount = React.useMemo(() => {
    if (width < 5) return Math.floor(effectiveCount * 0.5);
    if (width < 10) return Math.floor(effectiveCount * 0.75);
    return effectiveCount;
  }, [width, effectiveCount]);
  
  const responsiveForce = React.useMemo(() => {
    return effectiveForceMultiplier * (width < 5 ? 0.7 : 1);
  }, [width, effectiveForceMultiplier]);
  
  const material = React.useMemo(() => {
    return new THREE.MeshStandardMaterial({ 
      color: mode === 'light' ? "white" : "#FFD700", // Gold color in dark mode
      roughness: mode === 'light' ? 0 : 0.001, // Lower roughness for metallic shine
      metalness: mode === 'light' ? 0.1 : 0.5, // Full metalness for gold
      envMapIntensity: mode === 'light' ? 1 : 0.2,
      // Add these properties for better gold appearance
      emissive: mode === 'light' ? "#000000" : "#FFB000",
      emissiveIntensity: mode === 'light' ? 0 : 0.2
    });
  }, [mode]);
  const texture = useTexture(textureUrl);
  
  // Initialize physics with key to force recreation on theme change
  const [meshRef, api] = useSphere(() => ({ 
    args: [effectiveSize], 
    mass: 1, 
    angularDamping: 0.1, 
    linearDamping: 0.65,
    position: [
      rfs(effectiveInitialSpread), 
      rfs(effectiveInitialSpread), 
      rfs(effectiveInitialSpread)
    ] 
  }), undefined, [mode]); // Add mode as dependency to recreate physics on theme change

  // Store API reference
  const apiRef = React.useRef();
  const isPhysicsReady = React.useRef(false);

  React.useEffect(() => {
    if (api) {
      apiRef.current = api;
      isPhysicsReady.current = true;
    }
    return () => {
      isPhysicsReady.current = false;
    };
  }, [api]);

  // Animation frame with safety checks
  useFrame((state) => {
    if (!meshRef.current || !isPhysicsReady.current || isTransitioning) return;

    for (let i = 0; i < responsiveCount; i++) {
      try {
        // Get current matrix
        meshRef.current.getMatrixAt(i, mat);
        
        // Safely get physics API
        const ballApi = apiRef.current?.at?.(i);
        if (!ballApi || typeof ballApi.applyForce !== 'function') continue;

        // Calculate force
        const force = vec
          .setFromMatrixPosition(mat)
          .normalize()
          .multiplyScalar(responsiveForce)
          .toArray();

        // Apply force with safety check
        if (Array.isArray(force) && force.length === 3) {
          ballApi.applyForce(force, [0, 0, 0]);
        }
      } catch (error) {
        // Silent fail for animation frame errors
      }
    }
  });

  // External control API with safety checks
  const updateBall = React.useCallback((id, updates) => {
    if (!isPhysicsReady.current || isTransitioning || id < 0 || id >= responsiveCount) return;

    try {
      const ballApi = apiRef.current?.at?.(id);
      if (!ballApi) return;

      if (updates.position && Array.isArray(updates.position) && updates.position.length === 3) {
        ballApi.position?.set(...updates.position);
      }
      if (updates.velocity && Array.isArray(updates.velocity) && updates.velocity.length === 3) {
        ballApi.velocity?.set(...updates.velocity);
      }
      if (updates.angularVelocity && Array.isArray(updates.angularVelocity) && updates.angularVelocity.length === 3) {
        ballApi.angularVelocity?.set(...updates.angularVelocity);
      }
    } catch (error) {
      console.warn(`Error updating ball ${id}:`, error);
    }
  }, [responsiveCount, isTransitioning]);

  React.useImperativeHandle(forwardedRef, () => ({
    updateBall
  }), [updateBall]);

  return (
    <instancedMesh 
      ref={meshRef} 
      castShadow 
      receiveShadow 
      args={[sphereGeometry, material, responsiveCount]} 
      material-map={texture}
    />
  );
});

export default Clump;