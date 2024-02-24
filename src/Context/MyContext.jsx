import React, { createContext, useState, useEffect } from 'react';
import { db } from '../Firebase/firebase';
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Import Link

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
  const[isLogin,setIsLogin]=useState(false)
  const delStaff = async (id) => {
    // Show a confirmation dialog using SweetAlert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this staff member!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then(async (result) => {
      if (result.isConfirmed) {
        // If user confirms, delete the staff member
        try {
          await deleteDoc(doc(db, 'MyStaff', id));
          Swal.fire(
            'Deleted!',
            'Your staff member has been deleted.',
            'success'
          );
        } catch (error) {
          console.error('Error deleting document: ', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the staff member.',
            'error'
          );
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If user cancels, show a message
        Swal.fire(
          'Cancelled',
          'Your staff member is safe :)',
          'error'
        );
      }
    });
  };
  

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
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Add Another Staff',
        cancelButtonText: 'Go to Home'
      }).then((result) => {
        if (result.isConfirmed) {
          // Add another staff action
          // You can implement the logic to add another staff here
        } else {
          // Go to home action
          window.location.href = '/'; // Navigate to the home page
        }
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
        fetchedStaffs.push({
          id: doc.id, 
        ...doc.data() // Spread the rest of the staff data
        });
      });
      setStaffs(fetchedStaffs);
    };
  
    fetchData();
  }, [handleSubmit]);
  
  const editStaff = async (staffId, newData) => {
    try {
      const staffRef = doc(db, "MyStaff", staffId);
      await updateDoc(staffRef, newData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Staff updated successfully!',
      });
    } catch (error) {
      console.error("Error updating document: ", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating staff.',
      });
    }
  };

  // Wrap the staffs array in an object for more flexibility
  const contextValue = {
    staffs,
    delStaff,
    editStaff, // Added editStaff function to context value
    id,
    setId,
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
    handleSubmit,isLogin,setIsLogin
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
