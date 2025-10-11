
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Courses from './components/Courses';
import InquiryForm from './components/InquiryForm';
import Footer from './components/Footer';
import FAQ from './components/FAQ';
import Stats from './components/Stats';
import Reveal from './components/Reveal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsAndConditions from './components/TermsAndConditions';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={
        <div className="bg-brand-light font-sans text-brand-dark">
          <Header />
          <main>
            <Hero />
            <Reveal><About /></Reveal>
            <Reveal><Features /></Reveal>
            <Reveal><Stats /></Reveal>
            <Reveal><Courses /></Reveal>
            <Reveal><FAQ /></Reveal>
            <Reveal><InquiryForm /></Reveal>
          </main>
          <Footer />
        </div>
      } />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
    </Routes>
  );
};

export default App;