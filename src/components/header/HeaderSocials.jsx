import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { FaFacebook, FaGithub, FaInstagram, FaMedium } from 'react-icons/fa';



const HeaderSocials = () => {
  return (
    <div className="header__socials">
      <a href="https://www.linkedin.com/in/rasif-tagizada/" target="_blank" rel="noreferrer" ><BsLinkedin /></a>
      <a href="https://github.com/Rasif-Taghizada" target="_blank" rel="noreferrer" ><FaGithub /></a>
      <a href="https://www.instagram.com/m__vendhan.ft/" target="_blank" rel="noreferrer" ><FaInstagram /></a>
      <a href="https://www.facebook.com/moovi.moovendhan" target="_blank" rel="noreferrer" ><FaFacebook /></a>
      <a href="https://medium.com/@moovendhanr1011" target="_blank" rel="noreferrer" ><FaMedium /></a>


    </div>
  )
}

export default HeaderSocials