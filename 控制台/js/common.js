/**
 * @name 	公共方法文件
 * @authors 房文广 
 * @date    2016-11-26 12:29:05
 * 加班......好伤心
 */

sspaas = angular.module('sspaas',[]);

sspaas.controller('common', ['$scope','$rootScope','$http', function($scope,$rootScope,$http){
	//ngAxjx封装
	//ngUrl  	: 请求后台的url地址 
	//ngData 	: 后台需要的数据
	//callData	: 双向绑定的数据
	//callback	: 回调函数
	$rootScope.ngAxjx = function (ngUrl,ngData,callData,callback){
		ngUrl = ngUrl+'?callback=JSON_CALLBACK';
		$http.jsonp(ngUrl, {params:ngData}).success(function (json){
			if (typeof callback == 'function') {
				callback(json,callData);
			} else {
				$rootScope[callData] = json;
			}

		}).error(function (){
			console.log('失败了');
		});
	};

}])

var herfAll = {
	aHerf : function (href,con){
		window.location.href=href+"?&&"+con; 
	},

	aHerfCon : 	function AHerfCon(){
		return location.search.split("?&&")[1];	 
	},

};






