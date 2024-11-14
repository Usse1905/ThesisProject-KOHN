
import React from 'react';
import "../ComponentsCss/OtherComponentsCss/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-title">About Us</h2>
          <p>
            At Carya, we are committed to making your car rental experience smooth and enjoyable, offering a variety of options for travelers across Tunisia.
          </p>
        </div>
        
        <div className="footer-section links">
          <h2 className="footer-title">Quick Links</h2>
          <ul>
            <li><a href="/allcars">Home</a></li>
            <li><a href="/AboutUs">About Us</a></li>
            <li><a href="/Company/Profile">Companies</a></li>
            <li><a href="/contact"></a></li>
          </ul>
        </div>
        
        <div className="footer-section contact">
          <h2 className="footer-title">Contact Us</h2>
          <p>Email: support@tunisiacarrentals.com</p>
          <p>Phone: +216 1234 5678</p>
          <div className="socials">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Carya. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
