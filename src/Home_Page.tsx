import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Globe, Building2, Phone, Smartphone, Users, Store, CreditCard } from 'lucide-react';


const EmeraldFinanceHomepage: React.FC = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderVisible(window.scrollY < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
 
  <div className="flex flex-col justify-center sm:flex-row gap-4 p-32">
                <a
                  href="https://emeraldfinanceltd.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-800 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                  Get Ka'Starta Loan
                </a>
                <button 
                  onClick={() => window.open('/Emerald Finance Pitch Deck - presentation.pdf', '_blank')}
                  className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg border-2 border-white/20 hover:border-yellow-400"
                >
                  View Pitch Deck
                </button>
              </div>
        
    
  );
};

export default EmeraldFinanceHomepage;