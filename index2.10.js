const mongoose = require('mongoose');
const Models = require('./models.js');
const { check, validationResult } = require('express-validator');

const Movies = Models.Movie;
const Users = Models.User;

mongoose.connect('mongodb+srv://kay:bwater@cluster0.mongodb.net/myFlixDB?retryWrites=true', { useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

var auth = require('./auth')(app);

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

let TopMovies = [ {
  id: 1,
  title: 'Pokemon the Movie', //placeholder for testing
  clases: {
    description: 'An animated movie',
    genre: 'Animation',
    director: 'Nintendo',
    image_URL: 'http://www.test.com',
    featured: 'true/false'
    }
  },
  {
  id: 2,
  title: 'Pokemon the Movie 2', //placeholder for testing
  clases: {
    description: 'An animated movie',
    genre: 'Animation',
    director: 'Nintendo',
    image_URL: 'http://www.test.com',
    featured: 'true/false'
    }
  },
  {
  id: 2,
  title: 'Pokemon the Movie 3', //placeholder for testing
  clases: {
    description: 'An animated movie',
    genre: 'Animation',
    director: 'Nintendo',
    image_URL: 'http://www.test.com',
    featured: 'true/false'
    }
  },
  {
    id: 2,
    title: 'Pokemon the Movie 4', //placeholder for testing
    clases: {
      description: 'An animated movie',
      genre: 'Animation',
      director: 'Nintendo',
      image_URL: 'http://www.test.com',
      featured: 'true/false'
      }
    },
  {
    id: 3,
    title: 'Pokemon the Movie 5', //placeholder for testing
    clases: {
      description: 'An animated movie',
      genre: 'Animation',
      director: 'Nintendo',
      image_URL: 'http://www.test.com',
      featured: 'true/false'
    }
  }
];

let Users = [ {
    id : 1,
    name : 'Anne', //placeholders as I don't have 10 favorite movies
  },
  {
    id : 2,
    title : 'Bill',
  },
  {
    id : 3,
    title : 'Charles',
  }
];

let FavoriteMovies = [ {
    id : 1,
    name : 'Anne' //placeholders as I don't have 10 favorite movies
  },
  {
      id : 2,
      title : 'Bill'
  },
  {
      id : 3,
      title : 'Charles'
  }
];

// Return a list of ALL movies to the user
app.get("/movies", passport.authenticate('jwt', { session: false }), function(req, res) {
  TopMovies.find()
    .then(function(movies) {
      res.status(201).json(movies);
    }).catch(function(error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    });
});

// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:title", passport.authenticate("jwt", { session: false }),
  function(req, res) {
    TopMovies.findOne({ title: req.params.title })
      .then(function(movie) {
        res.json(movie);
      })
      .catch(function(error) {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get("/genre/:name", passport.authenticate("jwt", { session: false }),
  function(req, res){
    TopMovies.findOne({
      "genre.name": req.params.name
    })
      .then(function(genre){
        res.json(genre.name);
      })
      .catch(function(error){
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Return data about a director (bio, birth year, death year) by name
app.get("/director/:director", passport.authenticate('jwt', { session: false }), function(req, res){
  res.json(TopMovies.find( function(movie){ return movie.director === req.params.director   }));
  res.send("Successful GET request returning data on a director of a single movie");

app.get("/directors/:name", passport.authenticate("jwt", { session: false }),
  (req, res) => {
    TopMovies.findOne({
      "director.name": req.params.name
    })
      .then((movies) => {
        res.json(movies.director);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error: " + error);
      });
  }
);

// Allow new users to register
//Add a user 2.10 -- why is the jwt removed from 2.8/2.9?
app.post('/users',
  // Validation logic here for request
  //you can either use a chain of methods like .not().isEmpty()
  //which means "opposite of isEmpty" in plain english "is not empty"
  //or use .isLength({min: 5}) which means
  //minimum value of 5 characters are only allowed
  [check('Username', 'Username is required').isLength({min: 5}),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()],(req, res) => {

  // check the validation object for errors
  var errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  var hashedPassword = Users.hashPassword(req.body.Password);
  Users.findOne({ Username : req.body.Username }) // Search to see if a user with the requested username already exists
  .then(function(user) {
    if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + " already exists");
    } else {
      Users
      .create({
        Username : req.body.Username,
        Password: hashedPassword,
        Email : req.body.Email,
        Birthday : req.body.Birthday
      })
      .then(function(user) { res.status(201).json(user) })
      .catch(function(error) {
          console.error(error);
          res.status(500).send("Error: " + error);
      });
    }
  }).catch(function(error) {
    console.error(error);
    res.status(500).send("Error: " + error);
  });
});

// Get all users 2.8
app.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {

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
app.get('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
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
app.put('/users/:Username', passport.authenticate("jwt", { session: false }), function(req, res) {
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

// Deletes a movie from our list by ID
app.delete("/movies/:id", passport.authenticate('jwt', { session: false }), (req, res) => {
  let movie_to_delete = FavoriteMovies.find((movie_to_delete) => { return movie_to_delete.id === req.params.id });

  if (movie_to_delete) {
    FavoriteMovies.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send("Movie " + req.params.id + " was deleted from your favorites list.")
    res.send("Successful DELETE request deleting a favorite movie");
  }
});
//Allow existing users to deregister
// Delete a user by username 2.8
app.delete('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
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

var port = process.env.PORT || 3000;
app.listen(port, "0.0.0.0", function() {
console.log("Listening on Port 3000");
});
