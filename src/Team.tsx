import React from 'react';

const TeamComponent: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <style>{`
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
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Logo Section */}
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

        {/* Navigation Section */}
        <div className="bg-white shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center py-3 md:py-4">
              <nav className="flex space-x-4 lg:space-x-8">
                <a href="/" className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm font-medium">
                  HOME
                </a>
                <span className="text-emerald-600 font-bold text-xs lg:text-sm">
                  OUR TEAM
                </span>
                <a href="/contact" className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm font-medium">
                  CONTACT US
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Team Section */}
      <section className="pt-20 md:pt-32 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="fade-in text-center lg:text-left mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-800 mb-2 lg:mb-4">Meet Our Team</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Introducing the team</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Team Members */}
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:gap-8 slide-in-left">
              {/* Row 1 */}
              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-3 lg:mb-4 overflow-hidden rounded-full border-4 border-emerald-600 shadow-lg">
                  <img 
                    src="/Kabeke.jpeg" 
                    alt="Kabeke Mulenga"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-800">Kabeke Mulenga</h3>
                <p className="text-xs sm:text-sm text-gray-600">Chief Executive Officer</p>
              </div>

              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-3 lg:mb-4 overflow-hidden rounded-full border-4 border-emerald-600 shadow-lg">
                  <img 
                    src="/joseph.jpg" 
                    alt="Joseph Mubambe"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-800">Joseph Mubambe</h3>
                <p className="text-xs sm:text-sm text-gray-600">Chief Financial Officer</p>
              </div>

              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-3 lg:mb-4 overflow-hidden rounded-full border-4 border-emerald-600 shadow-lg">
                  <img 
                    src="/chibuye.jpeg" 
                    alt="Chibuye Susa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-800">Chibuye Susa</h3>
                <p className="text-xs sm:text-sm text-gray-600">Business Development Manager</p>
              </div>

              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 mx-auto mb-3 lg:mb-4 overflow-hidden rounded-full border-4 border-emerald-600 shadow-lg">
                  <img 
                    src="/Basil.jpeg" 
                    alt="Basil Mwila"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-800">Basil Mwila</h3>
                <p className="text-xs sm:text-sm text-gray-600">Data and Systems Manager | Head of I.T</p>
              </div>

              {/* Row 2 */}
              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-300 rounded-full mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-800">Elizabeth Mubanga</h3>
                <p className="text-xs sm:text-sm text-gray-600">Customer care Representative</p>
              </div>

              <div className="text-center transform hover:scale-105 transition-all duration-300">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-300 rounded-full mx-auto mb-3 lg:mb-4 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-sm sm:text-base lg:text-lg text-gray-800">Stephanie Chilande</h3>
                <p className="text-xs sm:text-sm text-gray-600">Customer care Representative</p>
              </div>
            </div>

            {/* Company Quote - Using Eligible2.png */}
            <div className="flex items-center justify-center slide-in-right">
              <img 
                src="Eligible2.png" 
                alt="At Emerald Finance - In a world of decimals and deadlines, we're the emeralds in the rough: refined, resilient, and just a little bit brilliant." 
                className="max-w-full h-auto transform hover:scale-105 transition-all duration-300 shadow-lg rounded-lg"
              />
            </div>
          </div>

          {/* Additional Team Information */}
          <div className="mt-16 lg:mt-20 fade-in">
            <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
              <h3 className="text-2xl lg:text-3xl font-bold text-emerald-800 mb-4 lg:mb-6 text-center">
                Our Leadership Philosophy
              </h3>
              <p className="text-gray-700 text-center text-base lg:text-lg leading-relaxed max-w-4xl mx-auto">
                At Emerald Finance, our team brings together decades of experience in financial services, 
                technology, and customer relations. We believe in empowering both our customers and our team 
                members to achieve their full potential. Our leadership is built on the principles of 
                transparency, innovation, and unwavering commitment to financial inclusion in Zambia.
              </p>
            </div>
          </div>

          {/* Team Values */}
          <div className="mt-12 lg:mt-16 grid md:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-emerald-600 text-white rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
              <h4 className="text-xl font-bold mb-3">Innovation</h4>
              <p className="text-sm">Pioneering digital financial solutions for underserved communities.</p>
            </div>
            <div className="bg-yellow-400 text-black rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
              <h4 className="text-xl font-bold mb-3">Integrity</h4>
              <p className="text-sm">Building trust through transparent and ethical business practices.</p>
            </div>
            <div className="bg-emerald-600 text-white rounded-lg p-6 text-center transform hover:scale-105 transition-all duration-300">
              <h4 className="text-xl font-bold mb-3">Inclusion</h4>
              <p className="text-sm">Making financial services accessible to all Zambians.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-800 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-base sm:text-lg">ka' starta ka bonse. Finance for all.</p>
        </div>
      </footer>
    </div>
  );
};

export default TeamComponent;