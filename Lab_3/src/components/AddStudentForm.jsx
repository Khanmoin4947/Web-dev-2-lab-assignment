import React, { useState } from 'react';

function AddStudentForm({ onAddStudent }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && score) {
      onAddStudent(name, Number(score));
      setName('');
      setScore('');
    } else {
      alert("Please enter both name and score");
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>Name: </label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <br/><br/>
        
        <label>Score: </label>
        <input 
          type="number" 
          value={score} 
          onChange={(e) => setScore(e.target.value)} 
        />
        <br/><br/>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddStudentForm;
