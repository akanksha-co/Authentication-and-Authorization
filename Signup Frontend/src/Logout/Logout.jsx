import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Logout.css';
import axios from 'axios';

function Logout() {
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/logout', {}, {
      });
      
      toast.success('Logout successful!');
      // Optionally redirect to the login page after a delay
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } catch (error) {
      // Show toast for any errors
      toast.error('Logout failed or an error occurred');
      console.error('Error:', error);
    }
  };

  return (
    <div className='Logout'>
      <button className='Logout1' onClick={handleLogout}>Logout</button>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Logout;
