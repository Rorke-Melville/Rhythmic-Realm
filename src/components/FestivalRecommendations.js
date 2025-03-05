import React, { useState, useEffect, useRef } from 'react';
import './FestivalRecommendations.css';
import afrikaburnImg from '../assets/afrikaburn.jpg'; 
import stoneTechnoImg from '../assets/stonetechno.jpg';
import smalltownBeatImg from '../assets/smalltownbeat.jpeg';
import originImg from '../assets/orgin.jpg';
import boomImg from '../assets/boom.jpg';
import tomorrowlandImg from '../assets/tomorrowland.jpg';
import monumentImg from '../assets/monumentfestivalnorway.jpeg';
import tulumeImg from '../assets/tulume.jpg';
import awakeningsImg from '../assets/awakenings.jpg';

function FestivalRecommendations() {
  const festivals = [
    { name: 'AfrikaBurn', image: afrikaburnImg, location: 'Tankwa Karoo, South Africa', date: 'April 28 - May 4, 2025', link: 'https://www.afrikaburn.org/' },
    { name: 'Stone Techno', image: stoneTechnoImg, location: 'Dortmund, Germany', date: 'July 25 - July 27, 2025', link: 'https://www.stone-techno.com/' },
    { name: 'Smalltown Beat', image: smalltownBeatImg, location: 'Near Napier, South Africa', date: 'February 14 - 17, 2025', link: 'https://smalltownbeat.com/' },
    { name: 'Origin Festival', image: originImg, location: 'Near Greyton, South Africa', date: 'January 31 - February 2, 2025', link: 'https://originfestival.com/' },
    { name: 'Boom Festival', image: boomImg, location: 'Idanha-a-Nova, Portugal', date: 'July 2025 (TBD)', link: 'https://www.boomfestival.org/' },
    { name: 'Tomorrowland', image: tomorrowlandImg, location: 'Boom, Belgium', date: 'July 18 - 27, 2025', link: 'https://www.tomorrowland.com/home/' },
    { name: 'Destination Unknown', image: tulumeImg, location: 'Tulum, Mexico', date: 'January 9- January 11, 2025', link: 'https://www.dest-fest-tulum.com/' },
    { name: 'Awakenings', image: awakeningsImg, location: 'Hilvarenbeek, Netherlands', date: 'July 11 - July 13, 2025', link: 'https://www.awakenings.com/en/events/2025/07/awakenings-festival-2025/337839/' },
    { name: 'Monument', image: monumentImg, location: 'Veggli, Norway', date: '31. Jul - 03. Aug', link: 'https://festival.mnmt.no/' },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Track hover state
  const cardsPerView = 3;
  const totalCards = festivals.length;
  const intervalRef = useRef(null); // Store interval ID

  // Auto-update every 5 seconds unless hovered
  useEffect(() => {
    if (!isHovered) {
      intervalRef.current = setInterval(() => {
        setAnimate(true);
        setTimeout(() => {
          setStartIndex((prevIndex) => 
            prevIndex + cardsPerView >= totalCards ? 0 : prevIndex + cardsPerView
          );
          setAnimate(false);
        }, 500);
      }, 5000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovered, totalCards]);

  const handlePrev = () => {
    setAnimate(true);
    setTimeout(() => {
      setStartIndex((prevIndex) => 
        prevIndex === 0 ? totalCards - cardsPerView : prevIndex - 1
      );
      setAnimate(false);
    }, 500);
  };

  const handleNext = () => {
    setAnimate(true);
    setTimeout(() => {
      setStartIndex((prevIndex) => 
        prevIndex + 1 >= totalCards - cardsPerView + 1 ? 0 : prevIndex + 1
      );
      setAnimate(false);
    }, 500);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Get the 3 festivals to display
  const visibleFestivals = [
    festivals[startIndex % totalCards],
    festivals[(startIndex + 1) % totalCards],
    festivals[(startIndex + 2) % totalCards],
  ];

  return (
    <section className="festival-recommendations" id="festival-recommendations">
      <h2>Curated Festival Haven</h2>
      <div className="carousel-container">
        <button className="carousel-arrow left-arrow" onClick={handlePrev}>&lt;</button>
        <div className="festivals-carousel">
          {visibleFestivals.map((festival, index) => (
            <div 
              key={index} 
              className={`festival-card ${animate ? 'slide-out' : 'slide-in'}`}
            >
              <img src={festival.image} alt={`${festival.name} poster`} className="festival-image" />
              <h3>{festival.name}</h3>
              <p><strong>Location:</strong> {festival.location}</p>
              <p><strong>Date:</strong> {festival.date}</p>
              <a 
                href={festival.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="festival-link"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                Visit Site
              </a>
            </div>
          ))}
        </div>
        <button className="carousel-arrow right-arrow" onClick={handleNext}>{'>'}</button>
      </div>
    </section>
  );
}

export default FestivalRecommendations;