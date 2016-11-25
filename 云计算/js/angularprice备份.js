var A = angular.module('myApp', []);
			//购物车 加
			A.directive('myAdds', function() {
					return {
						link: function(scope, element, attr) {
							element.click(function() {
								var This = this
								angular.forEach(scope.dataList, function(data, index, array) {
									if(attr.items == data.items) {
										data.num = parseInt(data.num) + 1;
										scope.allPrices();
										scope.$apply() //刷新视图
									}

								});
							});
						}
					}
				})
				//购物车 减
			A.directive('myMinus', function() {
					return {
						link: function(scope, element, attr) {
							element.click(function() {
								var This = this
								angular.forEach(scope.dataList, function(data, index, array) {

									if(attr.items == data.items) {

										if(data.num <= 1) {

											if(confirm('是否删除该产品')) {
												data.num = 0;
												$(This).siblings('input').val(0);
												scope.allPrices();
												scope.$apply();
												//delete array[index];
												scope.dataList.splice(index, 1)
												$(This).parents('tr').remove();
											}

										} else {
											data.num = parseInt(data.num) - 1;
										};

										scope.allPrices();
										scope.$apply();
									}
								});
							});
						}
					}
				})
				//全选，全不选
			A.directive('allOrcan', function() {
					return function(scope, element, attr) {
						element.click(function() {
							var isCheck = $(this).find('input').prop('checked');
							if(isCheck) {
								$('input[type=checkbox]').prop('checked', true);
							} else {
								$('input[type=checkbox]').not($('input[type=checkbox]').eq(0)).prop('checked', false);
							}
							angular.forEach(scope.dataList, function(data, index, array) {
								data.Bol = isCheck;
							})
							scope.allPrices();
							scope.$apply();
						})
					}
				})
				//单选
			A.directive('oneCheck', function() {
				return function(scope, element, attr) {
					element.click(function() {
						var This = this
						angular.forEach(scope.dataList, function(data, index, array) {
							if(attr.items == data.items) {
								var isCheck = $(This).prop('checked');
								data.Bol = isCheck;
								scope.allPrices();
								scope.$apply();
							}
						})
					});
				}
			})

			A.controller('myAngular', ['$scope', '$filter', function($scope, $filter) {
				$scope.cpudataList = [ //初始化购物车的数据
					{
						name: '1核',						
						oneprice: '10',
						Gnum:[{gn:'1G'},{gn:'2G'},{gn:'4G'}]
					},{
						name: '2核',
						oneprice: '20',
						Gnum:[{gn:'2G'},{gn:'4G'},{gn:'8G'}]
					},{
						name: '3核',
						oneprice: '30',
					},{
						name: '4核',
						oneprice: '40',
					},{
						name: '5核',
						oneprice: '50',
					},{
						name: '6核',
						oneprice: '60',
					},{
						name: '7核',
						oneprice: '70',
					},
				];
				//总价格的计算
				$scope.allPrices = function() {
					$scope.allprice = 0;
					angular.forEach($scope.dataList, function(data, index, array) {
						data.price = data.num * data.oneprice;
						
							$scope.allprice += parseInt(data.price);
						
					})

					return $scope.allprice;
				};

				//按单价排序
				$scope.CartSort = function(arg) {
					angular.forEach($scope.dataList, function(data, index, array) {
						arguments.callee['CartSort(' + arg + ')'] = !arguments.callee['CartSort(' + arg + ')']
						$scope.dataList = $filter('orderBy')($scope.dataList, arg, arguments.callee['CartSort(' + arg + ')'])
					})

				}

			}])