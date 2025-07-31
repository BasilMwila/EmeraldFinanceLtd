import React from 'react';

const AirtelComponent: React.FC = () => {
  return (
    <div className="min-h-screen">
      <style>{`
        .snap-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }
        
        .snap-section {
          min-height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
          transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
        }
        
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
                  AIRTEL STEPS
                </span>
                <a href="/mtn" className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm font-medium">
                  MTN STEPS
                </a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      <div className="snap-container pt-20 md:pt-32">
        {/* Registration Section */}
        <section className="snap-section relative bg-cover bg-center bg-no-repeat section-fade"
          style={{ backgroundImage: "url('steps.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/60 via-red-900/30 to-transparent"></div>
          
          <div className="relative z-10 min-h-screen flex flex-col lg:flex-row py-20">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 lg:py-12">
              <div className="text-white max-w-lg slide-in-left text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-8 leading-tight">
                  How to Register for a Ka'Starta loan on Airtel Money.
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-4 lg:mb-8 opacity-90">
                  Available <span className="font-bold">24/7</span> through mobile money and smartphone access.
                </p>
                
                <div className="inline-block">
                  <img 
                    src="steps.png" 
                    alt="Please Follow These Steps" 
                    className="h-auto w-32 sm:w-48 lg:max-w-md transform hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            
            {/* Right Content - Phone Steps */}
            <div className="w-full lg:w-1/2 flex items-center justify-center relative px-4 lg:mr-16 py-6 lg:py-12">
              {/* Mobile/Tablet Layout - Vertical Stack */}
              <div className="flex lg:hidden flex-col gap-4 items-center slide-in-right max-w-sm mx-auto">
                <div className="mb-4">
                  <img 
                    src="red_dial.png" 
                    alt="Dial *115#" 
                    className="w-48 sm:w-56 h-auto"
                  />
                </div>
                
                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <div className="space-y-2">
                    <p className="text-xs">Terms and Conditions apply for Ka'Starta Loans.</p>
                    <div className='text-xs'><span className="font-bold">1. Accept</span> <br/>2. Exit</div>
                  </div>
                </div>
                
                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs mb-2">Enter your <span className="font-bold">PIN to opt-in and accept the Terms and Conditions</span> to access the Cash Loans service.</p>
                  <p className="text-xs">For Terms and Conditions visit https://kastarta.com/</p>
                </div>
                
                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs mb-2">Thank you for opting-in and for accepting the terms and conditions.</p>
                  <p className="text-xs mb-2">Please <span className="font-bold">redial *115#</span> to apply for a loan.</p>
                  <p className="text-xs">T and C's: kastarta.com/</p>
                </div>
              </div>

              {/* Desktop Layout - Horizontal */}
              <div className="hidden lg:flex gap-4 items-end slide-in-right mt-32">
                <div className="relative flex-shrink-0">
                  <div className="absolute -top-32 left-1/2 transform -translate-x-48 z-12">
                    <img 
                      src="red_dial.png" 
                      alt="Dial *115#" 
                      className="max-w-72 h-auto"
                    />
                  </div>
                  
                  <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 transform hover:scale-105 transition-all duration-300">
                    <div className="space-y-3">
                      <p className="text-xs mb-0 mt-24">Terms and Conditions apply for Ka'Starta Loans.</p>
                      <div className='text-xs'><span className="font-bold">1. Accept</span> <br/>2. Exit</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 flex-shrink-0 transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs mt-24 mb-3">Enter your <span className="font-bold">PIN to opt-in and accept the Terms and Conditions</span> to access the Cash Loans service.</p>
                  <p className="text-xs">For Terms and Conditions visit https://kastarta.com/</p>
                </div>
                
                <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 flex-shrink-0 transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs mb-3 mt-24">Thank you for opting-in and for accepting the terms and conditions.</p>
                  <p className="text-xs mb-3">Please <span className="font-bold">redial *115#</span> to apply for a loan.</p>
                  <p className="text-xs mb-4">T and C's: kastarta.com/</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Loan Section */}
        <section className="snap-section relative bg-cover bg-center bg-no-repeat section-fade"
          style={{ backgroundImage: "url('steps1.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/60 via-red-900/30 to-transparent"></div>
          
          <div className="relative z-10 min-h-screen flex flex-col lg:flex-row py-20">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 lg:py-12">
              <div className="text-white max-w-lg slide-in-left text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-8 leading-tight">
                  How to get a loan on airtel money.
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-4 lg:mb-8 opacity-90">
                  Available <span className="font-bold">24/7</span> through mobile money and smartphone access.
                </p>
                
                <div className="inline-block">
                  <img 
                    src="steps.png" 
                    alt="Please Follow These Steps" 
                    className="h-auto w-32 sm:w-48 lg:max-w-md transform hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex items-center justify-center relative px-4 lg:mr-16 py-6 lg:py-12">
              {/* Mobile Layout */}
              <div className="flex lg:hidden flex-col gap-4 items-center slide-in-right max-w-sm mx-auto">
                <div className="mb-4">
                  <img 
                    src="red_dial.png" 
                    alt="Dial *115#" 
                    className="w-48 sm:w-56 h-auto"
                  />
                </div>
                
                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <div className="space-y-2">
                    <p className="text-xs">Welcome to Ka'Starta loan service</p>
                    <div className="space-y-1 text-xs">
                      <div><span className="font-bold">1. Ka'Starta Loan</span></div>
                      <div>2. Repay Loan</div>
                      <div>3. Balance</div>
                      <div>4. About</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs leading-relaxed">
                    Enter your <span className="font-bold">MM PIN</span><br />
                    number to confirm
                  </p>
                </div>

                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs font-semibold mb-2">Enter your loan amount from K50 to K750:</p>
                  <div className="space-y-2 text-xs">
                    <div className="text-base">
                      <span className="font-bold">1. 500</span><br />
                    </div>
                    <div className="text-base">
                      <span className="font-bold">Submit</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex gap-4 items-end slide-in-right mt-32">
                <div className="relative flex-shrink-0">
                  <div className="absolute -top-32 left-1/2 transform -translate-x-48 z-12">
                    <img 
                      src="red_dial.png" 
                      alt="Dial *115#" 
                      className="max-w-72 h-auto"
                    />
                  </div>
                  
                  <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 transform hover:scale-105 transition-all duration-300">
                    <div className="space-y-3">
                      <p className="text-xs mt-24">Welcome to Ka'Starta loan service</p>
                      
                      <div className="space-y-3 mt-8">
                        <div className="text-xs">
                          <span className="font-bold">1. Ka'Starta Loan</span>
                        </div>
                        <div className="text-xs">2. Repay Loan</div>
                        <div className="text-xs">3. Balance</div>
                        <div className="text-xs">4. About</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 flex-shrink-0 transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs leading-relaxed mt-24">
                    Enter your <span className="font-bold">MM PIN</span><br />
                    number to confirm
                  </p>
                </div>

                <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 flex-shrink-0 transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs font-semibold mt-24">Enter your loan amount from K50 to K750:</p>
                  
                  <div className="space-y-3 text-xs">
                    <div className="text-base">
                      <span className=" font-bold">1. 500</span><br />
                    </div>
                    <div className="text-base">
                      <span className="font-bold">Submit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Repay Loan Section */}
        <section className="snap-section relative bg-cover bg-center bg-no-repeat section-fade"
          style={{ backgroundImage: "url('repay.jpg')" }}>
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/60 via-red-900/30 to-transparent"></div>
          
          <div className="relative z-10 min-h-screen flex flex-col lg:flex-row py-20">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-8 lg:px-16 py-6 lg:py-12">
              <div className="text-white max-w-lg slide-in-left text-center lg:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-8 leading-tight">
                  How to Repay a loan on airtel money.
                </h1>
                
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl mb-4 lg:mb-8 opacity-90">
                  Available <span className="font-bold">24/7</span> through mobile money and smartphone access.
                </p>
                
                <div className="inline-block">
                  <img 
                    src="steps.png" 
                    alt="Please Follow These Steps" 
                    className="h-auto w-32 sm:w-48 lg:max-w-md transform hover:scale-105 transition-all duration-300"
                  />
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 flex items-center justify-center relative px-4 lg:mr-16 py-6 lg:py-12">
              {/* Mobile Layout */}
              <div className="flex lg:hidden flex-col gap-4 items-center slide-in-right max-w-sm mx-auto">
                <div className="mb-4">
                  <img 
                    src="red_dial.png" 
                    alt="Dial *115#" 
                    className="w-48 sm:w-56 h-auto"
                  />
                </div>
                
                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <div className="space-y-2">
                    <p className="text-xs">Welcome to Ka'Starta loan service</p>
                    <div className="space-y-1 text-xs">
                      <div>1. Ka'Starta Loan</div>
                      <div className="font-bold">2. Repay Loan</div>
                      <div>3. Balance</div>
                      <div>4. About</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs leading-relaxed">
                    Enter your <span className="font-bold">MM PIN</span><br />
                    number to confirm
                  </p>
                </div>

                <div className="bg-white text-black rounded-2xl p-3 shadow-xl border-2 border-black w-full max-w-xs transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs font-semibold mb-2">Select your repayment method</p>
                  <div className="space-y-2 text-xs">
                    <div className="text-base">
                      <span className="font-bold">1. full repayment</span><br />
                    </div>
                    <div className="text-base">
                      <span className="font-bold">2. Enter amount to repay</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden lg:flex gap-4 items-end slide-in-right mt-32">
                <div className="relative flex-shrink-0">
                  <div className="absolute -top-32 left-1/2 transform -translate-x-48 z-12">
                    <img 
                      src="red_dial.png" 
                      alt="Dial *115#" 
                      className="max-w-72 h-auto"
                    />
                  </div>
                  
                  <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 transform hover:scale-105 transition-all duration-300">
                    <div className="space-y-3">
                      <p className="text-xs mt-24">Welcome to Ka'Starta loan service</p>
                      
                      <div className="space-y-3 mt-8">
                        <div className="text-xs">
                          <span className="">1. Ka'Starta Loan</span>
                        </div>
                        <div className="text-xs font-bold">2. Repay Loan</div>
                        <div className="text-xs">3. Balance</div>
                        <div className="text-xs">4. About</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 flex-shrink-0 transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs leading-relaxed mt-24">
                    Enter your <span className="font-bold">MM PIN</span><br />
                    number to confirm
                  </p>
                </div>

                <div className="bg-white text-black rounded-3xl p-4 shadow-xl border-4 border-black w-48 h-90 flex-shrink-0 transform hover:scale-105 transition-all duration-300">
                  <p className="text-xs font-semibold mt-24">Select your repayment method</p>
                  
                  <div className="space-y-3 text-xs">
                    <div className="text-base">
                      <span className=" font-bold">1. full repaymen</span><br />
                    </div>
                    <div className="text-base">
                      <span className="font-bold">2. Enter amount to repay</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-emerald-800 py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white text-base sm:text-lg">ka' starta ka bonse. Finance for all.</p>
        </div>
      </footer>
    </div>
  );
};

export default AirtelComponent;