import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import './LoadingPage.css';

const LoadingPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer,
      scene: THREE.Scene,
      camera: THREE.OrthographicCamera;

    const Animation = {
      duration: 1.5,
      delay: 0.5,
      colors: {
        cube: 0xFFDA95, // Accurate PBR gold color
        plateform: 0x1a1a1a,
        background: 0x000000,
      },
    };

    const getDegree = (degree: number) => (degree * Math.PI) / 180;

    const init = () => {
      newScene();
      newLights();
      newPlateform();
      newCube();
      render();
    };

    const newScene = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      scene = new THREE.Scene();
      const factor = 130;
      const near = 1;
      const far = 10000;

      camera = new THREE.OrthographicCamera(
        windowWidth / -factor,
        windowWidth / factor,
        windowHeight / factor,
        windowHeight / -factor,
        near,
        far
      );
      camera.position.set(7, 5, 5);
      camera.lookAt(scene.position);

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setClearColor(new THREE.Color(Animation.colors.background), 1);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.setSize(windowWidth, windowHeight);
      renderer.domElement.style.display = 'block';
      containerRef.current?.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      const windowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.left = -window.innerWidth / factor;
        camera.right = window.innerWidth / factor;
        camera.top = window.innerHeight / factor;
        camera.bottom = -window.innerHeight / factor;
        camera.updateProjectionMatrix();
      };

      window.addEventListener('resize', windowResize, false);
    };

    const newLights = () => {
      // Ambient light for overall illumination
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
      scene.add(ambientLight);

      // Main directional light (sun-like) - stronger
      const mainLight = new THREE.DirectionalLight(0xffffff, 2.0);
      mainLight.position.set(5, 10, 7);
      mainLight.castShadow = true;
      scene.add(mainLight);

      // Warm fill light from the side with golden tint
      const fillLight = new THREE.DirectionalLight(0xffdd88, 1.0);
      fillLight.position.set(-5, 5, -5);
      scene.add(fillLight);

      // Rim light from behind for golden glow
      const rimLight = new THREE.DirectionalLight(0xffffaa, 1.2);
      rimLight.position.set(0, 3, -10);
      scene.add(rimLight);

      // Point light for extra sparkle on gold
      const pointLight = new THREE.PointLight(0xffffcc, 2, 50);
      pointLight.position.set(0, 5, 5);
      scene.add(pointLight);
      
      // Additional point light from below for golden reflection
      const bottomLight = new THREE.PointLight(0xffcc66, 1, 30);
      bottomLight.position.set(0, -2, 2);
      scene.add(bottomLight);
    };

    const newPlateform = () => {
      const plateformPosition = [
        [0, -1, 0.5],
        [0, -1, -0.5],
        [-1, -1, -0.5],
      ];

      plateformPosition.forEach((pos) => {
        const mesh = new THREE.Object3D();
        const geometry = new THREE.BoxGeometry(1, 0.2, 1);
        const material = new THREE.MeshLambertMaterial({ color: Animation.colors.plateform });
        const plateform = new THREE.Mesh(geometry, material);
        plateform.castShadow = true;
        mesh.add(plateform);
        mesh.position.set(pos[0], pos[1], pos[2]);
        scene.add(mesh);
      });
    };

    const newCube = () => {
      const mesh = new THREE.Object3D();
      
      // Create cube with slightly rounded edges
      const geometry = new THREE.BoxGeometry(1, 1, 1, 10, 10, 10);
      
      // Apply subtle edge rounding
      const positionAttribute = geometry.getAttribute('position');
      const vertex = new THREE.Vector3();
      const radius = 0.05;
      
      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        
        const absX = Math.abs(vertex.x);
        const absY = Math.abs(vertex.y);
        const absZ = Math.abs(vertex.z);
        
        if (absX > 0.45 && absY > 0.45 || absX > 0.45 && absZ > 0.45 || absY > 0.45 && absZ > 0.45) {
          const length = vertex.length();
          const factor = (0.5 - radius) + radius * (length / 0.866);
          vertex.normalize().multiplyScalar(factor);
        }
        
        positionAttribute.setXYZ(i, vertex.x, vertex.y, vertex.z);
      }
      
      geometry.computeVertexNormals();
      
      // Create environment map for realistic reflections
      const cubeTextureLoader = new THREE.CubeTextureLoader();
      const envMap = cubeTextureLoader.load([
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==',
      ]);
      
      // Realistic gold material with proper PBR values
      // Gold color: RGB(255, 218, 149) = #FFDA95
      const material = new THREE.MeshStandardMaterial({
        color: 0xFFDA95, // Accurate gold color from PBR reference
        metalness: 1.0, // Full metallic
        roughness: 0.2, // Slight roughness for realism
        emissive: 0xFFB347, // Warm golden glow
        emissiveIntensity: 0.15,
        envMap: envMap,
        envMapIntensity: 2.0, // Strong environment reflections
        transparent: true,
      });
      
      const cubeObj = new THREE.Mesh(geometry, material);
      cubeObj.castShadow = true;
      cubeObj.receiveShadow = true;
      mesh.add(cubeObj);
      scene.add(mesh);
      cubeObj.position.set(0, 2, 0.5);

      const tl = gsap.timeline({ repeat: -1, repeatDelay: Animation.delay });
      tl.set(cubeObj.material, { opacity: 0 });
      tl.to(cubeObj.position, { y: -0.4, duration: 0.8, ease: 'bounce.out' });
      tl.to(cubeObj.scale, { y: 1, duration: 0.8, ease: 'bounce.out' }, '-=0.8');
      tl.to(cubeObj.material, { opacity: 1, duration: 0.5 }, '-=0.8');
      tl.to(cubeObj.rotation, { x: getDegree(-90), duration: 0.8 }, '+=0.2');
      tl.to(cubeObj.position, { y: -0.2, duration: 0.3 }, '-=0.8');
      tl.to(cubeObj.position, { z: -0.5, duration: 0.8 }, '-=0.8');
      tl.to(cubeObj.position, { y: -0.4, duration: 0.3 }, '-=0.4');
      tl.to(cubeObj.rotation, { y: getDegree(-90), duration: 0.8 });
      tl.to(cubeObj.position, { y: -0.2, duration: 0.3 }, '-=0.8');
      tl.to(cubeObj.position, { x: -1, duration: 0.8 }, '-=0.8');
      tl.to(cubeObj.position, { y: -0.4, duration: 0.3 }, '-=0.4');
      tl.to(cubeObj.rotation, { x: 0, duration: 0.8, ease: 'power3.out' });
      tl.to(cubeObj.position, { z: 0.8, duration: 0.8, ease: 'power3.out' }, '-=0.8');
      tl.to(cubeObj.position, { y: -4, duration: 0.6, ease: 'power3.in' }, '-=0.80');
      tl.to(cubeObj.scale, { y: 1.5, duration: 0.8 }, '-=0.5');
      tl.to(cubeObj.material, { opacity: 0, duration: 0.25 }, '-=0.85');
      tl.timeScale(Animation.duration);
    };

    const render = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(render);
    };

    init();

    // Animate progress
    const progressTimeline = gsap.timeline();
    progressTimeline.to({}, {
      duration: 5,
      ease: 'linear',
      onUpdate: function() {
        const prog = this.progress() * 100;
        setProgress(Math.floor(prog));
      }
    });

    return () => {
      window.removeEventListener('resize', () => {});
      progressTimeline.kill();
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <div className="loading-page">
      <div ref={containerRef} className="canvas-container" />
      <div className="loading-percentage">{progress}%</div>
    </div>
  );
};

export default LoadingPage;
