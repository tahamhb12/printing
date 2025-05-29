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
        <h1>Bienvenue de Nouveau</h1>
        <p className="login-page-subtitle">Veuillez entrer vos informations pour vous connecter</p>
        
        <form onSubmit={handleSubmit} className="login-page-form">
          <div className="login-page-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrez votre email"
              required
            />
          </div>

          <div className="login-page-form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>

          <div className="login-page-form-options">
            <div className="login-page-remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Se souvenir de moi</label>
            </div>
            <a href="#" className="login-page-forgot-password">Mot de passe oublié ?</a>
          </div>

          <button type="submit" className="login-page-button">
            Se connecter
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