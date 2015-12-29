var express = require('express');
var router = express.Router();
var mongo=require('mongodb');
var db=require('monk')('locahost/nodeblog');

//Homepage Blog Posts
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  var db=req.db;
  var posts=db.get('posts');
  posts.find({},{},function(err, posts){
    res.render('index',{
      "posts":posts
    });
  });
});

module.exports = router;