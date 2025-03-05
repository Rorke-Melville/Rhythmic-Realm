import React, { useState } from 'react';
import './RecommendedSongs.css';

function RecommendedSongs() {
  const [selectedGenre, setSelectedGenre] = useState('House'); // Default to House

  const genres = {
    House: [
      'https://open.spotify.com/embed/track/2mAAGKUitvOn5gbwOLdQr3?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/1MM3Moo79sdfbL8uBItDcv?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/6MtkMC0QxLaPXOXKOZLaev?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/6uj7kxBTOcjO2NeoiaCS3X?utm_source=generator&theme=0',
    ],
    Afro: [
      'https://open.spotify.com/embed/track/0VXS026CTDARlq9eByUcgZ?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/2BlQJQKab1AbQmTy5N9Jta?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/0TGbZMxPEUJdmGhIFFmFBv?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/7lp3w0kR7m6o3mrKLSXGkI?utm_source=generator&theme=0',
    ],
    Techno: [
      'https://open.spotify.com/embed/track/5AYRYWxy5SI5Pr0gcWX4PZ?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/0sDozrFc7RI5HmF74ey1bu?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/5ymg6qTGJS7jHWopiztBQj?utm_source=generator&theme=0',
      'https://open.spotify.com/embed/track/0S5xE9gGZmpVwMVJq06hvM?utm_source=generator&theme=0',
    ],
  };

  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  return (
    <section className="recommended-songs" id="recommended-songs">
      <h2>Melodies That Move The Room</h2>
      <div className="genre-selector">
        <label htmlFor="genre-select">Select Genre: </label>
        <select id="genre-select" value={selectedGenre} onChange={handleGenreChange}>
          <option value="House">House</option>
          <option value="Afro">Afro</option>
          <option value="Techno">Techno</option>
        </select>
      </div>
      <div className="tracks-container">
        {genres[selectedGenre].map((trackSrc, index) => (
          <iframe
            key={index}
            style={{ borderRadius: '12px' }}
            src={trackSrc}
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="spotify-track"
          ></iframe>
        ))}
      </div>
    </section>
  );
}

export default RecommendedSongs;