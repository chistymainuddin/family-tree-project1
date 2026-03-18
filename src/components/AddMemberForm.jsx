import React, { useActionState } from 'react';
import { submitMember } from '../actions/memberActions';

export default function AddMemberForm({ onClose }) {
  const [state, formAction, isPending] = useActionState(submitMember, null);

  return (
    <div className="form-modal-overlay">
      <form action={formAction} className="teams-style-form">
        <h3>নতুন সদস্য যোগ করুন (Add New Member)</h3>
        
        <input type="text" name="first_name" placeholder="নাম (First Name)" required />
        <input type="text" name="last_name" placeholder="পদবী (Last Name)" required />
        <input type="date" name="birth_date" placeholder="জন্ম তারিখ" />
        
        {state?.error && <p className="error-text">{state.error}</p>}
        {state?.success && <p className="success-text">{state.message}</p>}

        <div className="button-group">
          <button type="submit" disabled={isPending}>
            {isPending ? 'প্রসেস হচ্ছে...' : 'সংরক্ষণ করুন (Save)'}
          </button>
          <button type="button" onClick={onClose}>বাতিল (Cancel)</button>
        </div>
      </form>
    </div>
  );
}
