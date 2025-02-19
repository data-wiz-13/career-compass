import { useEffect, useRef } from "react";
import * as THREE from "three";

export function CareerModel({ careers }: { careers: Array<{ title: string; confidence: number }> }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create career spheres
    const spheres = careers.map((career, index) => {
      const geometry = new THREE.SphereGeometry(career.confidence * 2, 32, 32);
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(index / careers.length, 0.8, 0.5),
      });
      const sphere = new THREE.Mesh(geometry, material);
      
      const angle = (index / careers.length) * Math.PI * 2;
      sphere.position.x = Math.cos(angle) * 5;
      sphere.position.z = Math.sin(angle) * 5;
      
      return sphere;
    });

    spheres.forEach(sphere => scene.add(sphere));

    // Add lights
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    camera.position.z = 10;

    // Animation
    function animate() {
      requestAnimationFrame(animate);
      spheres.forEach(sphere => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
      });
      renderer.render(scene, camera);
    }
    animate();

    return () => {
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [careers]);

  return <div ref={containerRef} className="w-full h-[400px]" />;
}
