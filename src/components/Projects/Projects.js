import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import mariott from "../../Assets/Projects/mariott.jpg";
import nordstrom from "../../Assets/Projects/nordstrom.jpg";
import snapdeal from "../../Assets/Projects/snapdeal.jpg";
import sephora from "../../Assets/Projects/sephora.jpg";
import expedia from "../../Assets/Projects/expedia.png";
import anthro from "../../Assets/Projects/anthro.png";







function Projects() {
  return (
    <Container id="projects" fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={nordstrom}
              isBlog={false}
              isDeploy={true}
              isAblog={true}
              title="Nordstrom"
              description="Nordstrom is an online e-commerce website. It's a leading fashion retailer offering compelling clothing, shoes, and accessories for men, women, and kids. We are five person team worked on this project for six days. My Participation This Project has a Header and Footer for all page. We Mainly focused in this project only frentend."
              links=" https://vibrantachintya.github.io/nordstrom/"
              link=" https://github.com/vibrantachintya/nordstrom"
               blog=" https://medium.com/@achintyagaumat/nordstrom-website-construct-week-unit-2-920762dd85b6"
             // techstack="TECH-STACKS : ReactJs, mongoDb, Express.js, Node.js, react-jinke-music-player"
             techstack="TECH-STACKS : HTML, CSS, DOM, JavaScript"
              storage="DATABASE : Local Storage."

            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={mariott}
              isBlog={false}
              isDeploy={true}
              isAblog={true}
              title="Mariott Bonvoy"
              description="Mariott Bonvoy is an online application that acts as a Multi-National Hotel Booking Platform for people to Book Hotels. We were a five-person team that worked on this project for five days. My Participation This Project has a Header, Footer for all page and user authendication. We developed only frontend in this project."
              link="https://github.com/AmbaliyaDhruv/Marriott_Bonvoy_clone.github.io"
              links="https://marriott-bonvoy-clone.netlify.app/"
              blog="https://medium.com/@sai-nikhil/cloning-marriott-bonvoy-af86490fbdd6"
              //techstack="TECH-STACKS: EJS, CSS, mongoDb, ES6 JS, Express.js, Node.js."
              techstack="TECH-STACKS : HTML, CSS, DOM, JavaScript"
              storage="DATABASE : Local Storage"
            />
          </Col>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={snapdeal}
              isBlog={false}
              isDeploy={true}
              isAblog={true}
              title="Snapdeal"
              description="It is an e-commerce web application that allows users to buy all items in online. We were a five-person team that worked on this project for five days. The Payment page & Sorting Features is my contribution to this project. We have built a complete e-commerce flow and we used both Frendend and Backend."
              link="https://github.com/kirankumar3117/snapdeal-unit4"
              links="https://friendly-sable-65643a.netlify.app/"
              blog="https://medium.com/@debasishparhi544/the-project-on-e-commerce-web-on-masai-school-c09d60975a2"
            //  techstack="TECH-STACKS : HTML, CSS, DOM, JavaScript"
            techstack="TECH-STACKS: EJS, CSS, mongoDb, ES6 JS, Express.js, Node.js."
              storage="DATABASE : MongoDb Atlas"

            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={sephora}
              isBlog={false}
              isDeploy={true}
              isAblog={true}
              title="Sephora"
              description="
              Makeup, Skincare, Fragrance, Hair &amp; Beauty Products | Sephora is an online application that acts as an e-commerce platform for people to purchase various Makeup items. An Individual project developed within a week. I mainly focused on developing Frontend in this project."
              links="https://peaceful-kare-8f9905.netlify.app/"
              link=" https://github.com/MoovendhanR/project-sephora.com"
              blog="https://medium.com/@moovendhanr1011/cloning-cosmetics-beauty-products-fragrances-amp-tools-sephora-f88d426f1fb3"
              techstack="TECH-STACKS : HTML, CSS, DOM, ES6 JS, localStorage concept"
              storage="DATABASE : Local Storage"
            />
          </Col>
          

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={expedia}
              isBlog={false}
              isDeploy={true}
              isAblog={true}
              title="Expedia"
              description="
              Expedia.co.in is an online travel agency owned by Expedia Group, an Indian online travel shopping company based in Place. The website and mobile app can be used to book airline tickets, hotel reservations, car rentals, cruise ships, and vacation packages."
              links="https://expedia-co-in-clone.netlify.app/"
              link="https://github.com/MoovendhanR/project-expedia-clone"
              blog="https://github.com/MoovendhanR/project-expedia-clone#readme"
              techstack="TECH-STACKS: ReactJS,Redux,Chakra UI,NodeJS,ExpressJS,MongoDB."
              storage="DATABASE : MongoDb Atlas"
            />
          </Col>



          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={anthro}
              isBlog={false}
              isDeploy={true}
              isAblog={true}
              title="Anthropologie"
              description="
              Anthropologie is an American clothing retailer with approximately 200 stores across the U.S., Canada, and UK that offers an assortment of clothing, jewelry, home furniture, decoration, beauty products, and gifts. Anthropologie is part of URBN brands, which includes Urban Outfitters, Free People, BHLDN, and Terrain."
              links="https://anthropologie-clone.vercel.app/"
              link="https://github.com/Aniketkushwaha80/anthropologie-clone"
              blog="https://medium.com/@moovendhanr1011/anthropologie-website-clone-construct-week-unit-5-cf6c4438e841"
              techstack="TECH-STACKS: Reactjs, Node js, Expressjs, Heroku . "
              storage="DATABASE : MongoDb Atlas"
            /> 
          </Col>



        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
