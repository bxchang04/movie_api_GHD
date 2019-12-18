const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

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
});

// Allow new users to register
app.post("/users", (req, res) => {
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

//Allow users to add a movie to their list of favorites
app.post("/favorites", (req, res) => {
    res.send("Successful POST request creating a favorite movie");
  }
);

// Deletes a movie from our favorite list by ID
app.delete("/favorites", (req, res) => {
  res.send("Successful DELETE request deleting a favorite movie");
});

//Allow existing users to deregister
app.delete("/users", (req, res) => {
  res.send("Successful DELETE request deleting a user");
});

app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});
