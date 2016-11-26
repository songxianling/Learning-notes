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
				
				//
				$scope.yjsallP = 26;
				function allPrices() {
					var $sele_ul_li = $('#jsSeleAll li');					
					if($sele_ul_li.eq(0).hasClass('cur')){
						var cpuandnc = $scope.canprice*1,
							fftype = $scope.fftypeprice*1,
							yjsInp = $('#bandwidthId').val()*1;
							shujuqian = 26.26*yjsInp;  //这个26.26是从后台获取的数据盘1G的价格						
						var yunallZ = parseFloat((cpuandnc+shujuqian) * fftype.toFixed(2));
						$scope.yjsallP = yunallZ;
						return ynumber(yunallZ);
					}
					if($sele_ul_li.eq(1).hasClass('cur')){
						
						return;
					}
					if($sele_ul_li.eq(2).hasClass('cur')){
						
						return;
					}
				};
$scope.genal={
	show:function(fn){		
		$scope.genal.sto();
		$scope.genal.ips();
		$scope.genal.hard();
	},
	sto:function(){
		var btn = $(".unfold:eq(0) .silbtn");
		var des = $(".unfold:eq(0) .des")
		var sil = 5000;
		var scrol = $(".unfold:eq(0) .round");
		var bar = $(".unfold:eq(0) .slider-selection");
		var slider = $(".unfold:eq(0) .slider");
		var mini = $(".unfold:eq(0) .mini");
		$scope.scrollbar.init(scrol,bar);
		$scope.scrollbar.assign(0,sil,0);
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
			$scope.scrollbar.scro(scrol,bar,per);
			$scope.scrollbar.assign(per,sil,0);
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
				$scope.scrollbar.scro(scrol,bar,per);
				$scope.scrollbar.assign(per,sil,0);
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
			$scope.scrollbar.scro(scrol,bar,per);
			$scope.scrollbar.assign(per,sil,0);
		});
	},
	ips:function(){
		var scrol = $(".unfold:eq(1) .round");
		var bar = $(".unfold:eq(1) .slider-selection");
		var slider = $(".unfold:eq(1) .slider");
		var mini = $(".unfold:eq(1) .mini");
		var flag = false;
		$scope.scrollbar.init(scrol,bar);
		$scope.scrollbar.assign(0,300,1);
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
			
			$scope.scrollbar.scro(scrol,bar,per);
			$scope.scrollbar.assign(per,300,1);
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
				$scope.scrollbar.scro(scrol,bar,per);
				$scope.scrollbar.assign(per,300,1);
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
			$scope.scrollbar.scro(scrol,bar,per);
			$scope.scrollbar.assign(per,300,1);
			
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
		$scope.scrollbar.init(scrol,bar);
		$scope.scrollbar.assign(0,silHard,2);
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
			$scope.scrollbar.scro(scrol,bar,per);
			$scope.scrollbar.assign(per,silHard,2);
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
				$scope.scrollbar.scro(scrol,bar,per);
				$scope.scrollbar.assign(per,silHard,2);
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
			$scope.scrollbar.scro(scrol,bar,per);
			$scope.scrollbar.assign(per,silHard,2);
		});
	},
	
};

$scope.scrollbar={
	
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
			mini.attr('value',price);
			allPrices();
//			var controllerScope =  $('div[ng-controller="myAngular"]').scope().fftypeprice;
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

	$scope.genal.show();
	
	
	var Yready = false;				
	ynumber(26.26);  //必须放到变量ready后才行
function ynumber (snum) {
	console.log(snum);
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



// 修改价格清单里面的总价格的值
	function totalPeice() {
		var sum = 0;
		$('.jsJG').each(function () {
			sum +=$(this).html()*1;
		})
		$jgqd.html(sum.toFixed(2));
		
	};
	
	/*
	 * 每个类型价格的总价计算
	 * obj ->让谁变，就传谁
	 * eaf ->类型对于的小计的类名
	 */
	function typePeice (obj,eaf) {

		var o = 0;
		eaf.each(function () {
		
			
			o +=$(this).html()*1;
		});
		obj.html("￥"+o.toFixed(2));
	}
	
	var $rightBox = $('.price_right');
	
	/*云主机点击加入清单*/
	var $Yjsjion=$('#Yjsjion'), //增加的按键
		$jgqd = $('#jsJgqd'),  //价格清单价格元素
		$type_yzj = $('#js_type_yzj'), //类型小计的总钱数
		$yzj_evone;
	 $Yjsjion.click(function  () {
	 	$('#js_yjz_slide_box').append('<div class="qd_xiaoji_box" de="1">'+
	 										'<span>￥</span><span class="qd_xiaoji js_yzj_evone">'+$scope.yjsallP+'</span><span> > </span>'+
	 									'</div>');
	 	$('#js_yjz_slide_box').append('<li class="right_three" id="right_three" style="display:none">'+
						'<p>云主机</p>'+
						'<p><span class="jsJG">'+$scope.yjsallP+'</span>元</p>'+
						'<p><span>地域 :</span><span>'+$('#jsQyBoxOne .sele-li').html()+'</span></p>'+
						'<div>'+
							'<div>配置 :</div>'+
							'<div>'+
								'<span>CPU:</span><span>'+$('#jsCpuBox .sele-li').html()+'</span>'+'    '+
								'<span>内存:</span><span>'+$('#jsNcBox .sele-li').html()+'</span>'+'    '+
								'<span>镜像:</span><span>'+$('#jsJxBox .sele-li').html()+'</span>'+'    '+
								'<span>数据盘 :</span><span></span>'+'    '+
								'<span>数量 :</span><span>'+$('#jsTsBox').val()+'台'+'</span>'+'    '+
								'<span>付费方式 :</span><span>'+$('#jsFfBox .sele-li').html()+'</span>'+
							'</div>'+
							
						'</div>'+
						'<div class="shop_delete">'+			
							'<a href="javascript:;" title="删除" ><img src="images/delete.png" class="delete" dele-type="1"/></a>'+						
							'<a href="javascript:;" title="去购买"><img src="images/shop.png" alt="" /></a>'+										
						'</div>'+
					'</li>');		
		totalPeice();
		$yzj_evone = $('.js_yzj_evone');
		
		typePeice($type_yzj,$yzj_evone);
	 });
	 
	 
	var $qdul = $('.js-qdul');
	var ok = true,
		timedow  = null;
	$qdul.on('click',function () {
		clearInterval(timedow);
		if(ok){
			ok = false;			
			var _this = $(this);
			_this.next('div').slideToggle(500);
		}		
		timedow = setInterval(function () {
			ok = true;
		},500)
	});	
	$rightBox.on('click','.qd_xiaoji_box',function () {
		var _this = $(this);
		_this.next('li').slideToggle(500);
	});	
	






				
				
				
}])
