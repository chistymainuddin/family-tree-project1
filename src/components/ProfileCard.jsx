import React, { useState } from 'react';

const ProfileCard = ({ selectedPerson, onClose }) => {
  const [history, setHistory] = useState([selectedPerson]);
  const [index, setIndex] = useState(0);
  const current = history[index];

  return (
    <div className="profile-card-overlay">
      <div className="card-header">
        <button onClick={() => index > 0 && setIndex(index - 1)} disabled={index === 0}>←</button>
        <button className="close-btn" onClick={onClose}>×</button>
      </div>
      <div className="card-body">
        {current.avatar_url && <img src={current.avatar_url} className="avatar-large" alt="Profile" />}
        <h2>{current.name}</h2>
        
        {/* Displaying Generation and Spouse as requested */}
        <div className="member-details">
          <p className="badge"><strong>প্রজন্ম (Gen):</strong> {current.generation}</p>
          {current.spouse && (
            <p className="spouse-tag"><strong>স্বামী/স্ত্রী (Spouse):</strong> {current.spouse}</p>
          )}
          <p><strong>জন্ম (DOB):</strong> {current.birth_date}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
