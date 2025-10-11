import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaGraduationCap, 
  FaBook, 
  FaChalkboardTeacher, 
  FaPencilAlt, 
  FaUsers, 
  FaHandHoldingHeart,
  FaHeart 
} from 'react-icons/fa';

const Causes = () => {
  const statistics = [
    { number: '500+', label: 'Students Educated' },
    { number: '50+', label: 'Dedicated Teachers' },
    { number: '15+', label: 'Years of Service' },
    { number: '95%', label: 'Success Rate' },
  ];

  const programs = [
    {
      icon: <FaBook />,
      title: 'Primary Education',
      description: 'Providing quality primary education to children aged 5-12 years.',
    },
    {
      icon: <FaChalkboardTeacher />,
      title: 'After-School Support',
      description: 'Extra tutoring and homework help for struggling students.',
    },
    {
      icon: <FaPencilAlt />,
      title: 'School Supplies',
      description: 'Providing essential educational materials and uniforms.',
    },
    {
      icon: <FaUsers />,
      title: 'Parent Workshops',
      description: "Engaging parents in their children's educational journey.",
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gradient-to-br from-blue-500 to-indigo-600">
        <div className="absolute inset-0">
          {/* Animated floating shapes */}
          <div className="absolute w-64 h-64 -top-32 left-1/4 bg-yellow-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute w-64 h-64 top-1/3 -right-32 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
          <div className="absolute w-64 h-64 -bottom-32 left-1/3 bg-indigo-300/20 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000"></div>
        </div>

        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <div className="space-y-8">
            <FaGraduationCap className="text-8xl mx-auto text-yellow-300 animate-bounce" />
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Education for All<br />
              <span className="bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
                Building Brighter Futures
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100">
              Empowering underprivileged children through quality education and 
              creating opportunities for a better tomorrow.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <Link
                to="/donate"
                className="bg-yellow-400 text-blue-900 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Support Education
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
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
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

      {/* Mission Statement */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3 mb-8">
              <FaHandHoldingHeart className="text-4xl text-white" />
            </div>
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Our Educational Mission
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              We believe that every child deserves access to quality education regardless of their economic background. 
              Our school provides free education, learning materials, and support to help children break the cycle of poverty.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3 mb-6">
              <FaBook className="text-4xl text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Our Educational Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed to nurture young minds and create lasting impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {programs.map((program, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 border border-gray-100"
              >
                <div className="bg-gradient-to-br from-blue-500 to-indigo-500 w-16 h-16 rounded-full flex items-center justify-center mb-6 text-white text-3xl">
                  {program.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-gray-800">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full p-3 mb-6">
              <FaUsers className="text-4xl text-white" />
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories of transformation and hope from our students
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaGraduationCap className="text-2xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">Rahul's Story</h3>
              </div>
              <blockquote className="text-gray-600 mb-6 text-lg italic leading-relaxed">
                "Thanks to the free education and support, I was able to complete my schooling and am now pursuing higher education. 
                This school changed my life and gave me hope for a better future."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-blue-900">Rahul Kumar</p>
                  <p className="text-blue-600">Former Student</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <FaChalkboardTeacher className="text-2xl text-indigo-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">Priya's Journey</h3>
              </div>
              <blockquote className="text-gray-600 mb-6 text-lg italic leading-relaxed">
                "The school not only provided education but also helped build confidence and life skills. 
                Today, I'm working as a teacher and helping other children achieve their dreams."
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full mr-3"></div>
                <div>
                  <p className="font-semibold text-blue-900">Priya Sharma</p>
                  <p className="text-indigo-600">Alumni & Teacher</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="absolute inset-0">
          <div className="absolute w-72 h-72 -top-20 left-1/4 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute w-72 h-72 bottom-1/3 -right-20 bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        </div>
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <div className="inline-block bg-white/10 backdrop-blur-md rounded-full p-4 mb-8">
            <FaHandHoldingHeart className="text-5xl text-yellow-300" />
          </div>
          <h2 className="text-4xl font-bold mb-12">How You Can Help</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaHeart className="text-3xl text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Donate</h3>
              <p className="text-blue-100 mb-6">Support our mission by contributing to our educational programs.</p>
              <Link 
                to="/donate" 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                Donate Now
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaChalkboardTeacher className="text-3xl text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Volunteer</h3>
              <p className="text-blue-100 mb-6">Share your knowledge and skills by teaching or mentoring our students.</p>
              <Link 
                to="/contact" 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                Join Us
              </Link>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 transform hover:-translate-y-2 transition-all duration-300">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaUsers className="text-3xl text-yellow-300" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Spread the Word</h3>
              <p className="text-blue-100 mb-6">Help us reach more children by sharing our mission with others.</p>
              <Link 
                to="/about" 
                className="inline-block bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-yellow-300 transition-all duration-300 transform hover:-translate-y-1"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              Join us in our mission to provide quality education to underprivileged children 
              and help build a better future for the next generation.
            </p>
            <Link
              to="/donate"
              className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Support Our Cause
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Causes;