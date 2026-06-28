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
    camera.position.set(0, 0, 5.5);

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

    // 1. Central Glass Orb (Outer Sphere with refraction & transmission)
    const orbGeo = new THREE.SphereGeometry(0.85, 64, 64);
    const orbMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.05,
      metalness: 0.1,
      transmission: 0.9,      // Glass transmission
      ior: 1.48,              // Refractive Index of Glass
      thickness: 1.3,         // Refraction thickness
      clearcoat: 1.0,         // Extra reflective varnish layer
      clearcoatRoughness: 0.05,
      transparent: true,
      opacity: 0.95
    });
    const mainOrb = new THREE.Mesh(orbGeo, orbMat);
    portalGroup.add(mainOrb);

    // 2. Glowing Inner Core (Emits light from inside the glass orb)
    const coreGeo = new THREE.SphereGeometry(0.36, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: cyanColor,
      transparent: true,
      opacity: 0.85
    });
    const innerCore = new THREE.Mesh(coreGeo, coreMat);
    portalGroup.add(innerCore);

    // 3. Thin Orbiting Neon Rings
    const makeRing = (radius, tube, color, rx, ry, rz) => {
      const ringGeo = new THREE.TorusGeometry(radius, tube, 16, 120);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.5
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.set(rx, ry, rz);
      portalGroup.add(ring);
      return ring;
    };

    const ring1 = makeRing(1.35, 0.012, cyanColor, Math.PI / 2.5, 0, 0);
    const ring2 = makeRing(1.55, 0.012, purpleColor, -Math.PI / 3, Math.PI / 6, 0);

    // 4. Orbiting Satellites (Tiny neon balls traveling on the ring paths)
    const satGeo = new THREE.SphereGeometry(0.06, 16, 16);
    
    const satMat1 = new THREE.MeshBasicMaterial({ color: pinkColor });
    const sat1 = new THREE.Mesh(satGeo, satMat1);
    portalGroup.add(sat1);

    const satMat2 = new THREE.MeshBasicMaterial({ color: cyanColor });
    const sat2 = new THREE.Mesh(satGeo, satMat2);
    portalGroup.add(sat2);

    // 5. Grid Helpers for Depth Perception
    const darkGridHelper = new THREE.GridHelper(8, 24, 0x8b5cf6, 0x1e1b4b);
    darkGridHelper.position.y = -1.6;
    darkGridHelper.material.opacity = 0.35;
    darkGridHelper.material.transparent = true;
    scene.add(darkGridHelper);

    const lightGridHelper = new THREE.GridHelper(8, 24, 0x6d28d9, 0xcbd5e1);
    lightGridHelper.position.y = -1.6;
    lightGridHelper.material.opacity = 0.55;
    lightGridHelper.material.transparent = true;
    scene.add(lightGridHelper);

    // 6. Ripple Particle Galaxy (Waves of points spiraling outward)
    const particleCount = 380;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const particleData = [];

    const colorCyan = new THREE.Color(0x06b6d4);
    const colorPink = new THREE.Color(0xec4899);

    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 16; 
      const radius = 0.6 + (i / particleCount) * 2.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 0.25;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Color lerp based on radius
      const mixRatio = radius / 2.8;
      const c = colorCyan.clone().lerp(colorPink, mixRatio);
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      particleData.push({
        baseAngle: angle,
        radius: radius,
        speed: 0.15 + Math.random() * 0.25,
        yOffset: y
      });
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.NormalBlending
    });

    const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particleSystem);

    // 7. Lighting System (Required to bounce off the physical glass orb)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(cyanColor, 3, 10);
    cyanPointLight.position.set(0, 0, 0);
    scene.add(cyanPointLight);

    const pinkPointLight = new THREE.PointLight(pinkColor, 2.5, 8);
    pinkPointLight.position.set(2.5, 2, 2);
    scene.add(pinkPointLight);

    const purplePointLight = new THREE.PointLight(purpleColor, 2, 8);
    purplePointLight.position.set(-2.5, -2, -2);
    scene.add(purplePointLight);

    // 8. Interaction Parallax
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

    let scrollY = window.scrollY;
    let smoothedScrollY = window.scrollY;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    window.addEventListener('mousemove', handleMouseMove);
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

    // Clock
    const clock = new THREE.Clock();
    let animId;
    let currentTheme = null;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Theme configuration
      const isLight = document.body.classList.contains('light-theme');
      const activeTheme = isLight ? 'light' : 'dark';

      if (activeTheme !== currentTheme) {
        currentTheme = activeTheme;
        if (isLight) {
          // Light Mode Colors (Deep rich contrasts, less neon blending)
          coreMat.color.setHex(0x6d28d9); // Violet Core
          ring1.material.color.setHex(0x0891b2);
          ring2.material.color.setHex(0x6d28d9);
          satMat1.color.setHex(0xbe185d);
          satMat2.color.setHex(0x0891b2);

          orbMat.roughness = 0.04;
          orbMat.transmission = 0.95;
          orbMat.thickness = 1.6;
          orbMat.color.setHex(0xffffff);

          particleSystem.material.color.setHex(0x6d28d9); // Violet particles
          particleSystem.material.blending = THREE.NormalBlending;
          particleSystem.material.size = 0.045;
          particleSystem.material.opacity = 0.85;
          particleSystem.material.needsUpdate = true;

          cyanPointLight.color.setHex(0x0891b2);
          pinkPointLight.color.setHex(0xbe185d);
          purplePointLight.color.setHex(0x6d28d9);
          purplePointLight.intensity = 1.5;

          darkGridHelper.visible = false;
          lightGridHelper.visible = true;
        } else {
          // Dark Mode Colors (Neon glow, additive blending)
          coreMat.color.setHex(cyanColor); // Cyan Core
          ring1.material.color.setHex(cyanColor);
          ring2.material.color.setHex(purpleColor);
          satMat1.color.setHex(pinkColor);
          satMat2.color.setHex(cyanColor);

          orbMat.roughness = 0.08;
          orbMat.transmission = 0.88;
          orbMat.thickness = 1.1;
          orbMat.color.setHex(0xffffff);

          particleSystem.material.color.setHex(0xffffff); // Use original vertex mapping color
          particleSystem.material.blending = THREE.AdditiveBlending;
          particleSystem.material.size = 0.035;
          particleSystem.material.opacity = 0.65;
          particleSystem.material.needsUpdate = true;

          cyanPointLight.color.setHex(cyanColor);
          pinkPointLight.color.setHex(pinkColor);
          purplePointLight.color.setHex(purpleColor);
          purplePointLight.intensity = 3.0;

          darkGridHelper.visible = true;
          lightGridHelper.visible = false;
        }
      }

      // Smooth scroll interpolation
      smoothedScrollY += (scrollY - smoothedScrollY) * 0.085;

      // 1. Gently float the entire assembly and pull it down/back as page scrolls
      portalGroup.position.y = (Math.sin(elapsedTime * 1.2) * 0.12) - (smoothedScrollY * 0.0016);
      
      const scrollScale = Math.max(0.35, 1 - (smoothedScrollY * 0.0014));
      portalGroup.scale.set(scrollScale, scrollScale, scrollScale);
      portalGroup.position.z = -smoothedScrollY * 0.0035;

      // 2. Liquid scale morphing (Mercury bubble ripple effect)
      const scaleX = 1 + Math.sin(elapsedTime * 2.0) * 0.04;
      const scaleY = 1 + Math.cos(elapsedTime * 1.6) * 0.04;
      const scaleZ = 1 + Math.sin(elapsedTime * 1.8) * 0.04;
      mainOrb.scale.set(scaleX, scaleY, scaleZ);

      // Core scaling
      const innerScaleX = 1 + Math.cos(elapsedTime * 2.4) * 0.05;
      const innerScaleY = 1 + Math.sin(elapsedTime * 2.0) * 0.05;
      const innerScaleZ = 1 + Math.cos(elapsedTime * 1.8) * 0.05;
      innerCore.scale.set(innerScaleX, innerScaleY, innerScaleZ);

      // 3. Orbit Satellites
      const sat1Angle = elapsedTime * 1.1;
      sat1.position.x = Math.cos(sat1Angle) * 1.35;
      sat1.position.y = Math.sin(sat1Angle) * 1.35 * Math.cos(Math.PI / 2.5);
      sat1.position.z = Math.sin(sat1Angle) * 1.35 * Math.sin(Math.PI / 2.5);

      const sat2Angle = -elapsedTime * 0.8;
      sat2.position.x = Math.cos(sat2Angle) * 1.55;
      sat2.position.y = Math.sin(sat2Angle) * 1.55 * Math.cos(-Math.PI / 3);
      sat2.position.z = Math.sin(sat2Angle) * 1.55 * Math.sin(-Math.PI / 3);

      // Slow spin rings
      ring1.rotation.z = elapsedTime * 0.2;
      ring2.rotation.z = -elapsedTime * 0.15;

      // 4. Parallax & Inertia rotation
      if (!isDragging) {
        dragVelocity.x *= 0.94;
        dragVelocity.y *= 0.94;

        portalGroup.rotation.y += dragVelocity.x;
        portalGroup.rotation.x += dragVelocity.y;

        targetX = mouseX * 0.35;
        targetY = mouseY * 0.25;

        // Add scroll-dependent spin
        const scrollSpin = smoothedScrollY * 0.0016;
        portalGroup.rotation.y += (targetX + scrollSpin - portalGroup.rotation.y) * 0.05;
        portalGroup.rotation.x += (targetY - portalGroup.rotation.x) * 0.05;
      }

      // 5. Ripple Particle Wave updating
      const coords = particlesGeometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        particleData[i].baseAngle += 0.001 * particleData[i].speed;
        
        const x = Math.cos(particleData[i].baseAngle) * particleData[i].radius;
        const z = Math.sin(particleData[i].baseAngle) * particleData[i].radius;
        
        // Dynamic ripple calculations (sine waves traveling across radius)
        const y = particleData[i].yOffset + Math.sin(elapsedTime * 2.2 + particleData[i].radius * 4) * 0.08;

        coords[i * 3] = x;
        coords[i * 3 + 1] = y;
        coords[i * 3 + 2] = z;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Light pulsers
      cyanPointLight.intensity = (isLight ? 1.5 : 2.5) + Math.sin(elapsedTime * 3.5) * (isLight ? 0.25 : 0.4);
      pinkPointLight.intensity = (isLight ? 1.2 : 2.0) + Math.cos(elapsedTime * 2.8) * (isLight ? 0.2 : 0.35);

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
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

      orbGeo.dispose();
      orbMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
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
