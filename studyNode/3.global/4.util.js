var util = require('util');//亲生的模块


var obj = new Object();
obj.name = "sre";
Object.defineProperty(obj,'age',{
	value:100,
	configurable:true,//可配置的，是否可以删除
	writable:true,//是否只读
	enumerable:true,//可枚举的
	
})
obj.age="123";

for(var arr in obj){
	console.log(arr);
}

console.log(util.inspect(obj));


//判断一个对象是不是一个数组
console.log(util.isArray(""));
console.log(util.isRegExp(""));
console.log(util.isDate(new Date));
console.log(util.isError(new Error));