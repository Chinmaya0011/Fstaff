import React, { createContext, useState, useEffect } from 'react';
import { db } from '../Firebase/firebase';
import { collection, getDocs, addDoc } from "firebase/firestore"; // Add import for addDoc
import Swal from 'sweetalert2'; // Add import for Swal

const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [staffs, setStaffs] = useState([]);

  // Define state variables for form inputs
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [dep, setDep] = useState('');
  const [mobile, setMobile] = useState('');
  const [position, setPosition] = useState('');
  const [status, setStatus] = useState('');

  // Function to generate a random 4-digit ID
  const generateId = () => {
    setId("Generate...");
    setTimeout(() => {
      const randomId = Math.floor(1000 + Math.random() * 9000);
      setId(randomId.toString());
    }, 1000);
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "MyStaff"), {
        Id: id,
        Name: name,
        department: dep,
        mobile: mobile,
        position: position,
        status: status
      });

      console.log("Document written with ID: ", docRef.id);

      // Clear form after submission
      setId('');
      setName('');
      setDep('');
      setMobile('');
      setPosition('');
      setStatus('');

      // Show success message using SweetAlert2
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Staff added successfully!',
      });
     
    } catch (error) {
      console.error("Error adding document: ", error);

      // Show error message using SweetAlert2
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while adding staff.',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "MyStaff"));
      const fetchedStaffs = [];
      querySnapshot.forEach((doc) => {
        fetchedStaffs.push(doc.data());
      });
      setStaffs(fetchedStaffs);
    };

    fetchData();
  }, [handleSubmit]);

  // Wrap the staffs array in an object for more flexibility
  const contextValue = {
    staffs,
    id, setId, name, setName, dep, setDep, mobile, setMobile,
    position, setPosition, status, setStatus, generateId, handleSubmit
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
