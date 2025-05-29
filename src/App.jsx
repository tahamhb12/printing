import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import TopBar from './components/topbar/TopBar'
import Hero from './components/hero/Hero'
import Statistics from './components/statistics/Statistics'
import PopularProducts from './components/popularProducts/PopularProducs'
import Benefits from './components/benefits/Benefits'
import Categories from './components/categories/Categories'
import Creations from './components/creations/Creations'
import Footer from './components/footer/Footer'
import Testimonials from './components/testimonials/Testimonials'
import Contact from './components/contact/Contact'
import AllProducts from './pages/AllProducts'
import ContactPage from './pages/ContactPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ProductDetails from './pages/ProductDetails'
import { AuthContextProvider, UserAuth } from './AuthContext/AuthContext'
import StatisticsNumbers from './components/statisticsNumbers/StatisticsNumbers'

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
          <TopBar />
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <StatisticsNumbers />
                  <Statistics />
                  <Categories />
                  <PopularProducts />
                  <Benefits />
                  <Creations />
                  <Testimonials />
                </>
              } />
              <Route path="/products" element={<AllProducts />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              {/* <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } /> */}
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
