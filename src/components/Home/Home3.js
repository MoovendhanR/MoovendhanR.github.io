import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particle";
//import pdf from "../../Assets/jeevan_prasad.pdf";
//import { AiOutlineDownload } from "react-icons/ai";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
const resumeLink ="https://drive.google.com/file/d/1ycANWGHgPUGeE3f6RSaEzNqzKK2NQl4z/view?usp=sharing";
function Home3() {

  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Col md={12} className="home-about-social">
          <h1>FIND ME ON</h1>
          <p>
            Feel free to <span className="purple">connect </span>with me
          </p>
          <ul className="home-about-social-links">
            <li className="social-icons">
              <a
                href="https://github.com/MoovendhanR"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://twitter.com/moovend28189493"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <AiOutlineTwitter />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/moovendhan-r-b5756a21a/"
                target="_blank"
                rel="noreferrer"
                className="icon-colour  home-social-icons"
              >
                <FaLinkedinIn />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.instagram.com/moovissbentley/"
                target="_blank"
                rel="noreferrer"
                className="icon-colour home-social-icons"
              >
                <AiFillInstagram />
              </a>
            </li>
          </ul>
        </Col>
      </Container>
      <h3>Contact No:<p style={{color: "white"}}>+917708692046</p></h3>
      {/* <h3>Email:<p style={{color: "rgb(240, 25, 90)"}}>moovendhanr1011@gmail.com</p></h3> */}
      <h3>Email:<p style={{color: "white"}}>moovendhanr1011@gmail.com</p></h3>

      <Container>
        <Particle />
        <Row style={{ justifyContent: "center", position: "relative" }}>
          <Button variant="primary" href={resumeLink} target="_blank">
            &nbsp;Download CV
          </Button>
        </Row>
      </Container>
    </Container>
  );
}
export default Home3;
