import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar'
import searchIcon from './assets/search.svg'
import verifyIcon from './assets/verfiy.svg'
import Songcard from './components/Songcard';
import ErrorBoundary from './components/Errorb'


const Musicplayer = () => {
const [topTracks, setTopTracks] = useState([]);
const [selectedTrack, setSelectedTrack] = useState(null);

const [searchQuery, setSearchQuery] = useState('');
const [artistData, setArtistData] = useState(null);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}api/top-tracks`);
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

  const handleDragEnd = (result) => {
    if (!result.destination) return;
  
    const reorderedTracks = Array.from(topTracks);
    const [movedTrack] = reorderedTracks.splice(result.source.index, 1);
    reorderedTracks.splice(result.destination.index, 0, movedTrack);
  
    console.log(reorderedTracks);  // Debugging: Ensure the tracks are reordering correctly.
    setTopTracks(reorderedTracks); // Update state with reordered tracks.
  };
  

  const handleSearch = async () => {
    console.log(searchQuery)
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_SERVER}api/search?q=${searchQuery}`);
      const data = await response.json();
      console.log(data)
      // if (data && data.tracks) {
      //   setTopTracks(data.tracks);  // Assuming the response contains tracks in the 'tracks' field
      // } else {
      //   setTopTracks([]);  // In case no tracks are returned, ensure the state is not undefined
      // }
      setTopTracks(data.top_tracks);
      setArtistData(data.artist)// Update top tracks with the fetched search result
    } catch (error) {
      console.error('Error searching for artist:', error);
    }
  };
  

  return (
    <ErrorBoundary>
    <div className="w-[1920px] h-[1080px]  overflow-hidden flex">
      <Sidebar/>
      <div className='w-[1484px] h-full flex'>
          <div className='bg-custom-gradient1 w-[1084px] h-full '>
              <div className='absolute flex  mt-[45px] ml-[83px] w-[368px] h-[27px] gap-[50px] '>
                <span className='font-poppins font-semibold text-[#E5DDDD] container text-lg'>Music</span>
                <span className='font-poppins font-semibold text-[#E5DDDD] container text-lg'>Podcast</span>
                <span className='font-poppins font-semibold text-[#E5DDDD] container text-lg'>Live</span>
                <span className='font-poppins font-semibold text-[#E5DDDD] container text-lg'>Radio</span>
               
              </div>
              <div className='absolute mt-[32px] w-[513px] h-[54px] ml-[528px]'>
  <div className='relative w-full h-full bg-[#2C0000] rounded-full'>
    <input 
      type="text" 
      placeholder="Search for an artist..." 
      className='w-full h-full bg-transparent text-white px-4 rounded-full outline-none' 
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)} 
    />
    <div 
      className='absolute right-4 top-1/2 transform -translate-y-1/2 w-[22.96px] cursor-pointer h-[22.96px] border-[3px] flex items-center justify-center' 
      onClick={handleSearch}
    >
      <img src={searchIcon} alt='search' className='w-full h-full' />
    </div>
  </div>
</div>

    <div className='absolute bg-[#2C0000] w-[882px] h-[452px] ml-[101px] mt-[114px]'>
  {artistData && (
    <div className='relative w-full h-full'>
      <img 
        src={artistData.image} 
        alt={artistData.name} 
        className='w-full h-full object-contain rounded-lg' 
      />
      <div className='absolute h-[30px] flex left-[49px] gap-2 bottom-[300px]'>
        <img src={verifyIcon} className='w-[30px] h-[30px]'/>
        <p className='font-poppins font-medium text-[#CFC5C5] text-sm'>Verified Artist</p>
      </div>
      <div className='absolute left-[49px] bottom-[250px]'>
        <span className='font-poppins font-semibold text-lg text-[#F6F6F6] text-[40px]'>{artistData.name}</span>
      </div>
      <div className='absolute left-[49px] bottom-[220px]'>
        <p className='font-poppins font-medium text-[#F6F6F6] text-sm'>{artistData.monthly_listeners} Total Followers</p>
      </div>
    </div>
  )}
</div>

              <div className=' w-full h-[447px] ml-0 mt-[606px]'>
                <div className='flex flex-row w-[266px] h-[36px] ml-[101px]'>
                  <h2 className='text-xl text-white font-semibold'>Top Songs</h2>
                </div>
                
                  <div className='container ml-[101px] mb-1 w-[880px] h-[27px] '>
                    <span className='font-poppins font-semibold text-lg ml-[-2px] w-[16px] text-[#CFC5C5]'>#</span>
                    <span className='font-poppins font-semibold text-lg ml-[131px] w-[52px] text-[#CFC5C5]'>TITLE</span>
                    <span className='font-poppins font-semibold text-lg ml-[414px] text-[#CFC5C5]'>TIME</span>
                    <span className='font-poppins font-semibold text-lg ml-[200px] text-[#CFC5C5]'>ALBUM</span>
                  </div>
<DragDropContext onDragEnd={handleDragEnd}>
  <Droppable droppableId="tracksList">
    {(provided) => (
      <div {...provided.droppableProps} ref={provided.innerRef}>
        {topTracks.map((track, index) => (
          <Draggable key={track.id} draggableId={track.id.toString()} index={index}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="flex justify-between items-center p-2 mb-2 rounded-lg cursor-pointer hover:bg-[#520000] text-[#F6F6F6]"
                onClick={() => setSelectedTrack(track)}>
                <span className='font-semi bold ml-[99px] '>{index + 1}.</span>
                <img src={track.album.images[0].url} alt={track.name} className='w-12 ml-[100px] h-12 rounded-lg' />
                <div className='flex-1 ml-0'>
                  <p className='font-semibold'>{track.name}</p>
                  <p className='text-gray-600'>{track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                <span className='mr-[180px]'>{formatDuration(track.duration_ms)}</span>
                <span className='text-gray-500 w-[149px]'>{track.album.name}</span>
              </div>
            )}
          </Draggable>
        ))}
        {provided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext>

               
              </div>
      </div>
      <div className='bg-custom-gradient2 w-[400px] h-full '>
            <div className='absolute container border-2 border-[#F6F6F6]  ml-[46px] mt-[43px] w-[284px] h-[267px] ' >
              <div className='text-[#CFC5C5] flex items-center font-semibold text-sm ml-0 font-poppins mb-1'>
                <span>NOTIFICATIONS</span>
              </div>
            </div>
            <div className='absolute container border-2 border-[#F6F6F6] ml-[46px] mt-[345px] w-[284px] h-[293px] '>
              <div className='text-[#CFC5C5] flex items-center font-semibold text-sm ml-0 font-poppins mb-1'>
                <span>RECENT PLAYLISTS</span>
              </div>
            </div>
            {selectedTrack && <Songcard track={selectedTrack} />}
            {/* make songcard(not others like notifications but only music player interface) as popup and below the center div. */}
          </div>
      </div>
    </div>
    </ErrorBoundary>
    
  );
}


export default Musicplayer;
