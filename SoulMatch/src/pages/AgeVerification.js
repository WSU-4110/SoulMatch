import React, { useState } from 'react';

function AgeVerification() {
  const [age, setAge] = useState('');
  const [showWarning, setShowWarning] = useState(false);

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (age < 18) {
      setShowWarning(true);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter your age:
          <input type="number" value={age} onChange={handleAgeChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
      {showWarning && <p>You must be 18 or older to access this site.</p>}
    </div>
  );
}

export default AgeVerification;
