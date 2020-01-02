const express = require('express');
// var storyController = require('../../db/controllers/story.js');
//TODO: refactor to use controller
 const Story = require('../../db/models/story');

let router = express.Router();

router.route('/')
  .get(async function(req, res) {
     try{
      let docs = await Story.findAll();
      res.json(docs);
     }catch(err){
      res.status(500).json({err: 'something went wrong'})
     }
  });

// Here we use express's route params
router.route('/:id')
  .get(function(req, res) {});

module.exports = router;
