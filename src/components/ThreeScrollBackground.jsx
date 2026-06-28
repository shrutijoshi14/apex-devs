import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeScrollBackground() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Colors
    const colors = {
      purpleDark: 0x8b5cf6,
      purpleLight: 0x6d28d9,
      cyanDark: 0x06b6d4,
      cyanLight: 0x0891b2,
      pinkDark: 0xec4899,
      pinkLight: 0xdb2777
    };

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(colors.purpleDark, 3, 15);
    pointLight1.position.set(3, 3, 2);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(colors.cyanDark, 2.5, 15);
    pointLight2.position.set(-3, -3, 2);
    scene.add(pointLight2);


    // ==========================================
    // Background Particles
    // ==========================================
    const particleCount = 200;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const initialPositions = [];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 16;
      const y = (Math.random() - 0.5) * 24;
      const z = (Math.random() - 0.5) * 8 - 3;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      initialPositions.push({ x, y, z, speed: 0.12 + Math.random() * 0.38 });
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.042,
      color: colors.cyanDark,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // Floating Geometries (Scenic landscape nodes)
    const shapesGroup = new THREE.Group();
    scene.add(shapesGroup);

    const shapes = [];
    const addWireframeShape = (geom, color, x, y, z, rotationSpeed) => {
      const mat = new THREE.MeshStandardMaterial({
        color: color,
        wireframe: true,
        transparent: true,
        opacity: 0.18, // Subtler to keep clone prominent
        roughness: 0.2,
        metalness: 0.8
      });
      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(x, y, z);
      shapesGroup.add(mesh);
      shapes.push({ mesh, material: mat, rotationSpeed, baseColor: color });
    };

    // Keep nodes but scatter them wider out to frame the clone
    addWireframeShape(new THREE.IcosahedronGeometry(0.7, 1), colors.purpleDark, -3.2, 2.5, -2, { x: 0.15, y: 0.1, z: 0.05 });
    addWireframeShape(new THREE.TorusGeometry(0.65, 0.2, 8, 28), colors.cyanDark, 3.4, -3.0, -3.5, { x: 0.05, y: 0.2, z: 0.1 });
    addWireframeShape(new THREE.DodecahedronGeometry(0.6, 0), colors.pinkDark, -3.2, -7.5, -4, { x: 0.2, y: 0.08, z: 0.15 });

    // State variables
    let scrollY = window.scrollY;
    let smoothedScrollY = window.scrollY;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;



    // Track scroll
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Track mouse
    const handleMouseMove = (e) => {
      targetMouseX = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      targetMouseY = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Clock
    const clock = new THREE.Clock();
    let animId;
    let currentTheme = null;

    // Rendering loop
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Theme validation & dynamic mesh adjustment
      const isLight = document.body.classList.contains('light-theme');
      const activeTheme = isLight ? 'light' : 'dark';

      if (activeTheme !== currentTheme) {
        currentTheme = activeTheme;
        if (isLight) {
          // Light theme shifts
          particlesMat.color.setHex(colors.purpleLight);
          particlesMat.opacity = 0.3;
          particlesMat.blending = THREE.NormalBlending;
          particlesMat.needsUpdate = true;



          pointLight1.color.setHex(colors.purpleLight);
          pointLight2.color.setHex(colors.cyanLight);

          shapes.forEach((s) => {
            let lightColor = colors.purpleLight;
            if (s.baseColor === colors.cyanDark) lightColor = colors.cyanLight;
            if (s.baseColor === colors.pinkDark) lightColor = colors.pinkLight;
            s.material.color.setHex(lightColor);
            s.material.opacity = 0.3;
            s.material.needsUpdate = true;
          });
        } else {
          // Dark theme shifts
          particlesMat.color.setHex(colors.cyanDark);
          particlesMat.opacity = 0.4;
          particlesMat.blending = THREE.AdditiveBlending;
          particlesMat.needsUpdate = true;



          pointLight1.color.setHex(colors.purpleDark);
          pointLight2.color.setHex(colors.cyanDark);

          shapes.forEach((s) => {
            s.material.color.setHex(s.baseColor);
            s.material.opacity = 0.18;
            s.material.needsUpdate = true;
          });
        }
      }

      // Smooth scroll interpolation
      smoothedScrollY += (scrollY - smoothedScrollY) * 0.085;

      // Scroll velocity
      scrollVelocity = scrollY - lastScrollY;
      lastScrollY = scrollY;
      
      // Decay velocity for smooth recovery
      const warpFactor = Math.min(1.8, Math.abs(scrollVelocity) * 0.04);

      // Smooth mouse parallax interpolation
      mouseX += (targetMouseX - mouseX) * 0.055;
      mouseY += (targetMouseY - mouseY) * 0.055;

      // 1. Move camera down as page scrolls
      const scrollUnitY = -smoothedScrollY * 0.0038;
      camera.position.y = scrollUnitY;
      camera.position.x = mouseX * 0.8;
      camera.rotation.x = -mouseY * 0.05 + (scrollUnitY * 0.015);
      camera.rotation.y = -mouseX * 0.05;



      // Move scenic lights to highlight shapes
      pointLight1.position.y = camera.position.y + 2.5;
      pointLight2.position.y = camera.position.y - 2.5;

      // ==========================================
      // Shapes & Particles Animation
      // ==========================================
      shapes.forEach((s) => {
        s.mesh.rotation.x = elapsedTime * s.rotationSpeed.x;
        s.mesh.rotation.y = elapsedTime * s.rotationSpeed.y;
        s.mesh.rotation.z = elapsedTime * s.rotationSpeed.z;
        s.mesh.rotation.y += scrollVelocity * 0.0008;
      });

      // Warp trail particles
      const coords = particlesGeo.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const base = initialPositions[i];
        
        base.y -= 0.002 * base.speed;
        if (base.y < -12) base.y = 12;

        const warpStretch = scrollVelocity * 0.002 * base.speed;
        
        coords[i * 3] = base.x + (mouseX * 0.2 * base.speed);
        coords[i * 3 + 1] = base.y + warpStretch;
        coords[i * 3 + 2] = base.z;
      }
      particlesGeo.attributes.position.needsUpdate = true;
      particleSystem.rotation.y = elapsedTime * 0.012;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      shapes.forEach((s) => {
        s.mesh.geometry.dispose();
        s.material.dispose();
      });


      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="animated-gradient-bg"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      <div className="bg-blob blob-purple" />
      <div className="bg-blob blob-cyan" />
      <div className="bg-blob blob-pink" />
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
}
