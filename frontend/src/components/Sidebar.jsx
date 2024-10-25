// import { motion } from 'framer-motion';
// import { useState } from 'react';
// import { IoIosArrowBack } from 'react-icons/io';
import music from '../assets/music.svg';
import discover from '../assets/discover.svg';
import home from '../assets/home.svg';
import library from '../assets/library.svg';
import logout from '../assets/logout.svg';
import settings from '../assets/settings.svg';
import trends from '../assets/trends.svg';
import { Link } from 'react-router-dom';


const Sidebar = () => {
   
   
    return (
       
        <div className='flex flex-col bg-[#0E0E0E] justify-start shadow-xl z-[999] w-[80px] md:w-[436px] h-[1080px] overflow-hidden fixed md:relative transition-all duration-300'>
  <div className='absolute container flex items-center mt-[26px] ml-[10px] md:ml-[70px] '>
    <img src={music} alt='music' className='hidden md:block' /> {/* Show on medium screens and larger */}
  </div>

  <div className='absolute container mt-[155px] w-[366px] h-[203.43px] ml-[10px] md:ml-[70px]'>
    <div className='text-[#CFC5C5] flex items-center font-semibold text-sm ml-0 font-poppins mb-1 hidden md:flex'>
      <span>MENU</span> {/* Show only on medium and larger screens */}
    </div>

    <div className='flex items-center mb-4'>
      <Link to='/'><img src={home} alt='home' className='ml-[1.66px]' /></Link>
      <span className='text-[#F6F6F6] ml-[10px] text-lg font-medium font-poppins hidden md:block'>Home</span> {/* Show text only on larger screens */}
    </div>

    <div className='flex items-center mb-4'>
      <img src={trends} alt='trends' className='ml-[1.66px]' />
      <span className='text-[#F6F6F6] ml-[10px] text-lg font-medium font-poppins hidden md:block'>Trends</span> {/* Show text only on larger screens */}
    </div>

    <div className='flex items-center mb-4'>
      <img src={library} alt='library' className='ml-[1.66px]' />
      <span className='text-[#F6F6F6] ml-[10px] text-lg font-medium font-poppins hidden md:block'>Library</span> {/* Show text only on larger screens */}
    </div>

    <div className='flex items-center mb-4'>
      <img src={discover} alt='discover' className='ml-[1.66px]' />
      <span className='text-[#F6F6F6] ml-[10px] text-lg font-medium font-poppins hidden md:block'>Discover</span> {/* Show text only on larger screens */}
    </div>
  </div>

  <div className='absolute container mt-[427px] w-[366px] h-[161px] ml-[10px] md:ml-[70px]'>
    <div className='text-[#CFC5C5] flex items-center font-semibold text-sm ml-0 font-poppins mb-1 hidden md:flex'>
      <span>DISCOVER</span> {/* Show only on larger screens */}
    </div>
  </div>

  <div className='absolute container mt-[650px] w-[366px] h-[161px] ml-[10px] md:ml-[70px]'>
    <div className='text-[#CFC5C5] flex items-center font-semibold text-sm ml-0 font-poppins mb-1 hidden md:flex'>
      <span>YOUR PLAYLISTS</span> {/* Show only on larger screens */}
    </div>
  </div>

  <div className='absolute container w-[366px] h-[112px] ml-[10px] md:ml-[70px] top-[873px]'>
    <div className='text-[#CFC5C5] flex font-poppins font-semibold items-center text-sm gap-2 mb-1 hidden md:flex'>
      <span>GENERAL</span> {/* Show only on larger screens */}
    </div>

    <div className='flex items-center mb-4'>
      <img src={settings} alt='settings' className='ml-[1.66px]' />
      <span className='text-[#F6F6F6] ml-[10px] text-lg font-medium font-poppins hidden md:block'>Settings</span> {/* Show text only on larger screens */}
    </div>

    <div className='flex items-center mb-4'>
      <img src={logout} alt='logout' className='ml-[1.66px]' />
      <span className='text-[#F6F6F6] ml-[10px] text-lg font-medium font-poppins hidden md:block'>Logout</span> {/* Show text only on larger screens */}
    </div>
  </div>
</div>

      
    );
}

export default Sidebar;
