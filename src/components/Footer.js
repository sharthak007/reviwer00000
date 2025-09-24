import React from 'react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-academic-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logo}
                alt="Research Platform Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold">Research Platform</span>
            </div>
            <p className="text-academic-300 text-sm leading-relaxed">
              A comprehensive platform for academic research paper submission, review, and publication. 
              Connecting researchers, reviewers, and editors in a streamlined peer-review process.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="text-academic-300 hover:text-white transition-colors">
                  Published Papers
                </a>
              </li>
              <li>
                <a href="/login" className="text-academic-300 hover:text-white transition-colors">
                  Login
                </a>
              </li>
              <li>
                <a href="/register" className="text-academic-300 hover:text-white transition-colors">
                  Register
                </a>
              </li>
              <li>
                <a href="#" className="text-academic-300 hover:text-white transition-colors">
                  Submission Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-academic-300">
              <li>editor@researchplatform.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Academic Building, Room 101</li>
              <li>University Campus</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-academic-700 mt-8 pt-8 text-center text-sm text-academic-400">
          <p>&copy; 2024 Research Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;