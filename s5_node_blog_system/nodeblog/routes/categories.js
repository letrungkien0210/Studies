var express = require('express');
var router = express.Router();

router.get('/show/:category', function(req, res, next){
    console.log(req.db);
    var db=req.db;
    var posts=db.get('posts');
    posts.find({category:req.params.category},{}, function(err, posts){
        res.render('index',{
            "title":req.param.category,
            "posts":posts
        });
    });
});

router.get('/add', function(req, res, next) {
    res.render('addcategory',{
        "title":"Add Category"
    });
});

router.post('/add', function(req, res, next){
    //Get Form Values
    var title= req.body.title;
    
    //Form validation
    req.checkBody('title','Title field is required').notEmpty();
    
    //Check Errors
    var errors=req.validationError();
    
    if(errors){
        res.render('addcategory',{
            "title":title,
            "errors":errors
        });
    }else{
       var categories=db.get('categories');
       
       categories.insert({
           "title":title
       }, function(err, category){
           if(err){
               res.send('There was an issue submitting the category');
           }else{
               req.flash('success','Category Submiited');
               res.localtion('/');
               res.redirect('/');
           }
       });
    }
});

module.exports = router;
