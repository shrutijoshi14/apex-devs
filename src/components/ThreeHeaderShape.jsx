import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHeaderShape({ shape = 'icosahedron' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Dynamic color variables based on prop
    let activeColor = 0x8b5cf6; // Default purple
    if (shape === 'torusKnot') activeColor = 0x06b6d4; // Cyan
    if (shape === 'octahedron') activeColor = 0xec4899; // Pink
    if (shape === 'torus') activeColor = 0x10b981; // Green/Emerald
    if (shape === 'box') activeColor = 0xf59e0b; // Amber/Yellow
    if (shape === 'dodecahedron') activeColor = 0x8b5cf6; // Purple

    // Generate shape geometry
    let geometry;
    switch (shape) {
      case 'torusKnot':
        geometry = new THREE.TorusKnotGeometry(0.85, 0.24, 100, 16);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(1.2, 0);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(1.0, 0.3, 12, 48);
        break;
      case 'box':
        geometry = new THREE.BoxGeometry(1.2, 1.2, 1.2);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(1.15, 0);
        break;
      case 'icosahedron':
      default:
        geometry = new THREE.IcosahedronGeometry(1.2, 1);
        break;
    }

    // Material with wireframe mode
    const material = new THREE.MeshStandardMaterial({
      color: activeColor,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.65
    });

    const mesh = new THREE.Mesh(geometry, material);
    mainGroup.add(mesh);

    // Inner Solid Core
    const coreGeo = new THREE.SphereGeometry(0.25, 16, 16);
    const coreMat = new THREE.MeshBasicMaterial({
      color: activeColor,
      transparent: true,
      opacity: 0.8
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(core);

    // Orbiting Torus Ring
    const orbitRingGeo = new THREE.TorusGeometry(1.6, 0.012, 8, 80);
    const orbitRingMat = new THREE.MeshBasicMaterial({
      color: activeColor,
      transparent: true,
      opacity: 0.45
    });
    const orbitRing = new THREE.Mesh(orbitRingGeo, orbitRingMat);
    orbitRing.rotation.x = Math.PI / 3;
    orbitRing.rotation.y = Math.PI / 4;
    mainGroup.add(orbitRing);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(activeColor, 2.5, 8);
    pointLight.position.set(0, 0, 0);
    scene.add(pointLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(2, 4, 3);
    scene.add(directionalLight);

    // Parallax mouse variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      mouseX = x * 0.003;
      mouseY = y * 0.003;
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 300;
      const h = container.clientHeight || 300;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // Render loop
    const clock = new THREE.Clock();
    let animId;
    let currentTheme = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Theme logic
      const isLight = document.body.classList.contains('light-theme');
      const activeTheme = isLight ? 'light' : 'dark';
      if (activeTheme !== currentTheme) {
        currentTheme = activeTheme;
        if (isLight) {
          // Light theme color shift
          let lightColor = 0x6d28d9; // royal purple
          if (shape === 'torusKnot') lightColor = 0x0891b2; // darker cyan
          if (shape === 'octahedron') lightColor = 0xbe185d; // deep rose
          if (shape === 'torus') lightColor = 0x047857; // emerald
          if (shape === 'box') lightColor = 0xd97706; // amber
          if (shape === 'dodecahedron') lightColor = 0x6d28d9; // royal purple

          material.color.setHex(lightColor);
          material.metalness = 0.1;
          material.roughness = 0.4;
          material.opacity = 0.8;
          material.needsUpdate = true;

          coreMat.color.setHex(lightColor);
          coreMat.opacity = 0.9;
          coreMat.needsUpdate = true;

          orbitRingMat.color.setHex(lightColor);
          orbitRingMat.opacity = 0.7;
          orbitRingMat.needsUpdate = true;

          pointLight.color.setHex(lightColor);
          pointLight.intensity = 1.5;
        } else {
          // Dark theme original colors
          material.color.setHex(activeColor);
          material.metalness = 0.9;
          material.roughness = 0.1;
          material.opacity = 0.65;
          material.needsUpdate = true;

          coreMat.color.setHex(activeColor);
          coreMat.opacity = 0.8;
          coreMat.needsUpdate = true;

          orbitRingMat.color.setHex(activeColor);
          orbitRingMat.opacity = 0.45;
          orbitRingMat.needsUpdate = true;

          pointLight.color.setHex(activeColor);
          pointLight.intensity = 2.5;
        }
      }

      // Animating shapes
      mainGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.12;

      mesh.rotation.y = elapsedTime * 0.25;
      mesh.rotation.x = elapsedTime * 0.15;

      orbitRing.rotation.z = -elapsedTime * 0.4;
      orbitRing.rotation.x = Math.PI / 3 + Math.sin(elapsedTime * 0.5) * 0.1;

      // Mouse Parallax smooth interpolation
      targetX = mouseX;
      targetY = mouseY;
      mainGroup.rotation.y += (targetX - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetY - mainGroup.rotation.x) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      orbitRingGeo.dispose();
      orbitRingMat.dispose();
      renderer.dispose();
    };
  }, [shape]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '260px',
        position: 'relative',
        cursor: 'grab',
        zIndex: 5
      }}
    />
  );
}
