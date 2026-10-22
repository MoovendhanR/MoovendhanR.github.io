import "./intro.css";

import { FaAward } from "react-icons/fa";
import React from "react";
import { VscFolderLibrary } from "react-icons/vsc";
import ProfileImg from "../../assets/moovendhan-profile.png";

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
          <span className="about__me-badge">MERN · TypeScript</span>
        </div>
        <div className="about__content">
          <div className="about__cards">
            <article className="about__card">
              <FaAward className="about__icon" />
              <h5>Experience</h5>
              <small>5+ years hands-on</small>
            </article>
            <article className="about__card">
              <VscFolderLibrary className="about__icon" />
              <h5>Production work</h5>
              <small>1,600+ commits across 7 codebases</small>
            </article>
          </div>
          <p>
            I build fintech products that move real money and real paperwork,
            end to end. I'm a full-stack engineer with 5+ years of hands-on
            experience building web applications in JavaScript and TypeScript.
          </p>
          <p>
            At FinRight, I work across the whole stack of a Provident Fund
            (EPF/CMPF) services platform and its sister product, Thefynprint:
            Cashfree payments and subscriptions, Playwright automation for
            government portals, an AI agent that files EPFO claims, member
            dashboards, a CMS and a mobile app. I take features from
            requirement to API design, UI, tests and deployment on AWS.
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
