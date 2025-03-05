import React, { useState } from 'react';
import './SynthPuzzleCourses.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecordVinyl, faPlug } from '@fortawesome/free-solid-svg-icons';

function SynthPuzzleCourses() {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const courses = [
    { id: 1, type: 'DJing', title: 'Intro to DJing', instructor: 'DJ Neon', duration: '4 weeks', level: 'Beginner' },
    { id: 2, type: 'DJing', title: 'Advanced Mixing', instructor: 'Beat Master', duration: '6 weeks', level: 'Intermediate' },
    { id: 3, type: 'DJing', title: 'Live Performance', instructor: 'Spin Queen', duration: '8 weeks', level: 'Advanced' },
    { id: 4, type: 'Production', title: 'Beat Making Basics', instructor: 'Synth Lord', duration: '5 weeks', level: 'Beginner' },
    { id: 5, type: 'Production', title: 'Synth Design', instructor: 'Wave Shaper', duration: '7 weeks', level: 'Intermediate' },
    { id: 6, type: 'Production', title: 'Mastering Tracks', instructor: 'Audio Guru', duration: '10 weeks', level: 'Advanced' },
  ];

  const handleDragStart = (e) => {
    console.log('Drag started');
    setIsDragging(true);
    e.dataTransfer.setData('text/plain', 'cable');
  };

  const handleDrop = (course, e) => {
    console.log('Dropped on:', course.title);
    e.preventDefault();
    setIsDragging(false);
    setSelectedCourse(course);
  };

  const handleDragOver = (e) => {
    console.log('Dragging over');
    e.preventDefault();
  };

  const handleDragEnd = () => {
    console.log('Drag ended');
    setIsDragging(false);
  };

  const handleClick = (course) => {
    console.log('Clicked on:', course.title); // Debug log for click
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
            <p>{course.type}</p>
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
            <p><strong>Type:</strong> {selectedCourse.type}</p>
            <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <p><strong>Level:</strong> {selectedCourse.level}</p>
            <button>Enroll Now</button>
          </div>
        </div>
      )}
    </section>
  );
}

export default SynthPuzzleCourses;