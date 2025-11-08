
import React, { useState, useEffect, useCallback } from 'react';
import { Testimonial } from '../types';

const testimonialData: Testimonial[] = [
  {
    quote: "The curriculum at Suyam's IMTT Institute is incredibly comprehensive. The affiliation with the Certified Training Center - British Learning UK gave me the confidence that I was receiving a top-tier education.",
    name: 'Priya Sharma',
    course: 'Business Management',
    avatarUrl: 'https://picsum.photos/100/100?random=3'
  },
  {
    quote: "The faculty's dedication is unparalleled. They provided personalized attention that was instrumental in my success. I highly recommend this institute to anyone serious about their career.",
    name: 'Raj Verma',
    course: 'Data Science & Analytics',
    avatarUrl: 'https://picsum.photos/100/100?random=4'
  },
  {
    quote: "A transformative experience! The practical, hands-on projects prepared me for the real world, and the career support team was fantastic in helping me land my dream job.",
    name: 'Anjali Singh',
    course: 'Digital Marketing',
    avatarUrl: 'https://picsum.photos/100/100?random=6'
  },
];

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex text-brand-accent">
        {[...Array(5)].map((_, i) => (
            <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < rating ? 'fill-current' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
    </div>
);

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialData.length - 1 : prev - 1));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === testimonialData.length - 1 ? 0 : prev + 1));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section id="testimonials" className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary">What Our Students Say</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Real stories from students who have transformed their careers with us.</p>
        </div>
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden w-full">
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonialData.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <StarRating rating={5} />
                    <p className="text-gray-600 italic my-4 text-lg">"{testimonial.quote}"</p>
                    <div className="flex items-center justify-center">
                      <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 object-cover" />
                      <div>
                        <p className="font-bold text-brand-primary">{testimonial.name}</p>
                        <p className="text-sm text-brand-secondary font-medium">{testimonial.course}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Controls */}
          <button 
            onClick={prevSlide}
            className="absolute top-1/2 -left-4 md:-left-12 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <button 
            onClick={nextSlide}
            className="absolute top-1/2 -right-4 md:-right-12 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full p-2 shadow-md transition-colors"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
