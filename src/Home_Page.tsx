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
  <div className="border-2 border-white p-4 rounded-tl-2xl">
    <div className="bg-yellow-400 p-6 rounded-lg text-center">
      <div className="text-3xl font-bold text-white mb-2">2020</div>
      <div className="text-white font-semibold">Founded</div>
      <div className="mt-4">
        <ChevronRight className="w-6 h-6 text-white mx-auto" />
      </div>
    </div>
  </div>
  
  <div className="border-6 border-white p-4">
    <div className="bg-emerald-600 p-6 rounded-lg text-center">
      <div className="text-3xl font-bold text-white mb-2">24/7</div>
      <div className="text-white font-semibold">Mobile<br />Access</div>
    </div>
  </div>
  
  <div className="border-6 border-white p-4">
    <div className="bg-emerald-600 p-6 rounded-lg text-center">
      <div className="text-3xl font-bold text-white mb-2">*115#</div>
      <div className="text-white font-semibold">USSD<br />Access</div>
    </div>
  </div>
  
  <div className="border-2 border-white p-4 rounded-br-2xl">
    <div className="bg-yellow-400 p-6 rounded-lg text-center">
      <div className="text-3xl font-bold text-white mb-2">100%</div>
      <div className="text-white font-semibold">Digital<br />Process</div>
    </div>
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
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url('/strategic_page.jpg')`
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          <h2 className="text-5xl font-bold text-emerald-800 mb-6">
            Strategic<br />Partnership
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-2xl text-left">
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

            <div className="bg-red-550 w-48 h-32 flex">
              <img 
                src="/Airtel_Logo.jpg" 
                alt="Airtel Logo" 
                className="h-32 w-40"
              />
            </div>

            <div className="bg-slate-550 w-48 h-32 flex ">
              <img 
                src="/Ezra_Logo.jpg" 
                alt="Ezra Logo" 
                className="h-32 w-40 "
              />
            </div>
          </div>

          {/* Partner Labels */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-4 mr-12">
            <div className="text-gray-700 font-medium">Emerald Finance</div>
            <div className="text-gray-700 font-medium">MTN MoMo</div>
            <div className="text-gray-700 font-medium">Airtel Money</div>
            <div className="text-gray-700 font-medium">Ezra World</div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{  backgroundImage: `linear-gradient(to right,rgba(2, 79, 6, 0.6), rgba(0, 0, 0, 0)), url('/what_we_do.jpg')` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-opacity-40"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center min-h-screen px-8 lg:px-16">
        <div className="max-w-2xl text-white">
          {/* Company services label */}
          
          
          {/* Main heading */}
          <h1 className="text-5xl lg:text-6xl font-bold mb-4">
            What We Do
          </h1>
          <p className="text-lg mb-4 opacity-90">company services</p>
          
          {/* Service name */}
          <h2 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-8">
            Ka'Starta<br />
            Mobile Loans
          </h2>
          
          {/* Description */}
          <p className="text-lg lg:text-xl leading-relaxed mb-8">
            Access instant micro-loans through our mobile app and USSD{' '}
            <span className="text-yellow-400 font-semibold">code *115#</span>. Quick 
            approval, flexible repayment terms, and seamless integration with mobile money 
            platforms.
          </p>
          
          {/* Red accent bar */}
          <div className="w-32 h-1 bg-red-500"></div>
        </div>
      </div>
      
      {/* Eligible image in top right corner */}
      <div className="absolute top-8 right-8 z-20">
        <img 
          src="Eligible.png" 
          alt="Who is eligible" 
          className="w-64 h-auto shadow-lg"
        />
      </div>
    </section>

    <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(to right,rgba(2, 79, 6, 0.0), rgba(0, 0, 0, 0)), url('/about_page.jpg')` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-opacity-50"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center min-h-screen px-8 lg:px-16">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Individual & Agent Lending */}
            <div className="text-white">
              {/* Icon container */}
             <div className="text-white">
  {/* Icon container */}
  <div className="mb-8">
    <div className=" w-32 rounded-tl-lg bg-opacity-10 backdrop-blur-sm overflow-hidden">
      <img 
        src="user_avatar.png" 
        alt="Individual and Agent Lending" 
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>

              
              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-6 leading-tight">
                Individual & Agent<br />
                Lending
              </h2>
              
              {/* Description */}
              <p className="text-lg lg:text-xl leading-relaxed text-gray-200">
                Tailored micro-loans for individuals and local agents. We understand the unique needs of Zambia's entrepreneurs and provide customized financial solutions.
              </p>
            </div>
            
            {/* Merchant Financing */}
            <div className="text-white">
              {/* Icon container */}
              <div className="mb-8">
                <div className="w-40 h-32 rounded-tl-lg bg-opacity-10 backdrop-blur-sm">
                  <img 
                    src="merchat.png" 
                    alt="Merchant Financing" 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Heading */}
              <h2 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-6 leading-tight">
                Merchant<br />
                Financing
              </h2>
              
              {/* Description */}
              <p className="text-lg lg:text-xl leading-relaxed text-gray-200">
                Specialized lending solutions for local merchants and small businesses. Help grow your business with accessible credit designed for the Zambian market.
              </p>
            </div>
            
          </div>
          
          {/* Accent bar - positioned at bottom left */}
          <div className="mt-16 lg:mt-20">
            <div className="w-96 h-1 bg-yellow-600"></div>
          </div>
        </div>
      </div>
    </section>

      <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `linear-gradient(to right,rgba(2, 79, 6, 0.0), rgba(0, 0, 0, 0)), url('/friends.jpg')` }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-opacity-40"></div>
      
      {/* Puzzle icon in top left corner */}
      <div className="absolute top-15 left-48 z-20">
        <div className="w-48 h-48 rounded-tl-2xl border-white border-2 bg-opacity-100 backdrop-blur-sm">
          <img 
            src="puzzle.png" 
            alt="Integration puzzle" 
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 flex items-center min-h-screen px-8 lg:px-16">
        <div className="max-w-2xl text-white mt-16 lg:mt-0">
          {/* Main heading */}
          <h1 className="text-4xl lg:text-5xl font-bold text-yellow-400 mb-8 leading-tight">
            Mobile Money<br />
            Integration
          </h1>
          
          {/* Description */}
          <p className="text-lg lg:text-xl leading-relaxed mb-8">
            Seamless integration with popular mobile money platforms.{' '}
            <span className="text-yellow-400 font-semibold">
              Request loans, receive funds, and make repayments
            </span>{' '}
            all through your mobile phone.
          </p>
          
          {/* Red accent bar */}
          <div className="w-32 h-1 bg-red-500"></div>
        </div>
      </div>
      
      {/* Eligible image in top right corner */}
      <div className="absolute top-8 right-8 z-20">
        <img 
          src="Eligible2.png" 
          alt="Who is eligible" 
          className="w-64 h-auto shadow-lg"
        />
      </div>
    </section>

      {/* How To Section */}
       <section 
      className="relative min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('steps.jpg')" }}
    >
      {/* Red gradient overlay from left to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/60 via-red-900/30 to-transparent"></div>
      
      {/* Main content - Flex layout for left-right split */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* Left Side - Text Content */}
        <div className="w-1/2 flex flex-col justify-center px-8 lg:px-16 py-12">
          <div className="text-white max-w-lg">
            {/* Main heading */}
            <h1 className="text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              How to Register for a Ka'Starta loan on Airtel Money.
            </h1>
            
            {/* Availability text */}
            <p className="text-lg lg:text-xl mb-8 opacity-90">
              Available <span className="font-bold">24/7</span> through mobile money and smartphone access.
            </p>
            
            {/* Steps instruction */}
            <div className="bg-red-500 text-white px-6 py-3 rounded-lg inline-flex items-center gap-3">
              <span className="text-lg font-semibold">Please Follow These Steps:</span>
              <div className="flex gap-1">
                <div className="w-3 h-3 bg-white rounded-full"></div>
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Side - Phone Steps */}
        <div className="w-1/2 flex items-center justify-center relative mr-16 py-12">
          <div className="flex gap-4 items-end">
            
            {/* Step 1 Phone with red bubble */}
            <div className="relative flex-shrink-0">
              {/* Red speech bubble positioned above phone */}
              <div className="absolute -top-64 left-1/2 transform -translate-x-72 z-12">
                <img 
  src="red_dial.png" 
  alt="Dial *115#" 
  className="max-w-120 h-auto"
