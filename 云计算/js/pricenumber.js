/*11.09 陈晓英*/

//这是云计算的价格计算器
var snum = 5.89;

ynumber(snum);

/*
 * jgcss：这是对得到的钱数计算的方法
 * snum：当前这个钱数
 */
function ynumber (snum) {
	var snum = snum.toString();//把当前的值 转化为字符串
		numarr = snum.split('.');//以小数点拆分成两个数组

	var spo = numarr[0].length;
	var strr1 = numarr[0],//这是第一个数组
		strr2 = numarr[1];//这是第二个数组
	
	//下面是对第一个数组的钱数进行判断的
	if(spo == 1){
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(0));
	}			
	if(spo == 2){
		$('#yunjg').find('span').eq(7).addClass('number-'+strr1.charAt(0));
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(1));
	}	
	if(spo == 3){
		$('#yunjg').find('span').eq(6).addClass('number-'+strr1.charAt(0));
		$('#yunjg').find('span').eq(7).addClass('number-'+strr1.charAt(1));
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(2));
	}
	if(spo == 4){
		$('#yunjg').find('span').eq(5).addClass('number-'+strr1.charAt(0));
		$('#yunjg').find('span').eq(6).addClass('number-'+strr1.charAt(1));
		$('#yunjg').find('span').eq(7).addClass('number-'+strr1.charAt(2));
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(3));
	}
	if(spo == 5){
		$('#yunjg').find('span').eq(4).addClass('number-'+strr1.charAt(0));
		$('#yunjg').find('span').eq(5).addClass('number-'+strr1.charAt(1));
		$('#yunjg').find('span').eq(6).addClass('number-'+strr1.charAt(2));
		$('#yunjg').find('span').eq(7).addClass('number-'+strr1.charAt(3));
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(4));
	}
	if(spo == 6){
		$('#yunjg').find('span').eq(3).addClass('number-'+strr1.charAt(0));
		$('#yunjg').find('span').eq(4).addClass('number-'+strr1.charAt(1));
		$('#yunjg').find('span').eq(5).addClass('number-'+strr1.charAt(2));
		$('#yunjg').find('span').eq(6).addClass('number-'+strr1.charAt(3));
		$('#yunjg').find('span').eq(7).addClass('number-'+strr1.charAt(4));
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(5));
	}
	if(spo == 7){
		$('#yunjg').find('span').eq(2).addClass('number-'+strr1.charAt(0));
		$('#yunjg').find('span').eq(3).addClass('number-'+strr1.charAt(1));
		$('#yunjg').find('span').eq(4).addClass('number-'+strr1.charAt(2));
		$('#yunjg').find('span').eq(5).addClass('number-'+strr1.charAt(3));
		$('#yunjg').find('span').eq(6).addClass('number-'+strr1.charAt(4));
		$('#yunjg').find('span').eq(7).addClass('number-'+strr1.charAt(5));
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(6));
	}
	if(spo == 8){
		$('#yunjg').find('span').eq(1).addClass('number-'+strr1.charAt(0));
		$('#yunjg').find('span').eq(2).addClass('number-'+strr1.charAt(1));
		$('#yunjg').find('span').eq(3).addClass('number-'+strr1.charAt(2));
		$('#yunjg').find('span').eq(4).addClass('number-'+strr1.charAt(3));
		$('#yunjg').find('span').eq(5).addClass('number-'+strr1.charAt(4));
		$('#yunjg').find('span').eq(6).addClass('number-'+strr1.charAt(5));
		$('#yunjg').find('span').eq(7).addClass('number-'+strr1.charAt(6));
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(7));
	}
	if(spo == 9){
		$('#yunjg').find('span').eq(0).addClass('number-'+strr1.charAt(0));
		$('#yunjg').find('span').eq(1).addClass('number-'+strr1.charAt(1));
		$('#yunjg').find('span').eq(2).addClass('number-'+strr1.charAt(2));
		$('#yunjg').find('span').eq(3).addClass('number-'+strr1.charAt(3));
		$('#yunjg').find('span').eq(4).addClass('number-'+strr1.charAt(4));
		$('#yunjg').find('span').eq(5).addClass('number-'+strr1.charAt(5));
		$('#yunjg').find('span').eq(6).addClass('number-'+strr1.charAt(6));
		$('#yunjg').find('span').eq(7).addClass('number-'+strr1.charAt(7));
		$('#yunjg').find('span').eq(8).addClass('number-'+strr1.charAt(8));
	}
	//这是对第二个数组进行判断的
	//当第二个数组存在的话   往后添加类名    如果不存在直接写number-0;
	if(strr2){
		$('#yunjg').find('span').eq(10).addClass('number-'+strr2.charAt(0));
		$('#yunjg').find('span').eq(11).addClass('number-'+strr2.charAt(1));
	}else{
		$('#yunjg').find('span').eq(10).addClass('number-0');
		$('#yunjg').find('span').eq(11).addClass('number-0');
	}
	
}

