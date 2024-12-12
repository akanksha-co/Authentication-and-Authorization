import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Email.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Email() {
  const [isverifyloading, setisverifyloading] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (!email) {
      toast.error('Please enter an email address');
      return;
    }
    setisverifyloading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/sendotp', { email });
        if (response.status === 200) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate('/otp-page');
          }, 1500);
        }
      } catch (error) {
        toast.error('Failed to send verification email');
        console.error(error);
      } finally {
        setisverifyloading(false);
      }
    }, 1000);
  };

  return (
    <div className="email-container">
      <div className="heading"><h2 className="name">Signup</h2></div>
      <div className="input-container">
        <input
          type="email"
          id="email"
          className="email"
          required
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // <-- Added onChange handler
        />
        <label htmlFor="email" className="floating-label">Enter your email</label>
      </div>
      <div className='btn'>
        <button className="verify-btn"
          disabled={isverifyloading}
          onClick={handleVerify}
        >
          {isverifyloading ? (
            <div className='loader'></div>
          ) : (
            'verify'
          )}
        </button>
      </div>
      <div className="already-registered">
        <p>Already registered?</p>
        <button className="login-btn" onClick={() => window.location.href = '/login'}>
          Login
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Email;
