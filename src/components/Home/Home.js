import React from "react";
import { Container, Row, Col,Image} from "react-bootstrap";
import moovendhanPic from "../../Assets/moovendhan.png";
import Particle from "../Particle";
import Type from "./Type";
import "../../../src/style.css"

// import {
//   AiFillGithub,
//   AiFillInstagram,
// } from "react-icons/ai";
// import { FaLinkedinIn } from "react-icons/fa";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Hi There! <span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
              </h1>

              <h1 className="heading-name">
                I'm
                <strong className="main-name"> Moovendhan R</strong>
              </h1>

              <div style={{ padding: 50, paddingLeft: 50, paddingBottom: 0, textAlign: "left" }}>
                <Type />
                <p style={{ paddingTop: 40, textAlign: "justify" }}>I've been interested in web development since I was in college, which led to a career as a Full-Stack Web Developer with a focus on MERN Stack, JavaScript, HTML, and CSS. </p>
              </div>


            </Col>
            <Col md={5} style={{ paddingBottom: 20 }}>
              <Image  style={{ borderRadius:"50%",width:"300px" }} src={moovendhanPic} alt="Profilepic" className="img-fluid1" />
            </Col>
          </Row>
        </Container>
      </Container>

    </section>
  );
}

export default Home;
