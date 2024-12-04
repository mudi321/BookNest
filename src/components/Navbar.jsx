import React, { useEffect } from 'react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import { FaUserAlt  } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector } from 'react-redux';
import  Headroom  from 'react-headroom'

import Lottie from 'lottie-react';
import Avatar from '../assets/Avatar.json';
import Burger from '../assets/Burger.json';
import Favourite from '../assets/Favourite.json';
import Cart from '../assets/Cart.json';
import Search from '../assets/Search.json';
import { useAuth } from '../context/AuthContext';



const navigation =[
  {name: "Dashboard", href: "/dashboard"},
  {name: "Orders", href: "/orders"},
  {name: "Cart Page", href: "/cart"},
  {name: "Check Out", href: "/checkout"},
];

const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  //New block
  const dropdownRef = useRef(null);
  const handleDropdownToggle = () => {
    setIsDropDownOpen((prev) => !prev);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropDownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  //new block

  const cartItems = useSelector (state => state.cart.cartItems);
  const {currentUser, logOutUser} = useAuth();

  const handleLogOut = () => {
    logOutUser();
  }  

  // Separate refs for each animation
  const avatarRef = useRef(null);
  const burgerRef = useRef(null);
  const favouriteRef = useRef(null);
  const cartRef = useRef(null);
  const searchRef = useRef(null);


  // Separate hover handlers
  const handleAvatarHover = () => {
    if (avatarRef.current) {
      avatarRef.current.goToAndPlay(0, true);
    }
  };

  const handleBurgerHover = () => {
    if (burgerRef.current) {
      burgerRef.current.setDirection(-1);
      burgerRef.current.goToAndPlay(burgerRef.current.getDuration(true), true);
    }
  };

  const handleFavouriteHover = () => {
    if (favouriteRef.current) {
      favouriteRef.current.goToAndPlay(0, true);
    }
  };

  const handleCartHover = () => {
    if (cartRef.current) {
      cartRef.current.goToAndPlay(0, true);
    }
  };

  const handleSearchHover = () => {
    if (searchRef.current) {
      searchRef.current.goToAndPlay(0, true);
    }
  };
  
  // const animationRef = useRef(null);

  // const handleMouseEnter = () => {
  //   if (animationRef.current) {
  //     animationRef.current.goToAndPlay(0, true);  // Restart animation from the beginning
  //   }
  // };

  return (
    <Headroom>
      <header className='max-w-screen-5xl '>
        <nav className='flex justify-between items-center bg-offWhite shadow-md z-[1000]'>
          {/* Left Side */}

          <IconContext.Provider value={{ className: "text-primary" }}>
            <div className='flex items-center '>
              <Link to="/">
                <div
                  onMouseEnter={handleBurgerHover}
                  className="pt-1 -translate-x-4" // Add padding if needed
                >
                  <Lottie
                    lottieRef={burgerRef}
                    animationData={Burger}
                    loop={false}
                    style={{ height: 80, width: 80 }}
                  />
                </div>
              </Link>

              {/* Search Bar */}
              <div
                onMouseEnter={handleSearchHover}
                className="pt-1 -translate-x-4" // Add padding if needed
              >
                <div className='relative flex items-center sm:w-72 w-40 space-x-1 -translate-x-4'>
                  <Lottie
                    lottieRef={searchRef}
                    animationData={Search}
                    loop={false}
                    style={{ height: 30, width: 30 }}
                    className='absolute inline-block left-2 pr-2'
                  />
                  <input
                    type="text"
                    placeholder='Search Books'
                    className='bg-tertiary w-full py-1 placeholder-offWhite font-secondary focus:outline-none
                  hover:placeholder-primary md:px-8 px-6 rounded-md'
                  />
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className='relative flex items-center md:space-x-3 space-x-2'>
              <div ref={dropdownRef}>
                {currentUser ? (
                  <>
                    <button onClick={handleDropdownToggle}>
                      <div
                        onMouseEnter={handleAvatarHover}
                        className="pt-2" // Add padding if needed
                      >
                        <Lottie
                          lottieRef={avatarRef}
                          animationData={Avatar}
                          loop={false}
                          style={{ height: 40, width: 40 }}
                        />
                      </div>
                    </button>

                    {/* Dropdown */}
                    {isDropDownOpen && (
                      <div className='absolute right-0 mt-2 w-48 bg-tertiary font-secondary text-offWhite shadow-lg rounded-md z-40'>
                        <ul>
                          {navigation.map((item) => (
                            <li
                              key={item.name}
                              onClick={() => setIsDropDownOpen(false)}
                            >
                              <Link
                                to={item.href}
                                className='block px-4 py-2 hover:bg-primary rounded-md'
                              >
                                {item.name}
                              </Link>
                            </li>
                          ))}
                          <li>
                            <button
                              onClick={handleLogOut}
                              className='block w-full text-left px-4 py-2 hover:bg-primary rounded-md'
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <Link to='/login'><FaUserAlt className="size-6" /></Link>
                )}
              </div>
              
              <div
                onMouseEnter={handleFavouriteHover}
                className="" // Add padding if needed
              >
                <button className='hidden sm:block'>
                  <Lottie
                    lottieRef={favouriteRef}
                    animationData={Favourite}
                    loop={false}
                    style={{ height: 50, width: 50 }}
                  />
                </button>
              </div>
              <div
                onMouseEnter={handleCartHover}
                className="" // Add padding if needed
              >
                <Link to="/cart" className='bg-tertiary  sm: px-2 flex items-center rounded'>
                  <Lottie
                    lottieRef={cartRef}
                    animationData={Cart}
                    loop={false}
                    style={{ height: 35, width: 35 }}
                  />
                  <span className='font-secondary text-offWhite ml-1 mt-1'>{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </IconContext.Provider>
        </nav>
      </header>
    </Headroom>
  );
};

export default Navbar;