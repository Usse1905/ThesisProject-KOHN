import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react'; // Import the Lucide icons

import "../ComponentsCss/OtherComponentsCss/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* About Us Section */}
        <div className="footer-section about">
          <h2 className="footer-title">About Us</h2>
          <p>
            At Carya, we are committed to making your car rental experience smooth and enjoyable, offering a variety of options for travelers across Tunisia.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h2 className="footer-title">Quick Links</h2>
          <ul>
            <li><a href="/allcars">Home</a></li>
            <li><a href="/AboutUs">About Us</a></li>
            <li><a href="/Company/Profile">Companies</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="footer-section contact">
          <h2 className="footer-title">Contact Us</h2>
          <p>Email: <a href="mailto:support@carya.com">support@carya.com</a></p>
          <p>Phone: <a href="tel:+21612345678">+216 1234 5678</a></p>

          {/* Social Media Icons (Lucide) */}
          <div className="socials">
            <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook size={24} />
            </a>
            <a href="#" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <Twitter size={24} />
            </a>
            <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Carya. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
