import  { useState, useEffect } from 'react';
import Songcard from './Songcard';

const TopTracks = () => {
  const [topTracks, setTopTracks] = useState([]);
  const [selectedTrack, setSelectedTrack] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await fetch('http://localhost:3000/api/top-tracks');
        const data = await response.json();
        setTopTracks(data);
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    }

    fetchTracks();
  }, []);

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className=' w-full h-[447px] ml-0 mt-[606px]'>
      <div className='w-[266px] h-[36px] ml-[101px]'>
        <h2 className='text-xl font-semibold'>Top Songs</h2>
      </div>
      <div className='ml-[101px] mt-[20px]'>
        {topTracks.map((track, index) => (
          <div
            key={track.id}
            className='flex justify-between items-center bg-white p-2 mb-2 rounded-lg cursor-pointer hover:bg-gray-200'
            onClick={() => setSelectedTrack(track)}
          >
            <span className='font-bold'>{index + 1}.</span>
            <img src={track.album.images[0].url} alt={track.name} className='w-12 h-12 rounded-lg' />
            <div className='flex-1 ml-2'>
              <p className='font-semibold'>{track.name}</p>
              <p className='text-gray-600'>{track.artists.map(artist => artist.name).join(', ')}</p>
            </div>
            <span>{formatDuration(track.duration_ms)}</span>
            <span className='text-gray-500'>{track.album.name}</span>
          </div>
        ))}
      </div>
      {selectedTrack && <Songcard track={selectedTrack} />}
    </div>
  );
};

export default TopTracks;
