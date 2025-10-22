import React from "react";
import { Link } from "react-router-dom";
import { 
  FaGraduationCap,
  FaHeart,
  FaHandHoldingHeart,
  FaUsers,
  FaChalkboardTeacher,
  FaBookReader,
  FaLightbulb,
  FaSeedling
} from "react-icons/fa";

const teamMembers = [
  {
    name: "Amir Chaudhary",
    role: "Executive Director",
    image: "/src/assets/Amir chaudhary.jpg",
    description: "Leading our mission with dedication and vision for educational empowerment.",
  },
  {
    name: "Muzammil Chaudhary",
    role: "Program Director",
    image: "/src/assets/Muzammil chaudhary .jpg",
    description: "Overseeing our educational programs and community development initiatives.",
  },
  {
    name: "Mamta Yadav",
    role: "Community Outreach",
    image: "/src/assets/mamta yadav.jpg",
    description: "Building partnerships and engaging with local communities for maximum impact.",
  },
  {
    name: "Chaudhary Sumit Singh",
    role: "Finance Director",
    image: "/src/assets/chaudhary sumit singh.jpg",
    description: "Ensuring transparent and effective use of donations and financial resources.",
  },
];

const achievements = [
  {
    number: "10K+",
    title: "Lives Impacted",
    description: "Through our various programs and initiatives",
  },
  {
    number: "10+",
    title: "Projects Completed",
    description: "Across education, healthcare, and community development",
  },
  {
    number: "5+",
    title: "Partner Organizations",
    description: "Working together for a better future",
  },
  {
    number: "2+",
    title: "Years of Service",
    description: "Dedicated to making a difference",
  },
];

export default function About() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-600">
        <div className="absolute inset-0">
          {/* Animated shapes */}
          <div className="absolute w-72 h-72 -top-20 left-1/4 bg-blue-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float"></div>
          <div className="absolute w-72 h-72 top-1/3 -right-20 bg-indigo-400/30 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4">
          <div className="mb-6">
            <FaBookReader className="text-6xl text-yellow-300 animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Empowering Through
            <span className="block bg-gradient-to-r from-yellow-300 to-yellow-100 bg-clip-text text-transparent">
              Education Since 2015
            </span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl text-blue-100">
            Transforming lives and building stronger communities through quality education
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full mr-4">
                  <FaLightbulb className="text-3xl text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-blue-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                To empower future generations through quality education, nurturing young minds,
                and creating opportunities for every student to reach their full potential.
                We believe in making education accessible, engaging, and transformative.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 duration-300">
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-4 rounded-full mr-4">
                  <FaSeedling className="text-3xl text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-blue-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed">
                A world where every child has access to quality education, where learning
                knows no boundaries, and where education becomes the catalyst for positive
                change in our communities. We envision creating leaders of tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-blue-50 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
            Our Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-lg text-center"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {achievement.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">
            Our Team
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                {(member.name === "Mamta Yadav" || member.name === "Chaudhary Sumit Singh") ? (
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : (
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-blue-600 text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-2">Transparency</h3>
              <p>
                We maintain clear communication and accountability in all our
                operations.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Integrity</h3>
              <p>
                We uphold the highest ethical standards in our work and
                relationships.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Empowerment</h3>
              <p>
                We believe in enabling communities to build their own sustainable
                future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Mission</h2>
          <p className="text-gray-700 mb-8">
            Together, we can make a lasting difference in our communities. Get
            involved today!
          </p>
          <Link 
            to="/volunteer" 
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            🤝 Volunteer With Us
          </Link>
        </div>
      </section>
    </div>
  );
}