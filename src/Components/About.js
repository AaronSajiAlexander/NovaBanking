// About.js
import React from 'react';
import './About.css';
import Navbar from './Navbar';
import Footer from './Footer';

const About = () => {
  return (
    <div>
         <Navbar />
      <h2>About Nova Banking</h2>

      <p>Welcome to Nova Banking, your trusted partner in financial management. Established on January 1, 2020, we have been dedicated to providing innovative and secure banking solutions to our valued customers.</p>

      <p>At Nova Banking, we prioritize the seamless and secure management of your finances. Our internet banking platform is designed to make banking convenient, efficient, and accessible from anywhere in the world.</p>

      <h3>Our Mission</h3>
      <p>Our mission is to empower individuals and businesses by providing cutting-edge banking services that foster financial growth, security, and peace of mind.</p>

      <h3>Core Values</h3>
      <ul>
        <li>Security: Your financial security is our top priority. We employ the latest technologies to ensure the protection of your sensitive information.</li>
        <li>Innovation: We strive to stay ahead in the dynamic landscape of financial technology, bringing you the latest features and advancements in banking services.</li>
        <li>Customer-Centric: Your satisfaction is at the heart of everything we do. We are committed to delivering a superior banking experience tailored to your needs.</li>
      </ul>

      <h3>Meet the Developers</h3>
      <p>Our dedicated team of developers has worked tirelessly to bring Nova Banking to life. Meet the minds behind our innovative platform:</p>
      
      <ul>
        <li><strong>Lavanya Pidikiti:</strong> Lead Developer</li>
        <li><strong>Monica:</strong> Frontend Developer</li>
        <li><strong>Aaron:</strong> Backend Developer</li>
        <li><strong>Athael Raj James:</strong> Backend Developer</li>
      </ul>
      
      <p>Thank you for choosing Nova Banking for your banking needs. We look forward to serving you with excellence.</p>
      <Footer />
    </div>
  );
};

export default About;
