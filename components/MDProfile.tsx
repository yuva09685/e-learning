import React from 'react';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);


const MDProfile: React.FC = () => {
  return (
    <section id="director" className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-primary">Message from Our Director</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">Meet the visionary leading our institution towards a future of educational excellence.</p>
        </div>
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-2xl">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-1/3 flex-shrink-0 text-center">
              <img 
                src="https://picsum.photos/300/300?random=5" 
                alt="Managing Director of suyam's IMTT institute"
                className="rounded-full shadow-lg object-cover w-48 h-48 mx-auto"
              />
              <h3 className="text-2xl font-bold text-brand-primary font-serif mt-4">Dr. A. P. J. Suyam</h3>
              <p className="text-brand-secondary font-semibold">Managing Director, Suyam's IMTT Institute</p>
            </div>
            <div className="md:w-2/3">
              <p className="text-gray-600 italic text-lg mb-6 border-l-4 border-brand-accent pl-4">
                "Our mission is to empower every student with the knowledge and skills to not just succeed, but to thrive and lead in the global landscape. We are committed to fostering an environment of innovation, critical thinking, and lifelong learning."
              </p>
              <p className="text-gray-500">
                With over two decades of experience in the international education sector, Dr. Suyam has been a pivotal force in shaping modern learning methodologies. His vision for accessible, high-quality education led to the founding of Suyam's IMTT Institute and its prestigious affiliation with Certified Training Center - British Learning UK.
              </p>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
                <h4 className="text-xl font-serif font-bold text-brand-primary mb-4">Key Accomplishments</h4>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-gray-600">Spearheaded partnerships with over 20 international universities.</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-gray-600">Authored the best-selling book "Global Education in the 21st Century".</span>
                    </li>
                    <li className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-gray-600">Recognized with the 'Educational Innovator of the Year' award in 2022.</span>
                    </li>
                </ul>
            </div>
             <div>
                <h4 className="text-xl font-serif font-bold text-brand-primary mb-4">Vision for the Future</h4>
                <p className="text-gray-600">
                    "We aim to expand our digital learning platforms to reach aspiring students in every corner of the globe, making world-class education a reality for all. Our focus will be on integrating AI-driven personalized learning paths and fostering a vibrant global community of learners and educators."
                </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MDProfile;