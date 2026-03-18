import React from 'react';

export default function AddMemberForm({ onClose }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData);
    
    const res = await fetch('http://localhost:5000/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (res.ok) onClose();
  };

  return (
    <div className="form-modal-overlay">
      <form onSubmit={handleSubmit} className="teams-style-form">
        <h3>সদস্য যোগ করুন (Add Member)</h3>
        <input type="text" name="name" placeholder="নাম (Full Name)" required />
        <input type="text" name="spouse" placeholder="স্বামী/স্ত্রীর নাম (Spouse Name)" />
        <input type="number" name="parent_id" placeholder="পিতার আইডি (Parent ID)" />
        {/* Updated: Text input for Generation */}
        <input type="text" name="generation" placeholder="প্রজন্ম (e.g. 1st Gen, Founder)" required />
        <input type="date" name="birth_date" />
        <div className="button-group">
          <button type="submit">সংরক্ষণ করুন</button>
          <button type="button" onClick={onClose}>বাতিল</button>
        </div>
      </form>
    </div>
  );
}
