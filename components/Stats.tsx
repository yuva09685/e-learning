import React, { useState, useEffect, useRef } from 'react';

interface Stat {
  value: number;
  label: string;
  suffix: string;
}

const statsData: Stat[] = [
  { value: 5000, label: 'Successful Graduates', suffix: '+' },
  { value: 20, label: 'Years of Excellence', suffix: '+' },
  { value: 50, label: 'Global Partner Institutions', suffix: '+' },
  { value: 95, label: 'Student Placement Rate', suffix: '%' },
];

const CountUp: React.FC<{ end: number, duration?: number }> = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let start = 0;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            const progress = Math.min(elapsedTime / duration, 1);
            
            setCount(Math.floor(progress * end));

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}</span>;
};


const Stats: React.FC = () => {
  return (
    <section id="stats" className="py-20 bg-brand-primary text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Our Global Impact in Numbers</h2>
          <p className="text-lg text-brand-light mt-4 max-w-2xl mx-auto">Decades of dedication reflected in the success of our students and our growing global presence.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsData.map((stat, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
              <p className="text-5xl font-bold text-brand-accent">
                <CountUp end={stat.value} />
                {stat.suffix}
              </p>
              <p className="text-lg text-brand-light mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
