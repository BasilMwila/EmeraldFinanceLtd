import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const ContactComponent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen">
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
                <a href="/team" className="text-gray-800 hover:text-emerald-600 transition-colors duration-300 text-xs lg:text-sm font-medium">
                  OUR TEAM
                </a>
                <span className="text-emerald-600 font-bold text-xs lg:text-sm">
                  CONTACT US
                </span>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background */}
      <section className="relative pt-20 md:pt-32">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('office.jpg')`
          }}
        ></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-white fade-in text-center lg:text-left">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 lg:mb-8">Contact Information</h1>
            <div className="space-y-4 lg:space-y-6 text-sm sm:text-base lg:text-lg max-w-4xl mx-auto lg:mx-0">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed">
                Our headquarters is strategically located at the intersection of Kwacha Road and Parliament Road 
                Olympia in Lusaka, positioning us at the heart of Zambia's economic center.
              </p>
              
              <div className="mt-8 lg:mt-12">
                <h2 className="text-xl sm:text-2xl font-bold mb-3 lg:mb-4">Address:</h2>
                <p className="text-base sm:text-lg lg:text-xl">
                  Plot No. 5038 Kwacha Road and Parliament Road | Olympia, Lusaka, Zambia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Details & Form Section */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            
            {/* Contact Information */}
            <div className="slide-in-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-emerald-800 mb-8">Get In Touch</h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Our Location</h3>
                    <p className="text-gray-600">
                      Plot No. 5038 Kwacha Road and Parliament Road<br />
                      Olympia, Lusaka, Zambia
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Phone Number</h3>
                    <p className="text-gray-600">+260 96 9875058</p>
                    <p className="text-gray-600">+260 96 9873678</p>
                    <p className="text-gray-600">+260 77 2383806</p>
                    <p className="text-sm text-gray-500">For customer support: *115#</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email Address</h3>
                    <p className="text-gray-600">info@emeraldfinanceltd.com</p>
                    <p className="text-gray-600">kastarta@emeraldfinanceltd.com</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-600 mt-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Business Hours</h3>
                    <p className="text-gray-600">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />
                      Saturday: Closed<br />
                      Sunday: Closed
                    </p>
                    <p className="text-sm text-emerald-600 font-medium mt-2">
                      Ka'Starta services available 24/7 via mobile money
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Service Access */}
              <div className="mt-8 p-6 bg-emerald-50 rounded-lg border border-emerald-200">
                <h3 className="font-bold text-emerald-800 mb-3">Quick Service Access</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Access Ka'Starta loan services instantly:
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center justify-center bg-red-500 text-white px-4 py-2 rounded font-bold">
                    Airtel: *115#
                  </div>
                  <div className="flex items-center justify-center bg-yellow-400 text-black px-4 py-2 rounded font-bold">
                    MTN: *115#
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="slide-in-right">
              <div className="bg-white p-6 lg:p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                      placeholder="What is your inquiry about?"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors resize-vertical"
                      placeholder="Please provide details about your inquiry..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
                  >
                    Send Message
                  </button>
                </form>

                <p className="text-xs text-gray-500 mt-4 text-center">
                  We typically respond within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="fade-in text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-emerald-800 mb-4">Find Us</h2>
            <p className="text-gray-600">Located in the heart of Lusaka's business district</p>
          </div>
          
          {/* Map Placeholder */}
          <div className="bg-gray-200 rounded-lg h-64 lg:h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Interactive Map</p>
              <p className="text-sm text-gray-500">Plot No. 5038 Kwacha Road and Parliament Road, Olympia, Lusaka</p>
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

export default ContactComponent;