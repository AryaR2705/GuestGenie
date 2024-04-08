import React, { useState } from 'react';
import axios from 'axios';

const DeleteButton = ({ onDelete }) => {
  const [deleteId, setDeleteId] = useState('');

  const deleteDatabaseEntry = async () => {
    try {
      // Check if ID is provided
      if (!deleteId) {
        alert('Error: Please enter the ID for deletion.');
        return;
      }

      // Send a request to delete the database entry using the entered ID
      await axios.delete(`http://localhost:5500/delete/${deleteId}`);

      // Trigger the onDelete callback to inform the parent component about the deletion
      onDelete();

      // Clear the input field
      setDeleteId('');

      // Optionally display a success message
      alert('Entry deleted successfully.');
    } catch (error) {
      console.error('Error deleting information from the database:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter ID to delete"
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
      />
      <button onClick={deleteDatabaseEntry}>Delete Database Entry</button>
    </div>
  );
};

export default DeleteButton;
