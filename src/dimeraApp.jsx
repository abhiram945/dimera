import './dimeraApp.css'
import React from 'react'
const DimeraApp=()=>{
    return <div className='appPageContainer'>
        <h2>Need an App, where you can explore more...?</h2>
        <p>The wait is over now</p>
        <h2>Presenting you <span>DIMERA</span> for Android</h2>
        <p>Download & experince immersive audio on the go</p>
        <div className='imagesContainer'>
            <img src='./assets/app1.jpg' alt='app1'/>
            <a href='./assets/dimera.apk'>Download Apk</a>
            <img src='./assets/app2.jpg' alt='app1'/>
        </div>
    </div>

}
export default DimeraApp;