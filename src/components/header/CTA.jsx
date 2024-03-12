import React from 'react';
// import CV from '../../assets/Moovendhan-r-resume.pdf';

const CTA = () => {
  return (
    <div className="cta">
      <a href={"https://drive.google.com/file/d/1ycANWGHgPUGeE3f6RSaEzNqzKK2NQl4z/view"} download className="btn">
        Download CV
      </a>
      <a href="#contact" className="btn btn-primary">
        Let's talk
      </a>
    </div>
  );
};

export default CTA;
