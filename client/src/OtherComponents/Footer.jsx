import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react'; 
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
          <ul className="quick-links-list">
            <li><a href="/allcars">Home</a></li>
            <li><a href="/AboutUs">About Us</a></li>
            <li><a href="/Company/Profile">Companies</a></li>
            <li><a href="/contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-section contact">
          <h2 className="footer-title">Contact Us</h2>
          <p>Email: <a href="mailto:support@carya.com">support@carya.com</a></p>
          <p>Phone: <a href="tel:+21612345678">+216 1234 5678</a></p>

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

      <div className="footer-map-section">
        <h2 className="footer-title">Find Us</h2>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509379!2d144.95592831586155!3d-37.81720997975156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf57792e372bc38ab!2sTunisia!5e0!3m2!1sen!2sus!4v1698419290405"
          width="300"
          height="150"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Carya Location"
        ></iframe>
      </div>


      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Carya. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
