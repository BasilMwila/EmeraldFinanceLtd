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
      <section className="bg-gradient-to-r from-[#002f4b] via-[#005d8f] to-[#ffffff] py-16 px-6 md:px-20 text-white">
  <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
    
    {/* Individual & Agent Lending */}
    <div className="bg-blue-900 bg-opacity-60 p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-yellow-400 p-4 rounded-md">
          {/* Replace emoji with actual SVG/icon component */}
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-yellow-400 font-bold text-xl">
            👥
          </div>
        </div>
        <h2 className="text-3xl font-bold text-yellow-400 leading-tight">
          Individual & Agent <br /> Lending
        </h2>
      </div>
      <p className="text-white text-base leading-relaxed">
        Tailored micro-loans for individuals and local agents. We understand the unique needs of Zambia’s entrepreneurs and provide customized financial solutions.
      </p>
      <div className="mt-6 h-2 bg-yellow-300 w-32 rounded"></div>
    </div>

    {/* Merchant Financing */}
    <div className="bg-blue-900 bg-opacity-60 p-6 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4 mb-6">
        <div className="bg-green-800 p-4 rounded-md">
          {/* Replace emoji with actual SVG/icon component */}
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-green-900 font-bold text-xl">
            🏪
          </div>
        </div>
        <h2 className="text-3xl font-bold text-yellow-400 leading-tight">
          Merchant <br /> Financing
        </h2>
      </div>
      <p className="text-white text-base leading-relaxed">
        Specialized lending solutions for local merchants and small businesses. Help grow your business with accessible credit designed for the Zambian market.
      </p>
    </div>
  </div>
</section>


      {/* How To Section */}
      <section id="how-to" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl font-bold text-emerald-800 text-center mb-16">How To Access Ka'Starta Loans</h2>
          
          {/* Airtel Money Instructions */}
          <div className="mb-20">
            <div className="relative bg-red-600 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700"></div>
              <div className="relative z-10 p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-white">
                    <div className="inline-block bg-red-500 text-white px-6 py-2 rounded-full mb-6 text-lg font-semibold">
                      Your Phone
                    </div>
                    <h3 className="text-4xl font-bold mb-4">
                      How to Register for a Ka'Starta loan on Airtel Money.
                    </h3>
                    <p className="text-xl mb-8">Available 24/7 through mobile money and smartphone access.</p>
                    <div className="bg-red-700 px-6 py-3 rounded text-white font-semibold inline-block">
                      Please Follow These Steps:
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {/* Phone Screen 1 */}
                    <div className="bg-white rounded-lg p-4 text-black">
                      <div className="text-center mb-4">
                        <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm inline-block mb-2">
                          Dial *115#
                        </div>
                      </div>
                      <div className="text-sm space-y-2">
                        <p>Terms and Conditions apply for Ka'Starta Loans.</p>
                        <p className="font-semibold">1. Accept</p>
                        <p>Exit</p>
                      </div>
                    </div>

                    {/* Phone Screen 2 */}
                    <div className="bg-white rounded-lg p-4 text-black">
                      <div className="text-sm space-y-2">
                        <p>Enter your PIN to <span className="font-semibold">opt-in and accept the Terms and Conditions</span> to access the Cash Loans service.</p>
                        <p>For Terms and Conditions visit https://emeraldfinanceltd.com/</p>
                      </div>
                    </div>

                    {/* Phone Screen 3 */}
                    <div className="bg-white rounded-lg p-4 text-black">
                      <div className="text-sm space-y-2">
                        <p>Thank you for opting-in and for accepting the terms and conditions.</p>
                        <p>Please <span className="font-semibold">redial *115#</span> to apply for a loan.</p>
                        <p>T and C's: kastarta.com/</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MTN Instructions */}
          <div className="mb-20">
            <div className="relative bg-yellow-400 rounded-lg overflow-hidden">
              <div className="relative z-10 p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className="text-black">
                    <div className="inline-block bg-yellow-500 text-white px-6 py-2 rounded-full mb-6 text-lg font-semibold">
                      Your Phone
                    </div>
                    <h3 className="text-4xl font-bold mb-4">
                      How to Register for a Ka'Starta loan on MTN.
                    </h3>
                    <div className="bg-yellow-500 px-6 py-3 rounded text-white font-semibold inline-block">
                      Please Follow These Steps:
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {/* Phone Screens for MTN */}
                    <div className="bg-white rounded-lg p-3 text-black text-sm">
                      <p className="font-semibold mb-2">Menu</p>
                      <div className="space-y-1">
                        <p>1. Send money</p>
                        <p>2. Withdraw Cash</p>
                        <p>3. Pay Bill</p>
                        <p>4. Airtime & Bundles</p>
                        <p>5. MoMoPay</p>
                        <p className="font-semibold">6. Kongola & Savings</p>
                        <p>7. Banking Services</p>
                        <p>8. Pin Reset</p>
                        <p>9. My Account</p>
                        <p>00. Next</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 text-black text-sm">
                      <p>Welcome to the Kongola & Savings service.</p>
                      <div className="space-y-1 mt-2">
                        <p className="font-semibold">1. Kongola</p>
                        <p>2. Savings</p>
                        <p>3. 0. Back</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 text-black text-sm">
                      <p>Please select Loan service.</p>
                      <div className="space-y-1 mt-2">
                        <p>1. Kasara Loans</p>
                        <p>2. XtraCash Loans</p>
                        <p>3. Kongola Ka Phone</p>
                        <p>4. Xpress Loans by Zanaco</p>
                        <p className="font-semibold">5. Ka'Starta</p>
                        <p>0. Back</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-3 text-black text-sm">
                      <p>Terms and Conditions apply for Ka'Starta Loans.</p>
                      <p className="font-semibold mt-2">1. Accept</p>
                      <p>Exit</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loan Process Steps */}
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Getting a Loan */}
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">How to Get a Loan</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <p>Welcome to Ka'Starta loan service</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <p>Choose your loan amount: K100-fee: K10 +K0.3 daily or K50-fee: K5 +K0.15 daily</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <p>Enter your MM PIN number to confirm</p>
                </div>
              </div>
            </div>

            {/* Repaying a Loan */}
            <div className="bg-emerald-50 rounded-lg p-8">
              <h3 className="text-2xl font-bold text-emerald-800 mb-6">How to Repay</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">1</div>
                  <p>Access Ka'Starta loan service via *115#</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">2</div>
                  <p>Select "Repay Loan" option</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center font-bold">3</div>
                  <p>Enter repayment amount and confirm with PIN</p>
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