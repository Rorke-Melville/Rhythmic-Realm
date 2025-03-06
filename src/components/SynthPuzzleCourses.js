import React, { useState } from 'react';
import './SynthPuzzleCourses.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl, faPlug, faLocationDot } from '@fortawesome/free-solid-svg-icons';

function SynthPuzzleCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const courses = [
    { 
      id: 1, 
      title: 'Stoke DJ Course', 
      instructor: 'Stoke Industries', 
      duration: '8 weeks', 
      level: 'Beginner-Intermediate', 
      link: 'https://www.stokeindustries.co.za/product-page/8-week-dj-course', 
      location: 'And Club, South Africa',
      description: "Learn to DJ at And Club with Stoke's! Get practical experience on industry-standard equipment, covering essential software and techniques."      
    },
    { 
      id: 2, 
      title: 'Mixing & Mastering Electronic Music', 
      instructor: "Ciaran O'Shea, Cem Oral, Phelan Kane", 
      duration: '4 weeks', 
      level: 'Intermediate', 
      link: 'https://catalyst-berlin.com/music/course/mixing-mastering-4week', 
      location: 'Berlin, Germany', 
      description: 'This course empowers music creators to elevate their mixes and masters to a professional level through hands-on learning, critical listening, and creative problem-solving', 
    },
    { 
      id: 3, 
      title: 'Electronic music and sound art', 
      instructor: 'Claus Gahrn, Robert Rizzi', 
      duration: '2 Years', 
      level: 'Advanced', 
      link: 'https://www.sdmk.dk/en/studies/electronic-musician-ba', 
      location: 'Esbjerg, Denmark',
      description: "This Electronic Music and Sound Art program emphasizes project development, collaborative experiences (including a student-run festival), and musician's health alongside artistic creation and performance." 
    },
    { 
      id: 4, 
      title: 'FL Studio Complete Course', 
      instructor: 'Martin Svensson, Music-Prob Education', 
      duration: '28.5 hours on-demand video', 
      level: 'Beginner-Intermediate', 
      link: 'https://www.udemy.com/course/fl-studio/?couponCode=ST10MT30325G1', 
      location: 'Online',
      description: 'This FL Studio Music Production course offers a comprehensive guide for all skill levels to master FL Studio 21 and create professional music.' 
    },
    { 
      id: 5, 
      title: 'Music Production Program', 
      instructor: 'Various Producers', 
      duration: '12 Months', 
      level: 'Intermediate', 
      link: 'https://www.iconcollective.edu/programs/los-angeles-music-production-program', 
      location: 'Los Angeles, USA',
      description: 'At ICON’s Los Angeles Music Production Program, you’ll dive progressively deeper into production, synthesis, arrangement, and mixing & mastering. ' 
    },
    { 
      id: 6, 
      title: 'Synthesis and Sound Design', 
      instructor: 'Steve Lydford', 
      duration: '6h 25m', 
      level: 'Beginner',  
      link: 'https://www.udemy.com/course/the-complete-beginners-guide-to-synthesis-and-sound-design/?couponCode=ST10MT30325G1', 
      location: 'Online',
      description: 'This course provides a detailed exploration of synthesizer sound design, catering to all skill levels and empowering students to create precise, desired sounds.' 
    },
  ];

  const handleDragStart = (e) => {
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', 'cable');
  };

  const handleDrop = (course, e) => {
    e.preventDefault();
    setIsDragging(false);
    setSelectedCourse(course);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const handleClick = (course) => {
    setSelectedCourse(course);
  };

  return (
    <section className="synth-puzzle-courses" id="synth-puzzle-course">
      <h2 className="synth-title">Unleash Your Inner Musician</h2>
      <div className="synth-container">
        {courses.map((course) => (
          <div 
            key={course.id} 
            className="synth-module" 
            onDrop={(e) => handleDrop(course, e)}
            onDragOver={handleDragOver}
            onClick={() => handleClick(course)}
          >
            <h3>{course.title}</h3>
            <p><FontAwesomeIcon icon={faLocationDot} /> {course.location}</p>
            <FontAwesomeIcon icon={faRecordVinyl} className="synth-icon" />
          </div>
        ))}
      </div>
      <div className="synth-cable-container">
        <div 
          className={`synth-cable-wrapper ${isDragging ? 'dragging' : ''}`} 
          draggable="true"
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <FontAwesomeIcon icon={faPlug} className="synth-cable-icon" />
        </div>
        <p className="synth-instruction">Drag cable into course you want to view</p>
      </div>
      {selectedCourse && (
        <div className="synth-overlay" onClick={() => setSelectedCourse(null)}>
          <div className="synth-details">
            <h3>{selectedCourse.title}</h3>
            <p><strong>Instructor(s):</strong> {selectedCourse.instructor}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <p><strong>Level:</strong> {selectedCourse.level}</p>
            <p><strong>Description:</strong> {selectedCourse.description}</p>
            <a href={selectedCourse.link} target="_blank" rel="noopener noreferrer">
              <button>Enroll Now</button>
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

export default SynthPuzzleCourses;