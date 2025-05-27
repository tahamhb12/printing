import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';
import supabase from '../helpler/supabaseClient';
import { UserAuth } from '../AuthContext/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate()
  const {session,signIn} = UserAuth()


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const result = await signIn({email : formData.email,password : formData.password})
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-box">
        <h1>Welcome Back</h1>
        <p className="login-page-subtitle">Please enter your details to sign in</p>
        
        <form onSubmit={handleSubmit} className="login-page-form">
          <div className="login-page-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="login-page-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="login-page-form-options">
            <div className="login-page-remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="login-page-forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-page-button">
            Sign In
          </button>

          {/* <p className="login-page-signup-link">
            Don't have an account? <a href="/register">Sign up</a>
          </p> */}
        </form>
      </div>
    </div>
  );
};

export default Login; 