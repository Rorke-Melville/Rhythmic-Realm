import React, { useEffect, useRef } from 'react';
import './VolumeSimulator.css';

function VolumeSimulator() {
  const barsRef = useRef([]);
  const animationFrameRef = useRef();
  const targetsRef = useRef([]);
  const speedsRef = useRef([]);

  useEffect(() => {
    const bars = barsRef.current;

    // Initialize targets and speeds
    bars.forEach((bar, index) => {
      targetsRef.current[index] = {
        current: 2, // Starting height (2 squares)
        target: Math.random() * 8 + 2, // Random target (2-10 squares)
        time: 0, // Time since last target change
        changeInterval: Math.random() * 1000 + 1000, // 1-2s to change target
      };
      speedsRef.current[index] = Math.random() * 0.05 + 0.05; // Faster speed factor (0.02-0.05)
      updateSquares(bar, targetsRef.current[index].current);
    });

    const animateBars = (timestamp) => {
      bars.forEach((bar, index) => {
        const data = targetsRef.current[index];
        const speed = speedsRef.current[index];

        // Move current height towards target
        data.current += (data.target - data.current) * speed;
        const squareCount = Math.round(data.current); // Number of squares
        
        // Update squares in the bar
        updateSquares(bar, squareCount);

        // Update target randomly every 1-2s
        data.time += 16; // Approx 16ms per frame (60fps)
        if (data.time >= data.changeInterval) {
          data.target = Math.random() * 8 + 2; // New random height (2-10 squares)
          data.time = 0; // Reset timer
          data.changeInterval = Math.random() * 1000 + 1000; // New random interval
        }
      });

      animationFrameRef.current = requestAnimationFrame(animateBars);
    };

    // Start animation
    animationFrameRef.current = requestAnimationFrame(animateBars);

    return () => {
      cancelAnimationFrame(animationFrameRef.current); // Cleanup
    };
  }, []);

  // Function to update squares in a bar with gradient
  const updateSquares = (bar, squareCount) => {
    bar.innerHTML = ''; // Clear existing squares
    const maxSquares = 10; // Max possible squares (for gradient scaling)
    for (let i = 0; i < squareCount; i++) {
      const square = document.createElement('div');
      square.className = 'volume-square';
      
      // Calculate gradient color based on position (0 at bottom, 1 at top)
      const position = i / (maxSquares - 1); // Normalized position (0 to 1)
      const r = Math.round(0x00 + (0xff - 0x00) * position); // Red: 00 to ff
      const g = Math.round(0x80 + (0xcc - 0x80) * position); // Green: 80 to cc
      const b = Math.round(0x00 + (0x00 - 0x00) * position); // Blue: 00 to 00
      square.style.backgroundColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
      
      bar.appendChild(square);
    }
  };

  // 40 bars to span the width
  const barCount = 40;
  const bars = Array.from({ length: barCount }, (_, index) => (
    <div
      key={index}
      className="volume-bar"
      ref={(el) => (barsRef.current[index] = el)}
    ></div>
  ));

  return <div className="volume-simulator">{bars}</div>;
}

export default VolumeSimulator;