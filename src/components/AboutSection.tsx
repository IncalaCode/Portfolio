import { useState, useEffect } from 'react';
import { Timeline } from './ui/timeline';
import { CheckSquare, ExternalLink, Rocket, HardDrive } from 'lucide-react';

const AboutSection = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  const data = [
        {
      title: "2026",
      content: (
        <div>
          <div className="inline-flex items-center gap-2 text-lg md:text-xl font-bold mb-4 group">
            <span className={`transition-colors ${isDark ? 'text-white group-hover:text-yellow-500' : 'text-black group-hover:text-orange-600'}`}>
              MY TRUK
            </span>
            <div className="relative">
              <Rocket 
                size={18} 
                className={`transition-all ${isDark ? 'text-yellow-500' : 'text-orange-600'}`}
              />
              <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-yellow-500 text-black' : 'bg-orange-600 text-white'}`}>
                Ongoing
              </span>
            </div>
          </div>
          <p className={`text-xs md:text-sm font-normal mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            A cross-country tracking and delivery system for Ethiopia. Users can send packages from home or across the country with real-time tracking and efficient logistics management.
          </p>
          <div className="mb-6">
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Cross-Country Package Delivery
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Real-time Tracking System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Home Pickup & Moving Services
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Logistics Management Platform
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=500&h=500&fit=crop"
              alt="delivery truck"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500&h=500&fit=crop"
              alt="logistics tracking"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>

          <div className="inline-flex items-center gap-2 text-lg md:text-xl font-bold mb-4 group">
            <span className={`transition-colors ${isDark ? 'text-white group-hover:text-yellow-500' : 'text-black group-hover:text-orange-600'}`}>
              Hero Salon
            </span>
            <div className="relative">
              <Rocket 
                size={18} 
                className={`transition-all ${isDark ? 'text-yellow-500' : 'text-orange-600'}`}
              />
              <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-yellow-500 text-black' : 'bg-orange-600 text-white'}`}>
                Ongoing
              </span>
            </div>
          </div>
          <p className={`text-xs md:text-sm font-normal mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            A mini Telegram app for salon services with appointment booking, payment integration (Telebirr, Chapa), product selling, and service management.
          </p>
          <div className="mb-6">
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Telegram Mini App Integration
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Appointment Booking System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Payment Integration (Telebirr, Chapa)
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Product Selling & Service Management
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=500&fit=crop"
              alt="salon services"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop"
              alt="beauty salon"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024-2025",
      content: (
        <div>
          <a 
            href="https://beonadvert.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-lg md:text-xl font-bold mb-4 transition-colors ${isDark ? 'text-white hover:text-yellow-500' : 'text-black hover:text-orange-600'}`}
          >
            BeOn Advert
            <ExternalLink size={18} className={`transition-transform hover:translate-x-1 hover:-translate-y-1 ${isDark ? 'text-yellow-500' : 'text-orange-600'}`} />
          </a>
          <p className={`text-xs md:text-sm font-normal mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            An ERP system for promoting and advertising companies to manage campaigns, clients, and analytics.
          </p>
          <div className="mb-6">
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Campaign Management System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Client & Project Tracking
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Analytics & Reporting Dashboard
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Financial Management
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=500&fit=crop"
              alt="advertising analytics"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500&h=500&fit=crop"
              alt="campaign management"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>

          <a 
            href="https://salemmediumclinic.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-lg md:text-xl font-bold mb-4 transition-colors ${isDark ? 'text-white hover:text-yellow-500' : 'text-black hover:text-orange-600'}`}
          >
            Salem Medium Clinic
            <ExternalLink size={18} className={`transition-transform hover:translate-x-1 hover:-translate-y-1 ${isDark ? 'text-yellow-500' : 'text-orange-600'}`} />
          </a>
          <p className={`text-xs md:text-sm font-normal mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            An ERP system for clinics to handle patients, appointments, and medical records efficiently.
          </p>
          <div className="mb-6">
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Patient Management System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Appointment Scheduling
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Medical Records Management
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Billing & Insurance Integration
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&h=500&fit=crop"
              alt="medical clinic"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=500&h=500&fit=crop"
              alt="healthcare system"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>

          <div className="inline-flex items-center gap-2 text-lg md:text-xl font-bold mb-4 group">
            <span className={`transition-colors ${isDark ? 'text-white group-hover:text-yellow-500' : 'text-black group-hover:text-orange-600'}`}>
              Sankofa International School
            </span>
            <div className="relative">
              <HardDrive 
                size={18} 
                className={`transition-all ${isDark ? 'text-yellow-500' : 'text-orange-600'}`}
              />
              <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'bg-yellow-500 text-black' : 'bg-orange-600 text-white'}`}>
                Locally Deployed
              </span>
            </div>
          </div>
          <p className={`text-xs md:text-sm font-normal mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Comprehensive student management system for grades 1-12 including student records, mark management, report cards, certificates, and ranking reports. Deployed locally in their environment.
          </p>
          <div className="mb-6">
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Student Management (Grade 1-12)
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Mark Management & Grading
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Quarter Report Cards & Certificates
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Student Master Sheet & Rank Reports
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500&h=500&fit=crop"
              alt="education system"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&h=500&fit=crop"
              alt="student records"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <a 
            href="https://latestfitnessethiopia.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-lg md:text-xl font-bold mb-4 transition-colors ${isDark ? 'text-white hover:text-yellow-500' : 'text-black hover:text-orange-600'}`}
          >
            Latest Fitness Ethiopia
            <ExternalLink size={18} className={`transition-transform hover:translate-x-1 hover:-translate-y-1 ${isDark ? 'text-yellow-500' : 'text-orange-600'}`} />
          </a>
          <p className={`text-xs md:text-sm font-normal mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            A comprehensive gym management system that allows customers to register and receive personal QR codes for seamless check-in and access control.
          </p>
          <div className="mb-6">
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              QR Code Generation System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Member Registration & Management
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Automated Check-in System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Payment Integration
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop"
              alt="gym management"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=500&fit=crop"
              alt="fitness center"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <a 
            href="https://nafdigital.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-lg md:text-xl font-bold mb-4 transition-colors ${isDark ? 'text-white hover:text-yellow-500' : 'text-black hover:text-orange-600'}`}
          >
            NAF Digital Hotel Booking
            <ExternalLink size={18} className={`transition-transform hover:translate-x-1 hover:-translate-y-1 ${isDark ? 'text-yellow-500' : 'text-orange-600'}`} />
          </a>
          <p className={`text-xs md:text-sm font-normal mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Multi-hotel reservation platform enabling customers to browse and book rooms across multiple hotels from a single unified interface.
          </p>
          <div className="mb-6">
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Multi-Hotel Management System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Real-time Room Availability
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Booking & Reservation System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Payment Gateway Integration
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500&h=500&fit=crop"
              alt="hotel"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500&h=500&fit=crop"
              alt="hotel booking"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <a 
            href="https://fayasera.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-lg md:text-xl font-bold mb-4 transition-colors ${isDark ? 'text-white hover:text-yellow-500' : 'text-black hover:text-orange-600'}`}
          >
            Fayasera Coffee Export
            <ExternalLink size={18} className={`transition-transform hover:translate-x-1 hover:-translate-y-1 ${isDark ? 'text-yellow-500' : 'text-orange-600'}`} />
          </a>
          <p className={`text-xs md:text-sm font-normal mb-4 ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Professional portfolio website showcasing premium Ethiopian coffee products, export capabilities, and company heritage.
          </p>
          <div className="mb-6">
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Product Showcase System
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Export Documentation Portal
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Company Heritage Timeline
            </div>
            <div className={`flex gap-2 items-center text-xs md:text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
              <CheckSquare size={16} className={isDark ? 'text-green-500' : 'text-green-600'} />
              Contact & Inquiry System
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=500&h=500&fit=crop"
              alt="coffee beans"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
            <img
              src="https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?w=500&h=500&fit=crop"
              alt="ethiopian coffee"
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-lg"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div id="about" className="w-full bg-black dark:bg-black relative z-10">
      <Timeline data={data} />
    </div>
  );
};

export default AboutSection;
