import React from 'react';
// import CV from '../../assets/Moovendhan-r-resume.pdf';

const CTA = () => {
  return (
    <div className="cta">
      <a href="./Moovendhan-R-Resume.pdf" download="Moovendhan-R-Resume.pdf" className="btn">
        Download CV
      </a>
      <a href="#contact" className="btn btn-primary">
        Let's talk
      </a>
    </div>
  );
};

export default CTA;
