import React, { useState } from 'react';
import './Signup.css';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [inputValues, setInputValues] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmpassword: '',
        gender: '',
        role: ''  
    });
    const [isSignupLoading, setIsSignupLoading] = useState(false);
    const navigate = useNavigate();
   
    const handleSignup = async (e) => {
        e.preventDefault();
        setIsSignupLoading(true);

        const { firstname, lastname, email, password, confirmpassword, gender, role } = inputValues;
 console.log(firstname, lastname, email, password, confirmpassword, gender, role);
 
       
        if (!firstname || !lastname || !email || !password || !confirmpassword || !gender || !role) {
            toast.error('Please fill in all the fields!');
            setIsSignupLoading(false);
            return;
        }

        
        if (password !== confirmpassword) {
            toast.error('Passwords do not match!');
            setIsSignupLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/v1/signup', {
                firstname: firstname,
                lastname: lastname,
                email,
                password: password,
                confirmpassword: confirmpassword,
                gender: gender,
                role: role
            });

            if (response.status === 200) { 
                toast.success('Signup successful');
                setTimeout(() => {
                    navigate('/login'); 
                }, 1000);
            } else {
                toast.error('Signup failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || 'An error occurred. Please try again.'}`);
            } else if (error.request) {
                toast.error('Network error. Please check your internet connection.');
            } else {
                toast.error('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsSignupLoading(false);
        }
    };

    const handleChange = (e) => {
        setInputValues({
            ...inputValues,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="signup-container">
            <h2 className="signUp-header">Sign Up</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                {['firstname', 'lastname', 'email', 'password', 'confirmpassword'].map((field) => (
                    <div key={field} className={`form-group ${inputValues[field] ? 'active' : ''}`}>
                        <input
                            type={field === 'email' ? 'email' : (field === 'password' || field === 'confirmpassword' ? 'password' : 'text')}
                            name={field}
                            className="form-input"
                            autoComplete='off'
                            onChange={handleChange}
                            value={inputValues[field]}
                            placeholder=" " 
                        />
                        <label className="Input-Label">
                            {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                        </label>
                    </div>
                ))}

                <div className="gender-container">
                    <label className="gender">Gender:</label>
                    <select
                        name="gender"
                        className="gender-select"
                        value={inputValues.gender}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select your gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="role-container">
                    <label className="role">Role:</label>
                    <select
                        name="role"
                        className="role-select"
                        value={inputValues.role}
                        onChange={handleChange}
                    >
                        <option value="" disabled>Select your role</option>
                        <option value="Admin">Instuctor</option>
                        <option value="Student">Student</option>
                    </select>
                </div>

                <button 
                    type="submit"
                    className="signup-button"
                    disabled={isSignupLoading}
                >
                    {isSignupLoading ? (
                        <div className="loaderr"></div>
                    ) : (
                        'Sign up'
                    )}
                </button>
            </form>
            <ToastContainer /> 
        </div>
    );
}

export default Signup;
