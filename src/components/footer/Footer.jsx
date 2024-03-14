import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaFacebook, FaGithub, FaInstagram, FaMedium } from 'react-icons/fa';
import './footer.css';

const Footer = () => {
  return (
    <footer>
      <a href="#home" className="footer__logo">Moovendhan R</a>
      <ul className="permalinks">
        <li><a href="#home">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#project">Projects</a></li>
        <li><a href="#testmonials">Testimonials</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className="footer__socials">
      <a href="https://www.linkedin.com/in/moovendhan-r/" target="_blank" rel="noreferrer" ><BsLinkedin /></a>
      <a href="https://github.com/MoovendhanR" target="_blank" rel="noreferrer" ><FaGithub /></a>
      <a href="https://www.instagram.com/m__vendhan.ft/" target="_blank" rel="noreferrer" ><FaInstagram /></a>
      <a href="https://www.facebook.com/moovi.moovendhan" target="_blank" rel="noreferrer" ><FaFacebook /></a>
      <a href="https://medium.com/@moovendhanr1011" target="_blank" rel="noreferrer" ><FaMedium /></a>



      </div>
      <div className="footer__copyright">
        <small>&copy; ET 2022. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer