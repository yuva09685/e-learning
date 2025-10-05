
import React from 'react';

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="https://picsum.photos/600/400?random=2" 
              alt="Students learning at Suyam's Institute" 
              className="rounded-lg shadow-2xl object-cover w-full h-full"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary mb-4">
              Pioneering Education for a Brighter Future
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              At Suyam's Learning, we are dedicated to providing an enriching and transformative educational experience. Our affiliation with The British International Learning Institute ensures our curriculum is globally recognized and up-to-date with the latest industry standards.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-4">
                <CheckIcon />
                <div>
                    <h3 className="font-semibold text-brand-primary">Globally Recognized Curriculum</h3>
                    <p className="text-gray-500">Our courses are benchmarked against international standards of excellence.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckIcon />
                <div>
                    <h3 className="font-semibold text-brand-primary">Expert Faculty</h3>
                    <p className="text-gray-500">Learn from seasoned industry professionals and experienced academics.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckIcon />
                <div>
                    <h3 className="font-semibold text-brand-primary">Holistic Development</h3>
                    <p className="text-gray-500">We focus on not just academic skills but also personal and professional growth.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
