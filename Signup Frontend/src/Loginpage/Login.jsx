import React, { useState } from 'react';
import './Login.css';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import axios from 'axios';
import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';

function Login() {
    const [inputValues, setInputValues] = useState({
        email: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        const url = 'http://localhost:3000/api/v1/login';
        const { email, password } = inputValues;
    
        try {
            const response = await axios.post(url, { email, password });
            console.log('Full response:', response);
            console.log('User Role:', response.data.findUser.role);
    
            if (response.status === 200) {
                const userRole = response.data.findUser.role;
    
                // Check the user's role and navigate to the appropriate page
                if (userRole === 'Instructor') {
                    toast.success('Login successful as Instructor');
                    setTimeout(() => {
                        navigate('/instructor'); // Navigate to instructor page
                    }, 1000);
                } else if (userRole === 'Student') {
                    toast.success('Login successful as Student');
                    setTimeout(() => {
                        navigate('/student'); // Navigate to student page
                    }, 1000);
                } else {
                    toast.warning('Role not recognized. Please contact support.');
                }
            } else {
                toast.error('Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error details:', error);
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || 'An error occurred. Please try again.'}`);
            } else if (error.request) {
                toast.error('Network error. Please check your internet connection.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="login-container">
            <h2 className="login-header">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                {['email', 'password'].map((field) => (
                    <div key={field} className={`form-group ${inputValues[field] ? 'active' : ''}`}>
                        <input
                            type={field === 'email' ? 'email' : 'password'}
                            name={field}
                            className="form-input"
                            autoComplete="off"
                            onChange={handleChange}
                            value={inputValues[field]}
                            placeholder=" "
                        />
                        <label className="input-label">
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                    </div>
                ))}
                <button 
                    type="submit"
                    className="login-button"
                    disabled={isLoading} 
                >
                    {isLoading ? (
                        <div className="loader"></div>
                    ) : (
                        'Login'
                    )}
                </button>
            </form>
            <ToastContainer /> 
        </div>
    );
}

export default Login;
