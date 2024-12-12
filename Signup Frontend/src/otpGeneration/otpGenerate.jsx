import React, { useState, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // Import axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './otpGeneration.css';

const Otp = () => {
    const [otp, setOtp] = useState(['', '', '', '', '']); // Array to hold OTP digits
    const [isVerifyLoading, setIsVerifyLoading] = useState(false); // State for loading
    const inputRefs = useRef([]); // Ref to hold input elements
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (e, index) => {
        const value = e.target.value;
        const newOtp = [...otp];

        if (/^[0-9]$/.test(value)) { // Ensure single digit
            newOtp[index] = value;
            setOtp(newOtp);

            // Focus next input
            if (index < otp.length - 1) {
                inputRefs.current[index + 1].focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const newOtp = [...otp];
            newOtp[index] = ''; // Clear current input

            setOtp(newOtp);

            if (index > 0) {
                // Move focus to the previous input on backspace
                inputRefs.current[index - 1].focus();
            }
        }
    };

    const handleVerify = async () => {
        setIsVerifyLoading(true); // Start loading state
        const otpString = otp.join(''); // Combine OTP array into a string
        
        try {
            // Send OTP to the backend for verification
            const response = await axios.post('http://localhost:3000/api/v1/verifyotp', { otp: otpString });

            if (response.data.success) {
                toast.success('OTP verified successfully!');
                
                // Delay the navigation to signup page by 1.5 seconds (1500 ms)
                setTimeout(() => {
                    navigate('/signup');
                }, 1500); // 1.5-second delay
            } else {
                toast.error('Invalid OTP. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
            toast.error('Failed to verify OTP. Please try again.');
        } finally {
            setIsVerifyLoading(false); // End loading state
        }
    };

    return (
        <div className="otp-container">
            <h2 className="otp-header">Enter OTP</h2>
            <div className="otp-inputs">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        type="text"
                        className="otp-input"
                        id={`otp-${index}`}
                        value={digit}
                        ref={(el) => inputRefs.current[index] = el} // Save ref to array
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)} // Handle backspace
                        maxLength="1" // Allow only one character
                        autoComplete='off'
                    />
                ))}
            </div>
            <button className="otp-verify-btn"
                disabled={isVerifyLoading}
                onClick={handleVerify}
            >
                {isVerifyLoading ? (
                    <div className='loader1'></div>
                ) : (
                    'Verify'
                )}
            </button>
            <ToastContainer />
        </div>
    );
};

export default Otp;
