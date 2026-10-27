import React from 'react';
import './work.css';

const Work = () => {
  const jobs = [
    {
      id: 1,
      role: 'Full-Stack Engineer',
      company: 'FinRight',
      period: 'Jan 2025 – Present',
      location: 'Bengaluru · Remote',
      points: [
        'Built the auth and subscription service in Node.js, Express and MongoDB, with Cashfree e-mandate and one-time payments, webhooks and failure tracking',
        'Built Playwright/Puppeteer automation for the EPFO and CMPF portals, running on BullMQ/Redis job queues',
        'Built an AI claim agent with LangChain and Azure OpenAI that fills in and submits EPFO claims, recovers from failures and resumes after a crash',
        'Shipped member and ops dashboards in React and TypeScript, plus the Thefynprint CMS, reader app and React Native mobile app',
      ],
      stack: 'Node.js · React · TypeScript · MongoDB · Redis · Playwright · LangChain · AWS',
    },
    {
      id: 5,
      role: 'Freelance Developer',
      company: 'Independent',
      period: 'Alongside full-time roles',
      location: 'Remote',
      points: [
        'Delivered 5+ freelance projects for clients, owning each one end to end: scoping, design, build and deployment',
      ],
      stack: 'Client work · End to end',
    },
    {
      id: 2,
      role: 'React Developer',
      company: 'SA Digital Solutions',
      period: 'Aug 2023 – Nov 2024',
      location: 'Bengaluru',
      points: [
        'Led the rebuild of the ProLegal Serve dashboard in React, TypeScript and Mantine UI, improving navigation and accessibility',
        'Built the frontend of Learn Indian Cuisine, an AI-powered recipe-learning platform',
      ],
      stack: 'React · TypeScript · Mantine UI',
    },
    {
      id: 3,
      role: 'UI/UX Designer & React Developer',
      company: 'Scintillate Alliance',
      period: 'May 2023 – Aug 2023',
      location: 'Bengaluru',
      points: [
        'Designed wireframes, prototypes and UI systems in Figma for client web apps and landing pages',
        'Turned approved designs into responsive, pixel-accurate React components',
      ],
      stack: 'Figma · React · CSS',
    },
    {
      id: 4,
      role: 'Full-Stack Development Apprenticeship',
      company: 'Masai School',
      period: 'Sep 2021 – Apr 2023',
      location: 'Bengaluru',
      points: [
        '1,000+ hours of the MERN stack, data structures and algorithms, with team and solo product clones',
      ],
      stack: 'MongoDB · Express · React · Node.js',
    },
  ];

  return (
    <section id="work">
      <h5>Where I've Worked</h5>
      <h2>Experience</h2>
      <div className="container work__container">
        {jobs.map((job) => (
          <article className="work__item" key={job.id}>
            <div className="work__header">
              <div>
                <h3>{job.role}</h3>
                <h4>{job.company}</h4>
              </div>
              <div className="work__meta">
                <span>{job.period}</span>
                <small>{job.location}</small>
              </div>
            </div>
            <ul className="work__points">
              {job.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="work__stack">{job.stack}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Work;
