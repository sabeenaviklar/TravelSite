import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import '../../assets/styles/header.css';
import wizardingLogo from '../../assets/images/logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container header-container">
        <div className="logo">
          <Link to="/">
            <img src={wizardingLogo} alt="Wizarding Travels Logo" />
            <h1>Wizarding Travels</h1>
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          ☰
        </button>

        <nav>
          <ul className={`nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
            <li className="nav-item">
              <Link 
                to="/" 
                className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/destinations" 
                className={`nav-link ${location.pathname.includes('/destinations') ? 'active' : ''}`}
              >
                Magical Destinations
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/houses" 
                className={`nav-link ${location.pathname === '/houses' ? 'active' : ''}`}
              >
                Hogwarts Houses
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/about" 
                className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                About
              </Link>
            </li>
          </ul>
        </nav>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.name}</span>
              <button className="btn btn-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/signup" className="btn btn-secondary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
