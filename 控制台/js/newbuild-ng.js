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
			"amode":"按月",
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
			 "amode": "按年",
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

    var ffava = true,
  		limitTnum = true;
    $scope.ffdetails_list = $scope.optionArr[0].gnum;
	$scope.ffdenum = '1';
    $scope.changeff = function ()  {
    	if(ffava){
    		n = 0;
    		ffava = false;
    	}else{
    		n = $("select option:selected").eq(3).val()
    	}
    	$scope.ffdetails_list = $scope.optionArr[n].gnum; 
  		if($scope.ffyuedi == '购置月末'){
  			$scope.ffyuedi = 'www';
  			$scope.ffdenum = day/30;
  		}else{
  			$scope.ffdenum = $scope.ffdetails_list[0].price;
  			$("#js-ffdeta option:first").prop("selected", 'selected');
  		}
  		
  		if($scope.optionArr[n].amode == '按需'){
  			limitTnum = false;
  			if($('#jsTsBox').val() > 5){
  				$('#jsTsBox').attr('value',5)
  			}
  		}else{
  			limitTnum = true;
  		}
  		
  		
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
        "type_name":"Ubuntu",
        "images":[
            {
                "id":"8ddcb6c5-58b6-4e50-9e1d-cf166ab4fa7b",
                "name":"Ubuntu-16.10-x86_64"
            }
        ]
    },
    {
        "type_name":"CentOS",
        "images":[
            {
                "id":"b1befea3-73ad-4be5-a0d8-ed5f2eb52e19",
                "name":"CentOS-7.2-x86_64"
            }
        ]
    },
    {
        "type_name":"Debian",
        "images":[
            {
                "id":"c8954f5d-705b-4585-a250-5dbf9b5d019a",
                "name":"Debian-8.6-x86_64"
            }
        ]
    }
];

//var jxobj = {
//	o1:$scope.imagesImg[0].type_name,
//	o2:$scope.imagesImg[1].type_name,
//	o3:$scope.imagesImg[2].type_name
//}
var jxava = true;
var b = $scope.imagesImg[0].imag;
	$scope.xxx=b;
	$scope.jxdetails_list = null;
	$scope.jingFF = function  () {
		$scope.jxdetails_list=$scope.imagesImg[0].images;
		jingdel = $scope.imagesImg[0].images[0].id;
		var opse = $("select option:selected").eq(0).html();
		if(jxava){
			n = 0;
			jxava = false;
		}else{
			n = $("select option:selected").eq(0).val()
		}
//			n = 0;
//		n=opse=="非Web服务器推荐(22，3389)"?0:opse == jxobj.o1 ? 0 : opse == jxobj.o2 ? 1 : 2;
		$scope.jxdetails_list = $scope.imagesImg[n].images;
	};
$scope.jingFF();	

var jingdel = $("select option:selected").eq(1).attr('jj-id');;

$scope.jingdel = function  () {
		jingdel = $("select option:selected").eq(1).attr('jj-id');
	};


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
	var cpuandnc = $scope.cpuprice*1,
		yjsInp = $('#bandwidthId').val()*1;
		shujuqian = 0.26*yjsInp;  //这个0.26是从后台获取的数据盘1G的价格	
		ffnum = $scope.ffyuedi == '购置月末'? day/30:$scope.ffdenum*1;
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
	var yunallZ = parseFloat((cpuandnc + shujuqian + dkzong) * ffnum * Tnum);
	//$scope.yzjallP = yunallZ.toFixed(2);
	$('#allPrice').html(yunallZ.toFixed(2)+'元');
	//console.log(cpuandnc,shujuqian,dkzong,Tnum,fftype)
}


	
//台数的增加
 function jiaNum (inp,th) {
 	var tval = inp.attr('value');
 	var maxnum ;
 	if(!limitTnum){
 		maxnum = 5;
 	}else{
 		maxnum = 100;
 	}
 	if(tval >= maxnum){
 		alert('最大的数量保持在"'+maxnum+'"台以内');
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


//获取数据

$scope.nowBuy = function  () {
	var _data = {
		userId : '',//用户的id
		loginMessage : '',//登录信息
		expireTime : '',//到期时间
		discount : '',//折扣
		modelType : '标准机型',//机型
		cpu : parseFloat($('#jsCpuBox').find('.biao_button_active').html()),//云主机cpu
		ram : parseFloat($('#jsNcBox').find('.biao_button_active').html()),//云主机ram内存
		flavorId : '',//cpu和ram对应的flavorId
		image :  $("select option:selected").eq(0).html(),//镜像名(系统)
		imageId : $("select option:selected").eq(1).attr('jj-id'),//镜像id
		systemDisk : "20G",//赠送的系统盘
		disk : $('#bandwidthId').val(),//数据盘 0为无硬盘挂载
		networkType : $('#js-wltype').find('.biao_button_active').html(),//网络类型
		status : '',//云主机的状态
		route : 'BGP',//线路
		networkPayType : '带宽计费',//网络计费方式
		fireWall : '',//防火墙
		businessGroup : '',//业务组
		aliasName : $.trim($('#js-aliasname').val()),//主机别名
		realName :'',//主机真正的名字
		defaultAdministrator : '',//默认管理员
		password : $.trim($('#js-glpwd').val()),//管理员密码
		rePassword : $.trim($('#js-pwd').val()),//确认密码
		buyAmount : $.trim($('#jsTsBox').val()),//购买数量
		payType : $("select option:selected").eq(3).html(),//付费方式
		payTime : parseFloat($("select option:selected").eq(4).html()),//付费时间
		payMonth : parseFloat($("select option:selected").eq(4).html()),//用户选择时间对应的月数
		totalMoney : parseFloat($('#allPrice').html())//合计费用
    };
    if(isg){
    	_data.bandWidth = $('#daik-inp').val();
    	_data.floatIp =$('#daik-inp').val();//外网弹性IP null为无浮动IP绑定
		_data.intranetIp = '';//云主机的内网IP值
    	
    }else{
    	_data.bandWidth = '';
    	_data.floatIp = 'null';//外网弹性IP null为无浮动IP绑定
		_data.intranetIp = '';//云主机的内网IP值
    }
    console.log(_data)
	
	var ngurl_cpu = 'http://192.168.10.240:8001/computeCloudHost/createComputeCloudHost';
	$rootScope.ngAxjx(ngurl_cpu,_data,'',callback);
	function callback (json) {
		console.log(json)
//		setTimeout(function() {
//		window.location.href = 'http://127.0.0.1/sspaas/file/secondary/console/compute/cloudhost.html';
//		},3000)
	}
//	function errorCallback(data){
//		alert(data)
//	}
//	
}


}]);
