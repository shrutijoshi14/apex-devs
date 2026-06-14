import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Main Portal Group
    const portalGroup = new THREE.Group();
    scene.add(portalGroup);

    // Color definitions
    const cyanColor = 0x06b6d4;
    const purpleColor = 0x8b5cf6;
    const pinkColor = 0xec4899;

    // 1. Core Sphere (Inner Solid Core)
    const coreGeo = new THREE.SphereGeometry(0.35, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      transparent: true,
      opacity: 0.95
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    portalGroup.add(innerCore);

    // 2. Middle Core (Wireframe Icosahedron)
    const midGeo = new THREE.IcosahedronGeometry(0.75, 1);
    const midMat = new THREE.MeshPhongMaterial({
      color: purpleColor,
      wireframe: true,
      transparent: true,
      opacity: 0.7,
      shininess: 100
    });
    const middleCore = new THREE.Mesh(midGeo, midMat);
    portalGroup.add(middleCore);

    // 3. Outer Core (Torus Knot Wireframe)
    const outerGeo = new THREE.TorusKnotGeometry(1.1, 0.16, 100, 8, 3, 5);
    const outerMat = new THREE.MeshStandardMaterial({
      color: pinkColor,
      wireframe: true,
      roughness: 0.1,
      metalness: 0.9,
      transparent: true,
      opacity: 0.4
    });
    const outerKnot = new THREE.Mesh(outerGeo, outerMat);
    portalGroup.add(outerKnot);

    // 4. Intersecting Orbital Rings
    const ringsGroup = new THREE.Group();
    portalGroup.add(ringsGroup);

    const makeRing = (radius, tube, color, opacity, rx, ry, rz) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 8, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: opacity
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(rx, ry, rz);
      ringsGroup.add(ring);
      return ring;
    };

    const orbitRing1 = makeRing(1.6, 0.015, cyanColor, 0.7, Math.PI / 2, 0, 0);
    const orbitRing2 = makeRing(1.9, 0.01, purpleColor, 0.5, 0, Math.PI / 4, 0);
    const orbitRing3 = makeRing(2.2, 0.008, pinkColor, 0.4, Math.PI / 4, -Math.PI / 4, 0);

    // 5. Grid Helpers for Dark and Light Themes
    const darkGridHelper = new THREE.GridHelper(8, 20, 0x8b5cf6, 0x1e1b4b);
    darkGridHelper.position.y = -1.6;
    darkGridHelper.material.opacity = 0.45;
    darkGridHelper.material.transparent = true;
    scene.add(darkGridHelper);

    const lightGridHelper = new THREE.GridHelper(8, 20, 0x6d28d9, 0xcbd5e1);
    lightGridHelper.position.y = -1.6;
    lightGridHelper.material.opacity = 0.7;
    lightGridHelper.material.transparent = true;
    scene.add(lightGridHelper);

    // 6. Upward Swirling Swarm Particles
    const particleCount = 280;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const particleData = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 2.2;
      const height = -1.6 + Math.random() * 3.5;
      const speed = 0.01 + Math.random() * 0.015;
      const swirlSpeed = 0.005 + Math.random() * 0.01;

      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      particleData.push({ angle, radius, speed, swirlSpeed });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: cyanColor,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // 7. Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(cyanColor, 3, 8);
    cyanPointLight.position.set(0, 0, 0);
    scene.add(cyanPointLight);

    const pinkPointLight = new THREE.PointLight(pinkColor, 2.5, 7);
    pinkPointLight.position.set(3, 2, 2);
    scene.add(pinkPointLight);

    const purplePointLight = new THREE.PointLight(purpleColor, 2, 7);
    purplePointLight.position.set(-3, -2, -2);
    scene.add(purplePointLight);

    // Interactive Drag and Mouse Parallax States
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragVelocity = { x: 0, y: 0 };

    const handleMouseMove = (event) => {
      if (isDragging) return;
      mouseX = (event.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      mouseY = (event.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };

    const handleDragStart = (e) => {
      isDragging = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handleDragMove = (e) => {
      if (!isDragging) return;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      
      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      dragVelocity.x = deltaX * 0.005;
      dragVelocity.y = deltaY * 0.005;

      portalGroup.rotation.y += dragVelocity.x;
      portalGroup.rotation.x += dragVelocity.y;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handleDragEnd = () => {
      isDragging = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Add drag listeners directly on the container to prevent global capture issues
    container.addEventListener('mousedown', handleDragStart);
    container.addEventListener('touchstart', handleDragStart, { passive: true });
    
    window.addEventListener('mousemove', handleDragMove);
    window.addEventListener('touchmove', handleDragMove, { passive: true });
    
    window.addEventListener('mouseup', handleDragEnd);
    window.addEventListener('touchend', handleDragEnd);

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Clock for Animation
    const clock = new THREE.Clock();
    let animId;
    let currentTheme = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Theme-aware color and blending updates
      const isLight = document.body.classList.contains('light-theme');
      const activeTheme = isLight ? 'light' : 'dark';
      if (activeTheme !== currentTheme) {
        currentTheme = activeTheme;
        if (isLight) {
          // Light theme color adaptations (high-contrast, rich colors)
          coreMat.color.setHex(0x0891b2); // Darker cyan
          midMat.color.setHex(0x6d28d9);  // Royal purple
          outerMat.color.setHex(0xbe185d); // Deep rose/pink
          
          // Switch standard material to non-muddy settings (avoid dark reflections in light mode)
          outerMat.metalness = 0.1;
          outerMat.roughness = 0.4;
          outerMat.opacity = 0.75;
          outerMat.needsUpdate = true;
          
          orbitRing1.material.color.setHex(0x0891b2);
          orbitRing2.material.color.setHex(0x6d28d9);
          orbitRing3.material.color.setHex(0xbe185d);
          
          particleSystem.material.color.setHex(0x4f46e5); // Deep indigo particles
          particleSystem.material.blending = THREE.NormalBlending;
          particleSystem.material.opacity = 0.9;
          particleSystem.material.size = 0.08; // Larger particles in light mode
          particleSystem.material.needsUpdate = true;
          
          cyanPointLight.color.setHex(0x0891b2);
          pinkPointLight.color.setHex(0xbe185d);
          purplePointLight.color.setHex(0x6d28d9);
          purplePointLight.intensity = 1.0;
          
          darkGridHelper.visible = false;
          lightGridHelper.visible = true;
        } else {
          // Dark theme color adaptations (original neon glow)
          coreMat.color.setHex(cyanColor);
          midMat.color.setHex(purpleColor);
          outerMat.color.setHex(pinkColor);
          
          // Switch standard material back to premium metallic settings
          outerMat.metalness = 0.9;
          outerMat.roughness = 0.1;
          outerMat.opacity = 0.4;
          outerMat.needsUpdate = true;
          
          orbitRing1.material.color.setHex(cyanColor);
          orbitRing2.material.color.setHex(purpleColor);
          orbitRing3.material.color.setHex(pinkColor);
          
          particleSystem.material.color.setHex(cyanColor);
          particleSystem.material.blending = THREE.AdditiveBlending;
          particleSystem.material.opacity = 0.65;
          particleSystem.material.size = 0.05; // Standard particles in dark mode
          particleSystem.material.needsUpdate = true;
          
          cyanPointLight.color.setHex(cyanColor);
          pinkPointLight.color.setHex(pinkColor);
          purplePointLight.color.setHex(purpleColor);
          purplePointLight.intensity = 2.0;
          
          darkGridHelper.visible = true;
          lightGridHelper.visible = false;
        }
      }

      // 1. Gentle floating animation
      portalGroup.position.y = Math.sin(elapsedTime * 1.5) * 0.15;

      // 2. Continuous rotation of different elements
      innerCore.rotation.z = -elapsedTime * 0.4;
      
      middleCore.rotation.y = elapsedTime * 0.25;
      middleCore.rotation.x = elapsedTime * 0.15;

      outerKnot.rotation.y = -elapsedTime * 0.15;
      outerKnot.rotation.z = elapsedTime * 0.1;

      // Rotate orbital rings around different axes
      orbitRing1.rotation.z = elapsedTime * 0.3;
      orbitRing2.rotation.z = -elapsedTime * 0.2;
      orbitRing3.rotation.z = elapsedTime * 0.45;

      // 3. Parallax and Inertia handling
      if (!isDragging) {
        // Slow down drag velocity (friction)
        dragVelocity.x *= 0.95;
        dragVelocity.y *= 0.95;

        portalGroup.rotation.y += dragVelocity.x;
        portalGroup.rotation.x += dragVelocity.y;

        // Apply mouse pointer parallax
        targetX = mouseX * 0.4;
        targetY = mouseY * 0.3;

        portalGroup.rotation.y += (targetX - portalGroup.rotation.y) * 0.05;
        portalGroup.rotation.x += (targetY - portalGroup.rotation.x) * 0.05;
      }

      // 4. Swirling Particle Conduit updates
      const particlePositions = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        // Spiral update
        particleData[i].angle += particleData[i].swirlSpeed;
        
        // Rise update
        particlePositions[i * 3 + 1] += particleData[i].speed;

        // Apply coordinate positions
        particlePositions[i * 3] = Math.cos(particleData[i].angle) * particleData[i].radius;
        particlePositions[i * 3 + 2] = Math.sin(particleData[i].angle) * particleData[i].radius;

        // Reset if height limit is crossed
        if (particlePositions[i * 3 + 1] > 2.0) {
          particlePositions[i * 3 + 1] = -1.6; // reset back to grid base
          particleData[i].angle = Math.random() * Math.PI * 2;
        }
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // 5. Pulsing glowing lighting effects
      cyanPointLight.intensity = (isLight ? 1.5 : 2.5) + Math.sin(elapsedTime * 4.0) * (isLight ? 0.3 : 0.5);
      pinkPointLight.intensity = (isLight ? 1.2 : 2.0) + Math.cos(elapsedTime * 3.0) * (isLight ? 0.25 : 0.4);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up WebGL resources
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mousedown', handleDragStart);
      container.removeEventListener('touchstart', handleDragStart);
      window.removeEventListener('mousemove', handleDragMove);
      window.removeEventListener('touchmove', handleDragMove);
      window.removeEventListener('mouseup', handleDragEnd);
      window.removeEventListener('touchend', handleDragEnd);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      coreMat.dispose();
      midGeo.dispose();
      midMat.dispose();
      outerGeo.dispose();
      outerMat.dispose();
      darkGridHelper.dispose();
      lightGridHelper.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        minHeight: '400px',
        cursor: 'grab'
      }}
    />
  );
}
