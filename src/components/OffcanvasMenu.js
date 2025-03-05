import React, { forwardRef } from 'react';
import './OffcanvasMenu.css';

// Use forwardRef to pass the ref from App.js
const OffcanvasMenu = forwardRef(({ toggleOffcanvas }, ref) => {
  return (
    <div
      className="offcanvas offcanvas-start"
      data-bs-scroll="true"
      data-bs-backdrop="false"
      tabIndex="-1"
      id="offcanvas"
      aria-labelledby="offcanvas"
      ref={ref}
    >
      <div className="offcanvas-header">
        <h4 className="offcanvas-title" id="offcanvas">Menu</h4>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav flex-column">
          <div className="offcanvas-li">
            <li><a className="dropdown-item" href="#recommended-songs" onClick={toggleOffcanvas}>Melodies That Move The Room</a></li>
          </div>
          <div className="offcanvas-li">
            <li><a className="dropdown-item" href="#festival-recommendations" onClick={toggleOffcanvas}>Curated Festival Haven</a></li>
          </div>
          <div className="offcanvas-li">
            <li><a className="dropdown-item" href="#artist-spotlight" onClick={toggleOffcanvas}>Artist Spotlight</a></li>
          </div>
          <div className="offcanvas-li">
            <li><a className="dropdown-item" href="#synth-puzzle-course" onClick={toggleOffcanvas}>Unleash Your Inner Musician</a></li>
          </div>
          <div className="offcanvas-li">
            <li><a className="dropdown-item" href="#club-recommendations" onClick={toggleOffcanvas}>The Nightlife Navigator</a></li>
          </div>
        </ul>
      </div>
    </div>
  );
});

export default OffcanvasMenu;