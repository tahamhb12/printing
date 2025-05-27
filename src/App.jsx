import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import Hero from './components/hero/Hero'
import Statistics from './components/statistics/Statistics'
import PopularProducts from './components/popularProducts/PopularProducs'
import Benefits from './components/benefits/Benefits'
import Categories from './components/categories/Categories'
import Creations from './components/creations/Creations'
import Footer from './components/footer/Footer'
import Testimonials from './components/testimonials/Testimonials'
import Contact from './components/contact/Contact'
import HowItWorks from './components/howitworks/HowItWorks'
import CategoryProductPage from './pages/CategoryProductPage'
import ContactPage from './pages/ContactPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { AuthContextProvider, UserAuth } from './AuthContext/AuthContext'

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { session } = UserAuth();
  if (!session) {
    return <Navigate to="/login" />;
  }
  return children;
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { session } = UserAuth();
  if (session) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};


function App() {
  return (
    <Router>
      <AuthContextProvider>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <Statistics />
                  <PopularProducts />
                  <Categories />
                  <Benefits />
                  <Creations />
                  <Testimonials />
                  <HowItWorks />
                </>
              } />
              <Route path="/categories-products" element={<CategoryProductPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
              }/>
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthContextProvider>
    </Router>
  )
}

export default App
