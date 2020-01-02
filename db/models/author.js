const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    about: String,
    created: {
        type: Date,
        default: new Date()
    }, //not json
    id: {
        type: String,
        unique: true
    },
    karma: Number,
});

let AuthorModel = mongoose.model('Author', authorSchema);

// findAll retrieves all authors
function findAll() {
    return AuthorModel.find({});
  }
  
  // findOne will retrieve the author associated with the given id
  function findOne(id) {
    return AuthorModel.find({id: id});
  }
  
  // insertOne inserts an author into the db
  function insertOne(author) {
    return AuthorModel.create(author);
  }
  

  //delete all authors
  function removeAll(){
      return AuthorModel.remove({});
  }

  exports.findOne = findOne;
  exports.findAll = findAll;
  exports.insertOne = insertOne;
  exports.removeAll = removeAll;
