angular.module('sspaas', [])
.controller('myCtrl', ['$scope', function($scope) {
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

//绑定到页面中
$scope.abc;
$scope.cloudhostdetail=function  (item) {
	$scope.abc=$scope.cloudhostdetail[0];

};
console.log($scope.abc)	   

//点击全选
function seleAll (item) {
	console.log(666)
	if($(this).attr('isCed')==='true'){
		$('#isBye').find('#checkYS').removeAttr('checked');
		$(this).removeAttr('isCed');
		$('#isBye').removeAttr('isBye');
		return;
	}
	$(this).attr('isCed','true');
	$('#isBye').attr('isBye','true');
	$('#isBye').find('#checkYS').prop('checked','true');
}
	seleAll();
}]);