import React from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-section">
          <h3>Wizarding Travels</h3>
          <p>
            Bringing the magic of the wizarding world to Muggles since 1998.
            Explore magical destinations from the Harry Potter universe.
          </p>
          <div className="social-links">
            <a href="#" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li className="footer-link">
              <Link to="/">Home</Link>
            </li>
            <li className="footer-link">
              <Link to="/destinations">Magical Destinations</Link>
            </li>
            <li className="footer-link">
              <Link to="/houses">Hogwarts Houses</Link>
            </li>
            <li className="footer-link">
              <Link to="/about">About Us</Link>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Platform 9¾, King's Cross Station</p>
          <p>London, United Kingdom</p>
          <p>Email: owl@wizardingtravels.com</p>
          <p>Phone: +44 20 7946 0123</p>
        </div>
      </div>

      <div className="copyright container">
        <p>&copy; {new Date().getFullYear()} Wizarding Travels. All rights reserved.</p>
        <p>
          <small>
            This is a fan-made website. Harry Potter and all associated names are
            property of Warner Bros. and J.K. Rowling.
          </small>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
