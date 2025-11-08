import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative text-white pt-32 pb-20 min-h-screen flex items-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-gradient-to-br from-brand-primary to-brand-secondary"
        style={{
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 15s ease infinite'
        }}
      ></div>
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="bg-black/40 backdrop-blur-md p-8 rounded-xl max-w-4xl mx-auto shadow-2xl animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 leading-tight">
            Unlock Your Global Potential with Suyam's IMTT Institute
          </h1>
          <p className="text-lg md:text-xl text-brand-light mb-2 font-medium">
            Affiliated with <span className="font-semibold text-brand-accent">Certified Training Center - British Learning UK</span>
          </p>
          <p className="text-lg md:text-xl text-brand-light mb-8 max-w-2xl mx-auto">
            We provide world-class education and personalized mentorship to shape the leaders of tomorrow.
          </p>
          <a href="#inquiry" className="bg-brand-secondary text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-amber-400 transition-all transform hover:scale-105 inline-block shadow-lg hover:shadow-xl">
            Start Your Journey Today
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;