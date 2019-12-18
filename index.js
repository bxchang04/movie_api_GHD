const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

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
app.get("/movies", (req, res) => {
  res.json(TopMovies);
  res.send("Successful GET request returning data on all the movies");
});
// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:title", (req, res) => {
  res.json(TopMovies.find( (movie) =>
    { return movie.title === req.params.title   }));
    res.send("Successful GET request returning data on a single movie");
});
// Return data about a genre (description) by movie name/title (e.g., “Thriller”)
app.get("/genre/:genre", (req, res) => {
  res.json(TopMovies.find( (movie) =>
    { return movie.genre === req.params.genre
    }));
  res.send("Successful GET request returning data on a single genre");
});
// Return data about a director (bio, birth year, death year) by name
app.get("/director/:director", (req, res) => {
  res.json(TopMovies.find( (movie) =>
    { return movie.director === req.params.director   }));
  res.send("Successful GET request returning data on a director of a single movie");

  // Return documentation
  app.use(express.static('public'));
  app.get('/documentation', function(req, res) {
    res.sendFile('public/documentation.html', { root : __dirname });
  });

// Allow new users to register
  let newUser = req.body;

  if (!newUser.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    newUser.id = uuid.v4();
    Users.push(newUser);
    res.status(201).send(newUser);
    res.send("Successful POST request creating a new user");
  }
});

// Allow users to update their user info (username, password, email, date of birth) -- not implemented yet!
app.put("/users", (req, res) => {
 res.send("Successful PUT updating a user's information");
});

//Allow users to add a movie to their list of favorites --BC: probably don't need to duplicate name
app.post("/favorites", (req, res) => {
  let movie_favorited = req.body;

  if (!movie_favorited.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    FavoriteMovies.id = uuid.v4();
    FavoriteMovies.push(movie_favorited);
    res.status(201).send(movie_favorited);
    res.send("Successful POST request creating a favorite movie");
  }
});

// Deletes a movie from our list by ID
app.delete("/movies/:id", (req, res) => {
  let movie_to_delete = FavoriteMovies.find((movie_to_delete) => { return movie_to_delete.id === req.params.id });

  if (movie_to_delete) {
    FavoriteMovies.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send("Movie " + req.params.id + " was deleted from your favorites list.")
    res.send("Successful DELETE request deleting a favorite movie");
  }
});

//Allow existing users to deregister
app.delete("/users", (req, res) => {
  let user_to_delete = Users.find((user_to_delete) => { return user_to_delete.id === req.params.id }); //add a && .name here as well? Check this!

  if (user_to_delete) {
    Users.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send("Movie " + req.params.id + " was deleted from your favorites list.")
    res.send("Successful DELETE request unregistering a user");
  }
});


app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});
