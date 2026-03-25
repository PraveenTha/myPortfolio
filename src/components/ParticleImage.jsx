import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticleImage = () => {

  const mountRef = useRef(null);

  useEffect(() => {

    if (!mountRef.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    /* ===== PARTICLES ===== */
    const particlesCount =
      window.innerWidth < 768 ? 800 : 2000;

    const particlesGeometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: "#00ffff",
    });

    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );

    scene.add(particlesMesh);

    /* ===== RESIZE ===== */
    const handleResize = () => {

      if (!mountRef.current) return;

      camera.aspect =
        window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

    };

    window.addEventListener("resize", handleResize);

    /* ===== ANIMATION ===== */
    let animationId;

    const animate = () => {

      animationId = requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);

    };

    animate();

    /* ===== CLEANUP (FIXED) ===== */
    return () => {

      if (animationId) cancelAnimationFrame(animationId);

      window.removeEventListener("resize", handleResize);

      if (
        mountRef.current &&
        renderer.domElement &&
        mountRef.current.contains(renderer.domElement)
      ) {
        try {
          mountRef.current.removeChild(renderer.domElement);
        } catch (err) {
          console.log("Cleanup safe");
        }
      }

      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();

    };

  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
      }}
    />
  );

};

export default ParticleImage;
