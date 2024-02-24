import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { auth } from '../Firebase/firebase'; // Import auth from Firebase configuration

function Header({ link }) {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out successfully');
        // Optionally redirect the user to the login page or any other page after logout
      })
      .catch((error) => {
        console.error('Error signing out:', error.message);
      });
  };

  return (
    <div className="header">
      <div className="logo">MyStaff</div>
      <nav className="navbar">
        <ul>
          <li><Link to={'/'}>Home</Link></li>
          <li><Link to="/add">Add Staff</Link></li>
          <li><a href="#" onClick={handleLogout}>Logout</a></li> {/* Call handleLogout function when Logout is clicked */}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
