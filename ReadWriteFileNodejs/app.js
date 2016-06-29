var fs = require("fs");

//Asynchronous ready
fs.readFile('input.txt', function(err, data){
	if(err){
		return console.log(err);
	}
	console.log('Asynchronous read: ' + data.toString());
});

//Synchronous read
var data = fs.readFileSync('input.txt');
console.log('Synchronous read: ' + data.toString());

console.log('Program ended');