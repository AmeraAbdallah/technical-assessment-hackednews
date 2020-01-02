var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  by: String,
  title: String,
  score: Number
});

var StoryModel = mongoose.model('Story', storySchema);

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
