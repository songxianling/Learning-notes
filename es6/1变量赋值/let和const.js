//for (var i=0;i<3;i++) {
//	setTimeout(function () {
//		console.log(i);//这个时候只能输出3次3，	因为异步的原理，最后绑定到的是i++之后的3，这就是var本身存在的作用域的问题
//	})	
//};


for(let i=0;i<3;i++){
	setTimeout(function () {
		console.log(i);//这时候就是咱们想要的结果了，打印出来了符合规则的0,1,2  -->这就是let解决了var不保存作用域的问题
	})
};
let a=1;
// let a=2;//这时候就会报错了。let本身存在作用域，不能重复的去声明一个变量，
console.log(a);

{
	let a=2;
}
//es6闭包的新写法
//以前是  ;(function(){
	
//})();
{
	let a=3;
}
const act=888;
act =999;//不能修改的，用const是静态的，会报错Assignment to constant variable.   分配到恒定的变量。

console.log(act);

//var没有块级作用域，定义后在当前闭包中都可以访问，如果变量名重复了，就会覆盖之前的变量，而且也有可能被其他的更改
//用let定义的变量具有块级作用域，用const定义的变量是静态变量，以后是补课修改的


//const是静态变量，以后不允许在修改或重新定义，好处就是
//1->在严格模式下，重新定义或则修改静态变量会报错
//2->不同的块级作用域下，可以定义相同名字的静态变量