import React from 'react';
import { newtonsCradle } from 'ldrs'


const Loading = () => {
    
    newtonsCradle.register()

  return (
    <div className="flex justify-center items-center h-screen">

        <l-newtons-cradle
        size="130"
        speed="1.4" 
        color="#A69080" 
        ></l-newtons-cradle>

    </div>
  );
};

export default Loading;





