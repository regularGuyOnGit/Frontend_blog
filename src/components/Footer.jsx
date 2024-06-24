import React from "react";
import "../styles/footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-sections">
          <div className="footer-section">
            <h4>About Us</h4>
            <p>
              We are a team of passionate bloggers sharing insights and stories
              about various topics. Follow us to stay updated!
            </p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <li>
                <Link to={"/"}>About</Link>
              </li>
              <li>
                <Link to={"/"}>Contact</Link>
              </li>
              <li>
                <Link to={"/"}>Privacy</Link>
              </li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: info@blog.com</p>
            <p>Phone: +123 456 7890</p>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank">
                Instagram
              </a>
              <a href="https://linkedin.com" target="_blank">
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 Odin Blog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
