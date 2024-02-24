import React, { useContext } from 'react';
import { MyContext } from '../Context/MyContext';
import { Link } from 'react-router-dom'; // Import Link

import '../App.css';

function AddStaff() {
  const {
    id,

    name,
    setName,
    dep,
    setDep,
    mobile,
    setMobile,
    position,
    setPosition,
    status,
    setStatus,
    generateId,
    handleSubmit
  } = useContext(MyContext);

  return (
    <div>
     
      <form className="add-staff-form" onSubmit={handleSubmit}>
 
        <label htmlFor="id" className="form-label">ID</label>
        <input type="text" id="id" value={id} readOnly className="form-input" />
        <button type="button" onClick={generateId} className="form-button">Generate</button>

        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" required />

        <label htmlFor="dep" className="form-label">Department</label>
        <input type="text" id="dep" value={dep} onChange={(e) => setDep(e.target.value)} className="form-input" required />

        <label htmlFor="mobile" className="form-label">Mobile Number</label>
        <input type="text" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)} className="form-input" required />

        <label htmlFor="position" className="form-label">Position</label>
        <input type="text" id="position" value={position} onChange={(e) => setPosition(e.target.value)} className="form-input" required />

        <label htmlFor="status" className="form-label">Status</label>
        <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="form-select" required>
          <option value="active">Inactive</option>
          <option value="inactive">Active</option>
        </select>

        <button type="submit" className="form-button">Add Staff</button>
      </form>
    </div>
  );
}

export default AddStaff;
