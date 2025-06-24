import React from 'react';
import { ArrowUpRight, Lightbulb, Calendar, MapPin, Users, Target, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
           <div className="w-32 bt-32 h-10 rounded-xl flex items-center justify-center">
                <img src="/Logo.png" alt="Skidmo Logo" className="w-20 h-10" />
              </div>
          </div>
         
        </div>
      </header>

      {/* About Us Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-8">
                About <span className="text-[#26be63]">Us</span>
              </h1>
              
              <div className="relative">
                <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 relative">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Skidmo is a forward-thinking technology company redefining how 
                    Africa accesses property by providing a unified platform that makes renting, 
                    buying, and selling simple, smart, and borderless for both owners and users
                  </p>
                  
                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#26be63] rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <ArrowUpRight className="w-6 h-6 text-[#26be63]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Forward Thinking Visual */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center relative overflow-hidden">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-orange-400 rounded-lg mx-auto mb-4 flex items-center justify-center transform rotate-12">
                      <Lightbulb className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-2xl font-bold text-gray-600 uppercase tracking-wider">
                      Forward<br />Thinking
                    </div>
                  </div>
                  
                  {/* Decorative elements */}
                  <div className="absolute top-8 right-8 w-4 h-4 bg-white/50 rounded-full"></div>
                  <div className="absolute bottom-12 left-12 w-6 h-6 bg-white/30 rounded-full"></div>
                  <div className="absolute top-1/2 left-8 w-3 h-3 bg-orange-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company History Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Company <span className="text-[#26be63]">History</span>
            </h2>
            
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className="text-gray-600 text-lg">From</span>
              <div className="text-6xl md:text-7xl font-bold text-[#26be63]">
                2024 -
              </div>
              <div className="text-4xl md:text-5xl font-bold text-gray-400">
                Now
              </div>
            </div>
          </div>

          {/* Timeline Content */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#26be63]/10 rounded-3xl p-8 md:p-12 relative">
              <div className="absolute top-6 right-6">
                <div className="w-6 h-6 bg-[#26be63] transform rotate-45"></div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-bega6">
                <strong>Skidmo</strong>,
              firstly starting operations in Zambia was officially registered on <span>
  7<span className="align-super text-xs">th</span> October 2024
</span>
              with a bold <strong>Vision</strong> to make property access across Africa simple, smart, and borderless
              Born from a deep understanding of the challenges in the real estate market, we set out to
              build a technology driven platform that connects property owners and users seamlessly
              Since our founding, we've been focused on developing a powerful, user friendly platform
              that supports renting, buying, and selling of property across the continent We're currently
              in the final stages of development and preparing for our official launch on <strong>03/09/2025</strong>
               
              </p>
              
              
            </div>
          </div>

          {/* Key Milestones */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#26be63] rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">October 2024</h3>
              <p className="text-gray-600">Company officially registered in Zambia</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#26be63] rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">2024-2025</h3>
              <p className="text-gray-600">Platform development and team building</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[#26be63] rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">03/09/2025</h3>
              <p className="text-gray-600">Official platform launch</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Our <span className="text-[#26be63]">Vision</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
            A borderless Africa
            where every property is
            just a skid away.
            </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
            Our <span className="text-[#26be63]">Mission</span>
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              To create a faster,
               smarter way to rent,
                buy, and sell property
                anywhere in Africa.
            </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <div className="text-4xl mb-4">🏠</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Simple</h3>
                <p className="text-gray-600">Easy-to-use platform for all users</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🧠</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Smart</h3>
                <p className="text-gray-600">AI-powered property matching</p>
              </div>
              
              <div className="text-center">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Borderless</h3>
                <p className="text-gray-600">Connecting Africa's property markets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-32 bt-32 h-10 rounded-xl flex items-center justify-center">
                <img src="/Logo.png" alt="Skidmo Logo" className="w-20 h-10" />
              </div>
          </div>
          <p className="text-gray-400">© 2024 Skidmo</p>
        </div>
      </footer>
    </div>
  );
};

export default About;