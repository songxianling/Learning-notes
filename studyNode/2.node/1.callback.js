function say (callback) {
	callback();
};
function print () {
	setTimeout(function () {
		console.log('hello world!');
	},1000);	
};
say(print);