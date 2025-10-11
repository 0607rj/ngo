import React from "react";
import digitalImg from '../assets/digital.jpg';
import schoolImg from '../assets/school.jpg';
import libraryImg from '../assets/library.jpg';
import bg from '../assets/bg.png';
import f1 from '../assets/f1.jpg';
import f2 from '../assets/f2.jpg';
import f3 from '../assets/f3.jpg';
import f4 from '../assets/f4.jpg';
import { Link } from "react-router-dom";
import { 
  FaGraduationCap, 
  FaBook, 
  FaLaptop,
  FaPencilAlt,
  FaUsers,
  FaHandHoldingHeart,
  FaStar,
  FaChalkboardTeacher
} from "react-icons/fa";

const impactNumbers = [
  { number: "1000+", label: "Students Supported", icon: FaGraduationCap },
  { number: "50+", label: "Teachers Engaged", icon: FaChalkboardTeacher },
  { number: "25+", label: "School Partners", icon: FaHandHoldingHeart },
  { number: "95%", label: "Success Rate", icon: FaStar },
];

const initiatives = [
  {
    title: "Digital Learning",
    description: "Providing laptops and digital resources to enable modern education.",
    icon: FaLaptop,
    color: "blue",
    image:digitalImg // Add actual image path later
  },
  {
    title: "School Supplies",
    description: "Ensuring every child has the tools they need to learn effectively.",
    icon: FaPencilAlt,
    color: "green",
    image: schoolImg // Add actual image path later
  },
  {
    title: "Library Program",
    description: "Building and stocking libraries to foster a love for reading.",
    icon: FaBook,
    color: "purple",
    image: libraryImg // Add actual image path later
  },
];

const galleryImages = [
  {
    url: f1, // Replace with actual image of students studying
    caption: "Students engaged in digital learning"
  },
  {
    url:f2, // Replace with actual image of classroom
    caption: "Our modern classroom facilities"
  },
  {
    url:f3, // Replace with actual image of library
    caption: "Well-stocked library for our students"
  },
  {
    url:f4, // Replace with actual image of activities
    caption: "Extra-curricular activities"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Animation */}
      <section className="relative min-h-[98vh] flex items-center overflow-hidden">
        {/* Background Image Container - Replace background-color with image later */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-indigo-600 z-0">
          {/* <img src={bg} alt="" className="w-[99vw] h-full" /> */}
          {/* Overlay for text readability - adjust opacity as needed with your image */}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Placeholder for background image - uncomment and add your image path later */}
          { <img 
            src={bg} 
            alt="Students in classroom" 
            className="absolute inset-0 w-full h-full object-cover"
          /> }
          
          {/* Decorative Elements */}
          <div className="absolute w-64 h-64 -top-32 left-1/4 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute w-64 h-64 top-1/3 -right-32 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
          <div className="absolute w-64 h-64 -bottom-32 left-1/3 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <div className="space-y-8">
            <FaGraduationCap className="text-8xl mx-auto text-yellow-300 animate-bounce" />
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Donate Now<br />
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                To make An Impact
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
              We believe every child deserves a chance to shine. 
              Join our mission to make quality education accessible to all students.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                to="/donate"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Support a Student
              </Link>
              <Link
                to="/about"
                className="bg-white/10 backdrop-blur-md text-white border-2 border-white/50 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers with hover effects */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactNumbers.map((stat, idx) => (
              <div 
                key={idx}
                className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="inline-block p-4 rounded-full bg-blue-50 mb-4">
                  <stat.icon className="text-3xl text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-800 mb-2">
                  {stat.number}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inspiring Message */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-blue-900">
            Transforming Lives Through Learning
          </h2>
          <p className="text-xl text-gray-700 leading-relaxed mb-8">
            Education is the most powerful weapon we can use to change the world. 
            At our school NGO, we're committed to breaking down barriers and creating 
            opportunities for every student to reach their full potential.
          </p>
          <div className="text-lg text-gray-600 italic">
            "Education is not preparation for life; education is life itself."
          </div>
        </div>
      </section>

      {/* Our Initiatives */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
            Our Educational Initiatives
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {initiatives.map((initiative, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={initiative.image}
                    alt={initiative.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <div className="inline-block p-3 rounded-full bg-blue-50 mb-4">
                    <initiative.icon className="text-2xl text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {initiative.title}
                  </h3>
                  <p className="text-gray-600">
                    {initiative.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-blue-900">
            Our Impact in Action
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryImages.map((image, idx) => (
              <div key={idx} className="relative group rounded-xl overflow-hidden cursor-pointer">
                <img 
                  src={image.url}
                  alt={image.caption}
                  className="w-full h-[250px] object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Caption Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white text-sm">{image.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-16 bg-blue-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="relative container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Be Part of Our Educational Mission
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your support can help provide books, supplies, and educational resources
            to students who need them most.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/donate"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Make a Donation
            </Link>
            <Link
              to="/volunteer"
              className="bg-transparent border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Volunteer With Us
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}