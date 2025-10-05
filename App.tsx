
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Courses from './components/Courses';
import Testimonials from './components/Testimonials';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import Banner from './components/Banner';
import MDProfile from './components/MDProfile';
import FAQ from './components/FAQ';
import Stats from './components/Stats';
import Reveal from './components/Reveal';

const App: React.FC = () => {
  return (
    <div className="bg-brand-light font-sans text-brand-dark">
      <Banner />
      <Header />
      <main>
        <Hero />
        <Reveal><About /></Reveal>
        <Reveal><MDProfile /></Reveal>
        <Reveal><Features /></Reveal>
        <Reveal><Stats /></Reveal>
        <Reveal><Courses /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal><InquiryForm /></Reveal>
      </main>
      <Footer />
    </div>
  );
};

export default App;