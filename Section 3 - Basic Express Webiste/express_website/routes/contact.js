var express = require('express');
var router = express.Router();
var nodemailer=require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});

router.post('/send', function(req, res, next){
  var transporter=nodemailer.createTransport({
    service: 'Gmail',
    auth:{
      user: 'letrungkien0210@gmail.com',
      pass: 'LeTrungKien0210@'
    }
  });
  
  var mailOption={
    from: 'Kien le <letrungkien0210@outlook.com>',
    to: 'letrungkien0201@gmail.com',
    subject: 'Website Submission',
    // Plain Text Version
    text: 'You have a submission with the following details... Name: '+req.body.name +'Email: '+req.body.email +'Message: '+req.body.message,
    // HTML Version
    html: '<p>You got a website submission with the following details...</p><ul><li>Name: <b>'+req.body.name+'</b></li><li>Email: <b>'+req.body.email+'</b></li><li>Message: <b>'+req.body.message+'</b></li></ul>'
  };
  
  transporter.sendMail(mailOption, function(error, info){
    if(error){
      console.log(error);
      res.redirect('/');
    }else{
      console.log('Message Send: '+info.message);
      res.redirect('/');
    }
  });
});

module.exports = router;
