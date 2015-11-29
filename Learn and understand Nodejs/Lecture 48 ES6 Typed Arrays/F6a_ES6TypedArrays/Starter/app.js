var buffer=new ArrayBuffer(12);
var view=new Int32Array(buffer);
view[0]=5;
view[1]=3;
console.log(buffer.byteLength);
console.log(view);