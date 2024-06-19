import React from "react";
import './dimeraApp.css';
const DimeraApp = () => {
    return <div className="appPageContainer flex alignCenter">
        <div className="infoContainer flex flexColumn justifyCenter">
            <h3><span>DIMERA</span> is now available for Android.</h3>
            <p>Developed with React Native and Expo, the App offers the same features as website.</p>
            <a href="../assets/dimera.apk" download="dimera">Download APK</a>
        </div>
        <div className="imagesContainer flex justifyRight alignCenter">
            <img src="../assets/App1.jpg" alt="dimera-1" />
            <img src="../assets/App2.jpg" alt="dimera-2" />
        </div>
    </div>
}
export default DimeraApp;