import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Globe, Building2, Phone, Smartphone, Users, Store, CreditCard } from 'lucide-react';

interface SlideData {
  title: string;
  content: string[];
  provider: 'airtel' | 'mtn';
  type: 'apply' | 'repay';
}

const PhoneSlideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const slides: SlideData[] = [
    {
      title: "Apply via Airtel",
      provider: 'airtel',
      type: 'apply',
      content: [
        "Dial *115#",
        "Select option 5, 'Na Sova Loan'",
        "Select option 5, 'Ka'starta Loan'",
        "Select option 1, 'Request Loan'"
      ]
    },
    {
      title: "Apply via MTN",
      provider: 'mtn',
      type: 'apply',
      content: [
        "Dial *115#",
        "Select 'Kongola & Savings' (6)",
        "Select 'Kongola' (2)",
        "Select 'Ka'Starta' (4)"
      ]
    },
    {
      title: "Repay via Airtel",
      provider: 'airtel',
      type: 'repay',
      content: [
        "Dial *115#",
        "Select option 5, 'Na Sova Loan'",
        "Select option 5, 'Ka'starta Loan'",
        "Select option 1, 'Repay Loan'"
      ]
    },
    {
      title: "Repay via MTN",
      provider: 'mtn',
      type: 'repay',
      content: [
        "Dial *115#",
        "Select 'Kongola & Savings'",
        "Select 'Kongola'",
        "Select 'Ka'Starta'"
      ]
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsPlaying(false);
  };

  const currentSlideData = slides[currentSlide];

  return (
    <div className="relative">
      <div className="w-[300px] h-[600px] bg-gradient-to-br from-slate-800 to-black rounded-[30px] mx-auto relative shadow-2xl overflow-hidden">
        <div className="w-[260px] h-[520px] bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-[20px] mx-auto mt-10 relative flex flex-col items-center justify-center text-white font-bold overflow-hidden">
          
          {/* Navigation arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all z-10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Slide indicators */}
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsPlaying(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentSlide ? 'bg-yellow-400' : 'bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Content */}
          <div className="text-center px-6 py-8">
            <div className="text-yellow-400 text-2xl mb-2 drop-shadow-lg">
              Ka'Starta
            </div>
            
            <div className={`inline-block px-3 py-1 rounded-full text-xs mb-4 ${
              currentSlideData.provider === 'airtel' 
                ? 'bg-red-500/80 text-white' 
                : 'bg-yellow-500/80 text-black'
            }`}>
              {currentSlideData.provider === 'airtel' ? 'Airtel Money' : 'MTN MoMo'}
            </div>
            
            <h3 className="text-lg font-bold mb-4 text-yellow-400">
              {currentSlideData.title}
            </h3>
            
            <div className="space-y-2 text-sm">
              {currentSlideData.content.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="bg-yellow-400 text-emerald-800 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="text-left">{step}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 text-xs opacity-80">
              {currentSlideData.type === 'apply' ? '📱 Quick Application' : '💰 Easy Repayment'}
            </div>
          </div>

          {/* Play/Pause button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute bottom-4 right-4 bg-black/20 hover:bg-black/40 rounded-full p-2 transition-all"
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
        </div>
      </div>
    </div>
  );
};

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
    <div className="font-sans text-slate-800 overflow-x-hidden">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isHeaderVisible 
          ? 'bg-gradient-to-r from-slate-800 to-emerald-800' 
          : 'bg-slate-800/95 backdrop-blur-lg'
      } shadow-lg`}>
        <nav className="max-w-6xl mx-auto px-5 py-4 flex justify-between items-center">
            <img src="/Logo2.png" alt="Emerald Finance Logo" className="h-15 w-22 inline-block" />
            <ul className="hidden md:flex gap-8">
            {['home', 'about', 'services', 'team', 'contact'].map((item) => (
              <li key={item}>
                <button
                  onClick={() => scrollToSection(item)}
                  className="text-white font-medium px-4 py-2 rounded-full hover:bg-yellow-400 hover:text-slate-800 transition-all duration-300 transform hover:-translate-y-1 capitalize"
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
     {/* Hero Section */}
      <section id="home" className="min-h-screen bg-gradient-to-br from-emerald-800 via-emerald-600 to-emerald-400 flex items-center relative overflow-hidden">
        {/* Animated SVG bubbles background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Bubble 1 */}
          <svg
            className="absolute left-[10%] top-[20%] w-24 h-24 opacity-30 animate-bubble-move-1"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="48" fill="#f6c932" />
          </svg>
          {/* Bubble 2 */}
          <svg
            className="absolute left-[70%] top-[10%] w-32 h-32 opacity-20 animate-bubble-move-2"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="40" fill="#fff" />
          </svg>
          {/* Bubble 3 */}
          <svg
            className="absolute left-[60%] top-[60%] w-20 h-20 opacity-25 animate-bubble-move-3"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="35" fill="#f6c932" />
          </svg>
          {/* Bubble 4 */}
          <svg
            className="absolute left-[25%] top-[70%] w-28 h-28 opacity-15 animate-bubble-move-4"
            viewBox="0 0 100 100"
            fill="none"
          >
            <circle cx="50" cy="50" r="45" fill="#fff" />
          </svg>
        </div>
        
        <div className="max-w-6xl mx-auto px-5 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="text-white space-y-6 animate-fade-in-left">
              <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">
                Digital Microfinance for Zambia
              </h1>
              <p className="text-xl opacity-90 leading-relaxed">
                Empowering underserved communities with fair, reliable credit through innovative digital channels. Access loans instantly via mobile money.
              </p>
              <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-800 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 shadow-lg">
                Get Ka'Starta Loan
              </button>
            </div>
            
            <div className="animate-fade-in-right">
              <PhoneSlideshow />
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12 relative">
            About Emerald Finance
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-lg leading-relaxed">
              <p>
                Founded in <span className="text-emerald-600 font-bold">2020</span> and licensed by the Bank of Zambia, Emerald Finance Limited is a leading microfinance institution based in <span className="text-emerald-600 font-bold">Lusaka</span>. We are dedicated to serving Zambia's underserved populations by providing fair and reliable credit through innovative digital channels.
              </p>
              
              <p>
                Our headquarters is strategically located at the intersection of Kwacha Rd and Parliament Rd | Olympia in Lusaka, positioning us at the heart of Zambia's economic center.
              </p>
              
              <p>
                We specialize in digital micro-lending under our flagship brand <span className="text-emerald-600 font-bold">Ka'Starta</span>, offering tailored micro-loans for individuals, agents, and local merchants directly through mobile money and smartphone access.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: "2020", label: "Founded" },
                { number: "*115#", label: "USSD Access" },
                { number: "24/7", label: "Mobile Access" },
                { number: "100%", label: "Digital Process" }
              ].map((stat, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">{stat.number}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12 relative">
            Our Services
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Smartphone className="w-8 h-8" />,
                title: "Ka'Starta Mobile Loans",
                description: "Access instant micro-loans through our mobile app and USSD code *115#. Quick approval, flexible repayment terms, and seamless integration with mobile money platforms."
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Individual & Agent Lending",
                description: "Tailored micro-loans for individuals and local agents. We understand the unique needs of Zambia's entrepreneurs and provide customized financial solutions."
              },
              {
                icon: <Store className="w-8 h-8" />,
                title: "Merchant Financing",
                description: "Specialized lending solutions for local merchants and small businesses. Help grow your business with accessible credit designed for the Zambian market."
              },
              {
                icon: <CreditCard className="w-8 h-8" />,
                title: "Mobile Money Integration",
                description: "Seamless integration with popular mobile money platforms. Request loans, receive funds, and make repayments all through your mobile phone."
              }
            ].map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-3 transition-all duration-300 border-2 border-transparent hover:border-yellow-400">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-full flex items-center justify-center text-white mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-emerald-800 text-white">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center">
            <h2 className="text-4xl font-bold mb-6">Strategic Partnership</h2>
            <p className="text-xl mb-12 opacity-90">
              We've partnered with leading mobile money providers to expand credit access throughout Zambia.
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {['Emerald Finance', 'MTN MoMo', 'Airtel Money', 'Ezra World'].map((partner, index) => (
                <React.Fragment key={partner}>
                  <div className="bg-white text-slate-800 px-6 py-4 rounded-2xl font-bold shadow-lg">
                    {partner}
                  </div>
                  {index < 3 && <div className="text-yellow-400 text-3xl">+</div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center text-slate-800 mb-12 relative">
            Leadership Team
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-yellow-400 to-emerald-400 rounded-full"></div>
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Kabeke Mulenga", role: "Chief Executive Officer", initials: "KM" },
              { name: "Joseph Mubambe", role: "Chief Finance Officer", initials: "JM" },
              { name: "Chibuye Susa", role: "Senior Product Development Manager", initials: "CS" },
              { name: "Basil Mwila", role: "Data And Systems Manager | Head of I.T", initials: "BM" }
            ].map((member, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-400 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-6">
                  {member.initials}
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{member.name}</h3>
                <p className="text-emerald-600 font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-emerald-800 to-slate-800 text-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12">Get In Touch</h2>
          
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h3 className="text-yellow-400 text-2xl font-bold mb-6">Contact Information</h3>
              
              {[
                {
                  icon: <MapPin className="w-6 h-6" />,
                  title: "Address:",
                  content: "Plot No. 5038 Kwacha Rd and Parliament Rd | Olympia,\nLusaka, Zambia"
                },
                {
                  icon: <Building2 className="w-6 h-6" />,
                  title: "Licensed by:",
                  content: "Bank of Zambia"
                },
                {
                  icon: <Globe className="w-6 h-6" />,
                  title: "Website:",
                  content: "emeraldfinanceltd.com And\nkasstarta.com"
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-slate-800">
                    {item.icon}
                  </div>
                  <div>
                    <strong>{item.title}</strong><br />
                    <span className="whitespace-pre-line">{item.content}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <h3 className="text-yellow-400 text-2xl font-bold mb-6">Access Ka'Starta Loans</h3>
              <p className="mb-6 text-lg">Get instant access to micro-loans using our USSD code :</p>
              <div className="bg-yellow-400 text-slate-800 text-3xl font-bold py-6 px-8 rounded-2xl shadow-2xl mb-6">
                Dial *115#
              </div>
              <p className="text-sm opacity-80">Available 24/7 through mobile money and smartphone access</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-8">
        <div className="max-w-6xl mx-auto px-5">
          <p>&copy; 2025 Emerald Finance Limited. All rights reserved. Licensed by the Bank of Zambia.</p>
        </div>
      </footer>
    </div>
  );
};

export default EmeraldFinanceHomepage;