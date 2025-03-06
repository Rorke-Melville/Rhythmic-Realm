import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import './ClubRecommendations.css';

function ClubRecommendations() {
  const mountRef = useRef(null);
  const [hoveredClub, setHoveredClub] = useState(null);
  const [selectedClub, setSelectedClub] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const clubs = [
    { id: 1, name: 'Berghain', city: 'Berlin', country: 'Germany', lat: 52.5100, lon: 13.4370, vibe: 'Industrial Techno', djs: 'Ben Klock, Marcel Dettmann' },
    { id: 2, name: 'Fabric', city: 'London', country: 'UK', lat: 51.5194, lon: -0.1030, vibe: 'Drum & Bass', djs: 'Andy C, Goldie' },
    { id: 3, name: 'Amnesia', city: 'Ibiza', country: 'Spain', lat: 38.9477, lon: 1.4478, vibe: 'Trance', djs: 'Armin van Buuren, Paul van Dyk' },
    { id: 4, name: 'Output', city: 'New York', country: 'USA', lat: 40.7230, lon: -73.9870, vibe: 'House', djs: 'The Martinez Brothers, Dennis Ferrer' },
    { id: 5, name: 'Womb', city: 'Tokyo', country: 'Japan', lat: 35.6710, lon: 139.7080, vibe: 'Techno', djs: 'Jeff Mills, Ken Ishii' },
    { id: 6, name: 'Space', city: 'Miami', country: 'USA', lat: 25.7650, lon: -80.1930, vibe: 'Tech House', djs: 'Jamie Jones, Loco Dice' },
    { id: 7, name: 'AM Local', city: 'Mexico City', country: 'Mexico', lat: 19.4326, lon: -99.1332, vibe: 'House/Techno', djs: 'Local DJs, International Guests' },
    { id: 8, name: 'Mandala', city: 'Playa del Carmen', country: 'Mexico', lat: 20.6296, lon: -87.0739, vibe: 'EDM', djs: 'Rotating EDM Stars' },
    { id: 9, name: 'Truth', city: 'Johannesburg', country: 'South Africa', lat: -26.2041, lon: 28.0473, vibe: 'Techno/House', djs: 'Black Coffee, Culoe De Song' },
    { id: 10, name: 'Shimmy Beach Club', city: 'Cape Town', country: 'South Africa', lat: -33.9258, lon: 18.4241, vibe: 'House', djs: 'Kid Fonque, Local Acts' },
    { id: 11, name: 'Bassiani', city: 'Tbilisi', country: 'Georgia', lat: 41.6941, lon: 44.8000, vibe: 'Techno', djs: 'Hector Oaks, Naja Orashvili' },
    { id: 12, name: 'Revolver Upstairs', city: 'Melbourne', country: 'Australia', lat: -37.8136, lon: 144.9631, vibe: 'Techno/House', djs: 'Richie Hawtin, Local Talents' },
    { id: 13, name: 'Chinese Laundry', city: 'Sydney', country: 'Australia', lat: -33.8688, lon: 151.2093, vibe: 'EDM/Bass', djs: 'Flume, Alison Wonderland' },
    { id: 14, name: 'Octagon', city: 'Seoul', country: 'South Korea', lat: 37.5665, lon: 126.9751, vibe: 'EDM', djs: 'Martin Garrix, Zedd' },
    { id: 15, name: 'Club Made', city: 'Seoul', country: 'South Korea', lat: 37.5410, lon: 127.0020, vibe: 'House/Techno', djs: 'Local EDM Acts' },
    { id: 16, name: 'Green Valley', city: 'Camboriú', country: 'Brazil', lat: -27.0250, lon: -48.6540, vibe: 'EDM/Trance', djs: 'Alesso, Above & Beyond' },
    { id: 17, name: 'Trouw', city: 'Amsterdam', country: 'Netherlands', lat: 52.3676, lon: 4.9041, vibe: 'Techno', djs: 'Tale of Us, Adam Beyer' },
    { id: 18, name: 'Pacha', city: 'Barcelona', country: 'Spain', lat: 41.3851, lon: 2.1734, vibe: 'House/EDM', djs: 'David Guetta, Solomun' },
  ];

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Globe with dark grey color (#333333)
    const geometry = new THREE.SphereGeometry(5, 64, 64);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/earth-outline.png');
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      color: 0x333333, // Dark grey
      specular: 0x555555,
      shininess: 10,
      transparent: false,
      opacity: 1,
    });
    const globe = new THREE.Mesh(geometry, material);
    globe.rotation.y = 0;
    globe.rotation.x = 0; // Equator centered
    scene.add(globe);

    // Deep purple wireframe overlay (#620075)
    const wireframeGeometry = new THREE.SphereGeometry(5.01, 32, 32);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x620075, // Deep purple
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    globe.add(wireframe);

    // Neon red glowing border (#ff0000)
    const glowTextureLoader = new THREE.TextureLoader();
    let glowTexture;
    try {
      glowTexture = glowTextureLoader.load('/glow-ring.png');
    } catch (error) {
      console.error('Failed to load glow-ring.png:', error);
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
      gradient.addColorStop(0, '#ff0000');
      gradient.addColorStop(1, 'transparent');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 128, 128);
      glowTexture = new THREE.CanvasTexture(canvas);
    }
    glowTexture.colorSpace = THREE.SRGBColorSpace;
    const glowMaterial = new THREE.SpriteMaterial({
      map: glowTexture,
      color: 0xff0000, // Neon red
      transparent: true,
      opacity: 0.8,
    });
    const glowSprite = new THREE.Sprite(glowMaterial);
    glowSprite.scale.set(12, 12, 1); // Slightly larger than globe
    glowSprite.position.set(0, 0, 0);
    scene.add(glowSprite);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 15);
    scene.add(pointLight);

    // Markers as Font Awesome fa-monument sprite
    const markerTextureLoader = new THREE.TextureLoader();
    const markerTexture = markerTextureLoader.load('./flag-solid.png');
    markerTexture.colorSpace = THREE.SRGBColorSpace;
    const markerMaterial = new THREE.SpriteMaterial({ map: markerTexture, color: 0xff0000 });
    const markers = clubs.map(club => {
      const marker = new THREE.Sprite(markerMaterial);
      const { x, y, z } = latLonToVector3(club.lat, club.lon, 5.1);
      marker.position.set(x, y, z);
      marker.scale.set(0.3, 0.4, 0.4);
      marker.userData = club;
      globe.add(marker);
      return marker;
    });

    camera.position.z = 10;

    // Auto-rotation
    const rotationSpeed = 0.002;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      if (!isDragging && !isHovered) {
        globe.rotation.y += rotationSpeed;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Mouse interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const updateRaycaster = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
    };

    const onMouseMove = (event) => {
      updateRaycaster(event);
      const intersects = raycaster.intersectObjects(markers);
      if (intersects.length > 0) {
        setHoveredClub(intersects[0].object.userData);
      } else {
        setHoveredClub(null);
      }
    };

    const onMouseEnter = () => {
      setIsHovered(true);
    };

    const onMouseLeave = () => {
      setIsHovered(false);
      setHoveredClub(null);
    };

    const onMouseDown = (event) => {
      isDragging = true;
      previousMouseX = event.clientX;
      previousMouseY = event.clientY;
    };

    const onMouseMoveDrag = (event) => {
      if (isDragging) {
        const deltaX = event.clientX - previousMouseX;
        const deltaY = event.clientY - previousMouseY;
        globe.rotation.y += deltaX * 0.005;
        globe.rotation.x += deltaY * 0.005;
        previousMouseX = event.clientX;
        previousMouseY = event.clientY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onClick = (event) => {
      updateRaycaster(event);
      const intersects = raycaster.intersectObjects(markers);
      if (intersects.length > 0) {
        setSelectedClub(intersects[0].object.userData);
      }
    };

    renderer.domElement.addEventListener('mousemove', onMouseMove);
    renderer.domElement.addEventListener('mouseenter', onMouseEnter);
    renderer.domElement.addEventListener('mouseleave', onMouseLeave);
    renderer.domElement.addEventListener('mousedown', onMouseDown);
    renderer.domElement.addEventListener('mousemove', onMouseMoveDrag);
    renderer.domElement.addEventListener('mouseup', onMouseUp);
    renderer.domElement.addEventListener('click', onClick);

    return () => {
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.domElement.removeEventListener('mouseenter', onMouseEnter);
      renderer.domElement.removeEventListener('mouseleave', onMouseLeave);
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      renderer.domElement.removeEventListener('mousemove', onMouseMoveDrag);
      renderer.domElement.removeEventListener('mouseup', onMouseUp);
      renderer.domElement.removeEventListener('click', onClick);
      if (mountRef.current && renderer.domElement.parentNode) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const latLonToVector3 = (lat, lon, radius) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);
    return { x, y, z };
  };

  return (
    <section className="club-recommendations" id="club-recommendations">
      <h2 className="club-title">The Nightlife Navigator</h2>
      <div ref={mountRef} className="globe-container" />
      {hoveredClub && (
        <div className="club-tooltip" style={{ top: '50px', left: '50px' }}>
          <h3>{hoveredClub.name}</h3>
          <p>{hoveredClub.city}, {hoveredClub.country}</p>
        </div>
      )}
      {selectedClub && (
        <div className="club-overlay" onClick={() => setSelectedClub(null)}>
          <div className="club-details">
            <h3>{selectedClub.name}</h3>
            <p><strong>Location:</strong> {selectedClub.city}, {selectedClub.country}</p>
            <p><strong>Vibe:</strong> {selectedClub.vibe}</p>
            <p><strong>Notable DJs:</strong> {selectedClub.djs}</p>
            <button onClick={() => setSelectedClub(null)}>Close</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default ClubRecommendations;