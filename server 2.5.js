const express = require("express"),
  bodyParser = require("body-parser"),
  uuid = require("uuid");

const app = express();

app.use(bodyParser.json());

let topMovies = [ {
    id: 1,
    title: 'Pokemon the Movie', //placeholders as I don't have 10 favorite movies
    clases: {
      description: 'An animated movie',
      genre: 'Animated',
      director: 'Nintendo',
      image_URL: 'http://www.test.com',
      featured: 'true/false'
      }
    },
    {
      id: 2,
      title: 'Pokemon the Movie', //placeholders as I don't have 10 favorite movies
      clases: {
        description: 'An animated movie',
        genre: 'Animated',
        director: 'Nintendo',
        image_URL: 'http://www.test.com',
        featured: 'true/false'
        }
      },
    {
      id: 3,
      title: 'Pokemon the Movie', //placeholders as I don't have 10 favorite movies
      clases: {
        description: 'An animated movie',
        genre: 'Animated',
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

let favoriteMovies = [ {
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

// Return a list of ALL movies to the user
app.get("/movies", (req, res) => {
  res.json(topMovies);
});
// Return data (description, genre, director, image URL, whether it’s featured or not) about a single movie by title to the user
app.get("/movies/:title", (req, res) => {
  res.json(topMovies.find( (movie) =>
    { return movie.title === req.params.title   }));
});
// Return data about a genre (description) by name/title (e.g., “Thriller”)
app.get("/movies/:genre", (req, res) => {
  res.json(topMovies.find( (movie) =>
    { return movie.genre === req.params.genre   }));
});
// Return data about a director (bio, birth year, death year) by name
app.get("/movies/:director", (req, res) => {
  res.json(topMovies.find( (movie) =>
    { return movie.director === req.params.director   }));
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
  }
});
// // Allow users to update their user info (username, password, email, date of birth) -- check this!
// app.put("/users", (req, res) => {
//   let user = .find((user) => { return user.name === req.params.name });
//
//   if (user) {
//     Users.classes[req.params.class] = req.params.grade;
//     res.status(201).send("Student " + req.params.name + " was assigned a grade of " + req.params.grade + " in " + req.params.class);
//   } else {
//     res.status(404).send("Student with the name " + req.params.name + " was not found.")
//   }
// });
//Allow users to add a movie to their list of favorites --BC: probably don't need to duplicate name
app.post("/favorites", (req, res) => {
  let movie_favorited = req.body;

  if (!movie_favorited.name) {
    const message = "Missing name in request body";
    res.status(400).send(message);
  } else {
    favoriteMovies.id = uuid.v4();
    favoriteMovies.push(movie_favorited);
    res.status(201).send(movie_favorited);
  }
});

// Deletes a movie from our list by ID
app.delete("/students/:id", (req, res) => {
  let movie_to_delete = favoriteMovies.find((movie_to_delete) => { return movie_to_delete.id === req.params.id });

  if (movie_to_delete) {
    favoriteMovies.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send("Movie " + req.params.id + " was deleted from your favorites list.")
  }
});

//Allow existing users to deregister
app.delete("/users", (req, res) => {
  let user_to_delete = Users.find((user_to_delete) => { return user_to_delete.id === req.params.id }); //add a && .name here as well? Check this!

  if (user_to_delete) {
    Users.filter(function(obj) { return obj.id !== req.params.id });
    res.status(201).send("Movie " + req.params.id + " was deleted from your favorites list.")
  }
});


app.listen(8080, () => {
  console.log(`Your app is listening on port 8080`);
});
