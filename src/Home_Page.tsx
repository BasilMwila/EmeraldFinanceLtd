import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronRight } from 'lucide-react';

const EmeraldFinanceHomepage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-emerald-800 shadow-lg relative z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="/Emerald_Logo_Web1.png" 
                alt="Emerald Finance Logo" 
                className="h-24 w-auto"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['HOME', 'ABOUT US', 'SERVICES', 'HOW TO', 'OUR TEAM', 'CONTACT US'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                  className="text-white font-medium hover:text-yellow-400 transition-colors duration-200 text-sm"
                >
                  {item}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-yellow-400"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-emerald-900">
                {['HOME', 'ABOUT US', 'SERVICES', 'HOW TO', 'OUR TEAM', 'CONTACT US'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      scrollToSection(item.toLowerCase().replace(' ', '-'));
                      setIsMenuOpen(false);
                    }}
                    className="text-white block px-3 py-2 text-base font-medium hover:text-yellow-400 transition-colors duration-200"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/home_page.jpg')`
          }}
        >
          {/* Overlay for mobile phones image effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-black/30"></div>
        </div>

        <div className="relative z-10 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  Digital<br />
                  Microfinance for<br />
                  Zambia
                </h1>
                <p className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90">
                  Empowering underserved communities with fair,<br />
                  reliable credit through innovative digital channels.<br />
                  Access loans instantly via mobile money.
                </p>
                <button className="bg-yellow-400 text-black px-8 py-4 rounded text-lg font-semibold hover:bg-yellow-500 transition-colors duration-200 border-2 border-yellow-400">
                  READ MORE
                </button>
              </div>

              {/* Right Content - Social Icons */}
              <div className="flex justify-end">
                <div className="flex flex-col space-y-4">
                  <a href="#" className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-colors">
                    <span className="text-lg font-bold">f</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                    <span className="text-lg font-bold">𝕏</span>
                  </a>
                  <a href="#" className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center text-white hover:bg-emerald-700 transition-colors">
                    <span className="text-lg font-bold">📷</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about-us" className="py-20 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right,rgba(2, 79, 6, 0.4), rgba(0, 0, 0, 0)), url('/about_page.jpg')`
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-8">
                About Emerald<br />Finance
              </h2>
              <div className="space-y-6 text-lg text-white leading-relaxed">
                <p>
                  Founded in <span className="font-semibold text-white">2020</span> and licensed by the Bank of Zambia, Emerald Finance Limited is a leading microfinance institution based in <span className="font-semibold text-white">Lusaka</span>. We are dedicated to serving Zambia's underserved populations by providing fair and reliable credit through innovative digital channels.
                </p>
                <p>
                  We specialize in digital micro-lending under our flagship <span className="font-semibold text-yellow-300">brand Ka'Starta</span>, offering tailored micro-loans for individuals, agents, and local merchants directly through mobile money and smartphone access.
                </p>
              </div>
              <button className="mt-8 bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors duration-200 border-2 border-yellow-400">
                READ MORE
              </button>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-yellow-400 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-2">2020</div>
                <div className="text-white font-semibold">Founded</div>
                <div className="mt-4">
                  <ChevronRight className="w-6 h-6 text-white mx-auto" />
                </div>
              </div>
              <div className="bg-emerald-600 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-2">24/7</div>
                <div className="text-white font-semibold">Mobile<br />Access</div>
              </div>
              <div className="bg-emerald-600 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-2">*115#</div>
                <div className="text-white font-semibold">USSD<br />Access</div>
              </div>
              <div className="bg-yellow-400 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-white font-semibold">Digital<br />Process</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objective Section */}
      <section className="py-20 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(182, 200, 255, 0.75), rgba(0, 0, 0, 0.3)), url('/objective_page.jpg')`
          }}
        ></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Left Content */}
            <div className="lg:col-span-2">
              <h2 className="text-5xl font-bold text-yellow-400 mb-8">Objective</h2>
              <div className="text-white space-y-6 text-lg leading-relaxed">
                <p>
                  Emerald finance will exist to empower people economically. We will be giving access to small loans for consumption, conveniently and affordable to a new generation of credit application based on forward looking data and predictive models rather than their past performance.
                </p>
                <p>
                  To achieve this, we have partnered with <span className="text-yellow-400 font-semibold">MTN Zambia and Airtel Zambia</span> to give loans to the registered MTN and Airtel Money Mobile Money Subscribers, including consumers and the agents. The loans are under the Ka'Starta Brand. These are: To achieve this, we have partnered with MTN Zambia and Airtel Zambiaa to give Consumer loans to the registered MTN and Airtel Money Mobile Money Subscribers under the KaStarta brand.
                </p>
              </div>
              
              <div className="mt-12">
                <button className="bg-yellow-400 text-black px-6 py-3 rounded font-semibold hover:bg-yellow-500 transition-colors duration-200 border-2 border-yellow-400">
                  BACK
                </button>
              </div>

              <div className="mt-12">
                <h3 className="text-5xl font-bold text-yellow-400 mb-4">THE<span className="text-white">UNBANKED</span></h3>
                <p className="text-white text-lg">ka' starta ka bonse. Finance for all.</p>
              </div>
            </div>

            {/* Right Content */}
            <div className="space-y-8">
              <div className="bg-slate-400 p-6">
                <h3 className="text-2xl font-bold text-yellow-300 mb-4">Our Vision</h3>
                <p className="text-white">
                  Is to provide financials olutions to the unbanked and SME's.
                </p>
              </div>

              <div className="bg-emerald-600 p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                <p className="text-white">
                  Is simple; to include the unbanked to a world of possibility with innovative Finance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Partnership Section */}
      <section className="py-20 relative">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/strategic_page.jpg')`
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold text-emerald-800 mb-6">
            Strategic<br />Partnership
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
            We've partnered with leading mobile money providers to expand credit access throughout Zambia.
          </p>

          {/* Partner Logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="bg-black w-48 h-32 flex items-center justify-center shadow-lg">
              <img 
                src="/EMERALD_LOGO.jpg" 
                alt="Emerald Finance Logo" 
                className="h-20 w-auto object-contain"
              />
            </div>

            <div className="bg-yellow-400 w-48 h-32 flex items-center justify-center shadow-lg">
              <img 
                src="/MTN_Logo.jpg" 
                alt="MTN Logo" 
                className="h-20 w-auto object-contain"
              />
            </div>

            <div className="bg-red-600 w-48 h-32 flex items-center justify-center shadow-lg">
              <img 
                src="/Airtel_Logo.jpg" 
                alt="Airtel Logo" 
                className="h-20 w-auto object-contain"
              />
            </div>

            <div className="bg-slate-600 p-6 rounded-lg w-48 h-32 flex items-center justify-center shadow-lg">
              <img 
                src="/Ezra_Logo.jpg" 
                alt="Ezra Logo" 
                className="h-20 w-auto object-contain"
              />
            </div>
          </div>

          {/* Partner Labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-4">
            <div className="text-gray-700 font-medium">Emerald Finance</div>
            <div className="text-gray-700 font-medium">MTN MoMo</div>
            <div className="text-gray-700 font-medium">Airtel Money</div>
            <div className="text-gray-700 font-medium">Ezra World</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmeraldFinanceHomepage;