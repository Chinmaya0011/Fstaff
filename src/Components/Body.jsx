import React, { useContext } from 'react';
import '../App.css';
import { MyContext } from '../Context/MyContext';

function Body() {
  const { staffs } = useContext(MyContext);

  if (!staffs || staffs.length === 0) {
    return <div>No staff data available.</div>;
  }

  return (
    <div className="body-container">
      <table className="staff-table">
        <thead>
          <tr>
            <th className="id-header">ID</th>
            <th className="name-header">Name</th>
            <th className="department-header">Department</th>
            <th className="mobile-header">Mobile</th>
            <th className="position-header">Position</th>
            <th className="status-header">Status</th>
          </tr>
        </thead>
        <tbody>
          {staffs.map((staff, index) => (
            <tr key={index} className="staff-row">
              <td className="id-data">{staff.Id}</td>
              <td className="name-data">{staff.Name}</td>
              <td className="department-data">{staff.department}</td>
              <td className="mobile-data">{staff.mobile}</td>
              <td className="position-data">{staff.position}</td>
              <td className="status-data">{staff.status ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Body;
