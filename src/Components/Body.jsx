import React, { useContext, useState } from 'react';
import '../App.css';
import { MyContext } from '../Context/MyContext';
import EditForm from './EditFrom';
import { Link } from 'react-router-dom'; // Import Link
import './Body.css'
function Body() {
  const { staffs, delStaff, editStaff } = useContext(MyContext); // Added editStaff
  const [edit, setEdit] = useState(false);
  const [editedData, setEditedData] = useState({}); // State to hold edited data

  if (!staffs || staffs.length === 0) {
    return <div>No staff data available.</div>;
  }

  const handleEdit = (staffId) => {
    // Find the staff member to edit
    const staffToEdit = staffs.find(staff => staff.id === staffId);
    // Set the edited data in state
    setEditedData(staffToEdit);
    // Set edit mode to true
    setEdit(true);
  };

  const handleSave = () => {
    // Call the editStaff function from context to save the edited data
    editStaff(editedData.id, editedData)
      .then(() => {
        // Reset edit mode and edited data after successful edit
        setEdit(false);
        setEditedData({});
      })
      .catch(error => {
        console.error('Error editing staff:', error);
        // Handle error if necessary
      });
  };

  const handleCancel = () => {
    // Reset edit mode and edited data
    setEdit(false);
    setEditedData({});
  };

  const handleChange = (e) => {
    // Update the edited data when input values change
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value // Ensure e.target.name is "Name"
    });
  };
  

  return (
    <div className="body-container">

      <table className="staff-table">
        <thead>
          <tr>
            <th className="staff-id-header">ID</th>
            <th className="staff-name-header">Name</th>
            <th className="staff-department-header">Department</th>
            <th className="staff-mobile-header">Mobile</th>
            <th className="staff-position-header">Position</th>
            <th className="staff-status-header">Status</th>
            <th className="staff-action-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => (
            <tr key={index} className="staff-row">
              <td className="staff-id-data">{staff.Id}</td>
              <td className="staff-name-data">{staff.Name}</td>
              <td className="staff-department-data">{staff.department}</td>
              <td className="staff-mobile-data">{staff.mobile}</td>
              <td className="staff-position-data">{staff.position}</td>
              <td className="staff-status-data">{staff.status ? "Active" : "Inactive"}</td>
              <td className="staff-action-data">
                {/* Edit and delete buttons */}
                <button onClick={() => handleEdit(staff.id)}>Edit</button>
                <button onClick={() => delStaff(staff.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {edit && (
        <div className="popup">
          <div className="popup-inner">
            <EditForm
              editedData={editedData}
              handleChange={handleChange}
              handleSave={handleSave}
              handleCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Body;
