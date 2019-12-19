const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

// var auth = require('./auth')(app);

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

// Return a list of ALL movies to the user
app.get("/movies", function(req, res) {
  Movies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    }).catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get('/movies/:Title', function(req , res){
    Movies.find({Title : req.params.Title})
     .then(function(movies){
        res.status(201).json(movies)   /*Returns One By Title*/
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    });
});

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get('/movies/genres/:Name', function(req , res){
    Movies.findOne({'Genre.Name' : req.params.Name})
     .then(function(movie){
        res.status(201).json(movie.Genre)   /*Returns One By Title*/
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    });
});

// Return data about a director (bio, birth year, death year) by name
app.get('/movies/directors/:Name', function(req , res){
    Movies.findOne({'Director.Name' : req.params.Name})
     .then(function(movie){
        res.status(201).json(movie.Director)   /*Returns One By Title*/
    })
     .catch(function(error){
        console.error(error);
        res.status(500).send("Error" + err);
    });
});

// Allow new users to register
//Add a user 2.8
app.post('/users', function(req, res) {
  Users.findOne({ Username : req.body.Username })
  .then(function(user) {
    if (user) {
      return res.status(400).send(req.body.Username + "already exists");
    } else {
      Users
      .create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
      })
      .then(function(user) {res.status(201).json(user) })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      })
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Get all users 2.8
app.get('/users', function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get a user by username 2.8
app.get('/users/:Username', function(req, res) {
  Users.findOne({ Username : req.params.Username })
  .then(function(user) {
    res.json(user)
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Allow users to update their user info (username, password, email, date of birth)
// Update a user's info, by username 2.8
app.put('/users/:Username', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, { $set :
  {
    Username : req.body.Username,
    Password : req.body.Password,
    Email : req.body.Email,
    Birthday : req.body.Birthday
  }},
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if(err) {
      console.error(err);
      res.status(500).send("Error: " +err);
    } else {
      res.json(updatedUser)
    }
  })
});

// Add a movie to a user's list of favorites
app.post('/users/:Username/movies/:MovieID', function(req, res) {
  Users.findOneAndUpdate({ Username : req.params.Username }, {
    $push : { FavoriteMovies : req.params.MovieID }
  },
  { new : true }, // This line makes sure that the updated document is returned
  function(err, updatedUser) {
    if (err) {
      console.error(err);
      res.status(500).send("Error: " + err);
    } else {
      res.json(updatedUser)
    }
  })
});

// Deletes a movie from our favorite list by ID
app.delete('/users/:Username/movies/:MovieID', function(req, res) {
  let movie_to_delete = FavoriteMovies.find(function(movie_to_delete) { return movie_to_delete.id === req.params.id });

  if (movie_to_delete) {
    FavoriteMovies.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send("Movie " + req.params.id + " was deleted from your favorites list.")
    res.send("Successful DELETE request deleting a favorite movie");
  }
});

//Allow existing users to deregister
// Delete a user by username 2.8
app.delete('/users/:Username', function(req, res) {
  Users.findOneAndRemove({ Username: req.params.Username })
  .then(function(user) {
    if (!user) {
      res.status(400).send(req.params.Username + " was not found");
    } else {
      res.status(200).send(req.params.Username + " was deleted.");
    }
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});


app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});