//这是网络的价格计算器
var wnum = 678.37;

wnumber(wnum);

/*
 * jgcss：这是对得到的钱数计算的方法
 * wnum：当前这个钱数
 */
function wnumber (wnum) {
	var wnum = wnum.toString();//把当前的值 转化为字符串
		numarr = wnum.split('.');//以小数点拆分成两个数组

	var spo = numarr[0].length;
	var strr1 = numarr[0],//这是第一个数组
		strr2 = numarr[1];//这是第二个数组
	
	//下面是对第一个数组的钱数进行判断的
	if(spo == 1){
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(0));
	}			
	if(spo == 2){
		$('#wangjg').find('span').eq(7).addClass('number-'+strr1.charAt(0));
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(1));
	}	
	if(spo == 3){
		$('#wangjg').find('span').eq(6).addClass('number-'+strr1.charAt(0));
		$('#wangjg').find('span').eq(7).addClass('number-'+strr1.charAt(1));
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(2));
	}
	if(spo == 4){
		$('#wangjg').find('span').eq(5).addClass('number-'+strr1.charAt(0));
		$('#wangjg').find('span').eq(6).addClass('number-'+strr1.charAt(1));
		$('#wangjg').find('span').eq(7).addClass('number-'+strr1.charAt(2));
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(3));
	}
	if(spo == 5){
		$('#wangjg').find('span').eq(4).addClass('number-'+strr1.charAt(0));
		$('#wangjg').find('span').eq(5).addClass('number-'+strr1.charAt(1));
		$('#wangjg').find('span').eq(6).addClass('number-'+strr1.charAt(2));
		$('#wangjg').find('span').eq(7).addClass('number-'+strr1.charAt(3));
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(4));
	}
	if(spo == 6){
		$('#wangjg').find('span').eq(3).addClass('number-'+strr1.charAt(0));
		$('#wangjg').find('span').eq(4).addClass('number-'+strr1.charAt(1));
		$('#wangjg').find('span').eq(5).addClass('number-'+strr1.charAt(2));
		$('#wangjg').find('span').eq(6).addClass('number-'+strr1.charAt(3));
		$('#wangjg').find('span').eq(7).addClass('number-'+strr1.charAt(4));
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(5));
	}
	if(spo == 7){
		$('#wangjg').find('span').eq(2).addClass('number-'+strr1.charAt(0));
		$('#wangjg').find('span').eq(3).addClass('number-'+strr1.charAt(1));
		$('#wangjg').find('span').eq(4).addClass('number-'+strr1.charAt(2));
		$('#wangjg').find('span').eq(5).addClass('number-'+strr1.charAt(3));
		$('#wangjg').find('span').eq(6).addClass('number-'+strr1.charAt(4));
		$('#wangjg').find('span').eq(7).addClass('number-'+strr1.charAt(5));
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(6));
	}
	if(spo == 8){
		$('#wangjg').find('span').eq(1).addClass('number-'+strr1.charAt(0));
		$('#wangjg').find('span').eq(2).addClass('number-'+strr1.charAt(1));
		$('#wangjg').find('span').eq(3).addClass('number-'+strr1.charAt(2));
		$('#wangjg').find('span').eq(4).addClass('number-'+strr1.charAt(3));
		$('#wangjg').find('span').eq(5).addClass('number-'+strr1.charAt(4));
		$('#wangjg').find('span').eq(6).addClass('number-'+strr1.charAt(5));
		$('#wangjg').find('span').eq(7).addClass('number-'+strr1.charAt(6));
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(7));
	}
	if(spo == 9){
		$('#wangjg').find('span').eq(0).addClass('number-'+strr1.charAt(0));
		$('#wangjg').find('span').eq(1).addClass('number-'+strr1.charAt(1));
		$('#wangjg').find('span').eq(2).addClass('number-'+strr1.charAt(2));
		$('#wangjg').find('span').eq(3).addClass('number-'+strr1.charAt(3));
		$('#wangjg').find('span').eq(4).addClass('number-'+strr1.charAt(4));
		$('#wangjg').find('span').eq(5).addClass('number-'+strr1.charAt(5));
		$('#wangjg').find('span').eq(6).addClass('number-'+strr1.charAt(6));
		$('#wangjg').find('span').eq(7).addClass('number-'+strr1.charAt(7));
		$('#wangjg').find('span').eq(8).addClass('number-'+strr1.charAt(8));
	}
	//这是对第二个数组进行判断的
	//当第二个数组存在的话   往后添加类名    如果不存在直接写number-0;
	if(strr2){
		$('#wangjg').find('span').eq(10).addClass('number-'+strr2.charAt(0));
		$('#wangjg').find('span').eq(11).addClass('number-'+strr2.charAt(1));
	}else{
		$('#wangjg').find('span').eq(10).addClass('number-0');
		$('#wangjg').find('span').eq(11).addClass('number-0');
	}
	
}


