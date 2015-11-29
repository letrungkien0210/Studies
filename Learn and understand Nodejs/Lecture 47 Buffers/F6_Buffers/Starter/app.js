var buf=new Buffer('Hello','utf8');
console.log(buf);
console.log(buf.toString());
console.log(buf.toJSON());
console.log(buf[-1]);

buf.write('kien12');
console.log(buf);
console.log(buf.toString());
console.log(buf.toJSON());
console.log(buf[-1]);