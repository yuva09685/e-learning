import React, { useState, useEffect } from 'react';
import { Course } from '../types';

const courseData: Course[] = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    title: 'Business Management',
    description: 'Master the principles of modern business, leadership, and strategic planning to excel in a competitive corporate environment.',
    duration: '6 Months',
    prerequisites: ['High School Diploma or equivalent', 'Basic understanding of business concepts'],
    outcomes: [
      'Develop strategic business plans and execute them.',
      'Lead and motivate teams to achieve organizational goals.',
      'Analyze financial statements and make data-driven decisions.',
      'Understand complex market dynamics and competitive landscapes.'
    ]
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: 'Data Science & Analytics',
    description: 'Learn to extract valuable insights from data using cutting-edge tools, statistical modeling, and machine learning techniques.',
    duration: '9 Months',
    prerequisites: ['Background in statistics or programming', 'Strong analytical and problem-solving skills'],
    outcomes: [
      'Clean, analyze, and visualize large datasets.',
      'Build and deploy predictive machine learning models.',
      'Communicate complex data findings to stakeholders.',
      'Utilize tools like Python, R, and SQL for data analysis.'
    ]
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    title: 'Digital Marketing',
    description: 'Explore SEO, social media marketing, and content strategy to excel in the dynamic and fast-paced digital landscape.',
    duration: '4 Months',
    prerequisites: ['Basic computer and internet literacy', 'Creativity and strong communication skills'],
    outcomes: [
      'Create and manage effective SEO and SEM campaigns.',
      'Develop engaging content for various social media platforms.',
      'Analyze marketing campaign performance using analytics tools.',
      'Build a comprehensive digital marketing strategy.'
    ]
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>,
    title: 'International Finance',
    description: 'Understand global financial markets, international investment strategies, and corporate finance in a multinational context.',
    duration: '8 Months',
    prerequisites: ['Bachelor\'s degree in finance, economics, or a related field', 'Understanding of basic accounting principles'],
    outcomes: [
      'Analyze foreign exchange markets and manage currency risk.',
      'Evaluate international investment opportunities.',
      'Understand the complexities of multinational corporate finance.',
      'Navigate global financial regulations and compliance.'
    ]
  }
];

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-secondary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const CourseCard: React.FC<{ course: Course; onClick: () => void }> = ({ course, onClick }) => {
  return (
    <div className="group">
      <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2 border border-gray-200 bg-gradient-to-br from-white to-[#FDF2E9]">
          <div className="transition-all duration-300">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-[#D13ABD] to-[#EEBD89] text-white p-4 rounded-xl flex-shrink-0 shadow-md">
                {course.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-primary">{course.title}</h3>
            </div>
            <p className="text-gray-600 mb-6 h-24">{course.description}</p>
            <button
              onClick={onClick}
              className="mt-auto bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg hover:bg-amber-400"
            >
              Learn More &rarr;
            </button>
          </div>
      </div>
    </div>
  );
};


const Courses: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCourse(null);
      }
    };

    if (selectedCourse) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleEscKey);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
       document.body.style.overflow = 'auto';
    };
  }, [selectedCourse]);


  return (
    <>
      <section id="courses" className="py-20 bg-brand-primary">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Our Premier Courses</h2>
            <p className="text-lg text-brand-light mt-4 max-w-2xl mx-auto">Designed for success, our courses blend theory with practical, real-world application.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {courseData.map((course, index) => (
              <CourseCard key={index} course={course} onClick={() => setSelectedCourse(course)} />
            ))}
          </div>
        </div>
      </section>

      {selectedCourse && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in"
          onClick={() => setSelectedCourse(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="course-modal-title"
        >
          <div
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full p-8 md:p-10 relative overflow-y-auto max-h-[90vh] animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCourse(null)}
              className="absolute top-4 right-4 bg-brand-secondary text-white hover:bg-amber-400 transition-all p-2 rounded-full shadow-md"
              aria-label="Close course details"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="flex items-start sm:items-center gap-4 mb-6">
              <div className="bg-brand-secondary text-white p-4 rounded-full flex-shrink-0">
                {React.cloneElement(selectedCourse.icon, { className: "h-10 w-10"})}
              </div>
              <h3 id="course-modal-title" className="text-2xl md:text-3xl font-serif font-bold text-brand-primary">{selectedCourse.title}</h3>
            </div>
            
            <p className="text-gray-600 mb-6 text-base">{selectedCourse.description}</p>
            
            <div className="space-y-6">
               <div>
                <h4 className="text-lg font-bold text-brand-primary mb-3 border-b pb-2">Course Details</h4>
                 <p className="text-gray-700"><span className="font-semibold">Duration:</span> {selectedCourse.duration}</p>
              </div>
              
              <div>
                <h4 className="text-lg font-bold text-brand-primary mb-2">Prerequisites</h4>
                <ul className="space-y-1 list-disc list-inside text-gray-600">
                  {selectedCourse.prerequisites.map((req, i) => <li key={i}>{req}</li>)}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold text-brand-primary mb-2">Learning Outcomes</h4>
                <ul className="space-y-2 text-gray-600">
                  {selectedCourse.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckIcon />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Courses;