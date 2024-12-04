import React from 'react'
import { useRef, useEffect, useState } from 'react';

import Lottie from 'lottie-react';
import Book from '../../assets/Book3.json';

const Banner = () => {

    const bookRef = useRef(null);  // Reference to the Lottie animation instance
    const [animationDirection, setAnimationDirection] = useState(1); // To manage direction
    const [isAnimationComplete, setIsAnimationComplete] = useState(false); // To manage animation completion
  
    useEffect(() => {
      if (bookRef.current) {
        // Start the animation immediately
        bookRef.current.play();
      }
    }, []); // Empty array means it will run only once after initial render
  
    const handleAnimationComplete = () => {
      setIsAnimationComplete(true); // Mark animation as complete
      // Wait for a specified interval before reversing the direction
      setTimeout(() => {
        // Toggle animation direction (ping-pong effect)
        setAnimationDirection(prevDirection => (prevDirection === 1 ? -1 : 1));
  
        // Play the animation in the new direction
        if (bookRef.current) {
          bookRef.current.setDirection(animationDirection);
          bookRef.current.play();
        }
  
        setIsAnimationComplete(false); // Reset after delay so it can complete again
      }, 1000); // 1000ms (1 second) delay before reversing direction (adjust as needed)
    };

  return (
    
    <div className='flex flex-row justify-between items-center'>
        <div className='md:w-1/2 w-full flex justify-center items-center flex-col text-center'>
            <h1 className='md:text-5xl text-3xl font-primary-medium mb-7 text-matteBlack font-semibold'>
                Unveiling This Week's Latest Releases
            </h1>
            <p className='mb-10 font-secondary font-semibold'>
                Elevate your reading list with this week's most anticipated literary arrivals. 
                From pulse-quickening thrillers to deeply compelling memoirs, 
                these fresh releases promise a captivating experience for every reader.
            </p>
            <button className='btn-secondary'>
                Subscribe
            </button>

        </div>
            
        <div className='md:w-1/2 w-full hidden sm:block overflow-hidden '>
            
            <Lottie 
                lottieRef={bookRef}
                animationData={Book}
                loop={false}
                onComplete={handleAnimationComplete}
                style={{ width: '100%', height: 'auto' }}
                
            />
            
        </div>
    </div>
  )
}

export default Banner