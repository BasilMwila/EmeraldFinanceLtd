import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

const EmeraldFinanceHomepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    // Add smooth scrolling to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle scroll events to update active section
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header height
      
      // Define section ranges - some sections map to the same nav item
      const sectionRanges = [
        { id: 'home', navKey: 'home' },
        { id: 'about-us', navKey: 'about-us' },
        { id: 'objective', navKey: 'about-us' }, // Part of about section
        { id: 'partnership', navKey: 'about-us' }, // Part of about section  
        { id: 'services', navKey: 'services' }
      ];
      
      let currentActiveSection = 'home';
      
      for (let i = 0; i < sectionRanges.length; i++) {
        const { id, navKey } = sectionRanges[i];
        const element = document.getElementById(id);
        
        if (element) {
          const offsetTop = element.offsetTop;
          
          if (scrollPosition >= offsetTop) {
            currentActiveSection = navKey;
          }
        }
      }
      
      if (activeSection !== currentActiveSection) {
        console.log('Active section changed to:', currentActiveSection); // Debug log
        setActiveSection(currentActiveSection);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll);
    handleScroll(); // Call once to set initial state
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [activeSection]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="snap-container">
      <style>{`
        /* Scroll snap container */
        .snap-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        
        /* Each section snaps to viewport */
        .snap-section {
          min-height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
        }
        
        /* Page transition effects */
        .page-transition-up {
          transform: translateY(0);
          opacity: 1;
        }
        
        .page-transition-down {
          transform: translateY(0);
          opacity: 1;
        }
        
        /* Fade transitions between sections */
        .section-fade {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in {
          animation: fadeIn 1s ease-in-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .slide-in-left {
          animation: slideInLeft 0.8s ease-out;
        }
        
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .slide-in-right {
          animation: slideInRight 0.8s ease-out;
        }
        
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        /* Slide transitions */
        .slide-transition {
          transition: transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        /* Enhanced scrollbar */
        .snap-container::-webkit-scrollbar {
          width: 8px;
        }
        
        .snap-container::-webkit-scrollbar-track {
          background: #1f2937;
        }
        
        .snap-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #10b981, #059669);
          border-radius: 4px;
        }
        
        .snap-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #059669, #047857);
        }
        
        /* Section borders for clear separation */
        .section-separator {
          position: relative;
        }
        
        .section-separator::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, #10b981, transparent);
          opacity: 0.5;
        }
        
        /* Page indicator dots */
        .page-indicator {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          z-index: 100;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .page-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.4);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .page-dot.active {
          background: #10b981;
          transform: scale(1.5);
        }
        
        .page-dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        /* Mobile responsive breakpoints */
        @media (max-width: 768px) {
          .page-indicator {
            right: 10px;
            gap: 6px;
          }
          
          .page-dot {
            width: 6px;
            height: 6px;
          }
        }
      `}</style>

      {/* Page Navigation Indicators */}
      <div className="page-indicator hidden md:flex">
        {['home', 'about-us', 'services'].map((section, index) => (
          <div
            key={section}
            className={`page-dot ${activeSection === section ? 'active' : ''}`}
            onClick={() => scrollToSection(section)}
            title={section.replace('-', ' ').toUpperCase()}
          />
        ))}
      </div>

      {/* Header - Fixed position for easy navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 slide-transition">
        {/* Logo Section - Green Background */}
        <div className="bg-emerald-800 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center md:justify-end items-center py-2 md:py-4">
              <div className="flex items-center">
                <img 
                  src="/Emerald_Logo_Web1.png" 
                  alt="Emerald Finance Logo" 
                  className="h-16 md:h-24 lg:h-32 w-auto"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Section - White Background */}
        <div className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between md:justify-start items-center py-3 md:py-4">
              {/* Mobile menu button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-800 hover:text-emerald-600 transition-colors duration-300"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-4 lg:space-x-8">
                {['HOME', 'ABOUT US', 'SERVICES'].map((item) => {
                  const sectionId = item.toLowerCase().replace(' ', '-');
                  const isActive = activeSection === sectionId;
                  
                  return (
                    <button
                      key={item}
                      onClick={() => scrollToSection(sectionId)}
                      className={`text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm transform hover:scale-105 ${
                        isActive ? 'font-bold text-emerald-600' : 'font-medium'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
                <a href="/airtel" className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm font-medium transform hover:scale-105">
                  AIRTEL STEPS
                </a>
                <a href="/mtn" className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm font-medium transform hover:scale-105">
                  MTN STEPS
                </a>
                <a href="/team" className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm font-medium transform hover:scale-105">
                  OUR TEAM
                </a>
                <a href="/contact" className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm font-medium transform hover:scale-105">
                  CONTACT US
                </a>
              </nav>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 section-transition">
                  {['HOME', 'ABOUT US', 'SERVICES'].map((item) => {
                    const sectionId = item.toLowerCase().replace(' ', '-');
                    const isActive = activeSection === sectionId;
                    
                    return (
                      <button
                        key={item}
                        onClick={() => {
                          scrollToSection(sectionId);
                          setIsMenuOpen(false);
                        }}
                        className={`text-gray-800 block px-3 py-2 text-base hover:text-emerald-600 transition-colors duration-300 w-full text-left ${
                          isActive ? 'font-bold text-emerald-600' : 'font-medium'
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}
                  <a href="/airtel" className="text-gray-800 block px-3 py-2 text-base hover:text-emerald-600 transition-colors duration-300 font-medium">
                    AIRTEL STEPS
                  </a>
                  <a href="/mtn" className="text-gray-800 block px-3 py-2 text-base hover:text-emerald-600 transition-colors duration-300 font-medium">
                    MTN STEPS
                  </a>
                  <a href="/team" className="text-gray-800 block px-3 py-2 text-base hover:text-emerald-600 transition-colors duration-300 font-medium">
                    OUR TEAM
                  </a>
                  <a href="/contact" className="text-gray-800 block px-3 py-2 text-base hover:text-emerald-600 transition-colors duration-300 font-medium">
                    CONTACT US
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="snap-section section-separator relative pt-20 md:pt-32 section-fade">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/home_page.jpg')`
          }}
        >
          {/* Overlay for mobile phones image effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 md:from-black/10 to-black/30"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="relative flex flex-col lg:flex-row items-center lg:items-start">
              {/* Left Content */}
              <div className="text-white slide-in-left max-w-2xl text-center lg:text-left mb-8 lg:mb-0">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 lg:mb-6 leading-tight">
                  Digital<br />
                  Microfinance for<br />
                  Zambia
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 lg:mb-8 leading-relaxed opacity-90 px-4 lg:px-0">
                  Empowering underserved communities with fair,<br className="hidden sm:block" />
                  reliable credit through innovative digital channels.<br className="hidden sm:block" />
                  Access loans instantly via mobile money.
                </p>
                <button className="bg-yellow-400 text-black px-6 sm:px-8 py-3 sm:py-4 rounded text-base sm:text-lg font-semibold hover:bg-yellow-500 transition-all duration-300 border-2 border-yellow-400 transform hover:scale-105">
                  READ MORE
                </button>
              </div>

              {/* Right Content - Social Icons */}
              <div className="lg:absolute lg:bottom-8 lg:right-8 slide-in-right mt-8 lg:mt-0">
                <div className="flex lg:flex-col space-x-4 lg:space-x-0 lg:space-y-4 justify-center">
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-all duration-300 transform hover:scale-110">
                    <span className="text-sm sm:text-lg font-bold">f</span>
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-110">
                    <span className="text-sm sm:text-lg font-bold">𝕏</span>
                  </a>
                  <a href="#" className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-all duration-300 transform hover:scale-110">
                    <span className="text-sm sm:text-lg font-bold">📷</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-us" className="snap-section section-separator relative section-fade">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(2, 79, 6, 0.4), rgba(0, 0, 0, 0)), url('/about_page.jpg')`
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* Left Content */}
            <div className="fade-in text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 lg:mb-8">
                About Emerald<br />Finance
              </h2>
              <div className="space-y-4 lg:space-y-6 text-sm sm:text-base lg:text-lg text-white leading-relaxed">
                <p>
                  Founded in <span className="font-semibold text-white">2020</span> and licensed by the Bank of Zambia, Emerald Finance Limited is a leading microfinance institution based in <span className="font-semibold text-white">Lusaka</span>. We are dedicated to serving Zambia's underserved populations by providing fair and reliable credit through innovative digital channels.
                </p>
                <p>
                  We specialize in digital micro-lending under our flagship <span className="font-semibold text-yellow-300">brand Ka'Starta</span>, offering tailored micro-loans for individuals, agents, and local merchants directly through mobile money and smartphone access.
                </p>
              </div>
              <button className="mt-6 lg:mt-8 bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold hover:bg-yellow-500 transition-all duration-300 border-2 border-yellow-400 transform hover:scale-105 text-sm sm:text-base">
                READ MORE
              </button>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6 slide-in-right">
              <div className="border-2 border-white p-2 sm:p-4 rounded-tl-2xl transform hover:scale-105 transition-all duration-300">
                <div className="bg-yellow-400 p-3 sm:p-4 lg:p-6 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">2020</div>
                  <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">Founded</div>
                  <div className="mt-2 sm:mt-4 hidden sm:block">
                    <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-white mx-auto" />
                  </div>
                </div>
              </div>
              
              <div className="border-2 border-white p-2 sm:p-4 transform hover:scale-105 transition-all duration-300">
                <div className="bg-emerald-600 p-3 sm:p-4 lg:p-6 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">24/7</div>
                  <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">Mobile<br />Access</div>
                </div>
              </div>
              
              <div className="border-2 border-white p-2 sm:p-4 transform hover:scale-105 transition-all duration-300">
                <div className="bg-emerald-600 p-3 sm:p-4 lg:p-6 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">*115#</div>
                  <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">USSD<br />Access</div>
                </div>
              </div>
              
              <div className="border-2 border-white p-2 sm:p-4 rounded-br-2xl transform hover:scale-105 transition-all duration-300">
                <div className="bg-yellow-400 p-3 sm:p-4 lg:p-6 rounded-lg text-center">
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">100%</div>
                  <div className="text-white font-semibold text-xs sm:text-sm lg:text-base">Digital<br />Process</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objective Section */}
      <section id="objective" className="snap-section section-separator relative section-fade">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(182, 200, 255, 0.75), rgba(0, 0, 0, 0.3)), url('/objective_page.jpg')`
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-20">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 items-start w-full">
            {/* Left Content */}
            <div className="lg:col-span-2 fade-in text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-6 lg:mb-8">Objective</h2>
              <div className="text-white space-y-4 lg:space-y-6 text-sm sm:text-base lg:text-lg leading-relaxed">
                <p>
                  Emerald finance will exist to empower people economically. We will be giving access to small loans for consumption, conveniently and affordable to a new generation of credit application based on forward looking data and predictive models rather than their past performance.
                </p>
                <p>
                  To achieve this, we have partnered with <span className="text-yellow-400 font-semibold">MTN Zambia and Airtel Zambia</span> to give loans to the registered MTN and Airtel Money Mobile Money Subscribers, including consumers and the agents. The loans are under the Ka'Starta Brand.
                </p>
              </div>
              
              <div className="mt-8 lg:mt-12">
                <button className="bg-yellow-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded font-semibold hover:bg-yellow-500 transition-all duration-300 border-2 border-yellow-400 transform hover:scale-105 text-sm sm:text-base">
                  BACK
                </button>
              </div>

              <div className="mt-8 lg:mt-12">
                <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-yellow-400 mb-2 lg:mb-4">THE<span className="text-white">UNBANKED</span></h3>
                <p className="text-white text-base sm:text-lg">ka' starta ka bonse. Finance for all.</p>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-6 lg:space-y-8 slide-in-right">
              <div className="bg-slate-400 p-4 sm:p-6 transform hover:scale-105 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-300 mb-3 lg:mb-4">Our Vision</h3>
                <p className="text-white text-sm sm:text-base">
                  Is to provide financial solutions to the unbanked and SME's.
                </p>
              </div>

              <div className="bg-emerald-600 p-4 sm:p-6 rounded-lg transform hover:scale-105 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 lg:mb-4">Our Mission</h3>
                <p className="text-white text-sm sm:text-base">
                  Is simple; to include the unbanked to a world of possibility with innovative Finance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnership Section */}
      <section id="partnership" className="snap-section section-separator relative section-fade">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('/strategic_page.jpg')`
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center py-20">
          <div className="w-full fade-in text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-800 mb-4 lg:mb-6">
              Strategic<br />Partnership
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 mb-8 lg:mb-12 max-w-2xl mx-auto lg:mx-0">
              We've partnered with leading mobile money providers to expand credit access throughout Zambia.
            </p>

            {/* Partner Logos */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 items-center justify-items-center mb-6 lg:mb-8">
              <div className="bg-black w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-32 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                <img 
                  src="/EMERALD_LOGO.jpg" 
                  alt="Emerald Finance Logo" 
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
                />
              </div>

              <div className="bg-yellow-400 w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-32 flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                <img 
                  src="/MTN_Logo.jpg" 
                  alt="MTN Logo" 
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
                />
              </div>

              <div className="bg-red-550 w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-32 flex transform hover:scale-105 transition-all duration-300">
                <img 
                  src="/Airtel_Logo.jpg" 
                  alt="Airtel Logo" 
                  className="h-20 sm:h-24 lg:h-32 w-28 sm:w-32 lg:w-40"
                />
              </div>

              <div className="bg-slate-550 w-32 sm:w-40 lg:w-48 h-20 sm:h-24 lg:h-32 flex transform hover:scale-105 transition-all duration-300">
                <img 
                  src="/Ezra_Logo.jpg" 
                  alt="Ezra Logo" 
                  className="h-20 sm:h-24 lg:h-32 w-28 sm:w-32 lg:w-40"
                />
              </div>
            </div>

            {/* Partner Labels */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-12 text-xs sm:text-sm lg:text-base">
              <div className="text-gray-700 font-medium text-center">Emerald Finance</div>
              <div className="text-gray-700 font-medium text-center">MTN MoMo</div>
              <div className="text-gray-700 font-medium text-center">Airtel Money</div>
              <div className="text-gray-700 font-medium text-center">Ezra World</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section 
        id="services"
        className="snap-section section-separator relative bg-cover bg-center bg-no-repeat section-fade"
        style={{ backgroundImage: `linear-gradient(to right,rgba(2, 79, 6, 0.6), rgba(0, 0, 0, 0)), url('/what_we_do.jpg')` }}
      >
        <div className="absolute inset-0 bg-opacity-40"></div>
        
        <div className="relative z-10 flex items-center min-h-screen px-4 sm:px-6 lg:px-16 py-20">
          <div className="w-full flex flex-col lg:flex-row items-center lg:items-start gap-8">
            {/* Left Content */}
            <div className="max-w-2xl text-white slide-in-left text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-2 lg:mb-4">
                What We Do
              </h1>
              <p className="text-sm sm:text-base lg:text-lg mb-2 lg:mb-4 opacity-90">company services</p>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 mb-4 lg:mb-8">
                Ka'Starta<br />
                Mobile Loans
              </h2>
              
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mb-4 lg:mb-8">
                Access instant micro-loans through our mobile app and USSD{' '}
                <span className="text-yellow-400 font-semibold">code *115#</span>. Quick 
                approval, flexible repayment terms, and seamless integration with mobile money 
                platforms.
              </p>
              
              <div className="w-20 sm:w-32 h-1 bg-red-500 mx-auto lg:mx-0"></div>
            </div>

            {/* Right Content - Eligible Image */}
            <div className="flex-shrink-0 slide-in-right">
              <img 
                src="Eligible.png" 
                alt="Who is eligible" 
                className="w-48 sm:w-56 lg:w-64 h-auto shadow-lg transform hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Individual & Agent Lending + Merchant Financing Section */}
      <section 
        className="snap-section section-separator relative bg-cover bg-center bg-no-repeat section-fade"
        style={{ backgroundImage: `linear-gradient(to right,rgba(2, 79, 6, 0.0), rgba(0, 0, 0, 0)), url('/about_page.jpg')` }}
      >
        <div className="absolute inset-0 bg-opacity-50"></div>
        
        <div className="relative z-10 flex items-center min-h-screen px-4 sm:px-6 lg:px-16 py-20">
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
              
              {/* Individual & Agent Lending */}
              <div className="text-white fade-in text-center lg:text-left">
                <div className="mb-6 lg:mb-8 flex justify-center lg:justify-start">
                  <div className="w-24 sm:w-32 rounded-tl-lg bg-opacity-10 backdrop-blur-sm overflow-hidden transform hover:scale-105 transition-all duration-300">
                    <img 
                      src="user_avatar.png" 
                      alt="Individual and Agent Lending" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 mb-4 lg:mb-6 leading-tight">
                  Individual & Agent<br />
                  Lending
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-200">
                  Tailored micro-loans for individuals and local agents. We understand the unique needs of Zambia's entrepreneurs and provide customized financial solutions.
                </p>
              </div>
              
              {/* Merchant Financing */}
              <div className="text-white fade-in text-center lg:text-left">
                <div className="mb-6 lg:mb-8 flex justify-center lg:justify-start">
                  <div className="w-28 sm:w-40 h-20 sm:h-32 rounded-tl-lg bg-opacity-10 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                    <img 
                      src="merchat.png" 
                      alt="Merchant Financing" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 mb-4 lg:mb-6 leading-tight">
                  Merchant<br />
                  Financing
                </h2>
                
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed text-gray-200">
                  Specialized lending solutions for local merchants and small businesses. Help grow your business with accessible credit designed for the Zambian market.
                </p>
              </div>
            </div>
            
            <div className="mt-12 lg:mt-20 flex justify-center lg:justify-start">
              <div className="w-48 sm:w-64 lg:w-96 h-1 bg-yellow-600"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Money Integration Section */}
      <section 
        className="snap-section section-separator relative bg-cover bg-center bg-no-repeat section-fade"
        style={{ backgroundImage: `linear-gradient(to right,rgba(2, 79, 6, 0.0), rgba(0, 0, 0, 0)), url('/friends.jpg')` }}
      >
        <div className="absolute inset-0 bg-opacity-40"></div>
        
        <div className="relative z-10 min-h-screen px-4 sm:px-6 lg:px-16 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Left - Puzzle Image */}
            <div className="flex-shrink-0 slide-in-left order-2 lg:order-1">
              <div className="w-32 sm:w-40 lg:w-48 h-32 sm:h-40 lg:h-48 rounded-tl-2xl border-white border-2 bg-opacity-100 backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                <img 
                  src="puzzle.png" 
                  alt="Integration puzzle" 
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            
            {/* Center Content */}
            <div className="flex-1 text-white fade-in text-center lg:text-left order-1 lg:order-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-yellow-400 mb-4 lg:mb-8 leading-tight">
                Mobile Money<br />
                Integration
              </h1>
              
              <p className="text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mb-4 lg:mb-8">
                Seamless integration with popular mobile money platforms.{' '}
                <span className="text-yellow-400 font-semibold">
                  Request loans, receive funds, and make repayments
                </span>{' '}
                all through your mobile phone.
              </p>
              
              <div className="w-20 sm:w-32 h-1 bg-red-500 mx-auto lg:mx-0"></div>
            </div>
            
            {/* Right - Eligible Image */}
            <div className="flex-shrink-0 slide-in-right order-3">
              <img 
                src="Eligible2.png" 
                alt="Who is eligible" 
                className="w-48 sm:w-56 lg:w-64 h-auto shadow-lg transform hover:scale-105 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 py-6 lg:py-8 slide-transition">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-base sm:text-lg">ka' starta ka bonse. Finance for all.</p>
        </div>
      </footer>
    </div>
  );
};

export default EmeraldFinanceHomepage;