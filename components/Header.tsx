import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Director', href: '#director' },
    { name: 'Courses', href: '#courses' },
    { name: 'FAQ', href: '#faq' },
  ];

  const NavLinks: React.FC<{onLinkClick?: () => void}> = ({ onLinkClick }) => (
    <>
      {navLinks.map((link) => (
        <a 
          key={link.name} 
          href={link.href} 
          onClick={onLinkClick} 
          className="relative block py-2 px-3 text-brand-dark md:text-white font-medium transition-colors after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-brand-accent after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100"
        >
          {link.name}
        </a>
      ))}
    </>
  );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/30 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold font-serif text-white z-50">
          Suyam's Learning
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-2">
            <NavLinks />
          </nav>
          <a href="#inquiry" className="bg-brand-accent text-brand-primary font-bold py-2 px-6 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105">
            Enquire Now
          </a>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-white/90 backdrop-blur-lg z-40 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
        <div className="pt-24 px-6 flex flex-col items-center text-center space-y-4">
          <NavLinks onLinkClick={() => setIsMobileMenuOpen(false)} />
          <a 
            href="#inquiry" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="w-full bg-brand-secondary text-white font-bold py-3 px-6 rounded-full hover:bg-opacity-90 transition-all transform hover:scale-105"
          >
            Enquire Now
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;