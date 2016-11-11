setTimeout(function () {
	console.log('setTimeout');
},1000);


//把参数函数放到下一步要执行的，和setTimeout 0s差不多的，比setTimeout 0s效率高，下一页的首部
setImmediate(function () {
	console.log('setImmediate')
});

//nextTick放在当前列表的末尾，当前页,不停的往尾部插队，下一页就没法执行了
process.nextTick(function () {
	console.log('nextTick1');
	process.nextTick(function () {
		console.log('nextTick2');
		process.nextTick(function () {
		console.log('nextTick3');	
		});
	});	
});
