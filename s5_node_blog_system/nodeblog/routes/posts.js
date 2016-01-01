var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var multer = require('multer');
var upload = multer({ dest: './public/images/uploads' });

router.get('/show/:id', function(req, res, next){
    var posts=db.get('posts');
    posts.findById(req.params.id, function(err, post){
        res.render('show',{
            "post":post
        });
    });
});

router.get('/add', function (req, res, next) {
    var categories = db.get('categories');

    categories.find({}, {}, function (err, categories) {
        res.render('addpost', {
            "title": "Add post",
            "categories": categories
        });
    });
});

router.post('/add', upload.single('mainimage'), function (req, res, next) {
    //Get Form values
    var title = req.body.title;
    var category = req.body.category;
    var body = req.body.body;
    var author = req.body.author;
    var date = new Date();

    if (req.file) {
        console.dir(req.file);
        var mainImageOriginalName = req.file.originalname;
        var mainImageName = req.file.filename;
        var mainImageMime = req.file.mimetype;
        var mainImagePath = req.file.path;
        var mainImageExt = req.file.extension;
        var mainImageSize = req.file.size;
    } else {
        var mainImageName = 'noimage.png';
    }
    
    //Form Validation
    req.checkBody('title', 'Title field is required').notEmpty();
    req.checkBody('body', 'Body field is required');
    
    //Check errors
    var errors = req.validationErrors();

    if (errors) {
        //var categories=db.get('categories');
        res.render('addpost', {
            "errors": errors,
            "title": title,
            "body": body
        });
    } else {
        var posts = db.get('posts');
        
        //Submit to db
        posts.insert({
            "title": title,
            "body": body,
            "category": category,
            "date": date,
            "author": author,
            "mainimage": mainImageName
        }, function (err, post) {
            if (err) {
                res.send('There was an issue submitting the post');
            } else {
                req.flash('success', 'Post Submitted');
                res.location('/');
                res.redirect('/');
            }
        })

    }
});

router.post('/addcomment', function (req, res, next) {
    //Get Form values
    var name = req.body.name;
    var email = req.body.email;
    var body = req.body.body;
    var postid = req.body.postid;
    var commentdate = new Date();

    //Form Validation
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email','Email is not formatted correctly').isEmail();
    req.checkBody('body', 'Body field is required').notEmpty();
    
    //Check errors
    var errors = req.validationErrors();

    if (errors) {
        var posts=db.get('posts');
        //var categories=db.get('categories');
        res.render('show', {
            "errors": errors,
            "title": title,
            "body": body
        });
    } else {
        var comment={"name":name,"email":email,"body":body,"commentdate":commentdate};
        
        var posts = db.get('posts');
        
        posts.update({
            "_id":postid
        },{
            $push:{
                "comments":comment
            }
        },
        function(err, doc){
            if(err){
                throw err;
            }else{
                req.flash('success','Comment Added');
                res.location('/posts/show/'+postid);
                res.redirect('/posts/show/'+postid);
            }
        });
    }
});

module.exports = router;