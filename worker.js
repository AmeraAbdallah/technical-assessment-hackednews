const mongoose = require('mongoose');
const request = require('request');
const Story = require('./db/models/story');
const Author = require('./db/models/author');
const fetch = require('node-fetch');

mongoose.connect('mongodb://localhost/hackednews');
// In this file, build out a worker that will populate the database
// with the data you need from the HackerNews API


// Here is an example of getting the top 500 stories from the API
// and logging them to the console.
// You are not required to use this code (though you may).
const topStoriesURL = 'https://hacker-news.firebaseio.com/v0/topstories.json'; 
const isJSONResponse = function(headers) {
  return headers['content-type'].includes('json');
};

const getJSONFromHackerNews = function (url, callback) {
  request.get(url, function(err, response, body) {
    let data = null;
    if (err) {
      callback(err, null);
    } else if (!isJSONResponse(response.headers)) {
      callback(new Error('Response did not contain JSON data.'), null);
    } else {
      data = JSON.parse(body);
      callback(null, data);
    }
  });
};

getJSONFromHackerNews(topStoriesURL, function(err, data) {
  console.log(err, 'err, expect to be null');
  console.log(data, 'data, expect to be ids for top 500 stories');
  for(let i = 0; i < 10; i++){
    fetch(`https://hacker-news.firebaseio.com/v0/item/${data[i]}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      Story.insertOne(data);
      fetch(`https://hacker-news.firebaseio.com/v0/user/${data.by}.json?print=pretty`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => Author.insertOne(data))
      .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
    // mongoose.disconnect();
  }
});
