import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../utility/login.css'; // For custom styles
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login', {
        email,
        password,
      });

      // Check response or handle success
      
      const { token,User } = response.data;

      // Store token in localStorage
      localStorage.setItem('authToken', token);
      

      // Log success message
      console.log('Login successful. Token stored.');

      navigate('/'); // Navigate to the dashboard or home page after successful login
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login-page">
      <div className="image-container"></div>
      <div className="form-container">
        <div className="login-box">
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={handleLogin}>
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
            <button type="submit" className="btn btn-primary w-100" onClick={handleLogin}>Sign In</button>
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="btn btn-primary w-100 mt-2"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
