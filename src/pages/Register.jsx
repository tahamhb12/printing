import React, { useState } from 'react';
import '../styles/Register.css';
import supabase from '../helpler/supabaseClient';
import { UserAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const {session,signUp} = UserAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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
      const result = await signUp({email : formData.email,password : formData.password})
    } catch (error) {
      alert(error.message)
    }
  };

  return (
    <div className="register-page-container">
      <div className="register-page-box">
        <h1>Create Account</h1>
        <p className="register-page-subtitle">Please fill in your details to sign up</p>
        
        <form onSubmit={handleSubmit} className="register-page-form">
{/*           <div className="register-page-form-row">
            <div className="register-page-form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your first name"
                required
              />
            </div>

            <div className="register-page-form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your last name"
                required
              />
            </div>
          </div> */}

          <div className="register-page-form-group">
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

          <div className="register-page-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              required
            />
          </div>

{/*           <div className="register-page-form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              required
            />
          </div> */}

          <div className="register-page-terms">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>
            </label>
          </div>

          <button type="submit" className="register-page-button">
            Create Account
          </button>

          <p className="register-page-login-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register; 