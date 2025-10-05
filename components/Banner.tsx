
import React, { useState } from 'react';

const Banner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-brand-accent text-brand-primary font-semibold p-2 text-center relative text-sm sm:text-base">
      <p>
        ✨ Limited Time Offer! Enroll now and get <strong>20% OFF</strong> on all our premier courses. ✨
      </p>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-1/2 right-4 -translate-y-1/2 text-brand-primary hover:bg-black/10 rounded-full p-1"
        aria-label="Dismiss banner"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

export default Banner;