//云硬盘的价格计算器

var pnum = 456.89;

pnumber(pnum);

/*
 * jgcss：这是对得到的钱数计算的方法
 * wnum：当前这个钱数
 */
function pnumber (pnum) {
	var pnum = pnum.toString();//把当前的值 转化为字符串
		numarr = pnum.split('.');//以小数点拆分成两个数组

	var spo = numarr[0].length;
	var strr1 = numarr[0],//这是第一个数组
		strr2 = numarr[1];//这是第二个数组
	
	//下面是对第一个数组的钱数进行判断的
	if(spo == 1){
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(0));
	}			
	if(spo == 2){
		$('#panjg').find('span').eq(7).addClass('number-'+strr1.charAt(0));
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(1));
	}	
	if(spo == 3){
		$('#panjg').find('span').eq(6).addClass('number-'+strr1.charAt(0));
		$('#panjg').find('span').eq(7).addClass('number-'+strr1.charAt(1));
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(2));
	}
	if(spo == 4){
		$('#panjg').find('span').eq(5).addClass('number-'+strr1.charAt(0));
		$('#panjg').find('span').eq(6).addClass('number-'+strr1.charAt(1));
		$('#panjg').find('span').eq(7).addClass('number-'+strr1.charAt(2));
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(3));
	}
	if(spo == 5){
		$('#panjg').find('span').eq(4).addClass('number-'+strr1.charAt(0));
		$('#panjg').find('span').eq(5).addClass('number-'+strr1.charAt(1));
		$('#panjg').find('span').eq(6).addClass('number-'+strr1.charAt(2));
		$('#panjg').find('span').eq(7).addClass('number-'+strr1.charAt(3));
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(4));
	}
	if(spo == 6){
		$('#panjg').find('span').eq(3).addClass('number-'+strr1.charAt(0));
		$('#panjg').find('span').eq(4).addClass('number-'+strr1.charAt(1));
		$('#panjg').find('span').eq(5).addClass('number-'+strr1.charAt(2));
		$('#panjg').find('span').eq(6).addClass('number-'+strr1.charAt(3));
		$('#panjg').find('span').eq(7).addClass('number-'+strr1.charAt(4));
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(5));
	}
	if(spo == 7){
		$('#panjg').find('span').eq(2).addClass('number-'+strr1.charAt(0));
		$('#panjg').find('span').eq(3).addClass('number-'+strr1.charAt(1));
		$('#panjg').find('span').eq(4).addClass('number-'+strr1.charAt(2));
		$('#panjg').find('span').eq(5).addClass('number-'+strr1.charAt(3));
		$('#panjg').find('span').eq(6).addClass('number-'+strr1.charAt(4));
		$('#panjg').find('span').eq(7).addClass('number-'+strr1.charAt(5));
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(6));
	}
	if(spo == 8){
		$('#panjg').find('span').eq(1).addClass('number-'+strr1.charAt(0));
		$('#panjg').find('span').eq(2).addClass('number-'+strr1.charAt(1));
		$('#panjg').find('span').eq(3).addClass('number-'+strr1.charAt(2));
		$('#panjg').find('span').eq(4).addClass('number-'+strr1.charAt(3));
		$('#panjg').find('span').eq(5).addClass('number-'+strr1.charAt(4));
		$('#panjg').find('span').eq(6).addClass('number-'+strr1.charAt(5));
		$('#panjg').find('span').eq(7).addClass('number-'+strr1.charAt(6));
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(7));
	}
	if(spo == 9){
		$('#panjg').find('span').eq(0).addClass('number-'+strr1.charAt(0));
		$('#panjg').find('span').eq(1).addClass('number-'+strr1.charAt(1));
		$('#panjg').find('span').eq(2).addClass('number-'+strr1.charAt(2));
		$('#panjg').find('span').eq(3).addClass('number-'+strr1.charAt(3));
		$('#panjg').find('span').eq(4).addClass('number-'+strr1.charAt(4));
		$('#panjg').find('span').eq(5).addClass('number-'+strr1.charAt(5));
		$('#panjg').find('span').eq(6).addClass('number-'+strr1.charAt(6));
		$('#panjg').find('span').eq(7).addClass('number-'+strr1.charAt(7));
		$('#panjg').find('span').eq(8).addClass('number-'+strr1.charAt(8));
	}
	//这是对第二个数组进行判断的
	//当第二个数组存在的话   往后添加类名    如果不存在直接写number-0;
	if(strr2){
		$('#panjg').find('span').eq(10).addClass('number-'+strr2.charAt(0));
		$('#panjg').find('span').eq(11).addClass('number-'+strr2.charAt(1));
	}else{
		$('#panjg').find('span').eq(10).addClass('number-0');
		$('#panjg').find('span').eq(11).addClass('number-0');
	}
	
}
