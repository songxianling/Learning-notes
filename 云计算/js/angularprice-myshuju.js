var A = angular.module('myApp', []);
			A.controller('myAngular', ['$scope', '$http', function($scope, $http) {
				
				//从这里开始是angular的请求	
				function ngAxjx(ngHttp,ngUrl,ngData,callData){
					ngUrl = ngUrl+'?callback=JSON_CALLBACK';
				ngHttp.jsonp(ngUrl, {params:ngData}).success(function (json){
					$scope[callData] = json;
				}).error(function (){
					console.log('失败了');
					});
				
				};
								
				var data ={};
			
				$scope.cpudataList = "";
				//这是cpu 内存；
				var ngurl_cpu = 'http://cms.docker.sspaas.net/querydata/queryCpuAndRamTypePriceList';
				ngAxjx($http,ngurl_cpu,data,'cpudataList');
				$scope.dataInfo = [{gn:'1',price:'39'},{gn:'2',price:'73'},{gn:'4',price:'127'}];

				//往$scope 注入变量cpuprice 是cpu  and  neicun  的总价格
				$scope.cpuprice = 39; //这个地方写默认的1核1G的价格就行
				
				//多注入几个变量，分别代表不同的配置的变量
				$scope.ncNum = '1G';
				$scope.hNum = '1核';
				$scope.dqNum = '北京';
				$scope.jxNum = 'Linux';				
				$scope.sjpNum = '0G';
				$scope.ffNum = '1个月';
				
				$scope.op='北京';
				
				$scope.ffNum_wl = '1个月';
				
				$scope.ffNum_yyp = '1个月';
				//改变cpu的核数的代码
				$scope.selectFun = function(i){
					$scope.dataInfo = $scope.cpudataList[i].gnum;
					// 核数的效果class切换
					$scope.hNum = $scope.cpudataList[i].cpuName;
					$('.js-select li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');					
					angular.forEach($scope.cpudataList,function (item,index) {
						if(i==index){
							$scope.cpuprice =$scope.cpudataList[i].gnum[0].price;
						}
					})
					
					allPrices();
				};
			
				$scope.seleF =  function (i) {
					$('.js-selef li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这时候操作的是内存G，所以循环遍历内存的数组（内存数组也一直在改变）--> code 57 line
					$scope.ncNum = $scope.dataInfo[i].gn;
					angular.forEach($scope.dataInfo,function (item,index) {
						if(i==index){
							$scope.cpuprice =$scope.dataInfo[i].price;
						}
					})
					allPrices();
				};
				
				var removeNumSpan = false;
				
				//云主机付费方式数据
				$scope.fufeitype_data = "";
				//这个付费方式的
				var ngurl_ff = 'http://cms.docker.sspaas.net/querydata/queryPayTypeList';
				ngAxjx($http,ngurl_ff,data,'fufeitype_data');
				$scope.ffdetails_data=[{payTime:'购置月底',price:'.1'},{payTime:'1个月',price:'1'},{payTime:'2个月',price:'2'},{payTime:'3个月',price:'3'},{payTime:'4个月',price:'4'},{payTime:'5个月',price:'5'},{payTime:'6个月',price:'6'},{payTime:'7个月',price:'7'},{payTime:'8个月',price:'8'},{payTime:'9个月',price:'9'},{payTime:'1年',price:'10'},{payTime:'2年',price:'19'},{payTime:'3年',price:'27'}];
				
				//网络付费方式数据
				$scope.fufeitype_data_wl = '';
				ngAxjx($http,ngurl_ff,data,'fufeitype_data_wl');
				$scope.ffdetails_data_wl=[{payTime:'购置月底',price:'.1'},{payTime:'1个月',price:'1'},{payTime:'2个月',price:'2'},{payTime:'3个月',price:'3'},{payTime:'4个月',price:'4'},{payTime:'5个月',price:'5'},{payTime:'6个月',price:'6'},{payTime:'7个月',price:'7'},{payTime:'8个月',price:'8'},{payTime:'9个月',price:'9'},{payTime:'1年',price:'10'},{payTime:'2年',price:'19'},{payTime:'3年',price:'27'}];
				
				
				//云硬盘付费方式数据
				$scope.fufeitype_data_yyp = '';
				ngAxjx($http,ngurl_ff,data,'fufeitype_data_yyp');
				$scope.ffdetails_data_yyp=[{payTime:'购置月底',price:'.1'},{payTime:'1个月',price:'1'},{payTime:'2个月',price:'2'},{payTime:'3个月',price:'3'},{payTime:'4个月',price:'4'},{payTime:'5个月',price:'5'},{payTime:'6个月',price:'6'},{payTime:'7个月',price:'7'},{payTime:'8个月',price:'8'},{payTime:'9个月',price:'9'},{payTime:'1年',price:'10'},{payTime:'2年',price:'19'},{payTime:'3年',price:'27'}];
				
				
				
				
				//（云主机的付费方式有包年包月和按需）往$scope 注入变量fftypeprice 是付费方式的价格;
				$scope.fftypeprice = 1 ;  //这个地方写默认1 因为是默认是1个月
				
				$scope.selectFun_fufei = function(i){
					removeNumSpan = true;
					$scope.ffdetails_data = $scope.fufeitype_data[i].gnum;
					console.log($scope.ffdetails_data);
					$('.js-select-type li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这里要加判断					
					if($scope.ffdetails_data.length == 1){
						$scope.fftypeprice = $scope.ffdetails_data[0].price;
						
						$('.js-ff-details li').attr('class','sele-li');
					}else{
						angular.forEach($scope.ffdetails_data,function (item,index) {
							if(i==index){
								// 这里要默认的是一个月的价格，所以索引为1
								//$scope.ffdetails_data[1] -->这个地方索引为1
								$scope.fftypeprice =$scope.ffdetails_data[1].price;
							}
						})
					}					
					allPrices();
				};
				
				//网络付费方式操作（包年包月or按需）
				$scope.fftypeprice_wl = 1;
				$scope.selectFun_fufei_wl = function(i){
					removeNumSpan = true;			  
					$scope.ffdetails_data_wl = $scope.fufeitype_data_wl[i].gnum;
					$('.js-select-type-wl li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这里要加判断					
					if($scope.ffdetails_data_wl.length == 1){
						$scope.fftypeprice_wl = $scope.ffdetails_data_wl[0].price;						
						$('.js-ff-details-wl li').attr('class','sele-li');
					}else{
						angular.forEach($scope.ffdetails_data_wl,function (item,index) {
							if(i==index){
								// 这里要默认的是一个月的价格，所以索引为1
								//$scope.ffdetails_data[1] -->这个地方索引为1
								$scope.fftypeprice_wl =$scope.ffdetails_data_wl[1].price;
							}
						})
					}					
					allPrices();
				};
				
				//云硬盘的付费方式的操作（包年or按需）
				$scope.fftypeprice_yyp = 1;
				$scope.selectFun_fufei_yyp=function(i){
					removeNumSpan = true;
					$scope.ffdetails_data_yyp = $scope.fufeitype_data_yyp[i].gnum;
					$('.js-select-type-yyp li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这里是按需的判断
					if($scope.ffdetails_data_yyp.length==1){
						$scope.fftypeprice_yyp = $scope.ffdetails_data_yyp[0].price;	
						$('.js-ff-details-yyp li').attr('class','sele-li');
					}else{
						angular.forEach($scope.ffdetails_data_yyp,function(item,index) {
							if(i==index){
								// 这里要默认的是一个月的价格，所以索引为1
								//$scope.ffdetails_data[1] -->这个地方索引为1
								$scope.fftypeprice_yyp =$scope.ffdetails_data_yyp[1].price;
							}
						})
					}
					allPrices();
				};
				
			
				//云主机包年包月详细的操作
				$scope.sele_ff_details =  function (i) {
					$('.js-ff-details li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这个时候操作的是包年包月详细的操作，所以循环遍历$scope.ffdetails_data这个数字，这个数组也一直在变
					$scope.ffNum = $scope.ffdetails_data[i].time;					
					
					angular.forEach($scope.ffdetails_data,function (item,index) {
						if(i==index){
							$scope.fftypeprice =$scope.ffdetails_data[i].price;
						}
					})
					allPrices();
				}
				
				//网络付费方式操作（几个月）
				$scope.sele_ff_details_wl =  function (i) {
					$('.js-ff-details-wl li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
					//这个时候操作的是包年包月详细的操作，所以循环遍历$scope.ffdetails_data这个数字，这个数组也一直在变
					$scope.ffNum_wl = $scope.ffdetails_data_wl[i].time;					
					
					angular.forEach($scope.ffdetails_data_wl,function (item,index) {
						if(i==index){
							$scope.fftypeprice_wl =$scope.ffdetails_data_wl[i].price;
						}
					})
					allPrices();
				}
				
				//云硬盘详细的付费方式
				 $scope.sele_ff_details_yyp=function(i) {
				 	$('.js-ff-details-yyp li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
				 	$scope.ffNum_yyp = $scope.ffdetails_data[i].time;
				 	
				 	angular.forEach($scope.ffdetails_data_yyp,function (item,index) {
						if(i==index){
							$scope.fftypeprice_yyp =$scope.ffdetails_data_yyp[i].price;
						}
					})
					allPrices();
				 }	
				 
				// 带宽1----------5的价格
				var oneP_1,oneP_2,oneP_3,oneP_4,oneP_5,oneP_6,oneP_6_detail;
				 
				 
				 
				$scope.daidprice = '';
				var ngurl_dd = 'http://cms.docker.sspaas.net/querydata/queryIPBroadBandPriceList';
				ngAxjx($http,ngurl_dd,data,'daidprice');
				//这是三个模块的切换
				var $seleAll = $('#jsSeleAll'),
						$yzjBox = $('#jsYjsOuterBox'),		
						$wlBox=$('#jsWlOuterBox'),
						$yypBox=$('#jsYypOuterBox'),
						
						$left_con=$('.left_con'),
						$sele_con = $('#js-selebox>div');
				$seleAll.on('click','li',function () {	
					ngAxjx($http,ngurl_dd,data,'daidprice');
					angular.forEach($scope.daidprice,function (item,index) {
						if(0==index){
							 oneP_1 = item['1']['minIpBroadBandPrice'];
							 oneP_2 = item['2']['minIpBroadBandPrice'];
							 oneP_3 = item['3']['minIpBroadBandPrice'];
							 oneP_4 = item['4']['minIpBroadBandPrice'];
							 oneP_5 = item['5']['minIpBroadBandPrice'];							 
							 oneP_6 = item['6']['minIpBroadBandPrice'];
							 oneP_6_detail = item['6']['growRate'];
							
//							$scope.fftypeprice_yyp =$scope.ffdetails_data_yyp[i].price;
						}
					})
					var _this = $(this);
					_this.addClass('cur').siblings().removeClass('cur');
					$sele_con.eq(_this.index()).show().siblings().hide();				
				});							
				 
				 
				 
				 
				// 这个$scope身上注入的变量是为了，不进行任何操作，直接点击加入清单的需求,26的作用不大，写多少都不影响加入清单里面的价格，因为默认执行了allPrices
				$scope.yjsallP = 39;
				$scope.wlallP=37;//这是网络中  不做任何的操作的 网清单里加的钱数这个是默认值
				$scope.yypallP=73;
				// 这个$scope身上注入的变量是为了，不进行台数的任何操作，默认是1台
				$scope.Tnum = 1;//云主机的默认台数
				$scope.Tnum_wl = 1;//网络的默认台数
				$scope.Tnum_yyp = 1;//网络的默认台数
				function allPrices() {				
					var $sele_ul_li = $('#jsSeleAll li');					
					if($sele_ul_li.eq(0).hasClass('cur')){
						var cpuandnc = $scope.cpuprice*1,
							fftype = $scope.fftypeprice*1,
							Tnum = $scope.Tnum*1,
							yjsInp = $('#bandwidthId').val()*1;
							shujuqian = 0.26*yjsInp;  //这个26.26是从后台获取的数据盘1G的价格						
						var yunallZ = parseFloat((cpuandnc + shujuqian) * fftype * Tnum.toFixed(2));
						$scope.yjsallP = yunallZ.toFixed(2);
						return ynumber(yunallZ);
					}
					if($sele_ul_li.eq(1).hasClass('cur')){
						var fftype_wl = $scope.fftypeprice_wl*1,
							Tnum_wl = $scope.Tnum_wl*1,
							Inp_wl = $('#js-band-wl-inp').val()*1,
							dkzong;
						if(Inp_wl == 1){
							dkzong = oneP_1;							
						}else if(Inp_wl == 2){
							dkzong = oneP_2;
						}else if(Inp_wl == 3){
							dkzong = oneP_3;
						}else if(Inp_wl == 4){
							dkzong = oneP_4;
						}else if(Inp_wl == 5){
							dkzong = oneP_5;
						}else{
							dkzong = oneP_6*1 + (Inp_wl-5) * oneP_6_detail;
						}
						
						var wangallZ = parseFloat(dkzong * fftype_wl * Tnum_wl.toFixed(2));
//						console.log(fftype_wl,Tnum_wl,Inp_wl,dkzong)
						$scope.wlallP = wangallZ.toFixed(2);
						return wnumber(wangallZ);
						
					}
					if($sele_ul_li.eq(2).hasClass('cur')){
						var fftype_yyp=$scope.fftypeprice_yyp*1,
							Tnum_yyp = $scope.Tnum_yyp*1,
							Inp_yyp = $('#js-band-yyp-inp').val()*1;
							shujuqian_yyp = 26.26*Inp_yyp;  //这个26.26是从后台获取的数据盘1G的价格		
						var yypallZ = parseFloat(shujuqian_yyp * fftype_yyp * Tnum_yyp.toFixed(2));
						
						$scope.yypallP = yypallZ.toFixed(2);
						return pnumber(yypallZ);
					}
				};
				
//这是每个页面的滚动条的方法;				
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
		$scope.scrollbar.assign(1,1,1);
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
			if(mini.val()<1){
				mini.val(1);
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
			var price =Math.ceil(per*max);
			pris.children("div").remove();			
			mini.attr('value',price);
			$scope.sjpNum = price;
			allPrices();

		}
		if(index==1){
			var price =Math.round(per*max);
			pris.children("div").remove();
			mini.attr('value',price);
			console.log(mini.val())
			$scope.dkNum = price;
			allPrices();
			
		}
		if(index==2){			
			var price =Math.round(per*max);
			pris.children("div").remove();			
			mini.attr('value',price);
			$scope.cpNum = price;
			allPrices();
			console.log(mini.val())
		}
	
	}
}
//这是上面定义的方法  在这里执行的;
	$scope.genal.show();
	
//从这里开始是关于每个模块计算器里面的需求;
 //这是云主机的;
	var Yready = false;				
	ynumber(39.00);  //必须放到变量ready后才行
function ynumber (snum) {
	snum = snum.toFixed(2);
	var $jiageSpan = $('#yunjg').find('span');

	for (var i=0;i<10;i++) {
			$jiageSpan.removeClass('number-'+i);
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

//这是网络的；
//这是网络的价格计算器

/*
 * jgcss：这是对得到的钱数计算的方法
 * wnum：当前这个钱数
 */

var Wready=false;
wnumber(37);
function wnumber (wnum) {
	wnum = wnum.toFixed(2);
	var $jiageWang=$('#wangjg').find('span');
	for(var i=0;i<10;i++){
			$jiageWang.removeClass('number-'+i);
		}
	Wready=true;
	
	var wnum = wnum.toString();//把当前的值 转化为字符串
		numarr = wnum.split('.');//以小数点拆分成两个数组

	var spo = numarr[0].length;
	var strr1 = numarr[0],//这是第一个数组
		strr2 = numarr[1];//这是第二个数组
	
	//下面是对第一个数组的钱数进行判断的
	if(spo == 1){
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(0));
	}			
	if(spo == 2){
		$jiageWang.eq(7).addClass('number-'+strr1.charAt(0));
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(1));
	}	
	if(spo == 3){
		$jiageWang.eq(6).addClass('number-'+strr1.charAt(0));
		$jiageWang.eq(7).addClass('number-'+strr1.charAt(1));
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(2));
	}
	if(spo == 4){
		$jiageWang.eq(5).addClass('number-'+strr1.charAt(0));
		$jiageWang.eq(6).addClass('number-'+strr1.charAt(1));
		$jiageWang.eq(7).addClass('number-'+strr1.charAt(2));
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(3));
	}
	if(spo == 5){
		$jiageWang.eq(4).addClass('number-'+strr1.charAt(0));
		$jiageWang.eq(5).addClass('number-'+strr1.charAt(1));
		$jiageWang.eq(6).addClass('number-'+strr1.charAt(2));
		$jiageWang.eq(7).addClass('number-'+strr1.charAt(3));
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(4));
	}
	if(spo == 6){
		$jiageWang.eq(3).addClass('number-'+strr1.charAt(0));
		$jiageWang.eq(4).addClass('number-'+strr1.charAt(1));
		$jiageWang.eq(5).addClass('number-'+strr1.charAt(2));
		$jiageWang.eq(6).addClass('number-'+strr1.charAt(3));
		$jiageWang.eq(7).addClass('number-'+strr1.charAt(4));
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(5));
	}
	if(spo == 7){
		$jiageWang.eq(2).addClass('number-'+strr1.charAt(0));
		$jiageWang.eq(3).addClass('number-'+strr1.charAt(1));
		$jiageWang.eq(4).addClass('number-'+strr1.charAt(2));
		$jiageWang.eq(5).addClass('number-'+strr1.charAt(3));
		$jiageWang.eq(6).addClass('number-'+strr1.charAt(4));
		$jiageWang.eq(7).addClass('number-'+strr1.charAt(5));
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(6));
	}
	if(spo == 8){
		$jiageWang.eq(1).addClass('number-'+strr1.charAt(0));
		$jiageWang.eq(2).addClass('number-'+strr1.charAt(1));
		$jiageWang.eq(3).addClass('number-'+strr1.charAt(2));
		$jiageWang.eq(4).addClass('number-'+strr1.charAt(3));
		$jiageWang.eq(5).addClass('number-'+strr1.charAt(4));
		$jiageWang.eq(6).addClass('number-'+strr1.charAt(5));
		$jiageWang.eq(7).addClass('number-'+strr1.charAt(6));
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(7));
	}
	if(spo == 9){
		$jiageWang.eq(0).addClass('number-'+strr1.charAt(0));
		$jiageWang.eq(1).addClass('number-'+strr1.charAt(1));
		$jiageWang.eq(2).addClass('number-'+strr1.charAt(2));
		$jiageWang.eq(3).addClass('number-'+strr1.charAt(3));
		$jiageWang.eq(4).addClass('number-'+strr1.charAt(4));
		$jiageWang.eq(5).addClass('number-'+strr1.charAt(5));
		$jiageWang.eq(6).addClass('number-'+strr1.charAt(6));
		$jiageWang.eq(7).addClass('number-'+strr1.charAt(7));
		$jiageWang.eq(8).addClass('number-'+strr1.charAt(8));
	}
	//这是对第二个数组进行判断的
	//当第二个数组存在的话   往后添加类名    如果不存在直接写number-0;
	if(strr2){
		$jiageWang.eq(10).addClass('number-'+strr2.charAt(0));
		$jiageWang.eq(11).addClass('number-'+strr2.charAt(1));
	}else{
		$jiageWang.eq(10).addClass('number-0');
		$jiageWang.eq(11).addClass('number-0');
	}
	
}

//云硬盘的价格计算器

/*
 * jgcss：这是对得到的钱数计算的方法
 * wnum：当前这个钱数
 */

var Pready=false;
pnumber(0.00);
function pnumber (pnum) {
	pnum = pnum.toFixed(2);
	var $jiagePan=$('#panjg').find('span');
	
	for(var i=0;i<10;i++){
			$jiagePan.removeClass('number-'+i);
		}
	Wready=true;
	var pnum = pnum.toString();//把当前的值 转化为字符串
		numarr = pnum.split('.');//以小数点拆分成两个数组

	var spo = numarr[0].length;
	var strr1 = numarr[0],//这是第一个数组
		strr2 = numarr[1];//这是第二个数组
	
	//下面是对第一个数组的钱数进行判断的
	if(spo == 1){
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(0));
	}			
	if(spo == 2){
		$jiagePan.eq(7).addClass('number-'+strr1.charAt(0));
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(1));
	}	
	if(spo == 3){
		$jiagePan.eq(6).addClass('number-'+strr1.charAt(0));
		$jiagePan.eq(7).addClass('number-'+strr1.charAt(1));
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(2));
	}
	if(spo == 4){
		$jiagePan.eq(5).addClass('number-'+strr1.charAt(0));
		$jiagePan.eq(6).addClass('number-'+strr1.charAt(1));
		$jiagePan.eq(7).addClass('number-'+strr1.charAt(2));
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(3));
	}
	if(spo == 5){
		$jiagePan.eq(4).addClass('number-'+strr1.charAt(0));
		$jiagePan.eq(5).addClass('number-'+strr1.charAt(1));
		$jiagePan.eq(6).addClass('number-'+strr1.charAt(2));
		$jiagePan.eq(7).addClass('number-'+strr1.charAt(3));
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(4));
	}
	if(spo == 6){
		$jiagePan.eq(3).addClass('number-'+strr1.charAt(0));
		$jiagePan.eq(4).addClass('number-'+strr1.charAt(1));
		$jiagePan.eq(5).addClass('number-'+strr1.charAt(2));
		$jiagePan.eq(6).addClass('number-'+strr1.charAt(3));
		$jiagePan.eq(7).addClass('number-'+strr1.charAt(4));
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(5));
	}
	if(spo == 7){
		$jiagePan.eq(2).addClass('number-'+strr1.charAt(0));
		$jiagePan.eq(3).addClass('number-'+strr1.charAt(1));
		$jiagePan.eq(4).addClass('number-'+strr1.charAt(2));
		$jiagePan.eq(5).addClass('number-'+strr1.charAt(3));
		$jiagePan.eq(6).addClass('number-'+strr1.charAt(4));
		$jiagePan.eq(7).addClass('number-'+strr1.charAt(5));
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(6));
	}
	if(spo == 8){
		$jiagePan.eq(1).addClass('number-'+strr1.charAt(0));
		$jiagePan.eq(2).addClass('number-'+strr1.charAt(1));
		$jiagePan.eq(3).addClass('number-'+strr1.charAt(2));
		$jiagePan.eq(4).addClass('number-'+strr1.charAt(3));
		$jiagePan.eq(5).addClass('number-'+strr1.charAt(4));
		$jiagePan.eq(6).addClass('number-'+strr1.charAt(5));
		$jiagePan.eq(7).addClass('number-'+strr1.charAt(6));
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(7));
	}
	if(spo == 9){
		$jiagePan.eq(0).addClass('number-'+strr1.charAt(0));
		$jiagePan.eq(1).addClass('number-'+strr1.charAt(1));
		$jiagePan.eq(2).addClass('number-'+strr1.charAt(2));
		$jiagePan.eq(3).addClass('number-'+strr1.charAt(3));
		$jiagePan.eq(4).addClass('number-'+strr1.charAt(4));
		$jiagePan.eq(5).addClass('number-'+strr1.charAt(5));
		$jiagePan.eq(6).addClass('number-'+strr1.charAt(6));
		$jiagePan.eq(7).addClass('number-'+strr1.charAt(7));
		$jiagePan.eq(8).addClass('number-'+strr1.charAt(8));
	}
	//这是对第二个数组进行判断的
	//当第二个数组存在的话   往后添加类名    如果不存在直接写number-0;
	if(strr2){
		$jiagePan.eq(10).addClass('number-'+strr2.charAt(0));
		$jiagePan.eq(11).addClass('number-'+strr2.charAt(1));
	}else{
		$jiagePan.eq(10).addClass('number-0');
		$jiagePan.eq(11).addClass('number-0');
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
  /*点击删除项每个单一的详情*/
	$rightBox.on('click','.delete',function () {
		var _this = $(this);	
		_this.parent().parent().parent().prev().remove();
		_this.parent().parent().parent().remove();
		if(_this.attr('dele-type') == 1){
			$yzj_evone = $('.js_yzj_evone');
			typePeice($type_yzj,$yzj_evone);
		}else if(_this.attr('dele-type') == 2){
			$wl_evone = $('.js_wl_evone');
			typePeice($type_wl,$wl_evone);
		}else{
			$yyp_evone = $('.js_yyp_evone');
			typePeice($type_yyp,$yyp_evone);
		}	
		// 修改价格清单的总价格
		totalPeice();
	}); 

 
 
	//购物车详情页的动画	 
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
		_this.next('li').stop().slideToggle(500);
	});	 
	
	
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
						'<p><span>地域 :</span><span>'+$scope.dqNum+'</span></p>'+
						'<div>'+
							'<div>配置 :</div>'+
							'<div>'+
								'<span>CPU:</span><span>'+$scope.hNum+'</span>'+'    '+
								'<span>内存:</span><span>'+$scope.ncNum+'</span>'+'    '+
								'<span>镜像:</span><span>'+$scope.jxNum+'</span>'+'    '+
								'<span>数据盘 :</span><span>'+$scope.sjpNum+'G</span>'+'    '+
								'<span>数量 :</span><span>'+$scope.Tnum+'台</span>'+'    '+
								'<span>付费方式 :</span><span>'+$scope.ffNum+'</span>'+
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
	 
	 //网络的点击加入清单	  
	var $Wljion=$('#Wljion'),
	 	$type_wl = $('#js_type_wl'), //类型小计的总钱数
		$wl_evone;
	 $Wljion.click(function  () {
	 	
	 	if($type_yzj.html() == "￥0.00"){
	 		alert('请先选购云主机~~~');
	 		return;
	 	}
	 	$('#js_wl_slide_box').append('<div class="qd_xiaoji_box">'+
	 										'<span>￥</span><span class="qd_xiaoji js_wl_evone">'+$scope.wlallP+'</span><span> > </span>'+
	 									'</div>');
	 	$('#js_wl_slide_box').append('<li class="right_three" id="right_three" style="display:none">'+
						'<p>网络</p>'+
						'<p><span class="jsJG">'+$scope.wlallP+'</span>元</p>'+
						'<p><span>地域 :</span><span>'+$scope.op+'</span></p>'+
						'<div>'+
							'<div>配置 :</div>'+
							'<div>'+
								'<span>计费方式:</span><span>带宽</span>'+'    '+
								'<span>带宽:</span><span>'+$scope.dkNum+'</span>'+'    '+														
								'<span>数量 :</span><span>'+$scope.Tnum_wl+'台</span>'+'    '+
								'<span>付费方式 :</span><span>'+$scope.ffNum_wl+'</span>'+
							'</div>'+
							
						'</div>'+
						'<div class="shop_delete">'+			
							'<a href="javascript:;" title="删除" ><img src="images/delete.png" class="delete" dele-type="2"/></a>'+						
							'<a href="javascript:;" title="去购买"><img src="images/shop.png" alt="" /></a>'+										
						'</div>'+
					'</li>')
	 	totalPeice();
	 	$wl_evone = $('.js_wl_evone');
		typePeice($type_wl,$wl_evone);
	 });
	 
	 
	  /*云硬盘的添加*/
	var $Yypjion=$('#Yypjion'),
		$type_yyp = $('#js_type_yyp'),
	 	$yyp_evone;
	 $Yypjion.click(function  () {
	 	if($type_yzj.html() == "￥0.00"){
	 		alert('请先选购云主机~~~');
	 		return;
	 	}
	 	$('#js_yyp_slide_box').append('<div class="qd_xiaoji_box">'+
	 										'<span>￥</span><span class="qd_xiaoji js_yyp_evone">'+$scope.yypallP+'</span><span> > </span>'+
	 									'</div>');
	 	$('#js_yyp_slide_box').append('<li class="right_three" id="right_three" style="display:none">'+
						'<p>云硬盘</p>'+
						'<p class="money_yuan"><span class="jsJG">'+$scope.yypallP+'</span>元</p>'+
						'<p><span>地域 :</span><span>'+$scope.op+'</span></p>'+
						'<div>'+
							'<div>配置 :</div>'+
							'<div>'+							
								'<span>数据盘:</span><span>'+$scope.cpNum+'</span>'+'    '+														
								'<span>数量 :</span><span>'+$scope.Tnum_wl+'个</span>'+'    '+
								'<span>付费方式 :</span><span>'+$scope.ffNum_yyp+'</span>'+
							'</div>'+						
						'</div>'+
						'<div class="shop_delete">'+			
							'<a href="javascript:;  " title="删除" ><img src="images/delete.png" class="delete" dele-type="4"/></a>'+						
							'<a href="javascript:;" title="去购买"><img src="images/shop.png" alt="" /></a>'+										
						'</div>'+
					'</li>');
					
	 	totalPeice();
	 	$yyp_evone = $('.js_yyp_evone');
		typePeice($type_yyp,$yyp_evone);
	 });
	 
	 
	 
	 

	
	//   数量增加操作
	/*云主机数量的增减*/
	
	function jiaNum(inp,th) {		
		if(th.attr('zenga') == 1){
			//云主机
			if($scope.Tnum > 4){
				alert('最大数量要保持在5台以下哦！~~');
				return;
			}
			$scope.Tnum ++;
			
			inp.val($scope.Tnum);
			allPrices();
		}		
		if(th.attr('zenga') == 3){
			// 网络 
			if($scope.Tnum_wl>9){
				alert('最大数量要保持在10台以下哦！~~');
				return;
			}
			$scope.Tnum_wl ++;
			inp.val($scope.Tnum_wl);
			allPrices();
		}
		if(th.attr('zenga') == 4){
			//云硬盘
			if($scope.Tnum_yyp>9){
				alert('最大数量要保持在10台以下哦！~~');
				return;
			}
			$scope.Tnum_yyp ++;
			inp.val($scope.Tnum_yyp);
			allPrices();
		}
		th.addClass('du_li').siblings().removeClass('du_li');	
	};
	function jianNum(inp,th) {
		
		if(th.attr('jiana') == 1){
			//云主机
			if($scope.Tnum <= 1){
			alert('数量要保持在1台以上哦！~~');
			return false;
		    };	
			$scope.Tnum --;
			inp.val($scope.Tnum);
			allPrices();
		};
			
		// 网络
		if(th.attr('jiana') == 3){			
			if($scope.Tnum_wl <= 1){
				alert('数量要保持在1台以上哦！~~');
				return false;
			}
			$scope.Tnum_wl --;			
			inp.val($scope.Tnum_wl);
			allPrices();
		}
		//云硬盘
		if(th.attr('jiana') == 4){
			if($scope.Tnum_yyp<=1){
				alert('数量要保持在1台以上哦！~~');
				return false;
			}
			$scope.Tnum_yyp --;
			inp.val($scope.Tnum_yyp);
			allPrices();
		}	
		th.addClass('du_li').siblings().removeClass('du_li');	
	};
		
	
	
