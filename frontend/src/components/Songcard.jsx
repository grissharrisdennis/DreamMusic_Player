import pause from '../assets/pause.png'
import play from '../assets/play.svg'
import reverse from '../assets/reverse.svg';
import random from '../assets/random.svg';
import previous from '../assets/previous.svg';
import next from '../assets/next.svg';
import { useState, useEffect } from 'react';
import { Howl } from 'howler';

const Songcard = ({ track }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [howlInstance, setHowlInstance] = useState(null);
  const [currentTime, setCurrentTime] = useState(0); // To track live time
  const [duration, setDuration] = useState(0); // Track song duration

  if (!track) return null;

  // Set up the Howler instance when the component mounts or when the track changes
  useEffect(() => {
    if (track.preview_url) {
      const newHowl = new Howl({
        src: [track.preview_url],
        html5: true, // Use HTML5 Audio to support larger files
        volume: 0.5,
        onplay: () => {
          setDuration(newHowl.duration()); // Set song duration when playback starts
          updateCurrentTime(); // Start updating time
        },
        onend: () => {
          setIsPlaying(false);
          setCurrentTime(0); // Reset time when the song ends
        },
      });
      setHowlInstance(newHowl);
    }

    // Cleanup Howl instance on component unmount or when track changes
    return () => {
      if (howlInstance) {
        howlInstance.stop();
        setHowlInstance(null);
      }
    };
  }, [track]);

  // Timer to update the current time every second
  useEffect(() => {
    let timerId;
    if (isPlaying) {
      timerId = setInterval(() => {
        updateCurrentTime();
      }, 1000);
    }

    return () => clearInterval(timerId); // Cleanup the timer when component unmounts or stops playing
  }, [isPlaying, howlInstance]);

  // Update the current playback time
  const updateCurrentTime = () => {
    if (howlInstance) {
      const currentTime = howlInstance.seek(); // Get the current playback position
      setCurrentTime(currentTime);
    }
  };

  // Play/pause functionality
  const handlePlayPause = () => {
    if (!howlInstance) return;

    if (isPlaying) {
      howlInstance.pause();
    } else {
      howlInstance.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Format the time in minutes and seconds (mm:ss)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Calculate the progress percentage for the progress bar
  const calculateProgress = () => {
    return duration ? (currentTime / duration) * 100 : 0;
  };

  return (
    <div className='container shadow-custom-shadow p-4 bg-[#6B0000] w-[284px] h-[376px] ml-[46px] mt-[673px]'>
      <div className="absolute w-[284px] h-[21px] left-[1566px] ml-[21px] font-poppins font-semibold text-[14px] leading-[21px] flex items-center justify-center text-[#F6F6F6]">
        Now Playing
      </div>
      <div className='absolute ml-[22px] mt-[56px] border-[#6B0000] border-[10px] w-[239px] h-[136px]'>
        <img src={track.album.images[0].url} alt={track.name} className="w-full h-full object-cover" />
      </div>
      <div className='flex flex-col items-center w-full h-[47px] mt-[211px]'>
        <span className='font-poppins text-[#F6F6F6] text-[18px] font-semibold leading-[27px] text-center'>{track.name}</span>
        <span className='font-poppins text-[#CFC5C5] text-[13px] font-normal leading-[19.5px] text-center'>{track.artists.map(artist => artist.name).join(', ')}</span>
      </div>

      {/* Live time display */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-white text-[13px]
        ">{formatTime(currentTime)}</span>
        <span className="text-white text-[13px]">/ {formatTime(duration)}</span>
      </div>

      {/* Progress bar */}
      <div className="relative mt-1 w-full h-1 bg-gray-500 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-white rounded-full"
          style={{ width: `${calculateProgress()}%` }}
        ></div>
        {/* Moving icon */}
        <div
          className="absolute top-[-6px] h-[14px] w-[14px] bg-white rounded-full"
          style={{ left: `calc(${calculateProgress()}% - 7px)` }}
        ></div>
      </div>

      <div className="absolute w-[224px] h-[41px] left-[1596px] top-[995px] flex justify-between items-center">
        <div onClick={() => howlInstance.seek(howlInstance.seek() - 5)} className="w-[20px] h-[20px] rounded-[10px] flex justify-center items-center cursor-pointer">
          <img className="w-[20px] h-[20px]" src={reverse} alt="Reverse" />
        </div>
        <div onClick={() => howlInstance.seek(howlInstance.seek() - 10)} className="w-[29px] h-[29px] rounded-[10px] flex justify-center items-center cursor-pointer">
          <img className="w-[29px] h-[29px]" src={previous} alt="Previous" />
        </div>
        <div onClick={handlePlayPause} className="w-[41px] h-[41px] bg-[#480000] rounded-[10px] flex justify-center items-center cursor-pointer">
          <img className="w-[29px] h-[29px]" src={isPlaying ? pause : play} alt="Play" />
        </div>
        <div onClick={() => howlInstance.seek(howlInstance.seek() + 10)} className="w-[29px] h-[29px]  rounded-[10px] flex justify-center items-center cursor-pointer">
          <img className="w-[29px] h-[29px]" src={next} alt="Next" />
        </div>
        <div onClick={() => console.log('Random track')} className="w-[20px] h-[20px]  rounded-[10px] flex justify-center items-center cursor-pointer">
          <img className="w-[20px] h-[20px]" src={random} alt="Random" />
        </div>
      </div>
    </div>
  );
};

export default Songcard;


