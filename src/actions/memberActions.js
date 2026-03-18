export const submitMember = async (prevState, formData) => {
  const payload = {
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    parent_id: formData.get('parent_id'),
    birth_date: formData.get('birth_date')
  };

  try {
    const response = await fetch('http://localhost:5000/api/members', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) throw new Error('সিস্টেমে ত্রুটি হয়েছে (System Error)');
    return { success: true, message: 'সফলভাবে যুক্ত করা হয়েছে (Successfully added)' };
  } catch (err) {
    return { error: err.message };
  }
};
