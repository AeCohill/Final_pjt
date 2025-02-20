import { useState, useEffect } from "react";

function API() {
  const [songs, setSongs] = useState([]);  // Ensure no duplicate 'songs' variable
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSongs();  // Fetch songs on component mount
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch("https://equinox-climbing-handbell.glitch.me/api/songs");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const songsData = await response.json();
      setSongs(songsData);  // Set the fetched songs
    } catch (error) {
      setError(error.message);  // Set error message if any
    }
  };

  return (
    <div>
      <h1>Songs List</h1>
      {error && <p>Error: {error}</p>}  
      <ul>
        {songs.length === 0 ? (
          <li>Loading songs...</li>  
        ) : (
          songs.map((song, index) => (
            <li key={index}>
              <strong>{song.title}</strong> by {song.artist} the genre is {song.genre}
            </li>  
          ))
        )}
      </ul>
    </div>
  );
}

export default API;

