import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaBook, FaChalkboardTeacher, FaPencilAlt, FaUsers, FaHandHoldingHeart } from 'react-icons/fa';

const EducationCause = () => {
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
      description: 'Engaging parents in their children's educational journey.',
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative container mx-auto px-4 text-center">
          <FaGraduationCap className="mx-auto text-6xl mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Education for All</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Empowering underprivileged children through quality education and creating opportunities for a brighter future.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Educational Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              We believe that every child deserves access to quality education regardless of their economic background. 
              Our school provides free education, learning materials, and support to help children break the cycle of poverty.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:transform hover:scale-105 transition duration-300">
                <div className="text-blue-600 text-3xl mb-4">{program.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                <p className="text-gray-600">{program.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Impact</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Rahul's Story</h3>
              <p className="text-gray-600 mb-4">
                "Thanks to the free education and support, I was able to complete my schooling and am now pursuing higher education. 
                This school changed my life and gave me hope for a better future."
              </p>
              <p className="text-blue-600 font-semibold">- Former Student</p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Priya's Journey</h3>
              <p className="text-gray-600 mb-4">
                "The school not only provided education but also helped build confidence and life skills. 
                Today, I'm working as a teacher and helping other children achieve their dreams."
              </p>
              <p className="text-blue-600 font-semibold">- Alumni</p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Help */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <FaHandHoldingHeart className="mx-auto text-5xl mb-6" />
          <h2 className="text-3xl font-bold mb-8">How You Can Help</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Donate</h3>
              <p className="mb-4">Support our mission by contributing to our educational programs.</p>
              <Link to="/donate" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                Donate Now
              </Link>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Volunteer</h3>
              <p className="mb-4">Share your knowledge and skills by teaching or mentoring our students.</p>
              <Link to="/contact" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                Join Us
              </Link>
            </div>
            <div className="bg-white/10 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Spread the Word</h3>
              <p className="mb-4">Help us reach more children by sharing our mission with others.</p>
              <Link to="/about" className="inline-block bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in our mission to provide quality education to underprivileged children and help build a better future.
          </p>
          <Link
            to="/donate"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Support Our Cause
          </Link>
        </div>
      </section>
    </div>
  );
};

export default EducationCause;