import React, { useState, useEffect } from 'react';
import { Course } from '../types';

const courseData: Course[] = [
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    title: 'PG Diploma In Child Counselling',
    description: 'Enhance your skills with our PG Diploma in Child Counselling. Gain practical knowledge and expertise to excel in educational settings. Enrol today!',
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
    title: 'Diploma In Child Psychology',
    description: 'Enhance your skills with our Diploma in Child Psychology. Gain practical knowledge and expertise to excel in educational settings. Enrol today!',
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
    title: 'PG Diploma In Special Needs Education',
    description: 'Enhance your skills with our PG Diploma in Special Needs Education. Gain practical knowledge and expertise to excel in educational settings. Enrol today!',
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
    title: 'Diploma In Special Needs Education',
    description: 'Enhance your skills with our Diploma in Special Needs Education. Gain practical knowledge and expertise to excel in educational settings. Enroll today!',
    duration: '8 Months',
    prerequisites: ['Bachelor\'s degree in finance, economics, or a related field', 'Understanding of basic accounting principles'],
    outcomes: [
      'Analyze foreign exchange markets and manage currency risk.',
      'Evaluate international investment opportunities.',
      'Understand the complexities of multinational corporate finance.',
      'Navigate global financial regulations and compliance.'
    ]
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
    title: 'PG Diploma in International Teachers Training',
    description: 'Enhance your skills with our PG Diploma in International Teachers Training. Gain practical knowledge and expertise to excel in educational settings. Enrol today!',
    duration: '6 Months',
    prerequisites: ['Basic HTML, CSS, and JavaScript knowledge', 'Fundamentals of programming concepts'],
    outcomes: [
      'Build responsive websites using HTML, CSS, and JavaScript.',
      'Develop interactive applications with modern frameworks.',
      'Implement backend services and databases.',
      'Deploy and maintain web applications effectively.'
    ]
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
    title: 'Diploma in Pre-Primary Teachers Training',
    description: 'Enhance your skills with our Diploma in Pre-Primary Teachers Training. Gain practical knowledge and expertise to excel in educational settings. Enroll today!',
    duration: '7 Months',
    prerequisites: ['Understanding of networking fundamentals', 'Basic server administration knowledge'],
    outcomes: [
      'Deploy and manage cloud infrastructure services.',
      'Implement cloud security and compliance measures.',
      'Optimize cloud resources for cost and performance.',
      'Design highly scalable and available cloud solutions.'
    ]
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>,
    title: 'PG Diploma in Early Childhood Care & Education',
    description: 'Enhance your skills with our PG Diploma in Early Childhood Care & Education. Gain practical knowledge and expertise to excel in educational settings. Enroll today!',
    duration: '8 Months',
    prerequisites: ['Fundamentals of computer systems', 'Basic understanding of networking'],
    outcomes: [
      'Implement and maintain security protocols and policies.',
      'Identify and mitigate potential security threats.',
      'Conduct vulnerability assessments and penetration testing.',
      'Respond to security incidents and data breaches effectively.'
    ]
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>,
    title: 'Diploma in Early Childhood Care and Education',
    description: 'Enhance your skills with our Diploma in Early Childhood Care and Education. Gain practical knowledge and expertise to excel in educational settings. Enroll today!',
    duration: '5 Months',
    prerequisites: ['Leadership capabilities', 'Communication and organizational skills'],
    outcomes: [
      'Plan and execute projects using industry-standard methodologies.',
      'Manage project resources, timelines, and budgets effectively.',
      'Lead cross-functional teams toward project objectives.',
      'Apply risk management and quality assurance in projects.'
    ]
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: 'PG Diploma in Learning Disabilities',
    description: 'Enhance your skills with our PG Diploma in Learning Disabilities. Gain practical knowledge and expertise to excel in educational settings. Enroll today!',
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
    icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>,
    title: 'Diploma in Learning Disabilities',
    description: 'Enhance your skills with our Diploma in Learning Disabilities. Gain practical knowledge and expertise to excel in educational settings. Enroll today!',
    duration: '9 Months',
    prerequisites: ['Background in statistics or programming', 'Strong analytical and problem-solving skills'],
    outcomes: [
      'Clean, analyze, and visualize large datasets.',
      'Build and deploy predictive machine learning models.',
      'Communicate complex data findings to stakeholders.',
      'Utilize tools like Python, R, and SQL for data analysis.'
    ]
  },
];

const CheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-secondary flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

const CourseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="group">
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 border border-gray-200 bg-gradient-to-br from-white to-[#FDF2E9] h-full flex flex-col">
          <div className="transition-all duration-300 flex-grow">
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-gradient-to-br from-[#D13ABD] to-[#EEBD89] text-white p-3 rounded-xl flex-shrink-0 shadow-md">
                {course.icon}
              </div>
              <h3 className="text-lg font-bold text-brand-primary">{course.title}</h3>
            </div>
            <p className="text-gray-600 mb-4 text-base flex-grow">{course.description}</p>
          </div>
          <div className="mt-auto">
            <a
              href="#inquiry"
              className="w-full bg-brand-secondary text-white font-bold py-3 px-4 rounded-lg transition-all transform hover:scale-105 shadow-md hover:shadow-lg hover:bg-amber-400 block text-center"
            >
              Enroll Now &rarr;
            </a>
          </div>
      </div>
    </div>
  );
};


const Courses: React.FC = () => {
  return (
    <section id="courses" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Our Premier Courses</h2>
          <p className="text-lg text-brand-light mt-4 max-w-2xl mx-auto">Designed for success, our courses blend theory with practical, real-world application.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {courseData.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Courses;