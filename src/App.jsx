import React from 'react';
import Contact from './components/contact/Contact';
import Experience from './components/experience/Experience';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Intro from './components/intro/Intro';
import Portfolio from './components/portfolio/Portfolio';
import Testimonials from './components/testimonials/Testimonials';
import Topbar from './components/topbar/Topbar';
import Work from './components/work/Work';
import Journey from './journey/Journey';

const supportsWebGL = () => {
  try {
    const canvas = document.createElement('canvas');
    return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl'));
  } catch (e) {
    return false;
  }
};

// The 3D journey is the default; ?view=classic (or no WebGL) shows the classic site.
const showJourney = new URLSearchParams(window.location.search).get('view') !== 'classic' && supportsWebGL();

const App = () => {
  if (showJourney) return <Journey />;

  return (
    <>
      <Header />
      <Topbar />
      <Intro />
      <Work />
      <Experience />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  )
}

export default App
