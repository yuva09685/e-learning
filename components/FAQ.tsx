
import React, { useState } from 'react';
import { FAQItem } from '../types';

const faqData: FAQItem[] = [
  {
    question: "What is the affiliation with the Certified Training Center - British Learning UK?",
    answer: "Our affiliation with the Certified Training Center - British Learning UK means our curriculum, teaching standards, and certifications are globally recognized. This ensures you receive a world-class education that is respected by employers and academic institutions worldwide."
  },
  {
    question: "Are the courses online, in-person, or hybrid?",
    answer: "We offer a flexible range of learning models, including fully online, in-person, and hybrid formats to cater to the diverse needs of our students. Each course page specifies the available formats."
  },
  {
    question: "Do you provide career support or job placement assistance?",
    answer: "Yes, absolutely. We have a dedicated career services team that provides personalized mentorship, resume building workshops, interview preparation, and networking opportunities with our corporate partners to help you launch or advance your career."
  },
  {
    question: "What are the admission requirements?",
    answer: "Admission requirements vary by course. Generally, we require a high school diploma or equivalent for our foundational courses. Advanced courses may have specific prerequisites, which are detailed on each course page. Please fill out the inquiry form for a personalized consultation."
  },
];

const FAQAccordionItem: React.FC<{ faq: FAQItem; isOpen: boolean; onClick: () => void }> = ({ faq, isOpen, onClick }) => {
  return (
    <div className="border-b">
      <button
        onClick={onClick}
        className="group w-full flex justify-between items-center text-left py-4 px-2 hover:bg-brand-light transition-colors"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-brand-dark group-hover:text-brand-primary">{faq.question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="p-4 text-brand-light bg-brand-primary">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-brand-dark">Frequently Asked Questions</h2>
          <p className="text-lg text-brand-light mt-4 max-w-2xl mx-auto">Have questions? We have answers. Here are some of the most common inquiries we receive.</p>
        </div>
        <div className="max-w-3xl mx-auto rounded-lg shadow-lg">
          {faqData.map((faq, index) => (
            <FAQAccordionItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
