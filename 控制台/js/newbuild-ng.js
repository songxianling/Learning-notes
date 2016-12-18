//模拟数据
angular.module('sspaas', [])
.controller('myCtrl', ['$scope', function($scope) {
	$scope.cpudataList = [ //仿造数据
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
			"ffid":"0",
			"gnum":[
				{
			        "payTime": "1个月",
			        "ffdetaid":"1",
			        "price": "1"
		        },
		         {
			        "payTime": "2个月",
			        "ffdetaid":"2",
			        "price": "2"
		        },
		         {
			        "payTime": "3个月",
			        "ffdetaid":"3",
			        "price": "3"
		        },
		         {
			        "payTime": "4个月",
			        "ffdetaid":"4",
			        "price": "4"
		        },
		         {
			        "payTime": "5个月",
			        "ffdetaid":"5",
			        "price": "5"
		        },
		         {
			        "payTime": "6个月",
			        "ffdetaid":"6",
			        "price": "6"
		        },
		         {
			        "payTime": "7个月",
			        "ffdetaid":"7",
			        "price": "7"
		        },
		         {
			        "payTime": "8个月",
			        "ffdetaid":"8",
			        "price": "8"
		        },
		         {
			        "payTime": "9个月",
			        "ffdetaid":"9",
			        "price": "9"
		        },
		         {
			        "payTime": "10个月",
			        "ffdetaid":"10",
			        "price": "10"
		        },
		        {
					"payTime":"购置月末",
					"ffdetaid":"0",
					"price":"0.05"
				}
			]
		},
		{
			 "amode": "年付",
			 "ffid":"1",
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
			"ffid":"2",
			"gnum":[
				{
					"payTime":"小时",
					"ffdetaid":"0",
					"price":"0.0013888"
				}
			]
		}
	]
	
	  var a = $scope.optionArr['0'].amode;
		    $scope.xxx = '月付';
		  
		    $scope.ffdetails_list = $scope.optionArr[0].gnum;
			$scope.ffdenum = '1';
		    $scope.changeff = function () {
		    	$scope.ffdetails_list = $scope.optionArr[$("select option:selected").eq(3).val()].gnum; 
		  		$scope.ffdenum = $scope.ffdetails_list[$("select option:selected").eq(4).val()].price;
		    	allPrices()
		    }
		    $scope.changeffdeta = function () {	
		    	$scope.ffdenum =  $scope.ffdetails_list[$("select option:selected").eq(4).val()].price;
				allPrices();
		    }
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
]

var b = $scope.imagesImg[0].imag;
	$scope.xxx=b;
	$scope.jxdetails_list = null;
	$scope.jingFF = function  () {
		$scope.jxdetails_list = $scope.imagesImg[$("select option:selected").eq(0).val()].inum;
	};
	$scope.jingChange = function  () {
		$scope.jxdenum = $scope.jxdetails_list[$("select option:selected").eq(1).val()].details;
	}

//云主机主机名，系统，配置页面中的数据模拟
$scope.cloudhost=[
	{
		"zhujiming":"moumoumou1",
		"xitong" : "windows 14.6位1",
		"peizhi" : "peizhi1",
		"cipan" :"cipan1",
		"wangluo" : "wangluo1",
		"zhuangtai" : "zhuangtai1",
		"zhekou" : "zhekou1",
		"jifei" : "jifei1",
		"price" : "price1",
		"lastdata" : "lastdata1",
		"loginmessage" : "loginmessage1"
	},
	{
		"zhujiming":"moumoumou2",
		"xitong" : "windows 14.6位2",
		"peizhi" : "peizhi2",
		"cipan" :"cipan2",
		"wangluo" : "wangluo2",
		"zhuangtai" : "zhuangtai2",
		"zhekou" : "zhekou2",
		"jifei" : "jifei2",
		"price" : "price2",
		"lastdata" : "lastdata2",
		"loginmessage" : "loginmessage2"
	},
	{
		"zhujiming":"moumoumou3",
		"xitong" : "windows 14.6位3",
		"peizhi" : "peizhi3",
		"cipan" :"cipan3",
		"wangluo" : "wangluo3",
		"zhuangtai" : "zhuangtai3",
		"zhekou" : "zhekou3",
		"jifei" : "jifei3",
		"price" : "price3",
		"lastdata" : "lastdata3",
		"loginmessage" : "loginmessage3"
	}
]


//点击全选

 

$('.Aall').click(function  () {
	if($(this).attr('isCed')==='true'){
		$('.master_list_main').find('.checkYS').removeAttr('checked');
		$(this).removeAttr('isCed');
		$('.master_list_main').removeAttr('isBye');
		return;
	}
	$(this).attr('isCed','true');
	$('.master_list_main').attr('isBye','true');
	$('.master_list_main').find('.checkYS').prop('checked','true');
});

		
	
	$('.wode').click(function  () {
		delTr('btSelectItem');
			//这里传的这个btSelectItem是input的name值,之后要依据这个name去遍历查询
	})
	
	function delTr(btSelectItem) {
			//获取选中的复选框，然后循环遍历删除
			var ckbs = $("input[name=" + btSelectItem + "]:checked");
			if (ckbs.size() == 0) {//输出被jQuery选择器 选中的元素的数量
				//如果没有选中的时候,点击删除的时候,提醒一下~~~
				alert("要删除指定行，需选中要删除的行！");
				return;
			}
			ckbs.each(function() {
				$(this).parent().parent().remove();
			});
	}
	
	
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
			var price =Math.round(per*max);
			pris.children("div").remove();			
			mini.attr('value',price);		
			$scope.sjpNum = price;
			allPrices();

		}
		if(index==1){
			var price =Math.round(per*max);
			pris.children("div").remove();
			mini.attr('value',price);
			$scope.dkNum = price;
			allPrices();
			
		}
		if(index==2){			
			var price =Math.round(per*max);
			pris.children("div").remove();			
			mini.attr('value',price);
			$scope.cpNum = price;
			allPrices();
		}
	
	}
}
//这是上面定义的方法  在这里执行的;
	$scope.genal.show();
	
	//点击增加类
	var isg = true;
    function eleActive (ele) {
    	ele.off('click').on('click',function (){
    		var that = $(this);
    		that.addClass('biao_button_active').siblings().removeClass('biao_button_active');
    		that.index() == 0 ?$('.wai_net_ip').show() : $('.wai_net_ip').hide();
    		that.index() == 0 ?isg = true : isg = false;
    		allPrices();
    	})
    }
    eleActive($('.biao_button_ul li'));
	
	
	
	/**
	 * allPrices {function} -> 计算价格 的函数
	 */
	$scope.yzjallP = 39.00;
	allPrices();
	function allPrices () {
		var daik = 0,
			cpuandnc = $scope.cpuprice*1,
//			Tnum = $scope.Tnum*1,
			yjsInp = $('#bandwidthId').val()*1;
			shujuqian = 0.26*yjsInp;  //这个0.26是从后台获取的数据盘1G的价格	
//			fftype = $scope.ffNum == '购置月底'?day/30:$scope.fftypeprice*1;	
			fftype = $scope.ffdenum,
			Tnum = 1;
		if(isg){
			var daik_inp = $.trim($('#daik-inp').val())*1;
			if(daik_inp == 1){
//				dkzong = oneP_1;
				dkzong = 20;
			}else if(daik_inp == 2){
//				dkzong = oneP_2;
				dkzong = 40;
			}else if(daik_inp == 3){
//				dkzong = oneP_3;
				dkzong = 60;
			}else if(daik_inp == 4){
//				dkzong = oneP_4;
				dkzong = 80;
			}else if(daik_inp == 5){
//				dkzong = oneP_5;
				dkzong = 100;
			}else{
//				dkzong = oneP_6*1 + (daik_inp-5) * oneP_6_detail;
				dkzong = 200;
			}
		}else{
			dkzong = 0;
		}
//		
		var yunallZ = parseFloat((cpuandnc + shujuqian + dkzong) * fftype * Tnum.toFixed(2));
//		$scope.yzjallP = yunallZ.toFixed(2);
		$('#allPrice').html(yunallZ.toFixed(2)+'元');
//		console.log(cpuandnc,shujuqian,yunallZ,$scope.yzjallP,fftype)
	}
	
	
	
	
	
	
}]);
