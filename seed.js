let data = require('./seed_data.js');
const mongoose = require('mongoose');
const Stories = require('./db/models/story.js');
const Authors = require('./db/models/author');

mongoose.connect('mongodb://localhost/hackednews');

const seedDb =  async function(data) {

  try{
    await Stories.removeAll();
    await Authors.removeAll();
  }catch(err){
    console.log(err)
  }

  for(let i = 0; i < data.length; i++){
    let storyData = {
      id: data[i].id,
      title: data[i].title,
      score: data[i].score,
      by: data[i].by.id,
      kids: data[i].kids
    };
    try{
      let doc = await Stories.insertOne(storyData);
      let authorDoc = await Authors.insertOne(data[i].by);
    }catch(err){
      console.log(err);
    }

  }
};

seedDb(data);
