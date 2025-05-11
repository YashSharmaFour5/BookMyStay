import React from 'react'
import { FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa'
import skImage from '../assets/sk.jpg'
import yImage from '../assets/yash.jpg'
import vkImage from '../assets/vaibhav.jpg'

const Footer = () => {
  const founders = [
    {
      name: "Sohail Khan",
      role: "CEO & Founder",
      image: skImage,
      description: "Passionate about revolutionizing the real estate industry through technology.",
      linkedin: "#",
      github: "#",
      twitter: "#"
    },
    {
      name: "Yash Sharma",
      role: "CTO & Co-Founder",
      image: yImage,
      description: "Tech enthusiast with a vision to make property management seamless.",
      linkedin: "#",
      github: "#",
      twitter: "#"
    },
    {
      name: "Vaibhav Waghule",
      role: "Head of Operations & Co-Founder",
      image: vkImage,
      description: "Dedicated to providing the best customer experience in property management.",
      linkedin: "#",
      github: "#",
      twitter: "#"
    }
  ]

  return (
    <footer className="bg-gray-900 pt-4 pb-3">
      {/* About Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 mb-3">
        <div className="text-center mb-3">
          <h2 className="text-xl font-bold text-purple-400 mb-1">About BookMyStay</h2>
          <p className="text-gray-300 max-w-xl mx-auto text-xs">
            BookMyStay is revolutionizing the way people find and manage their perfect living spaces. 
            Our platform connects property owners with potential tenants, making the process of finding 
            and booking accommodations seamless and efficient.
          </p>
        </div>

        {/* Founder Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 max-w-3xl mx-auto">
          {founders.map((founder, index) => (
            <div key={index} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-xl relative group border border-transparent hover:border-purple-500">
              <div className="relative w-20 h-20 mx-auto mt-2">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="w-full h-full object-cover object-center rounded-full border border-purple-500/30 shadow-md"
                />
              </div>
              <div className="p-2 text-center relative z-10">
                <h3 className="text-sm font-bold text-purple-400 mb-0.5">{founder.name}</h3>
                <p className="text-gray-300 font-semibold mb-0.5 text-xs">{founder.role}</p>
                <p className="text-gray-400 text-xs mb-1 line-clamp-2 px-1">{founder.description}</p>
                <div className="flex space-x-2 justify-center">
                  <a href={founder.linkedin} className="text-purple-400 hover:text-purple-300 transform hover:scale-110 transition-transform duration-200">
                    <FaLinkedin size={14} />
                  </a>
                  <a href={founder.github} className="text-purple-400 hover:text-purple-300 transform hover:scale-110 transition-transform duration-200">
                    <FaGithub size={14} />
                  </a>
                  <a href={founder.twitter} className="text-purple-400 hover:text-purple-300 transform hover:scale-110 transition-transform duration-200">
                    <FaTwitter size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 pt-3">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-1 md:mb-0">
              <h3 className="text-base font-bold text-purple-400">BookMyStay</h3>
              <p className="text-gray-400 text-xs">Your perfect stay, just a click away</p>
            </div>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-400 hover:text-purple-400 text-xs transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-xs transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-purple-400 text-xs transition-colors">Contact Us</a>
            </div>
          </div>
          <div className="mt-2 text-center text-gray-500 text-xs">
            <p>&copy; {new Date().getFullYear()} BookMyStay. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 