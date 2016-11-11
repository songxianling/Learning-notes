
/*
 * 1.每一个js文件都是一个独立的文件
 * 2.模块内部的变量都是私有变量，外部其他模块不能访问
 */
function add(a, b) {
	return a + b;
}
//都有一个天然的
//exports={};
//导出模块
exports.add = add;
