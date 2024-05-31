import './index.css';
import './header.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useContext} from 'react';
import { musicContext } from './index';
const Header=()=>{
    const {apiData, setCurrentId, setCurrentCategoryList}=useContext(musicContext);
    const [activeMenu, setActivemenu]=useState(false);
    const [filteredSongs, setFilteredSongs]=useState([]);
    const handleSearch=(event)=>{
        if(event.target.value!=="" && event.target.value!==" "){
            const filteredSongs=apiData.filter((songObj,index)=>songObj.song.toLowerCase().includes((event.target.value).toLowerCase()));
            setFilteredSongs(filteredSongs);
        }
        else{
            setFilteredSongs([]);
        }
    }
    return<header className='flex alignCenter spaceBetween w-100'>
        <div className="logoContainer">
            <Link to='/'>
                <img src="../assets/logo.svg" alt="logo"/>
            </Link>
        </div>
        <div className="inputContainer">
            <input type="text" placeholder="search for song" onChange={(event)=>handleSearch(event)}/>
            <img src='../assets/searchIcon.svg' alt='seachIcon'/>
            <div className={`searchResultsContainer ${filteredSongs.length>0?'flex':'none'}`}>
                {filteredSongs.map((song, index) => (
                        <p key={index} onClick={()=>{
                            setCurrentId(song.id);
                            setFilteredSongs([]);
                            setCurrentCategoryList(apiData?.filter(songObj => songObj.category === song.category));
                        }}>{song.song}</p>
                    ))
                }            
            </div>
        </div>
        <div className='iconsContainer none block'>
            {activeMenu ? <img src='../assets/closeIcon.svg' alt='closeIcon' onClick={()=>{try{setActivemenu(false);document.querySelector('#root aside').classList.remove('asideActive');}catch(e){}}}/>:
            <img src='../assets/queueIcon.svg' alt='queueIcon' onClick={()=>{try{setActivemenu(true);document.querySelector('#root aside').classList.add('asideActive');}catch(e){}}}/>
            } 
        </div>
        <Link to="/app" className='getApp'>Get App</Link>
    </header>
}
export default Header;