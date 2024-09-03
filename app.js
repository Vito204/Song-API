const express = require("express");
const app = express();
const PORT = 3000;

//Receiving incoming data from the client configuration
app.use(express.json());
//the database of the songs
const songs = [
  { id: "1", title: "Shake It Off", singer: "Taylor Swift" },
  {
    id: "2",
    title: "Love Story",
    singer: "Taylor Swift",
  },
  {
    id: "3",
    title: "Yellow",
    singer: "Coldplay",
  },
];
//Home route
app.get("/", (req, res) => {
  res.json({ status: "success", message: "Welcome to the Song-API" });
});
//Get all songs
app.get("/songs", (req, res) => {
  res.json({
    status: "success",
    message: "All the songs fetched",
    data: songs,
  });
});
//Fetch a song
app.get("/songs/:id", (req, res) => {
  //?retrieve the id of the song
  const id = req.params.id;
  const songFound = songs.find((song) => song.id === id);
  if (!songFound) {
    return res.json({
      status: "failed",
      message: `Song with id ${id} is not found`,
    });
  }
  res.json({
    status: "success",
    message: `Song with id ${id} is found`,
    data: songFound,
  });
});
//Add a song
app.post("/songs", (req, res) => {
  const newPost = req.body;
  songs.push(newPost);
  res.json({
    status: "success",
    message: "Song added successfully",
    data: songs,
  });
});
//start the server
app.listen(PORT, console.log(`Server is running on port ${PORT}`));
