const express = require('express');
const bodyParser = require('body-parser');
const storyRouter = require('./routers/story.js');
const authorRouter = require('./routers/author');
const mongoose = require('mongoose');

let app = express();

mongoose.connect('mongodb://localhost/hackednews');

app.use(bodyParser.json());

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.use('/api/story', storyRouter);
app.use('/api/author', authorRouter);

app.listen(8000, function() {
  console.log('listening on port 8000');
});
