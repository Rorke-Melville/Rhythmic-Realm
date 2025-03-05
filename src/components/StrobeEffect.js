import React, { useEffect } from 'react';
import './StrobeEffect.css';

function StrobeEffect() {
  useEffect(() => {
    const heroSection = document.querySelector('.hero-section');
    const colors = ['#ff00ff', '#00ffff', '#ffff00', '#ff0000', '#ffffff']; // Magenta, Cyan, Yellow, Red, White

    // Outlined shapes (no fill, just border)
    const outlineShapes = [
      'polygon(50% 0%, 0% 100%, 100% 100%)', // Outlined triangle
      'polygon(0 0, 100% 0, 100% 100%, 0 100%)', // Outlined rectangle
      'circle(50% at 50% 50%)', // Outlined circle
      'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', // Outlined star
      'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)', // Outlined trapezoid
      'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)', // Outlined pentagon
      'polygon(0% 0%, 40% 0%, 20% 40%, 60% 40%, 30% 100%, 0% 100%)', // Outlined lightning bolt
      'ellipse(50% 30% at 50% 50%)', // Outlined oval
      'polygon(0% 0%, 100% 0%, 75% 100%, 25% 25%, 50% 75%)', // Outlined spiral approximation
      'polygon(0 0, 100% 0, 100% 5%, 0 5%)', // Thinner, longer horizontal line
      'polygon(0 0, 5% 0, 5% 100%, 0 100%)', // Thinner, longer vertical line
    ];

    const createFlash = () => {
      const flash = document.createElement('div');
      flash.className = 'strobe-flash';

      // Get hero section dimensions
      const heroWidth = heroSection.offsetWidth;
      const heroHeight = heroSection.offsetHeight;

      // Random size
      let width = Math.random() * 300 + 50; // 50-350px
      let height = Math.random() * 200 + 50; // 50-250px

      // Randomly choose an outlined shape
      const randomShape = outlineShapes[Math.floor(Math.random() * outlineShapes.length)];

      // Adjust size for lines
      if (randomShape === outlineShapes[9]) { // Horizontal line
        width = Math.min(Math.random() * 600 + 200, heroWidth);
        height = 20;
      } else if (randomShape === outlineShapes[10]) { // Vertical line
        width = 20;
        height = Math.min(Math.random() * 600 + 200, heroHeight);
      } else {
        width = Math.min(width, heroWidth);
        height = Math.min(height, heroHeight);
      }

      // Random position within hero section bounds
      const left = Math.random() * (heroWidth - width);
      const top = Math.random() * (heroHeight - height);

      // Random color and duration
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const flashDuration = Math.random() * 0.3 + 0.1; // 100-400ms

      flash.style.width = `${width}px`;
      flash.style.height = `${height}px`;
      flash.style.left = `${left}px`;
      flash.style.top = `${top}px`;
      flash.style.clipPath = randomShape;
      flash.style.border = `3px solid ${randomColor}`; // Always outlined
      flash.style.backgroundColor = 'transparent'; // No fill

      heroSection.appendChild(flash);

      // Animate flash
      setTimeout(() => {
        flash.style.opacity = '0';
        setTimeout(() => {
          flash.remove();
        }, 300); // Remove after fade-out
      }, flashDuration * 1000);

      // Schedule next flash
      const delay = Math.random() * 2000 + 500; // 0.5-2.5s delay
      setTimeout(createFlash, delay);
    };

    // Start with multiple flashes
    for (let i = 0; i < 3; i++) {
      setTimeout(createFlash, Math.random() * 1000); // Initial staggered start
    }
  }, []);

  return null;
}

export default StrobeEffect;