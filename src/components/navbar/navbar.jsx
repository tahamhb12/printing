import { useState } from 'react'
import logo from './logo.png'
import './navbar.css'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import supabase from '../../helpler/supabaseClient';
import { UserAuth } from '../../AuthContext/AuthContext';


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };
    const {session,signOut} = UserAuth()

    return ( 
        <nav>
            <div className="container">
                <div className="logo">
                    <img src={logo} alt="logo" />
                </div>
                <div className={`links ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" onClick={closeMenu}>Home</Link>
                    <Link to="/categories-products" onClick={closeMenu}>Categories</Link>
                    <Link to="/contact" onClick={closeMenu}>Contact Us</Link>
                    {!session?.user && <Link to="/login" onClick={closeMenu}>Login</Link>}
                    {/* {!session?.user && <Link to="/register" onClick={closeMenu}>Sign Up</Link>} */}
                    {session?.user &&<Link to='/dashboard' onClick={closeMenu}>Dashboard</Link>}
                    {session?.user &&<Link className="auth-button" onClick={() => { closeMenu(); signOut(); }}>Logout</Link>}
                </div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    <div className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
     );
}
 
export default Navbar;