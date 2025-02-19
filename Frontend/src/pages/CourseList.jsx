import { useState, useEffect } from "react";
import Input  from "../ui/Input";

function CourseList() {
  const [songs, setSongs] = useState([]);  // Ensure no duplicate 'songs' variable
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSongs();  // Fetch songs on component mount
  }, []);

  const fetchSongs = async () => {
    try {
      const response = await fetch("https://equinox-backend.glitch.me/api/songs");
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
      {/* Search Bar */}
      <Input className="search-input" placeholder="Search for Course" value={search} onChange={(e) => setSearch(e.target.value)} />

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

export default CourseList;