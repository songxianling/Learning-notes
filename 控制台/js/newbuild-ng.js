//模拟数据

sspaas.controller('myCtrl', ['$scope','$rootScope','$http', function($scope,$rootScope,$http){
//cpu 内存模拟数据
$scope.cpudataList = [ 
	{
		cpuName: '1',						
		gnum:[{gn:'1',price:'39'},{gn:'2',price:'73'},{gn:'4',price:'127'}]
	},{
		cpuName: '2',
		gnum:[{gn:'2',price:'126'},{gn:'4',price:'171'},{gn:'6',price:'261'}]
	},{
		cpuName: '4',
		gnum:[{gn:'4',price:'250'},{gn:'8',price:'340'},{gn:'16',price:'520'}]
	},{
		cpuName: '8',
		gnum:[{gn:'8',price:'510'},{gn:'16',price:'690'},{gn:'32',price:'1050'}]
	},{
		cpuName: '12',
		gnum:[{gn:'16',price:'885'},{gn:'24',price:'1065'},{gn:'32',price:'1245'}]
	},{
		cpuName: '16',
		gnum:[{gn:'16',price:'1015'},{gn:'32',price:'1375'},{gn:'64',price:'2095'}]
	}
];
//核数点击的时候

$scope.cpuprice = 39; // 默认核数对应G数的价格 （1核1G）
$scope.selectFun = function  (i) {
	$scope.dataInfo = $scope.cpudataList[i].gnum;
	$scope.hNum = $scope.cpudataList[1].cpuName;
	$('#jsCpuBox li').eq(i).addClass('biao_button_active').siblings().removeClass('biao_button_active');	
	 angular.forEach($scope.cpudataList,function  (item, index) {
	 	if(i==index){
	 		$scope.cpuprice = $scope.dataInfo[0].price;
	 	}
	 });
	 allPrices();
};
$scope.selectFun(0);

//G数点击的时候
$scope.seleF = function  (i) {
	$('#jsNcBox li').eq(i).addClass('biao_button_active').siblings().removeClass('biao_button_active');	
	$scope.ncNum = $scope.dataInfo[i].gn;
	angular.forEach($scope.dataInfo,function  (item, index) {
		if(i == index){
			$scope.cpuprice = $scope.dataInfo[i].price;
		}
	})
	allPrices();
};
		
/*----------------------------------------------------------------------------*/
//付费方式数据
	$scope.optionArr=[
		{
			"amode":"月付",
			"gnum":[
				{
			        "payTime": "1个月",
			        "ffdetaid":"0",
			        "price": "1"
		        },
		         {
			        "payTime": "2个月",
			        "ffdetaid":"1",
			        "price": "2"
		        },
		         {
			        "payTime": "3个月",
			        "ffdetaid":"2",
			        "price": "3"
		        },
		         {
			        "payTime": "4个月",
			        "ffdetaid":"3",
			        "price": "4"
		        },
		         {
			        "payTime": "5个月",
			        "ffdetaid":"4",
			        "price": "5"
		        },
		         {
			        "payTime": "6个月",
			        "ffdetaid":"5",
			        "price": "6"
		        },
		         {
			        "payTime": "7个月",
			        "ffdetaid":"6",
			        "price": "7"
		        },
		         {
			        "payTime": "8个月",
			        "ffdetaid":"7",
			        "price": "8"
		        },
		         {
			        "payTime": "9个月",
			        "ffdetaid":"8",
			        "price": "9"
		        },
		        {
					"payTime":"购置月末",
					"ffdetaid":"9",
					"price":"0.05"
				}
			]
		},
		{
			 "amode": "年付",
			 "gnum" : [
			 	{
			 		"payTime": "1年",
			 		"ffdetaid":"0",
			        "price": "10"
			 	},
			 	{
			 		"payTime": "2年",
			 		"ffdetaid":"1",
			        "price": "18"
			 	},
			 	{
			 		"payTime": "3年",
			 		"ffdetaid":"2",
			        "price": "27"
			 	}
			 ]
		},
		{
			"amode":"按需",
			"gnum":[
				{
					"payTime":"小时",
					"ffdetaid":"0",
					"price":"0.0013888"
				}
			]
		}
	]
  
  var ffobj = {
  	f1:$scope.optionArr[0].amode,
  	f2:$scope.optionArr[1].amode,
  	f3:$scope.optionArr[2].amode,
  };
	
  var a = $scope.optionArr['0'].amode;	  
	    $scope.ffdetails_list = $scope.optionArr[0].gnum;
		$scope.ffdenum = '1';
	    $scope.changeff = function ()  {
	    	var fftext = $("select option:selected").eq(3).html(),
	    		n = 0;
	    	n = fftext == ffobj.f1 ? 0 : fftext == ffobj.f2 ? 1 : 2;
	    	$scope.ffdetails_list = $scope.optionArr[n].gnum; 
	  		$scope.ffdenum = $scope.ffdetails_list[$("select option:selected").eq(4).val()].price;
	    	allPrices();
	    	
	    };
	    $scope.changeffdeta = function () {	
	    	$scope.ffdenum =  $scope.ffdetails_list[$("select option:selected").eq(4).val()].price;
			$scope.ffyuedi =  $scope.ffdetails_list[$("select option:selected").eq(4).val()].payTime;
			allPrices();
	    };
	    
//模拟镜像的数据
$scope.imagesImg = [
	{
		"imag":"CentOs",
		"inum":[
			{
				"aid":"asdasd",
				"details":"CentOS 6.5 64位"
			},
			{
				"aid":"qweqwe",
				"details":"CentOS 7.2 64位"
			},
			{
				"aid":"rtyrty",
				"details":"CentOS 7.2 64位"
			},
			{
				"aid":"yuiyui",
				"details":"CentOS 7.2 64位"
			},
			{
				"aid":"uiouio",
				"details":"CentOS 7.2 64位"
			}
			
		]
	},
	{
		"imag":"Ubuntu",
		"inum":[
			{
				"aid":"uiouio",
				"details":"Ubuntu 14.04 32位"
			},
			{
				"aid":"yuiyui",
				"details":"Ubuntu 7.2 64位"
			},
			{
				"aid":"rtyrty",
				"details":"Ubuntu 7.2 64位"
			},
			{
				"aid":"qweqwe",
				"details":"Ubuntu 7.2 64位"
			}
		]
	},
	{
		"imag":"Windows",
		"inum":[
			{
				"aid":"uiouio",
				"details":"Windows 14.04 32位"
			},
			{
				"aid":"yuiyui",
				"details":"Windows 7.2 64位"
			},
			{
				"aid":"rtyrty",
				"details":"Windows 7.2 64位"
			},
			{
				"aid":"qweqwe",
				"details":"Windows 7.2 64位"
			}
		]
	},
	{
		"imag":"Debian",
		"inum":[
			{
				"aid":"uiouio",
				"details":"Debian 14.04 32位"
			},
			{
				"aid":"yuiyui",
				"details":"Debian 7.2 64位"
			},
			{
				"aid":"rtyrty",
				"details":"Debian 7.2 64位"
			},
			{
				"aid":"qweqwe",
				"details":"Debian 7.2 64位"
			}
		]
	}
];

var jxobj = {
	o1:$scope.imagesImg[0].imag,
	o2:$scope.imagesImg[1].imag,
	o3:$scope.imagesImg[2].imag,
	o4:$scope.imagesImg[3].imag,
}

var b = $scope.imagesImg[0].imag;
	$scope.xxx=b;
	$scope.jxdetails_list = null;
	$scope.jingFF = function  () {
		$scope.jxdetails_list=$scope.imagesImg[0].inum;
		var opse = $("select option:selected").eq(0).html();
			n = 0;
		n=opse=="非Web服务器推荐(22，3389)"?0:opse == jxobj.o1 ? 0 : opse == jxobj.o2 ? 1 : opse == jxobj.o3 ? 2 : 3;
		$scope.jxdetails_list = $scope.imagesImg[n].inum;
	};
$scope.jingFF();



//这是每个页面的滚动条的方法;				
$scope.genal={
	show:function(fn){		
		$scope.genal.sto();
		$scope.genal.ips();
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
	}
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
			$scope.sjpNum = price;
			allPrices();

		}
		if(index==1){
			var price =Math.round(per*max);
			pris.children("div").remove();
			if(price == 0){
				price = 1;
			}
			mini.attr('value',price);
			$scope.dkNum = price;
			allPrices();
			
		}
	
	}
}
//这是上面定义的方法  在这里执行的;
$scope.genal.show();

// 检查带宽不能小于 1
var $daikinp = $('#daik-inp');
$daikinp.on('input',function () {
	if($(this).val()*1 < 1 && $(this).val()*1 !==0){
		$(this).val(1);
		$(this).focus();
	}
});	

//检测input输入框 失去焦点是还是之前input里面的数据
 var sjNUm;
function getOldNum(ele) {
	ele.on('focus', function() {
		sjNUm = $(this).val()*1;
	});
	ele.on('blur', function() {			
		var hanZiXiu = $(this).val();
		var zhengZe = /^[0-9]\d*$/;
		if(!(zhengZe.test(hanZiXiu))) {
			ele.attr('value', sjNUm);				
			allPrices();
			return;
		}
	});
};	
var $yjsInp = $('#bandwidthId'),
	$daikinp = $('#daik-inp');
getOldNum($yjsInp);
getOldNum($daikinp);

//这里是带宽模拟数据
$scope.daidprice = [
    {
        "1":{
            "createdTime":"2016-11-16",
            "growRate":0,
            "id":"89c62ff163bc4139bcfabbcef1ed4b8c",
            "maxIpBroadBand":1,
            "minIpBroadBand":1,
            "minIpBroadBandPrice":20,
            "updatedTime":"2016-11-16"
        },
        "2":{
            "createdTime":"2016-11-22",
            "growRate":0,
            "id":"ccc31eb330474c64b014d2c8fcddab9f",
            "maxIpBroadBand":2,
            "minIpBroadBand":2,
            "minIpBroadBandPrice":41,
            "updatedTime":"2016-11-22"
        },
        "3":{
            "createdTime":"2016-11-22",
            "growRate":0,
            "id":"b5d43d4aa5cd4a199c0c264589bc062d",
            "maxIpBroadBand":3,
            "minIpBroadBand":3,
            "minIpBroadBandPrice":63, 
            "updatedTime":"2016-11-22"
        },
        "4":{
            "createdTime":"2016-11-22",
            "growRate":0,
            "id":"dfbb7d5f188743b396ed0feca6817411",
            "maxIpBroadBand":4,
            "minIpBroadBand":4,
            "minIpBroadBandPrice":86,
            "updatedTime":"2016-11-22"
        },
        "5":{
            "createdTime":"2016-11-22",
            "growRate":0,
            "id":"ce02b3f028fd4a1998151345fb10e54e",
            "maxIpBroadBand":5,
            "minIpBroadBand":5,
            "minIpBroadBandPrice":112,
            "updatedTime":"2016-11-22"
        },
        "6":{
            "createdTime":"2016-11-16",
            "growRate":71,
            "id":"aacc18e0b04644158ccc2630be11a5c4",
            "maxIpBroadBand":300,
            "minIpBroadBand":6,
            "minIpBroadBandPrice":112,
            "updatedTime":"2016-11-16"
        }
    }
]
var oneP_1, oneP_2, oneP_3, oneP_4, oneP_5, oneP_6, oneP_6_detail;
angular.forEach($scope.daidprice, function(item, index) {
			oneP_1 = item['1']['minIpBroadBandPrice'];
			oneP_2 = item['2']['minIpBroadBandPrice'];
			oneP_3 = item['3']['minIpBroadBandPrice'];
			oneP_4 = item['4']['minIpBroadBandPrice'];
			oneP_5 = item['5']['minIpBroadBandPrice'];
			oneP_6 = item['6']['minIpBroadBandPrice'];
			oneP_6_detail = item['6']['growRate'];
		})


//----------------------------------------------------------------------------------------------------------
	
//点击增加类
var isg = true;
function eleActive (ele) {
	ele.off('click').on('click',function (){
		var that = $(this);
		that.addClass('biao_button_active').siblings().removeClass('biao_button_active');
		that.index() == 0 ?$('.wai_net_ip').show() : $('.wai_net_ip').hide();
		that.index() == 0 ?$('.no_buy').hide() : $('.no_buy').show();
		that.index() == 0 ?isg = true : isg = false;
		allPrices();
	})
}
eleActive($('.biao_button_ul li'));

//这里是购置月末的剩余天数
var day;
function timeDateM() {
		var curTime = new Date().getDate();
		day = (30 - curTime) + 1;
	}
timeDateM();
	
/**
 * allPrices {function} -> 计算价格 的函数
 */
$scope.yzjallP = 39.00;
allPrices();
function allPrices () {
	var daik = 0,
		cpuandnc = $scope.cpuprice*1,
		yjsInp = $('#bandwidthId').val()*1;
		shujuqian = 0.26*yjsInp;  //这个0.26是从后台获取的数据盘1G的价格	
		fftype = $scope.ffyuedi=='购置月末'? day/30:$scope.ffdenum*1;
		Tnum = $('#jsTsBox').val();
		$("#yunShowNumber").html(Tnum);//这个是云主机配额的数量展示的时候
		$('#tanShowNumber').html(Tnum);//这个是弹性ip数量展示的时候
	if(isg){
		var daik_inp = $.trim($('#daik-inp').val())*1;
		if(daik_inp == 1){
			dkzong = oneP_1;
		}else if(daik_inp == 2){
			dkzong = oneP_2;
		}else if(daik_inp == 3){
			dkzong = oneP_3;
		}else if(daik_inp == 4){
			dkzong = oneP_4;
		}else if(daik_inp == 5){
			dkzong = oneP_5;
		}else{
			dkzong = oneP_6*1 + (daik_inp-5) * oneP_6_detail;			
		}
	}else{
		dkzong = 0;
	}
	var yunallZ = parseFloat((cpuandnc + shujuqian + dkzong) * fftype * Tnum);
	//$scope.yzjallP = yunallZ.toFixed(2);
	$('#allPrice').html(yunallZ.toFixed(2)+'元');
}


	
//台数的增加
 function jiaNum (inp,th) {
 	var tval = inp.attr('value');
 	$scope.tval = tval;
 	if(tval > 100){
 		alert('最大的数量保持在100台以内');
 		return;
 	}
 	tval ++ ;
 	inp.attr('value',tval);
 	allPrices();
 	th.addClass('du_li').siblings().removeClass('du_li');	
 }
//减少
function jianNum (inp,th) {
	var tval = inp.attr('value');
 	if(tval <= 1){
 		alert('最大的数量保持在100台以内');
 		return;
 	}
 	tval -- ;
 	inp.attr('value',tval);
 	allPrices();
	th.addClass('du_li').siblings().removeClass('du_li');	
}
//点击执行增加和减少的方法
var $jsYrisen = $('#jsYrisen');
var	$jsYreduce = $('#jsYreduce');
	
$jsYrisen.click(function  () {
	jiaNum($('#jsTsBox'),$(this));	
});
$jsYreduce.click(function  () {
	jianNum($('#jsTsBox'),$(this));	
});

//获取用户选中的数据
var jsCpuBox = $('#jsCpuBox');



$scope.nowBuy = function  () {
	var _data = {
		aliasName :$.trim($('#js-aliasname').val()),
		cpu:parseFloat($('#jsCpuBox').find('.biao_button_active').html()),
		ram:parseFloat($('#jsNcBox').find('.biao_button_active').html()),
		imageId:"b1befea3-73ad-4be5-a0d8-ed5f2eb52e19",
		password:$.trim($('#js-pwd').val()),
		disk :$('#bandwidthId').val(),
		payType : $("select option:selected").eq(3).html()
    };
    if(isg){
    	_data.bandWidth = parseFloat($('#daik-inp').val())
    }
    console.log(_data);
	var  hostCloud = "";
	var ngurl_cpu = 'http://192.168.10.240:8001/computeCloudHost/createComputeCloudHost';
	$rootScope.ngAxjx(ngurl_cpu,_data,'hostCloud');
//	setTimeout(function() {
//		window.location.href = 'http://127.0.0.1/sspaas/file/secondary/console/compute/cloudhost.html';
//	},3000)
}





}]);
