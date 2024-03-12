import "./portfolio.css";

import IMG1 from "../../assets/nordstrom.png";
import IMG2 from "../../assets/mariott.png";
import IMG3 from "../../assets/sephora.png";
import IMG4 from "../../assets/snapdeal.png";
import IMG5 from "../../assets/expedia.png";
import IMG6 from "../../assets/anthropology.png";
import React from "react";

//Portfolio function
const Portfolio = () => {
  const soloProjects = [
    {
      id: 1,
      title: "Nordstrom Clone",
      img: IMG1,
      description:
        "Nordstrom: Upscale American department store known for fashion and luxury retail.",
      technologies: "Html | CSS | Javascript | localStorage",
      link: "https://vibrantachintya.github.io/nordstrom/",
      github: "https://github.com/vibrantachintya/nordstrom",
    },
    {
      id: 2,
      title: "Mariott Bonvoy Clone",
      img: IMG2,
      description:
        "Marriott Bonvoy: Global hotel loyalty program with exclusive member perks.",
      technologies: "HTML | CSS | JavaScript | localStorage",
      link: "https://marriott-bonvoy-clone.netlify.app/",
      github: "https://github.com/AmbaliyaDhruv/Marriott_Bonvoy_clone.github.io",
    },
    {
      id: 3,
      title: "Snapdeal Clone",
      img: IMG4,
      description: "It's an Indian e-commerce platform offering a wide range of products and services.",
      technologies: "HTML | CSS | JavaScript | mongo DB | Express | Node.js",
      link: "https://friendly-sable-65643a.netlify.app/",
      github: "https://github.com/kirankumar3117/snapdeal-unit4",
    },
    {
      id: 4,
      title: "Sephora Clone",
      img: IMG3,
      description:
        "Sephora:Leading beauty retailer offering a wide range of cosmetics, skincare, and fragrance products.",
      technologies: "Html | CSS | JavaScript | localStorage",
      link: "https://peaceful-kare-8f9905.netlify.app/",
      github: "https://github.com/MoovendhanR/project-sephora.com",
    },
    {
      id: 5,
      title: "Anthropologie Clone",
      img: IMG6,
      description:
        "Anthropologie: URBN brand, offers diverse clothing, jewelry, home goods, and gifts across 200 stores in the U.S., Canada, and the UK.",
      technologies: "Reactjs | Node js | Expressjs | Mongo DB",
      link: "https://anthropologie-clone.vercel.app/",
      github: "https://github.com/Aniketkushwaha80/anthropologie-clone",
    },
    {
      id: 6,
      title: "Expedia Clone",
      img: IMG5,
      description:
        "Expedia.co.in is an online travel agency owned by Expedia Group, an Indian online travel shopping company based in Place.",
      technologies: "ReactJS | Redux | Chakra UI | NodeJS | ExpressJS | MongoDB",
      link: "https://expedia-co-in-clone.netlify.app/",
      github: "https://github.com/MoovendhanR/project-expedia-clone",
    },
  ];

  return (
    <section id="project">
      <h5>My Recent Work</h5>
      <h2>Projects</h2>

      <div className="container portfolio__container">
        {soloProjects.map((pro) => (
          <article className="portfolio__item" key={pro.id}>
            <div className="portfolio__item-image">
              <img src={pro.img} alt={pro.title} />
            </div>
            <div className="portfolio__item-content">
              <h3>{pro.title}</h3>
              <p>{pro.description}</p>
              <p >{pro.technologies}</p>
            </div>
            <div className="portfolio__item-cta">
              <a
                href={pro.github}
                target="_blank"
                className="btn"
                rel="noreferrer"
              >
                GitHub
              </a>
              <a
                href={pro.link}
                target="_blank"
                className="btn btn-primary"
                rel="noreferrer"
              >
                Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Portfolio;
