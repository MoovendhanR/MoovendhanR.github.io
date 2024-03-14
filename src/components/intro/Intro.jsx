import "./intro.css";

import { FaAward } from "react-icons/fa";
import React from "react";
import { VscFolderLibrary } from "react-icons/vsc";
import ProfileImg from "../../assets/moovendhan.png";

const Intro = () => {
  return (
    <section id="about">
      <h5>Get to know</h5>
      <h2>About Me</h2>
      <div className="container about__container">
        <div className="about__me">
          <div className="about__me-image">
            {/* <img src={"https://github.com/MoovendhanR/MoovendhanR/assets/87975437/4eb478f7-61c8-483c-a801-04fc157612fc"} alt="Moovendhan R" /> */}
            <img src={ProfileImg} alt="Moovendhan R" />

          </div>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>2+ year</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Projects</h5>
              <small>10+ Completed Projects</small>
            </article>
          </div>
          <p>
            A seasoned Front End Developer with over two years of hands-on
            expertise in recognizing web-based user interactions and adeptly
            crafting highly responsive user interface components through the
            application of React principles. Proficient in translating design
            concepts and wireframes into top-notch code, demonstrating
            proficiency in JavaScript and React JS workflows. Possesses
            practical knowledge in full stack development, particularly in the
            MERN (MongoDB, Express.js, React, Node.js) stack. Demonstrates a
            keen ability to monitor and enhance frontend performance while
            effectively troubleshooting and debugging to optimize overall system
            functionality.
          </p>
          <a href="#contact" className="btn btn-primary">
            Let's Talk
          </a>
        </div>
      </div>
    </section>
  );
};

export default Intro;
