import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './header';
import Main from './main';
import Footer from './footer';
import Downloadsong from './downloadSong';
import AudicApp from './audicApp';
import { createContext, useState, useEffect } from 'react';

const Audic = () => {
    const [apiData, setApiData] = useState(null);
    const [currentId, setCurrentId] = useState(null);
    const [queue, setQueue] = useState([]);
    const [currentCategoryList, setCurrentCategoryList] = useState(null);
    const [queueIndex, setQueueIndex] = useState(-1);
    useEffect(() => {
        const fetchData = async () => {
            try {
                await fetch('https://raw.githubusercontent.com/abhiram945/audic-api/main/audicApi.json').then(response => response.json()).then(jsonData => { setApiData(jsonData.songs) });

            }
            catch (error) {
                console.error();
            }
        };
        fetchData();
    }, []);
    return <>
        <musicContext.Provider value={{ apiData, currentId, setCurrentId, queue, setQueue, currentCategoryList, setCurrentCategoryList, queueIndex, setQueueIndex }}>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/:song' element={<Downloadsong />} />
                    <Route path='/app' element={<AudicApp />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </musicContext.Provider>
    </>
}

const musicContext = createContext();
ReactDOM.createRoot(document.getElementById('root')).render(
    <Audic />
)
export { musicContext };
