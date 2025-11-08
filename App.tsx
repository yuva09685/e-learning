
import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
  const location = useLocation();

  useEffect(() => {
    const GA_MEASUREMENT_ID = 'YOUR_MEASUREMENT_ID'; // Or get from environment variables
    if (window.gtag) {
      window.gtag('config', GA_MEASUREMENT_ID, {
        'page_path': location.pathname + location.search,
      });
    }
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={
        <div className="bg-brand-primary font-sans text-brand-light">
          <Header />
          <main>
            <Hero />
            {/* <PromoImage /> */}
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
      <Route path="/privacy-policy" element={
        <div className="bg-brand-primary font-sans text-brand-light">
          <Header />
          <PrivacyPolicy />
          <Footer />
        </div>
      } />
      <Route path="/terms-and-conditions" element={
        <div className="bg-brand-primary font-sans text-brand-light">
          <Header />
          <TermsAndConditions />
          <Footer />
        </div>
      } />
    </Routes>
  );
};

export default App;