var A = angular.module('myApp', []);
			A.controller('myAngular', ['$scope', '$filter', function($scope, $filter) {
				$scope.cpudataList = [ //仿造数据
					{
						name: '1核',						
						Gnum:[{gn:'1G',price:'10'},{gn:'2G',price:'20'},{gn:'4G',price:'40'}]
					},{
						name: '2核',
						Gnum:[{gn:'2G',price:'20'},{gn:'4G',price:'40'},{gn:'6G',price:'60'}]
					},{
						name: '3核',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},{
						name: '4核',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},{
						name: '5核',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},{
						name: '6核',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},{
						name: '7核',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},
				];
				$scope.dataInfo = [{gn:'1G',price:'10'},{gn:'2G',price:'20'},{gn:'4G',price:'40'}];
				//总价格的计算
				
				var oneshuju = 0.26;
//					$.ajax({
//						type:"get",
//						url:"",
//						async:true,
//						success:function (data) {
//							oneshuju = data.unitPrice;
//						}
//					});
				
				
//				$scope.allprice = 39;
				
					
					
					
//					angular.forEach($scope.dataList, function(data, index, array) {
//						data.price = data.num * data.oneprice;						
//							$scope.allprice += parseInt(data.price);
//						
//					})

//					return $scope.allprice;
				//往$scope 注入变量canprice 是cpu  and  neicun  的总价格
				$scope.canprice = 26; //这个地方写默认的1核1G的价格就行
				
				//改变cpu的核数的代码
				$scope.selectFun = function(i){
					$scope.dataInfo = $scope.cpudataList[i].Gnum;
					$('.js-select li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');					
					angular.forEach($scope.cpudataList,function (item,index) {
						if(i==index){
							$scope.canprice =$scope.cpudataList[i].Gnum[0].price;
						}
					})
					allPrices();
				}
				
				$scope.seleF =  function (i) {
					$('.js-selef li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这时候操作的是内存，所以循环遍历内存的数组（内存数组也一直在改变）--> code 57 line
					angular.forEach($scope.dataInfo,function (item,index) {
						if(i==index){
							$scope.canprice =$scope.dataInfo[i].price;
						}
					})
					allPrices();
				}
				
				
				
				//付费方式数据
				$scope.fufeitype_data = [ //仿造数据
					{
						mode:'包年包月',
						Gnum:[{time:'购置月底',price:'0.1'},{time:'1个月',price:'1'},{time:'2个月',price:'2'},{time:'3个月',price:'3'},{time:'4个月',price:'4'},{time:'5个月',price:'5'},{time:'6个月',price:'6'},{time:'7个月',price:'7'},{time:'8个月',price:'8'},{time:'9个月',price:'9'},{time:'1年',price:'10'},{time:'2年',price:'19'},{time:'3年',price:'27'}]
					},
					{
						mode:'按需',	
						Gnum:[]
					}
				];
				$scope.ffdetails_data=[{time:'购置月底',price:'5'},{time:'1个月',price:'1'},{time:'2个月',price:'2'},{time:'3个月',price:'3'},{time:'4个月',price:'4'},{time:'5个月',price:'5'},{time:'6个月',price:'6'},{time:'7个月',price:'7'},{time:'8个月',price:'8'},{time:'9个月',price:'9'},{time:'1年',price:'10'},{time:'2年',price:'19'},{time:'3年',price:'27'}];
				
				//往$scope 注入变量fftypeprice 是付费方式的价格
				$scope.fftypeprice = 1 ;  //这个地方写默认1 因为是默认是1个月
				
				$scope.selectFun_fufei = function(i){
					$scope.ffdetails_data = $scope.fufeitype_data[i].Gnum;
					$('.js-select-type li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这里要加判断
					if($scope.ffdetails_data == ""){
						$scope.fftypeprice = "0.5";
					}else{
						angular.forEach($scope.ffdetails_data,function (item,index) {
							if(i==index){
								// 这里要默认的是一个月的价格，所以索引为1
								//$scope.ffdetails_data[0] -->这个地方索引为0,不为1的原因是因为自己想法，不知道怎么解释
								$scope.fftypeprice =$scope.ffdetails_data[0].price;
							}
						})
					}					
					allPrices();
				}
				$scope.sele_ff_details =  function (i) {
					$('.js-ff-details li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这个时候操作的是包年包月详细的操作，所以循环遍历$scope.ffdetails_data这个数字，这个数组也一直在变
					angular.forEach($scope.ffdetails_data,function (item,index) {
						if(i==index){
							$scope.fftypeprice =$scope.ffdetails_data[i].price;
						}
					})
					allPrices();
				}
				
				function allPrices() {
					var $sele_ul_li = $('#jsSeleAll li');
					
					if($sele_ul_li.eq(0).hasClass('cur')){
//						var cpuandnc = $('#jsNcBox li').find('.sele-li').prop('data-pri')*1,
//							fftype = $('#jsFfBox li').find('.sele-li').prop('data-ff-pri')*1,
//							shujuqian = $('#bandwidthId').val()*1*0.26;
						var cpuandnc = $scope.canprice*1,
							fftype = $scope.fftypeprice*1,
							shujuqian = 26.26*1;
						
//						var Z = parseFloat((cpuandnc+fftype+shujuqian).toFixed(2));
						console.log((cpuandnc+shujuqian) * fftype.toFixed(2));
						return ynumber(12.34);
					}
					if($sele_ul_li.eq(1).hasClass('cur')){
						
						return;
					}
					if($sele_ul_li.eq(2).hasClass('cur')){
						
						return;
					}
				};	
				
				
				
				//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~```
				var genal={
	show:function(fn){			
		genal.sto();
		genal.ips();
		genal.hard();
	},
	sto:function(){
		var btn = $(".unfold:eq(0) .silbtn");
		var des = $(".unfold:eq(0) .des")
		var sil = 5000;
		var scrol = $(".unfold:eq(0) .round");
		var bar = $(".unfold:eq(0) .slider-selection");
		var slider = $(".unfold:eq(0) .slider");
		var mini = $(".unfold:eq(0) .mini");
		scrollbar.init(scrol,bar);
		scrollbar.assign(0,sil,0);
		var flag = false;
		slider.mousedown(function(e) {
			var track = $(".unfold:eq(0) .slider-track");
			var x = track.offset().left,px = e.pageX,w =parseInt(slider.css("width"));
			var a = px-x,per=0;
			if(a>0&&a<w){
				per = a/w;
			}else if(a<=0){
				per =0;
			}else if(a>=w){
				per =1;
			}
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,sil,0);
			flag = true;
		});
		slider.mouseup(function(e) {
			flag = false;
		});
		slider.mousemove(function(e) {
			var track = $(".unfold:eq(0) .slider-track");
			var x = track.offset().left,px = e.pageX,w =parseInt(slider.css("width"));
			var a = px-x,per=0;
			if(a>0&&a<w){
				per=a/w;
			}else if(a<=0){
				per=0;
			}else if(a>=w){
				per=1;
			}
			if(flag){				
				scrollbar.scro(scrol,bar,per);
				scrollbar.assign(per,sil,0);
			}
		});
	    mini.blur(function(){
			if(mini.val()>5000){
				mini.val(5000);
			}
			if(mini.val()<0){
				mini.val(0);
			}
			var per = mini.val()/5000;
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,sil,0);
		});
	},
	ips:function(){
		var scrol = $(".unfold:eq(1) .round");
		var bar = $(".unfold:eq(1) .slider-selection");
		var slider = $(".unfold:eq(1) .slider");
		var mini = $(".unfold:eq(1) .mini");
		var flag = false;
		scrollbar.init(scrol,bar);
		scrollbar.assign(0,300,1);
		slider.mousedown(function(e) {			
			var track = $(".unfold:eq(1) .slider-track");
			var x = track.offset().left,px = e.pageX,w =parseInt(slider.css("width"));
			var a = px-x,per=0;
			if(a>0&&a<w){
				per = a/w;
			}else if(a<=0){
				per =0;
			}else if(a>=w){
				per =1;
			}
			
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,300,1);
			flag = true;
		});
		slider.mouseup(function(e) {
			flag = false;
		});
		slider.mousemove(function(e) {
			
			var track = $(".unfold:eq(1) .slider-track");
			var x = track.offset().left,px = e.pageX,w =parseInt(slider.css("width"));
			var a = px-x,per=0;
			if(a>0&&a<w){
				per=a/w;
			}else if(a<=0){
				per=0;
			}else if(a>=w){
				per=1;
			}
			if(flag){
				scrollbar.scro(scrol,bar,per);
				scrollbar.assign(per,300,1);
			}
			
		});
		mini.blur(function(){
		
			if(mini.val()>300){
				mini.val(300);
			}
			if(mini.val()<0){
				mini.val(0);
			}
			var per = mini.val()/300;
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,300,1);
			
		});
		
	},
	hard:function(){
		var btn = $(".unfold:eq(2) .silbtn");
		var des = $(".unfold:eq(2) .des")
		var silHard = 5000;
		var scrol = $(".unfold:eq(2) .round");
		var bar = $(".unfold:eq(2) .slider-selection");
		var slider = $(".unfold:eq(2) .slider");
		var mini = $(".unfold:eq(2) .mini");
		scrollbar.init(scrol,bar);
		scrollbar.assign(0,silHard,2);
		var flag = false;
		slider.mousedown(function(e) {
			var track = $(".unfold:eq(2) .slider-track");
			var x = track.offset().left,px = e.pageX,w =parseInt(slider.css("width"));
			var a = px-x,per=0;
			if(a>0&&a<w){
				per = a/w;
			}else if(a<=0){
				per =0;
			}else if(a>=w){
				per =1;
			}
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,silHard,2);
			flag = true;
		    });
		slider.mouseup(function(e) {
			flag = false;
		    });
		slider.mousemove(function(e) {
			var track = $(".unfold:eq(2) .slider-track");
			var x = track.offset().left,px = e.pageX,w =parseInt(slider.css("width"));
			var a = px-x,per=0;
			if(a>0&&a<w){
				per=a/w;
			}else if(a<=0){
				per=0;
			}else if(a>=w){
				per=1;
			}
			if(flag){				
				scrollbar.scro(scrol,bar,per);
				scrollbar.assign(per,silHard,2);
			}
		});
	    mini.blur(function(){
			if(mini.val()>5000){
				mini.val(5000);
			}
			if(mini.val()<0){
				mini.val(0);
			}
			var per = mini.val()/5000;
			scrollbar.scro(scrol,bar,per);
			scrollbar.assign(per,silHard,2);
		});
	},
	
};
var scrollbar={
	
	init:function(scrol,bar,fn){
		bar.css("width","0%");
		scrol.css("left","0%");
	},
	scro:function(scrol,bar,per){
		bar.css("width",""+per*100+"%");
		scrol.css("left",""+per*100+"%");
	},
	assign:function(per,max,index){
		var pris = $(".unfold:eq("+index+") .price");
		var mini = $(".unfold:eq("+index+") .mini");
		if(index==0){		
			var price =Math.round(per*max);
			pris.children("div").remove();
			mini.val(price);
			/*if(price*10<100){
				pris.append("<div>¥<span>"+26+"</span>/月</div>");
				document.getElementById("bandwidthId").value="100";
			}else{
				pris.append("<div>¥<span>"+(price*2.6).toFixed(1)+"</span>/月</div>");
			}*/
		}
		if(index==1){		
			var price =Math.round(per*max);
			pris.children("div").remove();
			mini.val(price);
			/*if(price==0){
				pris.append("<div>¥<span>"+0+"</span>/月</div>");
			}
			if(price==1){
				pris.append("<div>¥<span>"+20+"</span>/月</div>");
			}
			if(price==2){
				pris.append("<div>¥<span>"+41+"</span>/月</div>");
			}
			if(price==3){
				pris.append("<div>¥<span>"+63+"</span>/月</div>");
			}
			if(price==4){
				pris.append("<div>¥<span>"+86+"</span>/月</div>");
			}
			if(price==5){
				pris.append("<div>¥<span>"+112+"</span>/月</div>");
			}
			if(price>5){
				pris.append("<div>¥<span>"+((price-5)*71+112)+"</span>/月</div>");
			}*/
		}
		if(index==2){			
			var price =Math.round(per*max);
			pris.children("div").remove();			
			mini.val(price);
		}
	
	}
}




//------------数字定位111111111111111
//这是云计算的价格计算器




/*
 * jgcss：这是对得到的钱数计算的方法
 * snum：当前这个钱数
 */
	var Yready = false;
		
		
	ynumber(26.26);  //必须放到变量ready后才行
function ynumber (snum) {
	var $jiageSpan = $('#yunjg').find('span');
	if(Yready){		
		for (var i=0;i<10;i++) {
			$jiageSpan.removeClass('number-'+i);
		}		
	}
	Yready = true;
	var snum = snum.toString();//把当前的值 转化为字符串
		numarr = snum.split('.');//以小数点拆分成两个数组
	
	var spo = numarr[0].length;
	var strr1 = numarr[0],//这是第一个数组
		strr2 = numarr[1];//这是第二个数组
	
	//下面是对第一个数组的钱数进行判断的
	if(spo == 1){
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(0));
	}			
	if(spo == 2){
		$jiageSpan.eq(7).addClass('number-'+strr1.charAt(0));
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(1));
	}	
	if(spo == 3){
		$jiageSpan.eq(6).addClass('number-'+strr1.charAt(0));
		$jiageSpan.eq(7).addClass('number-'+strr1.charAt(1));
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(2));
	}
	if(spo == 4){		
		$jiageSpan.eq(5).addClass('number-'+strr1.charAt(0));
		$jiageSpan.eq(6).addClass('number-'+strr1.charAt(1));
		$jiageSpan.eq(7).addClass('number-'+strr1.charAt(2));
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(3));
	}
	if(spo == 5){
		
		$jiageSpan.eq(4).addClass('number-'+strr1.charAt(0));
		$jiageSpan.eq(5).addClass('number-'+strr1.charAt(1));
		$jiageSpan.eq(6).addClass('number-'+strr1.charAt(2));
		$jiageSpan.eq(7).addClass('number-'+strr1.charAt(3));
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(4));
	}
	if(spo == 6){
		$jiageSpan.eq(3).addClass('number-'+strr1.charAt(0));
		$jiageSpan.eq(4).addClass('number-'+strr1.charAt(1));
		$jiageSpan.eq(5).addClass('number-'+strr1.charAt(2));
		$jiageSpan.eq(6).addClass('number-'+strr1.charAt(3));
		$jiageSpan.eq(7).addClass('number-'+strr1.charAt(4));
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(5));
	}
	if(spo == 7){
		$jiageSpan.eq(2).addClass('number-'+strr1.charAt(0));
		$jiageSpan.eq(3).addClass('number-'+strr1.charAt(1));
		$jiageSpan.eq(4).addClass('number-'+strr1.charAt(2));
		$jiageSpan.eq(5).addClass('number-'+strr1.charAt(3));
		$jiageSpan.eq(6).addClass('number-'+strr1.charAt(4));
		$jiageSpan.eq(7).addClass('number-'+strr1.charAt(5));
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(6));
	}
	if(spo == 8){
		$jiageSpan.eq(1).addClass('number-'+strr1.charAt(0));
		$jiageSpan.eq(2).addClass('number-'+strr1.charAt(1));
		$jiageSpan.eq(3).addClass('number-'+strr1.charAt(2));
		$jiageSpan.eq(4).addClass('number-'+strr1.charAt(3));
		$jiageSpan.eq(5).addClass('number-'+strr1.charAt(4));
		$jiageSpan.eq(6).addClass('number-'+strr1.charAt(5));
		$jiageSpan.eq(7).addClass('number-'+strr1.charAt(6));
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(7));
	}
	if(spo == 9){
		$jiageSpan.eq(0).addClass('number-'+strr1.charAt(0));
		$jiageSpan.eq(1).addClass('number-'+strr1.charAt(1));
		$jiageSpan.eq(2).addClass('number-'+strr1.charAt(2));
		$jiageSpan.eq(3).addClass('number-'+strr1.charAt(3));
		$jiageSpan.eq(4).addClass('number-'+strr1.charAt(4));
		$jiageSpan.eq(5).addClass('number-'+strr1.charAt(5));
		$jiageSpan.eq(6).addClass('number-'+strr1.charAt(6));
		$jiageSpan.eq(7).addClass('number-'+strr1.charAt(7));
		$jiageSpan.eq(8).addClass('number-'+strr1.charAt(8));
	}
	//这是对第二个数组进行判断的
	//当第二个数组存在的话   往后添加类名    如果不存在直接写number-0;
	if(strr2){
		$jiageSpan.eq(10).addClass('number-'+strr2.charAt(0));
		$jiageSpan.eq(11).addClass('number-'+strr2.charAt(1));
	}else{
		$jiageSpan.eq(10).addClass('number-0');
		$jiageSpan.eq(11).addClass('number-0');
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

//这是负载均衡的计算器

var fnum = 478.78;

fnumber(fnum);

/*
 * jgcss：这是对得到的钱数计算的方法
 * wnum：当前这个钱数
 */
function fnumber (fnum) {
	var fnum = fnum.toString();//把当前的值 转化为字符串
		numarr = fnum.split('.');//以小数点拆分成两个数组

	var spo = numarr[0].length;
	var strr1 = numarr[0],//这是第一个数组
		strr2 = numarr[1];//这是第二个数组
	
	//下面是对第一个数组的钱数进行判断的
	if(spo == 1){
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(0));
	}			
	if(spo == 2){
		$('#fujg').find('span').eq(7).addClass('number-'+strr1.charAt(0));
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(1));
	}	
	if(spo == 3){
		$('#fujg').find('span').eq(6).addClass('number-'+strr1.charAt(0));
		$('#fujg').find('span').eq(7).addClass('number-'+strr1.charAt(1));
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(2));
	}
	if(spo == 4){
		$('#fujg').find('span').eq(5).addClass('number-'+strr1.charAt(0));
		$('#fujg').find('span').eq(6).addClass('number-'+strr1.charAt(1));
		$('#fujg').find('span').eq(7).addClass('number-'+strr1.charAt(2));
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(3));
	}
	if(spo == 5){
		$('#fujg').find('span').eq(4).addClass('number-'+strr1.charAt(0));
		$('#fujg').find('span').eq(5).addClass('number-'+strr1.charAt(1));
		$('#fujg').find('span').eq(6).addClass('number-'+strr1.charAt(2));
		$('#fujg').find('span').eq(7).addClass('number-'+strr1.charAt(3));
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(4));
	}
	if(spo == 6){
		$('#fujg').find('span').eq(3).addClass('number-'+strr1.charAt(0));
		$('#fujg').find('span').eq(4).addClass('number-'+strr1.charAt(1));
		$('#fujg').find('span').eq(5).addClass('number-'+strr1.charAt(2));
		$('#fujg').find('span').eq(6).addClass('number-'+strr1.charAt(3));
		$('#fujg').find('span').eq(7).addClass('number-'+strr1.charAt(4));
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(5));
	}
	if(spo == 7){
		$('#fujg').find('span').eq(2).addClass('number-'+strr1.charAt(0));
		$('#fujg').find('span').eq(3).addClass('number-'+strr1.charAt(1));
		$('#fujg').find('span').eq(4).addClass('number-'+strr1.charAt(2));
		$('#fujg').find('span').eq(5).addClass('number-'+strr1.charAt(3));
		$('#fujg').find('span').eq(6).addClass('number-'+strr1.charAt(4));
		$('#fujg').find('span').eq(7).addClass('number-'+strr1.charAt(5));
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(6));
	}
	if(spo == 8){
		$('#fujg').find('span').eq(1).addClass('number-'+strr1.charAt(0));
		$('#fujg').find('span').eq(2).addClass('number-'+strr1.charAt(1));
		$('#fujg').find('span').eq(3).addClass('number-'+strr1.charAt(2));
		$('#fujg').find('span').eq(4).addClass('number-'+strr1.charAt(3));
		$('#fujg').find('span').eq(5).addClass('number-'+strr1.charAt(4));
		$('#fujg').find('span').eq(6).addClass('number-'+strr1.charAt(5));
		$('#fujg').find('span').eq(7).addClass('number-'+strr1.charAt(6));
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(7));
	}
	if(spo == 9){
		$('#fujg').find('span').eq(0).addClass('number-'+strr1.charAt(0));
		$('#fujg').find('span').eq(1).addClass('number-'+strr1.charAt(1));
		$('#fujg').find('span').eq(2).addClass('number-'+strr1.charAt(2));
		$('#fujg').find('span').eq(3).addClass('number-'+strr1.charAt(3));
		$('#fujg').find('span').eq(4).addClass('number-'+strr1.charAt(4));
		$('#fujg').find('span').eq(5).addClass('number-'+strr1.charAt(5));
		$('#fujg').find('span').eq(6).addClass('number-'+strr1.charAt(6));
		$('#fujg').find('span').eq(7).addClass('number-'+strr1.charAt(7));
		$('#fujg').find('span').eq(8).addClass('number-'+strr1.charAt(8));
	}
	//这是对第二个数组进行判断的
	//当第二个数组存在的话   往后添加类名    如果不存在直接写number-0;
	if(strr2){
		$('#fujg').find('span').eq(10).addClass('number-'+strr2.charAt(0));
		$('#fujg').find('span').eq(11).addClass('number-'+strr2.charAt(1));
	}else{
		$('#fujg').find('span').eq(10).addClass('number-0');
		$('#fujg').find('span').eq(11).addClass('number-0');
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
				
				
				
				
				
				
				
				
			}])