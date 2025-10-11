
import React from 'react';

const PromoImage: React.FC = () => {
  return (
    <section className="py-20 bg-brand-primary">
      <div className="container mx-auto px-6">
        <img 
          src="https://picsum.photos/1200/400?random=3" 
          alt="Promotional Image" 
          className="rounded-lg shadow-2xl object-cover w-full h-full"
        />
      </div>
    </section>
  );
};

export default PromoImage;
