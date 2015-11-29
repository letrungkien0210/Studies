'use strict';

var Greetr=require('./greetr.js');

var greeter1=new Greetr();

greeter1.on('greet', function(data){
		console.log(`Someone greated: ${ data }`);
});

greeter1.greet('Kien');