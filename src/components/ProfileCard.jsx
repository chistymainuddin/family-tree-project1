import React, { useState } from 'react';

const ProfileCard = ({ selectedPerson, onClose }) => {
  const [history, setHistory] = useState([selectedPerson]);
  const [index, setIndex] = useState(0);
  const current = history[index];

  const goBack = () => index > 0 && setIndex(index - 1);
  const goForward = () => index < history.length - 1 && setIndex(index + 1);

  return (
    <div className="profile-card-overlay">
      <div className="card-header">
        <button onClick={goBack} disabled={index === 0}>←</button>
        <button onClick={goForward} disabled={index === history.length - 1}>→</button>
        <button onClick={onClose}>×</button>
      </div>
      <div className="card-body">
        {current.avatar_url && <img src={current.avatar_url} className="avatar-large" alt="Profile" />}
        <h2>{current.first_name} {current.last_name}</h2>
        <p>Born: {current.birth_date}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
