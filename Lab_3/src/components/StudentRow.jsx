import React, { useState } from 'react';

function StudentRow({ student, onUpdateScore }) {
  const [newScore, setNewScore] = useState('');

  const isPass = student.score >= 40;
  const statusColor = isPass ? 'green' : 'red';
  const statusText = isPass ? 'Pass' : 'Fail';

  const handleUpdate = () => {
    if (newScore !== '') {
      onUpdateScore(student.id, Number(newScore));
      setNewScore('');
    }
  };

  return (
    <tr>
      <td>{student.name}</td>
      <td>{student.score}</td>
      <td style={{ color: statusColor, fontWeight: 'bold' }}>
        {statusText}
      </td>
      <td>
        <input 
          type="number" 
          value={newScore} 
          onChange={(e) => setNewScore(e.target.value)} 
          placeholder="New Score"
        />
        <button onClick={handleUpdate}>Update</button>
      </td>
    </tr>
  );
}

export default StudentRow;
