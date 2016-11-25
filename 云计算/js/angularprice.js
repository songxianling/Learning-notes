var A = angular.module('myApp', []);			
			A.controller('myAngular', ['$scope', '$filter', function($scope, $filter) {
				$scope.cpudataList = [ //仿造数据
					{
						name: '1核',						
						oneprice: '10',
						Gnum:[{gn:'1G',price:'10'},{gn:'2G',price:'20'},{gn:'4G',price:'40'}]
					},{
						name: '2核',
						oneprice: '20',
						Gnum:[{gn:'2G',price:'20'},{gn:'4G',price:'40'},{gn:'6G',price:'60'}]
					},{
						name: '3核',
						oneprice: '30',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},{
						name: '4核',
						oneprice: '40',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},{
						name: '5核',
						oneprice: '50',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},{
						name: '6核',
						oneprice: '60',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},{
						name: '7核',
						oneprice: '70',
						Gnum:[{gn:'3G',price:'30'},{gn:'5G',price:'50'},{gn:'7G',price:'70'}]
					},
				];
				$scope.dataInfo = [{gn:'1G',price:'10'},{gn:'2G',price:'20'},{gn:'4G',price:'40'}];
				//总价格的计算
				$scope.allPrices = function() {
					$scope.allprice = 0;
					angular.forEach($scope.dataList, function(data, index, array) {
						data.price = data.num * data.oneprice;						
							$scope.allprice += parseInt(data.price);
						
					})

					return $scope.allprice;
				};
				
				//改变cpu的核数的代码
				$scope.selectFun = function(i){
					$scope.dataInfo = $scope.cpudataList[i].Gnum;
					$('.js-select li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
				}
				$scope.seleF =  function (i) {
					$('.js-selef li').eq(i).addClass('sele-li').siblings().removeClass('sele-li');
				}				
			}])