/>
              </div>
              
              {/* Phone container */}
              <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-72 h-150">
                
                <div className="space-y-3 ">
                  <p className="text-2xl mb-0 mt-30">Terms and Conditions apply for Ka'Starta Loans.</p>
                  <div className="text-lg font-bold">1. Accept</div>
                  <div className="text-lg">2. Exit</div>
                </div>
              </div>
            </div>
            
            {/* Step 2 Phone */}
            <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-72 h-150 flex-shrink-0">
              <p className="text-lg mt-30 mb-3">Enter your <span className="font-bold">PIN to opt-in and accept the Terms and Conditions</span> to access the Cash Loans service.</p>
              <p className="text-lg">For Terms and Conditions visit https://kastarta.com/</p>
            </div>
            
            {/* Step 3 Phone */}
            <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-72 h-150 flex-shrink-0">
              <p className="text-lg mb-3 mt-30">Thank you for opting-in and for accepting the terms and conditions.</p>
              <p className="text-lg mb-3">Please <span className="font-bold">redial *115#</span> to apply for a loan.</p>
              <p className="text-lg mb-4">T and C's: kastarta.com/</p>
              
              <div className="text-xs text-gray-600 border-t pt-3 mt-24">
                <p className="mb-2"><span className='font-bold'>Enter your PIN to opt-in and accept the Terms and Conditions</span> to access the Cash Loans service. For Terms and Conditions visit https://emeraldfinanceltd.com/</p>
                <p>Thank you for opting-in and for accepting the terms and conditions. Please redial *115# to apply for a loan. T and C's: <span className='font-bold'>https://www.kastarta.com/</span></p>
              </div>
            </div>
            
          </div>
        </div>
        
      </div>
    </section>

      {/* Our Team Section */}
      <section id="our-team" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-emerald-800 mb-4">Meet Our Team</h2>
          <p className="text-xl text-gray-600 mb-16">Introducing the team</p>
          
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Team Members */}
            <div className="grid grid-cols-2 gap-8">
              {/* Row 1 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-lg text-gray-800">Kabeke Mulenga</h3>
                <p className="text-gray-600">Chief Executive Officer</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-lg text-gray-800">Joseph Mubambe</h3>
                <p className="text-gray-600">Chief Financial Officer</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-lg text-gray-800">Chibuye Susa</h3>
                <p className="text-gray-600">Business Development Manager</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-lg text-gray-800">Basil Mwila</h3>
                <p className="text-gray-600">Data and Systems Manager | Head of I.T</p>
              </div>

              {/* Row 2 */}
              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-lg text-gray-800">Elizabeth Mubanga</h3>
                <p className="text-gray-600">Customer care Representative</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
                </div>
                <h3 className="font-bold text-lg text-gray-800">Stephanie Chilande</h3>
                <p className="text-gray-600">Customer care Representative</p>
              </div>
            </div>

            {/* Company Quote */}
            <div className="bg-emerald-600 p-12 rounded-lg text-white">
              <div className="text-8xl mb-6 opacity-20">"</div>
              <h3 className="text-3xl font-bold mb-6">At Emerald Finance</h3>
              <p className="text-lg leading-relaxed">
                In a world of decimals and deadlines, we're the emeralds in the rough: refined, resilient, and just a little bit brilliant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section id="contact-us" className="py-20 relative">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('/contact_bg.jpg')`
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <h2 className="text-5xl font-bold mb-8">Contact Information</h2>
            <div className="space-y-6 text-lg">
              <p className="text-xl leading-relaxed">
                Our headquarters is strategically located at the intersection of Kwacha Road and Parliament Road 
                Olympia in Lusaka, positioning us at the heart of Zambia's economic center.
              </p>
              
              <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Address:</h3>
                <p className="text-xl">
                  Plot No. 5038 Kwacha Road and Parliament Road | Olympia, Lusaka, Zambia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-emerald-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-lg">ka' starta ka bonse. Finance for all.</p>
        </div>
      </footer>
    </div>
  );
};

export default EmeraldFinanceHomepage;