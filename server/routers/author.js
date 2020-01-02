const express = require('express');

 const Author = require('../../db/models/author');

let router = express.Router();

router.route('/')
  .get(async function(req, res) {
     try{
      let docs = await Author.findAll();
      res.json(docs);
     }catch(err){
      res.status(500).json({err: 'something went wrong'})
     }
  });

// Here we use express's route params
router.route('/:id')
  .get(function(req, res) {});

module.exports = router;
