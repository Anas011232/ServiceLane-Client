import React from 'react';
import { BiLogoFlutter } from 'react-icons/bi';
import { FaTwitter, FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-fuchsia-900 text-white pt-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">
      
      {/* Branding */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <BiLogoFlutter size={28} />
          <span className="font-bold text-2xl tracking-wide">Roomies</span>
        </div>
        <p className="text-sm text-gray-300">
          Find your perfect roommate with Roomies. We make living better.
        </p>
      </div>

      {/* Contact Info */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Contact</h4>
        <p className="text-sm">📧 <a href="mailto:support@roomies.com" className="hover:text-cyan-300">support@roomies.com</a></p>
        <p className="text-sm">📞 <a href="tel:+8801234567890" className="hover:text-cyan-300">+88 012 3456 7890</a></p>
        <p className="text-sm">📍 Mymensingh Sadar Upazila, Bangladesh</p>
      </div>

      {/* Legal */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li><a href="/terms" className="hover:text-cyan-300">Terms & Conditions</a></li>
          <li><a href="/privacy" className="hover:text-cyan-300">Privacy Policy</a></li>
          <li><a href="/cookies" className="hover:text-cyan-300">Cookie Policy</a></li>
        </ul>
      </div>

      {/* Social Links */}
      <div>
        <h4 className="text-lg font-semibold mb-3">Follow Us</h4>
        <div className="flex space-x-4">
          <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300"><FaTwitter size={22} /></a>
          <a href="https://youtube.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300"><FaYoutube size={22} /></a>
          <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300"><FaFacebookF size={22} /></a>
          <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300"><FaInstagram size={22} /></a>
          <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition duration-300"><FaLinkedinIn size={22} /></a>
        </div>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="bg-black bg-opacity-30 text-center py-4 border-t border-purple-700 text-sm">
      © {new Date().getFullYear()} <span className="font-semibold">Roomies</span>. All rights reserved.
    </div>
  </footer>
);

export default Footer;
