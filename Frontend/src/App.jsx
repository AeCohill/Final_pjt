import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0);
  const [songs, setSongs] = useState([]);  // State to hold song data
  const [error, setError] = useState(null); // To handle any errors

  // Call the fetchSongs function when the component mounts
  useEffect(() => {
    fetchSongs();
  }, []);  // Empty dependency array to run only on component mount

  // Function to fetch songs data
  const fetchSongs = async () => {
    try {
      const response = await fetch("https://equinox-climbing-handbell.glitch.me/api/songs");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const songsData = await response.json();
      setSongs(songsData);  // Update state with fetched songs
    } catch (error) {
      setError(error.message);  // Set error message if something goes wrong
    }
  };

  return (
    <>
      <h1>
        SDEV255 Final Front End
      </h1>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
     
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <MyButton />
        <button class="btn btn-primary">Primary button</button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        {error && <p className="text-danger">Error: {error}</p>} {/* Display error if any */}
        <ul>
          {songs.length > 0 ? (
            songs.map((song, index) => (
              <li key={index}>{song.title} - {song.artist} - {song.genre}</li>
            ))
          ) : (
            <p>Loading songs...</p>
          )}
        </ul>
      </div>
    </>
  )
}

//This function is for testing purposes - nef
function MyButton() {
  return (
    <button>I'm a button</button>
  );
}


export default App
