var util = require('util');//亲生的模块

function parent () {
	this.name = 'hahaha';
}
parent.prototype.say = function () {
	console.log(this.name);
}
function child () {
	this.name=  "child";
}
//子类可以继承父类原型上的方法
util.inherits(child,parent);//相当于原型继承

var child1 = new child;
child1.say();


console.log(util.inspect(child1));
