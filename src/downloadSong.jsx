import { useParams } from 'react-router-dom';
import {useState, useContext} from 'react';
import { musicContext } from './index';

import './index.css';
import './downloadSong.css';
const Downloadsong = () => {
    const {song} = useParams();
    const {apiData,currentId}=useContext(musicContext);
    const [countdown, setCountdown]=useState(16);
    const [displayItem, setDisplayItem]=useState(true);
    const newId = currentId?currentId-1:1;
    const handleCOuntDown=()=>{
        const interval = setInterval(()=>{setCountdown(prevCountdown => prevCountdown>0 ? prevCountdown-1 : 0)},1000);
        setTimeout(()=>{clearInterval(interval)}, 16000);
    }
    return<main className='downloadPageMain flex justifyCenter alignCenter'>
        <div className='songInfoContainer'>
            <p>Song name : <b>{song}</b></p>
            <p>Downoad {song} <span>8D song</span> here</p>
            <img src={apiData[newId].thumbnailUrl} alt={song}/>
        </div>
        <div className='generateButtonContainer' style={{display : displayItem ? 'block':'none'}}>
            <button className='clickToGenerateLink' onClick={()=>{setDisplayItem(false); handleCOuntDown();}}>Click to generate link</button>
        </div>
        <div className='countDownDisplayContainer' style={{display :countdown<=15 ? 'block':'none'}}>
            <p>Link is being generated</p>
            <p>Wait for <b>{countdown}</b> more seconds</p>
        </div>
        <div className='downloadButtonContainer' style={{display:countdown===0 ? 'block':'none'}}>
            <a className='downloadButton' href={`${apiData[newId].songUrl}`} download={`${apiData[newId].song}.mp3`} onClick={()=>{setCountdown(16); setDisplayItem(true)}}>Download</a>
        </div>
    </main>
};

export default Downloadsong;