/*云主机的数量的增减*/	
	var $Yrisen1  = $('#jsYrisen'),
		$Yreduce1 = $('#jsYreduce');
		
	$Yrisen1.on('click',function () {
		jiaNum($('#jsTsBox'),$(this));	
	});	
	
	$Yreduce1.on('click',function () {	
		jianNum($('#jsTsBox'),$(this));	
	});	
	
	$('#jsTsBox').on('blur',function () {
		
		if($(this).val() == "0"){
			alert('数量要保持在1台以上哦！~~');
			$('#jsTsBox').val(1);
			return;
		}
		$scope.Tnum = $(this).val();
		$('#jsTsBox').val($scope.Tnum);
		allPrices();
	});

/*网络的数量的增减*/
	var Ynum3  = $('#jsWTsBox').val(),
		$Yrisen3  = $('#jsWrisen'),
		$Yreduce3 = $('#jsWreduce');	
	$Yrisen3.on('click',function () {
		jiaNum($('#jsWTsBox'),$(this));
	});	
	$Yreduce3.on('click',function () {
		jianNum($('#jsWTsBox'),$(this));
	});
	$('#jsWTsBox').on('blur',function () {
		if($(this).val() == "0"){
			alert('数量要保持在1台以上哦！~~');
			$('#jsWTsBox').val(1);
			return;
		}
		$scope.Tnum_wl = $(this).val();
		$('#jsWTsBox').val($scope.Tnum_wl);
	});
/*云硬盘数量的增减*/
	var Ynum4  = $('#jsYpTsBox').val(),
		$Yrisen4  = $('#jsPrisen'),
		$Yreduce4 = $('#jsPreduce');	
	$Yrisen4.on('click',function () {
		jiaNum($('#jsYpTsBox'),$(this));
	});	
	$Yreduce4.on('click',function () {	
		jianNum($('#jsYpTsBox'),$(this));
	});	
	$('#jsYpTsBox').on('blur',function () {
		if($(this).val() == "0"){
			alert('数量要保持在1台以上哦！~~');
			$('#jsYpTsBox').val(1);
			return;
		}
		$scope.Tnum_yyp = $(this).val();
		$('#jsYpTsBox').val($scope.Tnum_yyp);
	});
		


	


	

}])
