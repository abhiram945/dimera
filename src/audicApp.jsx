import React from "react";
import './audicApp.css';
const AudicApp = () => {
    return <div className="appPageContainer flex alignCenter">
        <div className="infoContainer flex flexColumn justifyCenter">
            <h3><span>AUDIC</span> is now available for Android.</h3>
            <p>Developed with React Native and Expo, the App offers the same features as website.</p>
            <a href="https://expo.dev/artifacts/eas/tgTpLod7aJ5woK3mYpKFsh.apk" download="Audic-app">Download APK</a>
        </div>
        <div className="imagesContainer flex justifyRight alignCenter">
            <img src="../assets/App1.jpg" alt="Audic-App-1" />
            <img src="../assets/App2.jpg" alt="Audic-App-2" />
        </div>
    </div>
}
export default AudicApp;