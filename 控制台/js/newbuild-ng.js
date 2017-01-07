
setTimeout(function() {
	$('.control_main_center li .zong').eq(0).click();
},100);
//模拟数据
sspaas.controller('myCtrl', ['$scope','$rootScope','$http', function($scope,$rootScope,$http){

$rootScope.cpudataList ="";
//核数点击的时候
var data1 = {};
$scope.ngurl_cpu1 = 'http://cms.docker.sspaas.net/querydata/queryCpuAndRamTypePriceList';
$rootScope.ngAxjx($scope.ngurl_cpu1,data1,'cpudataList',callback); 
function callback (json) {
	$rootScope.cpudataList =json;
	$scope.cpuprice = 39.00; // 默认核数对应G数的价格 （1核1G）
	$scope.selectFun = function(i){
		$scope.dataInfo = $rootScope.cpudataList[i].gnum;
		$scope.hNum = $rootScope.cpudataList[1].cpuName;
		$('#jsCpuBox li').eq(i).addClass('biao_button_active').siblings().removeClass('biao_button_active');	
		 angular.forEach($rootScope.cpudataList,function  (item, index) {
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
}
		
/*----------------------------------------------------------*/
//模拟镜像的数据
$scope.imagesImg = [
    {
        "type_name":"centos",
        "images":[
            {
                "id":"74cbee6b-fba8-4beb-88e5-e1208f787925",
                "name":"test-centos6-test"
            },
            {
                "id":"b1befea3-73ad-4be5-a0d8-ed5f2eb52e19",
                "name":"CentOS-7.2-x86_64"
            }
        ]
    },
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
        "type_name":"Debian",
        "images":[
            {
                "id":"c8954f5d-705b-4585-a250-5dbf9b5d019a",
                "name":"Debian-8.6-x86_64"
            }
        ]
    }
];


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
		$scope.jxdetails_list = $scope.imagesImg[n].images;
	};
	$scope.jingFF();	

var jingdel = $("select option:selected").eq(1).attr('jj-id');
$scope.jingdel = function  () {
		jingdel = $("select option:selected").eq(1).attr('jj-id');
	};



/*-------------------------------------------------------------------------*/
//安全组的数据
$rootScope.anquanQroup ="";
var dataAn = {};
$scope.ngurl_cpuAn = 'http://192.168.10.240:8001/securityGroup/getSelectGroup';
$rootScope.ngAxjx($scope.ngurl_cpuAn,dataAn,'anquanQroup',callback1); 
function callback1 (data) {
	$rootScope.anquanQroup = data;
	console.log(data);
	$scope.QroupDetail = $rootScope.anquanQroup.list;
}
		
		
		
		
		
/*----------------------------------------------------------------------------*/

	    

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
			var price = Math.round(Math.round(per*max)/10)*10;
			if(price < 100 && price !== 0){
				price = 100;
			}
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
];
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
	
//付费方式数据
console.log($("#js-ffdeta").find('option').length)
//$scope.payTime = '1个月';
$("#js-ffdeta").selectedIndex = 1;
$rootScope.optionArr="";
var dataff={};
$scope.ffUrl = "http://cms.docker.sspaas.net/querydata/queryConsolePayTypeList";
$rootScope.ngAxjx($scope.ffUrl,dataff,'optionArr',callback2); 
function callback2 (dataff) {
	$rootScope.optionArr = dataff;
	console.log(dataff)
	var ffava = true,
		 limitTnum = true;
    $scope.ffdetails_list = $rootScope.optionArr[0].gnum;
	$scope.ffdenum = '1';
	$scope.ffyuedi = '购置月末';
    $scope.changeff = function ()  {
    	if(ffava){
    		n = 0;
    		ffava = false;
    	}else{
    		n = $("select option:selected").eq(3).val()
    	}
    	$scope.ffdetails_list = $rootScope.optionArr[n].gnum; 
		if($scope.ffyuedi == '购置月末'){
			$scope.ffyuedi = 'www';
			$scope.ffdenum = day/30;
		}else{
			$scope.ffyuedi = $scope.ffdetails_list[0].payTime;
			$scope.ffdenum = $scope.ffdetails_list[0].price;
			$("#js-ffdeta option:first").prop("selected", 'selected');
		}
		
		if($rootScope.optionArr[n].amode == '按需'){
			limitTnum = false;
			if($('#jsTsBox').val() > 5){
				$('#jsTsBox').attr('value',5)
			}
		}else{
			limitTnum = true;
		}
		$scope.changeffdeta();
    	allPrices();
    };
    $scope.changeffdeta = function () {	
    	$scope.ffdenum =  $scope.ffdetails_list[$("select option:selected").eq(4).val()].price;
		$scope.ffyuedi =  $scope.ffdetails_list[$("select option:selected").eq(4).val()].payTime;
		allPrices();
    };
}
   
	

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
var a = (day/30)*145.15;

/**
 * allPrices {function} -> 计算价格 的函数
 */
$scope.yzjallP = 39.00;
allPrices();
function allPrices () {
	var cpuandnc = $scope.cpuprice*1,
		yjsInp = $('#bandwidthId').val()*1;
		shujuqian = 0.26*yjsInp;  //这个0.26是从后台获取的数据盘1G的价格	
		ffnum = $scope.ffyuedi == '购置月末'? day/30 : $scope.ffdenum*1;
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
//	console.log(ffnum,$scope.ffyuedi == '购置月末');
	var yunallZ = parseFloat((cpuandnc + shujuqian + dkzong) * ffnum * Tnum);
	//$scope.yzjallP = yunallZ.toFixed(2);
	$('#allPrice').html(yunallZ.toFixed(2)+'元');
	//console.log(cpuandnc,shujuqian,dkzong,ffnum)
	
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


// 输入主机名 && 密码 的规则判断

var errmsg = {
	//错误信息的集合
	m1 : '*请按要求填写*',
	m2 : '*请输入相同的密码*',
	m3 : '*请注意主机信息区域的填写是否完整*',
	m4 : '*请注意主机信息区域的填写是否正确*',
	m5 : '正则创建云主机,请稍后...'
}
var $zzname = $('#js-aliasname');
$zzname.on('input',function () {
	var va = $.trim($(this).val());
	if(!/^[a-zA-Z][a-zA-Z0-9_]{4,10}$/.test(va)){
		$(this).next('span').show();
	}else{
		$(this).next('span').hide();
	}
});

var $pwdinp = $('.js-pwdinp');
$pwdinp.on('input',function () {
	var va = $.trim($(this).val());
	if(!/^[a-zA-Z][a-zA-Z0-9_]{5,10}$/.test(va)){
		$(this).next('span').html(errmsg.m1).show();
	}else if(va !== $pwdinp.eq(0).val()){
		$(this).next('span').html(errmsg.m2).show();
	}else{
		$(this).next('span').hide();
	}
});

var $mark = $('#js-mark'); //遮罩层
//获取数据
$scope.nowBuy = function  () {
	var $errinfo = $('.js-err');
	if($zzname.val() == '' || $pwdinp.eq(0).val() == '' || $pwdinp.eq(1).val() == ''){
		layer.alert(errmsg.m3);
		return;
	}else if($errinfo.is(":visible")){
		layer.alert(errmsg.m4);
		return;
	}
	
	

	var _data = {
		userId : '',//用户的id
		loginMessage : '',//登录信息
		expireTime : '',//到期时间
		discount : '',//折扣
		modelType : '标准机型',//机型
		cpu : parseFloat($('#jsCpuBox').find('.biao_button_active').html()),//云主机cpu
		ram : parseFloat($('#jsNcBox').find('.biao_button_active').html()),//云主机ram内存
		flavorId : '',//cpu和ram对应的flavorId
		image :  $("select option:selected").eq(1).html(),//镜像名(系统)
		imageId : $("select option:selected").eq(1).attr('jj-id'),//镜像id
		systemDisk : "20G",//赠送的系统盘
		disk : $('#bandwidthId').val(),//数据盘 0为无硬盘挂载
		networkType : $('#js-wltype').find('.biao_button_active').html(),//网络类型
		status : '',//云主机的状态
		route : 'BGP',//线路
		networkPayType : '带宽计费',//网络计费方式
		fireWall :$("select option:selected").eq(2).attr("datacode"),//安全组
		businessGroup : '',//业务组
		aliasName : $.trim($('#js-aliasname').val()),//主机别名
		realName :'',//主机真正的名字
		defaultAdministrator : '',//默认管理员
		password : $.trim($('#js-glpwd').val()),//管理员密码
		rePassword : $.trim($('#js-pwd').val()),//确认密码
		buyAmount : $.trim($('#jsTsBox').val()),//购买数量
		payType : $("select option:selected").eq(3).html(),//付费方式
		payTime : $("select option:selected").eq(4).attr("data-payTime"),//付费时间
		payMonth : parseFloat($("select option:selected").eq(4).attr("data-price")),//用户选择时间对应的月数
		totalMoney : parseFloat($('#allPrice').html()).toFixed(2)//合计费用
    };
    if(isg){
    	_data.bandWidth = $('#daik-inp').val();
    	_data.floatIp ='';//外网弹性IP null为无浮动IP绑定
		_data.intranetIp = '';//云主机的内网IP值
    	
    }else{
    	_data.bandWidth = '';
    	_data.floatIp = '';//外网弹性IP null为无浮动IP绑定
		_data.intranetIp = '';//云主机的内网IP值
    }
    $mark.show();
    console.log(_data)
	var ngurl_cpu = 'http://192.168.10.240:8001/computeCloudHost/createComputeCloudHost';
	$rootScope.ngAxjx(ngurl_cpu,_data,'',callback);
	function callback (json){
		console.log(json);
		$mark.hide();
		if(json.code == 200){
			window.location.href = 'http://127.0.0.1/sspaas/file/secondary/console/compute/cloudhost.html';
		}else{
			layer.alert(json.message);
			return;
		}
		
	}
}
}]);
