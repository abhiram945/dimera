import './main.css';
import './index.css';
import { useContext} from 'react';
import { musicContext } from './index';

const Main = () => {
    const { apiData, currentId, setCurrentId, queue, setQueue, setCurrentCategoryList, setQueueIndex } = useContext(musicContext);

    const categoryComponent = ({ category, index }) => {
        const filteredSongs = apiData.filter(song=>song.category===category);
        return (
            <div className='categoryContainer' key={index}>
                <h2>{category}<span>{` - ${filteredSongs.length} songs`}</span></h2>
                <div className='grid'>
                    {filteredSongs.map((filteredSong, eachSongIndex) => (
                        <div className='songThumbnailContainer' key={eachSongIndex}>
                            <img src={filteredSong.thumbnailUrl} alt={filteredSong.thumbnailUrl.replace('.jpg', '')}
                                onClick={() => { setCurrentId(filteredSong.id); setCurrentCategoryList(filteredSongs); }}
                            />
                            <div className='songNamePlus flex spaceBetween alignCenter'>
                                <p>{filteredSong.song}</p>
                                {!queue.includes(filteredSong.id) ? (
                                    <img src='../assets/plusIcon.svg' alt='plusIcon' onClick={() => setQueue([...queue, filteredSong.id])} />
                                ) : (
                                    <img src='../assets/tickIcon.svg' alt='tickIcon' />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const handleQueueSongDelete = (index) => {
        const tempQueue = [...queue];
        tempQueue.splice(index, 1);
        setQueue(tempQueue);
    };

    const categories = ["Bgms - surrounded","Newly Added Songs","Telugu Songs","English Songs","Feel good songs","Mood off Songs","Other language","Relaxation Songs"];

    return (
        <>
            <aside className='flex alignCenter justifyCenter'>
                <div className='flex queueSongs alignTop'>
                    {queue.length !== 0 ? (
                        <>
                            {queue.map((id, index) => (
                                <div className='flex spaceBetween' key={index}>
                                    <p
                                        key={index}
                                        className={currentId === id ? 'queueSong active' : 'queueSong'}
                                        onClick={() => {
                                            setCurrentId(apiData[id - 1].id);
                                            setQueueIndex(index);
                                        }}
                                    >
                                        {apiData[id - 1].song}
                                    </p>
                                    <img
                                        src='../assets/deleteIcon.svg'
                                        alt='logo'
                                        className='deleteIcon'
                                        onClick={() => { handleQueueSongDelete(index); }}
                                    />
                                </div>
                            ))}
                        </>
                    ) : (
                        <p>Use Headphones 🎧</p>
                    )}
                </div>
                <button className='queueButton' onClick={() => { setQueue([]); }}>
                    {queue.length === 0 ? 'click on + to add' : 'clear queue'}
                </button>
            </aside>
            {apiData? (
                <main>
                    {categories.map((eachCategory, index) => categoryComponent({ category: eachCategory, index }))}
                </main>
            ) : (
                <main className='flex justifyCenter alignCenter loadingContainer'>
                    <img src='../assets/logo.png' alt='logo' />
                    <p>Loading...</p>
                    <p className='mNone'>Use Headphones 🎧 to experience the Immersive 8D effect</p>
                </main>
            )}
        </>
    );
};

export default Main;
