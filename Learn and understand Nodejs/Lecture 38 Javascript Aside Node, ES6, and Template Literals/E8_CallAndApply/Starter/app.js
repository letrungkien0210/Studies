var obj={
	name:'Jodn Doe',
	greet:function(){
		console.log(`Hello ${ this.name }`);
	}
}

obj.greet();
obj.greet.call({name: 'ABC'});
obj.greet.apply({name: 'DEF'});