const mongoose = require('mongoose');

const storySchema = mongoose.Schema({
  id: String,
  by: String,
  title: String,
  score: Number,
  kids: [Number]
});

let StoryModel = mongoose.model('Story', storySchema);

//delete all stories
function removeAll(){
  return StoryModel.remove({});
}

// findAll retrieves all stories
function findAll() {
  return StoryModel.find({});
}

// findOne will retrieve the story associated with the given id
function findOne(id) {
  return StoryModel.find({id: id});
}

// insertOne inserts a story into the db
function insertOne(story) {
  return StoryModel.create(story);
}

exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.removeAll = removeAll;