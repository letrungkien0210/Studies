var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
	res.send('<html><head></head><body><h1>Hello world!</h1></body></html>');
});

app.get('/person/:name/:age', function(req, res){
	console.log('Show params of request: '+ req.params);
	res.send('<html><head></head><body><h1>Person: ' + req.params.name 
	+ '</h1><br>'
	+ '<h1>'+req.params.age+'</h1>'
	+'</body></html>');
});

app.get('/api', function(req, res) {
	res.json({ firstname: 'John', lastname: 'Doe' });
});

console.log(port);
app.listen(port);