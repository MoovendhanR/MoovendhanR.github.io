import React from 'react';
import CTA from './CTA';
import HeaderSocials from './HeaderSocials';
import './header.css';

const Header = () => {
  return (
    <header id="home">
      <div className="container header__container">
        <h5>Hello I'm</h5>
        <h1>Moovendhan R</h1>
        <h5 className="text-light">Full-Stack Engineer @ FinRight</h5>
        <p className="header__tagline">
          Fintech · Payments · Browser Automation · AI Agents
        </p>
        <span className="header__badge">Open to Full-Stack / Backend roles</span>
        <a href="./" className="header__journey">Take the 3D journey →</a>
        <CTA />
        <a href="#contact" className="scroll__down">
          Scroll Down
        </a>
        <HeaderSocials />
      </div>
    </header>
  );
};

export default Header;
