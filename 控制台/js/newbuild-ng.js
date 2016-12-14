//付费方式的模拟数据
angular.module('sspaas', [])
.controller('myCtrl', ['$scope', function($scope) {
	$scope.optionArr=[
		{
			'amode':'按需',
			'gnum':[
				{
					'payTime':'小时',
					'price':'0.0013888'
				}
			]
		},
		{
			'amode':'按月',
			'gnum':[
				{
					"payTime":"购置月末",
					"price":"0.05"
				},
				{
			        "payTime": "1",
			        "price": "1"
		        },
		         {
			        "payTime": "2",
			        "price": "2"
		        },
		         {
			        "payTime": "3",
			        "price": "3"
		        },
		         {
			        "payTime": "4",
			        "price": "4"
		        },
		         {
			        "payTime": "5",
			        "price": "5"
		        },
		         {
			        "payTime": "6",
			        "price": "6"
		        },
		         {
			        "payTime": "7",
			        "price": "7"
		        },
		         {
			        "payTime": "8",
			        "price": "8"
		        },
		         {
			        "payTime": "9",
			        "price": "9"
		        },
		         {
			        "payTime": "10",
			        "price": "10"
		        }
		    
			]
		},
		{
			 "amode": "按年",
			 "gnum" : [
			 	{
			 		"payTime": "1",
			        "price": "10"
			 	},
			 	{
			 		"payTime": "2",
			        "price": "18"
			 	},
			 	{
			 		"payTime": "3",
			        "price": "27"
			 	}
			 ]
		}
	]
	
	  var a = $scope.optionArr['0'].amode;
		    $scope.xxx = a;
		    $scope.ffdetails_list = null;
		    $scope.changeff = function () {	
		    	console.log(89)
		    	$scope.ffdetails_list = $scope.optionArr[$("select option:selected").eq(1).val()].gnum; 
		    }
		    $scope.changeffdeta = function () {		    	 
		    	$scope.ffdenum =  $scope.ffdetails_list[$("select option:selected").eq(2).val()].price;
		    }
	
	
}]);
