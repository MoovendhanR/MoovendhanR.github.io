import React from 'react';
import { BsFillPatchCheckFill } from 'react-icons/bs';
import './experience.css';

const Experience = () => {
  const skillGroups = [
    {
      title: 'Front-end Development',
      skills: ['React.js', 'TypeScript', 'JavaScript', 'React Native', 'Tailwind CSS', 'shadcn/ui', 'TanStack Query', 'Zustand'],
    },
    {
      title: 'Back-end Development',
      skills: ['Node.js', 'Express', 'MongoDB', 'Redis', 'BullMQ', 'Socket.IO', 'REST APIs', 'Meilisearch'],
    },
    {
      title: 'Automation, AI & Payments',
      skills: ['Playwright', 'Puppeteer', 'LangChain', 'Azure OpenAI', 'Cashfree', 'node-cron'],
    },
    {
      title: 'Cloud, Testing & Tools',
      skills: ['AWS (EC2, S3, SES)', 'PM2', 'Jest', 'Vitest', 'Git & GitHub', 'Figma'],
    },
  ];

  return (
    <section id="skills">
      <h5>The Skills I Have</h5>
      <h2>Skills</h2>
      <div className="container experience__container">
        {skillGroups.map((group) => (
          <div className="experience__frontend" key={group.title}>
            <h3>{group.title}</h3>
            <div className="experience__content">
              {group.skills.map((skill) => (
                <article className="experience__details" key={skill}>
                  <BsFillPatchCheckFill className="experience__details-icon" />
                  <h4>{skill}</h4>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Experience
