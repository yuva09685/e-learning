import React, { useState, useEffect, useRef, ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
}

const Reveal: React.FC<RevealProps> = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observing once it's visible
        }
      },
      {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1, // trigger when 10% of the element is visible
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
};

export default Reveal;
