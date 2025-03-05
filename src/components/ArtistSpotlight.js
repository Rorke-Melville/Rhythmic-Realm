import React, { useState } from 'react';
import './ArtistSpotlight.css';
import marronImg from '../assets/hq720.jpg';
import jeffImg from '../assets/jeff-mills.avif';
import blackCoffeeImg from '../assets/black coffee.webp';
import besteImg from '../assets/beste.jpeg';
import enooImg from '../assets/enoo.jpeg';
import chrisImg from '../assets/chris.jpeg';
import lazurImg from '../assets/laz.jpeg';
import peggyImg from '../assets/peggy.jpg';
import frankieImg from '../assets/frankie.webp';

function ArtistSpotlight() {
  const [flippedCard, setFlippedCard] = useState(null);

  const artists = [
    { id: 1, name: 'MARRØN', genre: 'Techno', birthPlace: 'Amsterdam, Netherlands', clubs: 'De Marktkantine', image: marronImg, soundcloud: 'https://soundcloud.com/marron-official', spotify: '', instagram: 'https://instagram.com/neonpulse' },
    { id: 2, name: 'Peggy Gou', genre: 'House', birthPlace: 'Incheon, South Korea', clubs: 'Circoloco', image: peggyImg, soundcloud: 'https://soundcloud.com/echovibe', spotify: 'https://open.spotify.com/artist/2eIDAcLKnWc4D350YyzvgS?si=grEO1IrJThOGE1JPR9mmsQ', instagram: 'https://instagram.com/echovibe' },
    { id: 3, name: 'Black Coffee', genre: 'Afro House', birthPlace: 'Durban, South Africa', clubs: 'Hï Ibiza', image: blackCoffeeImg, soundcloud: 'https://soundcloud.com/lunarbeat', spotify: 'https://spotify.com/lunarbeat', instagram: 'https://instagram.com/lunarbeat' },
    { id: 4, name: 'Beste Hira', genre: 'Techno', birthPlace: 'Istanbul, Turkey', clubs: 'Radion', image: besteImg, soundcloud: 'https://soundcloud.com/solarmix', spotify: 'https://spotify.com/solarmix', instagram: 'https://instagram.com/solarmix' },
    { id: 5, name: 'Enoo Napa', genre: 'Afro House', birthPlace: 'Mthatha, South Africa', clubs: 'Shimmy Beach Club', image: enooImg, soundcloud: 'https://soundcloud.com/cosmicdrop', spotify: 'https://spotify.com/cosmicdrop', instagram: 'https://instagram.com/cosmicdrop' },
    { id: 6, name: 'Chris Stussy', genre: 'House', birthPlace: 'Amsterdam, Netherlands', clubs: 'Shelter', image: chrisImg, soundcloud: 'https://soundcloud.com/astralwave', spotify: 'https://spotify.com/astralwave', instagram: 'https://instagram.com/astralwave' },
    { id: 7, name: 'Lazarusman', genre: 'Afro House', birthPlace: 'Joburg, South Africa', clubs: 'Watergate', image: lazurImg, soundcloud: 'https://soundcloud.com/astralwave', spotify: 'https://spotify.com/astralwave', instagram: 'https://instagram.com/astralwave' },
    { id: 8, name: 'Jeff Mills', genre: 'Techno', birthPlace: 'Detroit, Michigan, USA', clubs: 'Berghain', image: jeffImg, soundcloud: 'https://soundcloud.com/astralwave', spotify: 'https://spotify.com/astralwave', instagram: 'https://instagram.com/astralwave' },
    { id: 9, name: 'Frankie Knuckles', genre: 'House', birthPlace: 'The Bronx, New York City, USA', clubs: 'the Warehouse', image: frankieImg, soundcloud: 'https://soundcloud.com/astralwave', spotify: 'https://spotify.com/astralwave', instagram: 'https://instagram.com/astralwave' },
  ];

  const handleCardClick = (id) => {
    setFlippedCard(flippedCard === id ? null : id); // Toggle flip
  };

  return (
    <section className="artist-spotlight" id="artist-spotlight">
      <h2 className="spotlight-title">Artist Spotlight</h2>
      <div className="spotlight-scroller">
        <div className="spotlight-track">
          {[...artists, ...artists].map((artist, index) => ( // Duplicate for seamless loop
            <div 
              key={`${artist.id}-${index}`} 
              className={`spotlight-card ${flippedCard === artist.id ? 'flipped' : ''}`}
              onClick={() => handleCardClick(artist.id)}
            >
              <div className="card-front">
                <img src={artist.image} alt={artist.name} className="artist-image" />
                <h3>{artist.name}</h3>
                <p><strong>Genre:</strong> {artist.genre}</p>
                <p><strong>Birthplace:</strong> {artist.birthPlace}</p>
                <p><strong>Clubs:</strong> {artist.clubs}</p>
              </div>
              <div className="card-back">
                <h3>{artist.name}</h3>
                <div className="social-links">
                  <a href={artist.soundcloud} target="_blank" rel="noopener noreferrer">SoundCloud</a>
                  <a href={artist.spotify} target="_blank" rel="noopener noreferrer">Spotify</a>
                  <a href={artist.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ArtistSpotlight;