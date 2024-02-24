import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import AddStaff from './Components/AddStaff';
import Body from './Components/Body';
import { MyProvider } from './Context/MyContext';
import SignupPage from './Components/Signup';
import Login from './Components/Login';
import { auth } from './Firebase/firebase';
import Home from './Components/Home';
function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router> {/* Wrap your entire application with the <Router> component */}
      <MyProvider>

        <Routes>
          <Route path="/" element={user ? <Home/> : <Login />} />
       <Route path="/add" element={<>
       <Header/>
       <AddStaff/>
       </>} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MyProvider>
    </Router>
  );
}

export default App;
