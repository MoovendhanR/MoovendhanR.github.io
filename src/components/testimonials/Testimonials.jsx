import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { Pagination } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      link: 'https://www.linkedin.com/in/sainath-reddy-19b2391aa/',
      name: 'Sainath Reddy',
      role: 'Senior iOS developer',
      test: 'As a developer and a problem solver, I think Moovendhan is a great collaborative partner to have. I met Moovendhan in some basic javascript & react projects and since then he has drastically progressed in him understanding of the development process. He always has a professional environment and has good audio and video quality which makes it easier to communicate with him.',
    },
    {
      id: 2,
      link: 'https://www.linkedin.com/in/shahid-afridi-0ab441152/',
      name: 'Shahid Afridi ',
      role: 'Application Engineer L1',
      test: 'Being working as an application engineer I could notice Moovendhan is an out of the box smart working person. We worked on an internship during our academic days where he demonstrated multiple skills which later led him to become a full stack developer. I wouldn’t step back in assuring his professionalism, best demonstration and project building skills using latest tools and technology. Learning is a key to keep updated is what I noticed in him.',
    },
    {
      id: 3,
      link: 'https://www.linkedin.com/in/anwardeenm/',
      name: 'Anwardeen MaideenPichai',
      role: 'Project Software Engineer- TIFR',
      test: 'Working with Moovendhan on numerous projects during our time at Masai has been an exceptional experience. His expertise spans a wide spectrum, including React, Node.js, JavaScript, MongoDB, and more. What truly sets Moovendhan apart is his passion for problem-solving and unwavering commitment to delivering solutions consistently. He excels in dynamic environments, effortlessly adapting to new challenges.Beyond his technical abilities, Moovendhan is a skilled communicator and collaborator. His proficiency in both technical and interpersonal skills greatly enhances project outcomes.I wholeheartedly recommend Moovendhan as a full stack developer due to his expertise, strong work ethic, and collaborative spirit. I have no doubt that he will continue to grow and succeed in his career.',
    },
    
 
  ];
  return (
    <section id="testmonials">
      <h5>Feedback from my peers</h5>
      <h2>Testimonials</h2>
      <Swiper 
        className="container testimonials__container"
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
        >
        {testimonials.map((test) => (
          <SwiperSlide className="testimonial" key={test.id}>
          <div className="client__avatar">
            <a href={test.link}>
              <BsLinkedin />
            </a>
          </div>
          <h5 className='client__name'>{test.name}</h5>
          <small className="client__review">{test.test}</small>
        </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default Testimonials