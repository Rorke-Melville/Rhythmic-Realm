import React, { useEffect } from 'react';
import './CursorEffect.css';

function CursorEffect() {
  useEffect(() => {
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000']; // Magenta, Cyan, Yellow, Red
    let lastX = 0;
    let lastY = 0;

    const createTrail = (x, y) => {
      const trail = document.createElement('span');
      trail.className = 'trail';
      // Adjust for scroll position
      trail.style.left = `${x + window.scrollX}px`;
      trail.style.top = `${y + window.scrollY}px`;
      trail.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      document.body.appendChild(trail);

      setTimeout(() => {
        trail.remove();
      }, 500); // Fade out after 0.5s
    };

    const handleMouseMove = (e) => {
      if (Math.abs(e.clientX - lastX) > 5 || Math.abs(e.clientY - lastY) > 5) {
        createTrail(e.clientX, e.clientY);
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return null;
}

export default CursorEffect;