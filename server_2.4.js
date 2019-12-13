const express = require('express');
  morgan = require('morgan');

const app = express();

let topMovies = [ {
    title : 'Pokemon the Movie', //placeholders as I don't have 10 favorite movies
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 2',
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 3',
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 4',
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 5',
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 6',
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 7',
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 8',
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 9',
    author : 'Nintendo'
},
{
    title : 'Pokemon the Movie 10',
    author : 'Nintendo'
}
];

//morgan logger
app.use(morgan('common'));

// GET requests
app.get('/', function(req, res) {
  res.send('Welcome to my top movies list!')
});

//is this the proper way to GET documentation?
app.use(express.static('public'));
app.get('/documentation', function(req, res) {
  res.sendFile('public/documentation.html', { root : __dirname });
});

app.get('/movies', function(req, res) {
  res.json(topMovies)
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

//optional?
// const bodyParser = require('body-parser'),
//   methodOverride = require('method-override');
//
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());
// app.use(methodOverride());
// app.use(function (err, req, res, next) {
//   // logic
// });

// listen for requests
app.listen(8080, () =>
  console.log('Your app is listening on port 8080.')
);
