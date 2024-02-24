import React from 'react';
import '../App.css';

function EditForm({ editedData, handleChange, handleSave, handleCancel }) {
  return (
    <div>
      {/* Input fields for editing */}
      <input type="text" name="name" className="edit-input" value={editedData.Name} onChange={handleChange} />

      <input type="text" name="department" className="edit-input" value={editedData.department} onChange={handleChange} />
      <input type="text" name="mobile" className="edit-input" value={editedData.mobile} onChange={handleChange} />
      <input type="text" name="position" className="edit-input" value={editedData.position} onChange={handleChange} />
      {/* Additional input fields for other fields */}
      <button className="edit-button" onClick={handleSave}>Save</button>
      <button className="edit-button" onClick={handleCancel}>Cancel</button>
    </div>
  );
}

export default EditForm;
