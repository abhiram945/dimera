import './index.css';
import './footer.css';
import { Link } from 'react-router-dom';
import { useRef, useContext, useState } from 'react';
import { musicContext } from './index';
const Footer = () => {
  const { apiData, currentId,setCurrentId, currentCategoryList, queue, queueIndex, setQueueIndex, setCurrentCategoryList } = useContext(musicContext);
  const song = currentId ? apiData[currentId - 1].song : null;
  const audioRef = useRef(null);
  const [isPlaying,setIsPlaying]=useState(false);
  const [currentTime, setCurrentTime]=useState(0);
  const handlePlayNext=()=>{
    if(!currentId){
      return;
    }
    if(queue.length!==0){
      let nextQueueIndex = (queueIndex+1)%queue.length;
      setCurrentId(queue[nextQueueIndex]);
      setCurrentCategoryList(apiData?.filter(songObj => songObj.category === apiData[queue[nextQueueIndex]-1].category));
      return setQueueIndex(nextQueueIndex);
    }
    setQueueIndex(-1);
    setCurrentId(currentCategoryList[(currentCategoryList.indexOf(apiData[currentId-1])+1)%currentCategoryList.length].id);
  }
  const handlePlayPrev=()=>{
    if(!currentId){
      return;
    }
    if(queue.length!==0){
      let prevQueueIndex = (queueIndex-1+queue.length)%queue.length;
      setCurrentId(queue[prevQueueIndex]);
      setCurrentCategoryList(apiData?.filter(songObj => songObj.category === apiData[queue[prevQueueIndex]-1].category));
      return setQueueIndex(prevQueueIndex);
    }
    setQueueIndex(-1);
    setCurrentId(currentCategoryList[(currentCategoryList.indexOf(apiData[currentId-1])-1+currentCategoryList.length)%currentCategoryList.length].id);
  }
  return <footer className='flex alignCenter w-100'>
    <audio src={currentId ? apiData[currentId - 1].songUrl : null} autoPlay ref={audioRef} onPlay={()=>setIsPlaying(true)} onPause={()=>setIsPlaying(false)} onTimeUpdate={()=>setCurrentTime(audioRef.current.currentTime)} onEnded={()=>handlePlayNext()}/>
    {audioRef.current&&<input type='range' className='seekBar' placeholder='seekBar' max={audioRef.current.duration||0} value={currentTime} onChange={(e)=>audioRef.current.currentTime = e.target.value}/>}
    <div className='songImageNameContainer flex alignCenter'>
      {currentId &&
        <><img src={apiData[currentId - 1].thumbnailUrl} alt='songImage' />
          <h2>{apiData[currentId - 1].song}</h2></>
      }
    </div>
    <div className="middleIconsContainer flex spaceBetween">
      <img src='../assets/prevIcon.svg' alt='prevIcon'onClick={()=>handlePlayPrev()}/>
      {isPlaying ? <img src='../assets/pauseIcon.svg' alt='pauseIcon' onClick={()=>{audioRef.current.pause(); setIsPlaying(false)}}/> : <img src='../assets/playIcon.svg' alt='playIcon' onClick={()=>{if(currentId){audioRef.current.play(); setIsPlaying(true)}}}/>}
      <img src='../assets/nextIcon.svg' alt='nextIcon' onClick={()=>handlePlayNext()}/>
    </div>
    <div className='downloadIconContainer flex justifyCenter'>
      <Link to={currentId != null ? `/${song}` : '/'}>
        <img src='../assets/downloadIcon.svg' alt='downloadIcon' />
      </Link>
    </div>
  </footer>
}

export default Footer;