console.log(process.cwd());

process.chdir('..');//上级目录

console.log(process.cwd());

console.log(process.memoryUsage());//内存占有率
/*
 {
 	rss: 18239488,  常驻内存   17m
 	heapTotal: 10481664,  堆总内存  7m
 	heapUsed: 4121392  堆已经使用的内存量  4m
 	}
 * 
 * */

