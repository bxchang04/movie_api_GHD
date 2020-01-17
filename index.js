const path = require("path");

const express = require("express"),
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  models = require("./models"),
  passport = require("passport"),
  cors = require("cors"),
  { check, validationResult } = require("express-validator");
require("./passport");

const Movies = models.Movie;
const Users = models.User;

mongoose.connect('mongodb+srv://bxchang04:bwater@cluster0-mfewl.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true });
//mongoose.connect('mongodb://localhost:27017/myFlixDB', {useNewUrlParser: true});

const app = express();
// middleware functions
app.use(cors());
app.use(bodyParser.json());

const auth = require("./auth")(app);

app.use(morgan("common"));
app.use(express.static("public"));
app.use('/client', express.static(path.join(__dirname, 'client/dist')));
app.get("/client/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});
app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something went wrong");
  next();
});

// Return a list of ALL movies to the user
// app.get("/movies", function(req, res) {
app.get("/movies", passport.authenticate('jwt', { session: false }), function(req, res) {
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

app.post('/users', function (req, res) { // this is for "allowing users to register"
    // validation
    [check('Username', 'Username is required').isLength({ min: 5 }),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()], (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
    }
    // end validation
    var hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
        .then(function (user) {
            if (user) {
                return res.status(400).send(req.body.Username + ' already exists');
            } else {
                Users
                    .create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthdate: req.body.Birthdate
                    })
                    .then(function (user) { res.status(201).json(user) })
                    .catch(function (error) {
                        console.error(error);
                        res.status(500).send('Error: ' + error);
                    })
            }
        }).catch(function (error) {
            console.error(error);
            res.status(500).send('Error: ' + error);
        });
});

// Get all users
app.get('/users', passport.authenticate('jwt', { session: false }), function(req, res) {

  Users.find()
  .then(function(users) {
    res.status(201).json(users.map((user) => ({
      _id: user._id,
      Username: user.Username,
      Email: user.Email,
      Birthday: user.Birthday,
      FavoriteMovies: user.FavoriteMovies
    }))) //({}) returns an object. 1 line arrow functinos don't need curly objects. This syntax doesn't confuse node.JS.
  })
  .catch(function(err) {
    console.error(err);
    res.status(500).send("Error: " + err);
  });
});

// Get a user by username
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
app.put('/users/:Username', passport.authenticate('jwt', { session: false }), function(req, res) {
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
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res) {
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
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', { session: false }), function(req, res){
Users.findOneAndUpdate({ Username : req.params.Username }, {
    $pull : { FavoriteMovies : req.params.MovieID }
  },
  { new : true },
  function(error, updatedUser) {
    if (error) {
      console.error(error);
      res.status(500).send("Error: " + error);
    } else {
      res.status(201).send("Movie Under ID # " + req.params.MovieID + " Has Been Deleted From Member's Account.");
    }
  })
});

//Allow existing users to deregister
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
