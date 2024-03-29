import './contact.css';

import React, { useRef, useState } from 'react';

import { MdOutlineEmail, MdOutlinePhone } from 'react-icons/md';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [message, setMessage] = useState(false);
  const formRef = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(true);
    emailjs
      .sendForm(
        'service_mjz7rh9',
        'template_jjpb8rs',
        formRef.current,
        'upn7JPIy8Zmb_imhG'
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );

    e.target.reset();
  };
  return (
    <section id="contact">
      <h5>Get In Touch</h5>
      <h5>
        I do receive your messages and will respond asap if the valid email is
        provided :)
      </h5>
      <h2>Contact Me</h2>
      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
          <MdOutlinePhone className="contact__option-icon" />
            <h4>Mobile Number</h4>
            <h5>+91 7826839775</h5>
            <a href="tel:+91 7826839775">To call</a>
            <br />
            <br />
           
            <MdOutlineEmail className="contact__option-icon" />
            <h4>Email</h4>
            <h5>moovendhanr1011@gmail.com</h5>
            <a href="mailto:moovendhanr1011@gmail.com">Send a message</a>
          </article>
         
        </div>
        <form ref={formRef} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Full Name"
            name="ufrom_name"
            required
          />
          <input
            type="text"
            placeholder="Your Email"
            name="from_email"
            required
          />
          <textarea
            placeholder="Your message"
            rows="7"
            name="message"
            required
          ></textarea>
          <button type="submit" className="btn btn-primary">
            Send Message
          </button>
          {message && <span>Thanks, I'll reply ASAP :)</span>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
