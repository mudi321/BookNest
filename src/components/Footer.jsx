import React from 'react'
import footerLogo  from "../assets/footer-logo.png"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-4">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Left Side - Logo and Nav */}
        <div className="md:w-1/2 w-full">
          <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
          <ul className="flex flex-col md:flex-row gap-4">
            <li><a href="#home" className="hover:text-primary">Home</a></li>
            <li><a href="#services" className="hover:text-primary">Services</a></li>
            <li><a href="#about" className="hover:text-primary">About Us</a></li>
            <li><a href="#contact" className="hover:text-primary">Contact</a></li>
          </ul>
        </div>

        {/* Right Side - Newsletter */}
        <div className="md:w-1/2 w-full">
          <p className="mb-4">
            Subscribe to our newsletter to receive the latest updates, news, and offers!
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded-l-md text-black"
            />
            <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-primary-dark">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0">
          <li><a href="#privacy" className="hover:text-primary">Privacy Policy</a></li>
          <li><a href="#terms" className="hover:text-primary">Terms of Service</a></li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </footer>

    // <footer>
    //   <div class="background">
    //     <svg
    //       version="1.1"
    //       xmlns="http://www.w3.org/2000/svg"
    //       xmlns:xlink="http://www.w3.org/1999/xlink"
    //       x="0px"
    //       y="0px"
    //       width="100%"
    //       height="100%"
    //       viewBox="0 0 1600 900"
    //     >
    //       <defs>
    //         <path
    //           id="wave"
    //           fill="rgba(105, 27, 252, 0.6)"
    //           d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
    //   s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
    //         />
    //       </defs>
    //       <g>
    //         <use xlink:href="#wave" opacity=".4">
    //           <animateTransform
    //             attributeName="transform"
    //             attributeType="XML"
    //             type="translate"
    //             dur="8s"
    //             calcMode="spline"
    //             values="270 230; -334 180; 270 230"
    //             keyTimes="0; .5; 1"
    //             keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
    //             repeatCount="indefinite"
    //           />
    //         </use>
    //         <use xlink:href="#wave" opacity=".6">
    //           <animateTransform
    //             attributeName="transform"
    //             attributeType="XML"
    //             type="translate"
    //             dur="6s"
    //             calcMode="spline"
    //             values="-270 230;243 220;-270 230"
    //             keyTimes="0; .6; 1"
    //             keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
    //             repeatCount="indefinite"
    //           />
    //         </use>
    //         <use xlink:href="#wave" opacty=".9">
    //           <animateTransform
    //             attributeName="transform"
    //             attributeType="XML"
    //             type="translate"
    //             dur="4s"
    //             calcMode="spline"
    //             values="0 230;-140 200;0 230"
    //             keyTimes="0; .4; 1"
    //             keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
    //             repeatCount="indefinite"
    //           />
    //         </use>
    //       </g>
    //     </svg>
    //   </div>
    //   <section>
    //     <ul class="socials">
    //       <li><a class="fa-brands fa-x-twitter"></a></li>
    //       <li><a class="fa-brands fa-facebook"></a></li>
    //       <li><a class="fa-brands fa-linkedin"></a></li>
    //     </ul>
    //     <ul class="links">
    //       <li><a>Home</a></li>
    //       <li><a>About</a></li>
    //       <li><a>Portfolio</a></li>
    //       <li><a>Skillset</a></li>
    //       <li><a>Hire</a></li>
    //     </ul>
    //     <p class="legal">© 2024 All rights reserved</p>
    //   </section>
    // </footer>



  )
}

export default Footer