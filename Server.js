const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./config/db.config.js');
const movie = require('./routes/movie.routes.js');
const genre = require('./routes/genre.routes.js');
const artist = require('./routes/artist.routes.js');
const user = require('./routes/user.routes.js');
const cors = require('cors');

const app = express();
const PORT = 8085;

connectDB();

mongoose.connect('mongodb://localhost:27017/moviesdb',{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to the database');
})
.catch((error)=> {
  console.error('Error connecting to MongoBD', error);
  process.exit(1);
});

app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: 'http://localhost:3000', // Allow the React app (frontend) origin
  methods: 'GET, POST, PUT, DELETE', // Allow the HTTP methods needed
  allowedHeaders: [
    'Content-Type', 
    'Authorization', 
    'Cache-Control',  // Allow Cache-Control header
  ], 
  credentials: true, // Allow credentials like cookies, tokens, etc.
};

app.use(cors(corsOptions)); 

/*const corsOptions = {
  origin: 'http://localhost:3000',  // Replace with your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
};*/

app.use(cors(corsOptions));

/*app.get('/movies', (req, res) => {
  res.send('All Movies Data in JSON format from Mongo DB');
});

app.get('/genres', (req, res) => {
  res.send('All Genres Data in JSON format from Mongo DB');
});

app.get('/artists', (req, res) => {
  res.send('All Artists Data in JSON format from Mongo DB');
});*/

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Upgrad Movie booking application development." });
});

app.use('/api', movie);
app.use('/api', genre);
app.use('/api', artist);
app.use('/api/auth', user);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});