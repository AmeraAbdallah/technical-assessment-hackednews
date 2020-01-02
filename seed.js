var data = require('./seed_data.js');
var mongoose = require('mongoose');
var Stories = require('./db/models/story.js');

mongoose.connect('mongodb://localhost/hackednews');

var seedDb =  async function(data) {
  // your code here!
  for(let i = 0; i < data.length; i++){
    let storyData = {
      id: data[i].id,
      title: data[i].title,
      score: data[i].score,
      by: data[i].by.id
    };
    try{
      let doc = await Stories.insertOne(storyData);
    }catch(err){
      console.log(err);
    }

  }
};

seedDb(data);
