var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
app.use(function(req, res, next){//allow cross origin requests
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Header", "origin, X-Requested-with, Content-Type, Accept");
    next();
});

/** Serving from the same express Server
 * No cors required
 */
app.use(express.static('../client'));
app.use(bodyParser.json());
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename: function(req, file, cb){
        var datatimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var uploads = multer({//muter settings
    storage: storage
}).single('file');
/** API path that will upload the files */
app.post('/upload', function(req, res){
    upload(req, res, function(err){
        if(err){
            res.json({ error_code: 1, err_desc: err});
            return;
        }
        res.json({ error_code: 1, err_desc: null});
    })
});
app.listen('3000', function(){
    console.log('Running on 3000 ....');
});