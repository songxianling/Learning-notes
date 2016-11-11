console.log(global);//global是全局对象，
//在NODE中global对象的属性可能在程序的任何地方被访问
// 能在程序任何地方访问的对象都是global的属性
console.log('log');
console.error('error');
console.info('info');
console.warn('warn');



console.time('cost');
for (var i=0;i<10000;i++) {
	
}
console.timeEnd('cost');

console.log(__filename);//当前模块的文件绝对路径
console.log(__dirname);//当前模块所在的目录，绝对路径




