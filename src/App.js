import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [songList, setSongList] = useState([]);

  const btnLike = (event) => {
    const data = { "id": event.target.name }
    const apiKey = 'apikey=___agAFTxkmMIWsmN9zOpM_6l2SkZPPy21LGRlxhYD8';

    axios.post('https://api-stg.jam-community.com/interact/like?' + apiKey, data,
      {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
          .then( response => {
            console.log('Song Liked!');
          }).catch((error) => {
            console.log('ERROR: ', error);
          });
  }

  useEffect(() => {
    axios.get('https://api-stg.jam-community.com/song/trending')
      .then( response => {
        setSongList(response.data);
      }).catch((error) => {
        console.log('ERROR: ', error);
      });
  }, []);

  return (
    <div className="App">
      <ul className="songList">
      {songList.map((song) => (
        <li key={song.name_seo}>
          <img alt={song.cover_image_aspect_ratio} src={song.cover_image_path}/>
          <span>{song.name}</span>
          <button name={song.id} onClick={(event)=> btnLike(event)}>LIKE</button>
          <audio className="songBar" controls>
            <source src={song.music_file_path}></source>
          </audio>
        </li>
      ))}
      </ul>
    </div>
  );
}

export default App;
