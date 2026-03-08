import { useEffect, useRef } from "react";
import * as THREE from "three";

const ParticleImage = () => {
  const mountRef = useRef(null);

  useEffect(() => {

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    camera.position.z = 300;

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    const img = new Image();
    img.src = "/images/profile.jpg"; // 👈 apni image

    img.onload = () => {

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0,0,img.width,img.height);

      const particles = [];

      for(let y = 0; y < img.height; y += 4){
        for(let x = 0; x < img.width; x += 4){

          const index = (y * img.width + x) * 4;
          const brightness = imageData.data[index];

          if(brightness < 200){

            particles.push(
              x - img.width / 2,
              -y + img.height / 2,
              0
            );

          }

        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(particles,3)
      );

      const material = new THREE.PointsMaterial({
        color:0xffffff,
        size:1
      });

      const points = new THREE.Points(geometry,material);
      scene.add(points);

    };

    const animate = () => {

      requestAnimationFrame(animate);

      scene.rotation.y += 0.002;

      renderer.render(scene,camera);

    };

    animate();

  }, []);

  return <div ref={mountRef}></div>;

};

export default ParticleImage;