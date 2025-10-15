import React, { useState } from 'react';
import { FaHandsHelping, FaUsers, FaHeart, FaGraduationCap, FaClock, FaMapMarkerAlt, FaUserPlus, FaAward, FaLightbulb, FaHandHoldingHeart, FaChalkboardTeacher, FaCamera, FaBullhorn, FaLaptopCode, FaChild, FaSpinner } from 'react-icons/fa';
import { RiHeartsFill, RiCommunityLine, RiTeamLine } from 'react-icons/ri';

export default function Volunteer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    experience: '',
    interests: [],
    availability: '',
    location: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const volunteerAreas = [
    'Primary School Teaching',
    'Secondary School Teaching',
    'Digital Education Support',
    'Library Management',
    'Educational Content Creation',
    'Student Mentoring',
    'School Infrastructure Support',
    'Educational Material Development',
    'After-School Tutoring',
    'Educational Event Organization'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Use Formspree for volunteer registration
      const response = await fetch('https://formspree.io/f/xdkwwdzb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          subject: 'New Volunteer Registration - MA Equal Foundation',
          interests: formData.interests.join(', ')
        })
      });

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for volunteering! We will contact you soon with more details about volunteer opportunities.'
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          age: '',
          occupation: '',
          experience: '',
          interests: [],
          availability: '',
          location: '',
          message: ''
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again or contact us directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-blue-600 py-12 sm:py-16 lg:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/path-to-pattern.png')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="relative container mx-auto text-center text-white z-10">
          <div className="animate-bounce-slow mb-6">
            <FaHandsHelping className="mx-auto text-6xl text-white/90" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Shape the Future Through <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-200 to-blue-200">
              Education Volunteering
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-green-100 leading-relaxed">
            Join our dedicated team of education volunteers. Help us provide quality education 
            and build brighter futures for students in need of support.
          </p>

          {/* Volunteer Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto mt-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold mb-2">25+</div>
              <div className="text-xs sm:text-sm text-green-100">Education Volunteers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold mb-2">8+</div>
              <div className="text-xs sm:text-sm text-green-100">Schools Supported</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 transform hover:scale-105 transition-transform">
              <div className="text-2xl sm:text-3xl font-bold mb-2">500+</div>
              <div className="text-xs sm:text-sm text-green-100">Students Helped</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Volunteer Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Why Volunteer in Education?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Make a lasting impact on students' lives while developing your teaching skills and contributing to educational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <FaGraduationCap className="text-4xl text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Shape Young Minds</h3>
              <p className="text-gray-600">
                Directly impact students' educational journey and help them develop critical skills for their future success in academics and life.
              </p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <FaChalkboardTeacher className="text-4xl text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Develop Teaching Skills</h3>
              <p className="text-gray-600">
                Enhance your communication, leadership, and pedagogical skills while working with students of different ages and learning levels.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <FaChild className="text-4xl text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Support Underprivileged Students</h3>
              <p className="text-gray-600">
                Make education accessible to students who lack resources, helping bridge the educational gap in underserved communities.
              </p>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <FaLightbulb className="text-4xl text-orange-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Innovative Learning</h3>
              <p className="text-gray-600">
                Contribute to creative educational approaches and help implement modern teaching methods in traditional school settings.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <RiHeartsFill className="text-4xl text-red-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Mentorship Impact</h3>
              <p className="text-gray-600">
                Guide students beyond academics, helping them build confidence, set goals, and develop life skills for personal growth.
              </p>
            </div>

            <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2">
              <FaUsers className="text-4xl text-teal-600 mb-6" />
              <h3 className="text-xl font-bold mb-4 text-gray-800">Educational Community</h3>
              <p className="text-gray-600">
                Join a network of dedicated educators and volunteers passionate about transforming education and student outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Opportunities Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Educational Volunteer Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose how you'd like to support education and help students reach their full potential.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <FaChalkboardTeacher className="text-4xl text-blue-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Classroom Teaching</h3>
              <p className="text-gray-600 mb-4">
                Directly teach students in various subjects, assist teachers, and help create engaging learning experiences.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Subject teaching (Math, Science, English)</li>
                <li>• Classroom assistance</li>
                <li>• Interactive learning activities</li>
                <li>• Student assessment support</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <FaChild className="text-4xl text-green-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Student Tutoring</h3>
              <p className="text-gray-600 mb-4">
                Provide one-on-one or small group tutoring to help students improve in specific subjects and build confidence.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• After-school tutoring</li>
                <li>• Exam preparation</li>
                <li>• Homework assistance</li>
                <li>• Study skills coaching</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <FaLaptopCode className="text-4xl text-purple-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Digital Education</h3>
              <p className="text-gray-600 mb-4">
                Teach computer literacy, digital skills, and help integrate technology into traditional learning methods.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Computer basics training</li>
                <li>• Digital literacy programs</li>
                <li>• Educational technology setup</li>
                <li>• Online learning support</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <FaCamera className="text-4xl text-indigo-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Library & Resources</h3>
              <p className="text-gray-600 mb-4">
                Help manage school libraries, organize educational materials, and create reading programs for students.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Library organization</li>
                <li>• Reading programs</li>
                <li>• Book donation drives</li>
                <li>• Study material preparation</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <FaHandHoldingHeart className="text-4xl text-red-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Student Mentorship</h3>
              <p className="text-gray-600 mb-4">
                Guide students in their educational journey, provide career counseling, and help with personal development.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Academic counseling</li>
                <li>• Career guidance</li>
                <li>• Life skills training</li>
                <li>• Goal setting workshops</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all">
              <FaBullhorn className="text-4xl text-orange-600 mb-6" />
              <h3 className="text-xl font-bold mb-4">Educational Events</h3>
              <p className="text-gray-600 mb-4">
                Organize educational workshops, science fairs, cultural events, and competitions to enhance learning experiences.
              </p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Workshop organization</li>
                <li>• Science fair coordination</li>
                <li>• Educational competitions</li>
                <li>• Cultural programs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Registration Form */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Join Our Volunteer Team
              </h2>
              <p className="text-xl text-gray-600">
                Fill out the form below to get started on your volunteering journey with us.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Age *</label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      min="16"
                      max="100"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Occupation</label>
                    <input
                      type="text"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Areas of Interest *</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {volunteerAreas.map((area) => (
                      <label key={area} className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.interests.includes(area)}
                          onChange={() => handleInterestChange(area)}
                          className="text-green-600 focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Availability *</label>
                    <select
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select availability</option>
                      <option value="weekends">Weekends only</option>
                      <option value="weekdays">Weekdays only</option>
                      <option value="flexible">Flexible schedule</option>
                      <option value="evenings">Evenings only</option>
                      <option value="specific">Specific days/times</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Location/City *</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Previous Volunteer Experience</label>
                  <textarea
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us about any previous volunteer work or relevant experience..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Additional Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Tell us why you want to volunteer with us and any questions you might have..."
                  ></textarea>
                </div>

                {submitStatus.message && (
                  <div className={`p-4 rounded-lg ${
                    submitStatus.type === 'success' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {submitStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || formData.interests.length === 0}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 px-8 rounded-xl text-lg font-bold hover:from-green-700 hover:to-blue-700 transition duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <FaSpinner className="mr-2 text-xl animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaUserPlus className="mr-2 text-xl" />
                      Join as Volunteer
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Volunteer Benefits & Recognition
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We value our volunteers and provide various benefits and recognition programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FaAward className="text-3xl text-green-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Certificates & Recognition</h3>
              <p className="text-gray-600 text-sm">
                Receive volunteer certificates and appreciation letters for your service.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FaGraduationCap className="text-3xl text-blue-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Skill Development</h3>
              <p className="text-gray-600 text-sm">
                Access to training workshops and skill development programs.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <RiTeamLine className="text-3xl text-purple-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Networking</h3>
              <p className="text-gray-600 text-sm">
                Connect with professionals and build valuable networks.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <FaClock className="text-3xl text-orange-600" />
              </div>
              <h3 className="text-lg font-bold mb-3">Flexible Timing</h3>
              <p className="text-gray-600 text-sm">
                Work according to your schedule and availability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of volunteers who are already creating positive change in communities across the region.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#volunteer-form"
              className="bg-white text-green-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-green-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Start Volunteering Today
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-green-600 transition-colors"
            >
              Contact Us for More Info
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}