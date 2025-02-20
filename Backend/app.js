// Backend (Glitch) - server.js
const path = require("path"); 
const express = require('express');
const app = express();
const router = express.Router()
const bodyParser = require('body-parser')
const Song = require("./models/songs")

app.use(bodyParser.json())
app.use(express.json())

// Enable CORS for all routes
/* var cors = require('cors') */
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Your existing routes
app.use("/api", router)

//get songs from db - nef
router.get("/songs", async(req,res) => {
  let query = {}
  if (req.query.genre){
    query = {genre : req.query.genre}
  }

  //to find all songs in a db just use the find() method within the try/catch thats built into mongoose
  try {
    const songs = await Song.find(query); // This will return a promise
    res.json(songs); // Send the result as a response
  } catch (err) {
    res.status(400).send(err); // Handle any errors
  }
  
});

router.post("/songs", async (req, res) =>{
  try{
    const song = await new Song(req, body)
    await song.save()
    res.stat
    console.log(song)
  }
  catch{
    res.status(400).send(err)
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
})

//Old code -NM

/* Song.find(query, function(err, songs){
    if (err){
      res.status(400).send(err)
    }
    else{
      res.json(songs)
    }
  }) */

//Old reouter.get method to get songs and send them to the frontend - Neftali

/* router.get('/songs', (req, res) => {
  const songs = [
    {title: "We Found Love",
            artist: "Rihanna",
            popularity: 10,
            releaseDate: new Date(2011, 9, 22),
            genre: ["electro house"]},
    { title: 'Song 1', artist: 'Artist 1', genre: 'Pop' },
    { title: 'Song 2', artist: 'Artist 2', genre: 'Rock' },
  ];
  res.json(songs);
}); */