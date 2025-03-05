import React, { useState } from 'react';
import './Navbar.css';
import logo from '../assets/logo.jpeg';

function Navbar({ isVisible, toggleOffcanvas }) {
  const [isRotated, setIsRotated] = useState(false);

  const handleLogoClick = () => {
    console.log('Logo clicked, isRotated:', !isRotated);
    setIsRotated((prev) => !prev);
    if (toggleOffcanvas) {
      console.log('Triggering toggleOffcanvas');
      toggleOffcanvas();
    }
  };

  return (
    <nav className={`custom-navbar ${isVisible ? 'visible' : 'hidden'}`}>
      <div className="custom-navbar-brand">
        <img
          src={logo}
          alt="Rhythmic Realm Logo"
          className={isRotated ? 'rotated' : ''}
          onClick={handleLogoClick}
        />
      </div>
      <h2>Rhythmic Realm</h2>
    </nav>
  );
}

export default Navbar;