import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utility/signup.css'; // For custom styles
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    // Optional: Add validation for password match
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register', {
        name,
        email,
        password,
      });

      // Check response or handle success
      console.log('Signup successful:', response.data);
      navigate('/login'); // Navigate to login page after successful signup
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="signup-page d-flex">
      <div className="image-container">
       
      </div>
      <div className="form-container d-flex align-items-center justify-content-center">
        <div className="signup-box p-4 shadow rounded">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group mb-4">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <button onClick={()=>navigate('/login')} className="btn btn-primary w-100 my-2">Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
