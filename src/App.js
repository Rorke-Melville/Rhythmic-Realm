import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import CursorEffect from './components/CursorEffect';
import StrobeEffect from './components/StrobeEffect';
import VolumeSimulator from './components/VolumeSimulator';
import RecommendedSongs from './components/RecommendedSongs';
import FestivalRecommendations from './components/FestivalRecommendations';
import ArtistSpotlight from './components/ArtistSpotlight';
import SynthPuzzleCourses from './components/SynthPuzzleCourses';
import ClubRecommendations from './components/ClubRecommendations';
import OffcanvasMenu from './components/OffcanvasMenu';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap'; // Import Bootstrap JS module
import './App.css';

function App() {
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const offcanvasRef = useRef(null);

  useEffect(() => {
    // Ensure window.bootstrap is set
    window.bootstrap = bootstrap;
    console.log('Bootstrap assigned to window:', window.bootstrap);

    const handleScroll = () => {
      const shouldBeVisible = window.scrollY > 100;
      setIsNavbarVisible(shouldBeVisible);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleOffcanvas = () => {
    const offcanvasElement = offcanvasRef.current;
    if (offcanvasElement) {
      console.log('Toggling offcanvas');
      const offcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);
      offcanvas.toggle();
    } else {
      console.error('Offcanvas element not found');
    }
  };

  return (
    <div className="App">
      <Navbar isVisible={isNavbarVisible} toggleOffcanvas={toggleOffcanvas} />
      <OffcanvasMenu toggleOffcanvas={toggleOffcanvas} ref={offcanvasRef} />
      <CursorEffect />
      <div className="hero-section">
        <h1 className="site-title">Rhythmic Realm</h1>
        <VolumeSimulator />
        <StrobeEffect />
      </div>
      <main>
        <RecommendedSongs id="recommended-songs" />
        <FestivalRecommendations id="festival-recommendations" />
        <ArtistSpotlight id="artist-spotlight" />
        <SynthPuzzleCourses id="synth-puzzle-course" />
        <ClubRecommendations id="club-recommendations" />
      </main>
      <footer className="App-footer">
        © 2025 Rhythmic Realm | Rorke Melville
      </footer>
    </div>
  );
}

export default App;