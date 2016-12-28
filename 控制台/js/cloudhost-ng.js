sspaas.controller('myCtrlHost', ['$scope','$rootScope','$http', function($scope,$rootScope,$http){
	
	//函数返回的参数
	$scope.dataList = '';
	//页数
	$scope.page = 1; 
	//行数
	$scope.rows = 10;
	//首页
	$scope.firstPage = "";
	//下一页
	$scope.nextPage = "";
	//上一页
	$scope.prevPage = "";
	//尾页
	$scope.lastPage = "";
	//总条数
	$scope.total = "";
	//总页数
	$scope.pages = "";
	//判断是否有下一页
	$scope.hasNextPage = "";
	//判断是否有上一页
	$scope.hasPreviousPage = "";
	//判断首页
	$scope.isFirstPage;
	//判断尾页
	$scope.isLastPage;
	//控制显示隐藏
	$scope.flag = true;
	//开始行数
	$scope.startRow = "";
	//最后行数
	$scope.endRow = "";
	
	angular.element(window).bind('load',function  () {
		nameAll($scope.page,$scope.rows);
	})
	
	//请求地址和请求方法执行
	function nameAll(page,rows) {
		$scope.ngUrl = 'http://192.168.10.240:8001/computeCloudHost/queryAllComputeCloudHostByPage';
		$rootScope.ngAxjx($scope.ngUrl,{'page':page,'rows':rows},'',callback);	
		function callback (json) {
				$scope.dataList = json.list;
				console.log(json);
				$scope.firstPage = json.firstPage;
				$scope.nextPage = json.nextPage;
				$scope.prevPage = json.prePage;
				$scope.lastPage = json.lastPage;
				$scope.total = json.total;
				$scope.pages = json.pages;
				$scope.page = json.pageNum;
				$scope.rows = json.pageSize;
				$scope.hasNextPage = json.hasNextPage;
				$scope.hasPreviousPage = json.hasPreviousPage;
				$scope.isFirstPage = json.isFirstPage;
				$scope.isLastPage = json.isLastPage;
				$scope.startRow = json.startRow;
				$scope.endRow = json.endRow;
				//判断是否为首页
				if($scope.isFirstPage){
					//如果是首页  不可用 
					$('.js_first').attr('disabled',true);
					$('.js_first').addClass('cur');
				}else{
					$('.js_first').removeClass('cur');
					$('.js_first').attr('disabled',false);
				}
				
				//判断是否为上一页
				if($scope.hasPreviousPage){
					//上一页为为true的时候  说明上一页可以点击
					$('.js_up').removeClass('cur');
					$('.js_up').attr('disabled',false);
				}else{
					$('.js_up').attr('disabled',true);
					$('.js_up').addClass('cur');
				}
				
				//判断是否为下一页
				if($scope.hasNextPage){
					$('.js_next').removeClass('cur');
					$('.js_next').attr('disabled',false);
				}else{
					$('.js_next').attr('disabled',true);
					$('.js_next').addClass('cur');
				}
				//判断是否为尾页
				if($scope.isLastPage){
					//如果的是尾页的话  不可用
					$('.js_last').attr('disabled',true);
				    $('.js_last').addClass('cur');
				}else{
					$('.js_last').removeClass('cur');
					$('.js_last').attr('disabled',false);
				}
				
				
		
				
		}
	}
	

	//首页
	$scope.first = function(){
		if(!$scope.isFirstPage){
			//如果是首页  不可用 
			$('.js_first').removeClass('cur');
			$('.js_first').attr('disabled',false);
			nameAll($scope.firstPage,$scope.rows) 
		}else{
			$('.js_first cur').attr('disabled',true);
			$('.js_first cur').addClass('cur');
		}
		
	}
	//下一页
	$scope.next = function(){
		if($scope.hasNextPage){
			$('.js_next').removeClass('cur');
			$('.js_next').attr('disabled',false);
			nameAll($scope.nextPage,$scope.rows)
		}else {
			$('.js_next').addClass('cur');
			$('.js_next').attr('disabled',true);
		}
	}
	//上一页
	$scope.prev = function(){
		if($scope.hasPreviousPage){
			//如果是上一页
			$('.js_up').removeClass('cur');
			$('.js_up').attr('disabled',false);
			nameAll($scope.prevPage,$scope.rows)
		}else{
			$('.js_up').attr('disabled',true);
			$('.js_up').addClass('cur');
		}
	}
	//尾页
	$scope.last = function(){
		if(!$scope.isLastPage){
			//如果的是尾页的话  不可用
			$('.js_last').attr('disabled',true);
		    $('.js_last').addClass('cur');
		    nameAll($scope.lastPage,$scope.rows)
		}else{
			$('.js_last').removeClass('cur');
			$('.js_last').attr('disabled',false);
		}
	}
	
	var indexCur = '';
  
    //主机名
    $scope.serverName = '';
    //主机id
    $scope.unbindServerId = "";
    
    //只能选择一个
    $scope.updateSelection = function(index, dataList,uuid,name,unbindserverId) {
    	$scope.currentUuid = uuid;
     	$scope.serverName = name;
     	$scope.unbindServerId = unbindserverId;
    	
		if (!indexCur == '') {
  			$scope.dataList[indexCur].checked = false;
      	}
		
      	if (indexCur == 0) {
      		$scope.dataList[0].checked = false;
      	}

      	if($scope.dataList[index].checked  = true){
      		indexCur = index;
      		console.log(index);
      		//点击启动
      		$scope.beginBiad = function  () {
		    	console.log(indexCur);
		    	
		    }
      		//点击关机
      		$scope.shutDown = function  () {
      			console.log(indexCur);
      		}
    		//点击重启
    		$scope.restart =function  () {
    			console.log(indexCur);
    		}
    		//点击终端
    		$scope.terminal = function  () {
    			console.log(indexCur);
    		}
    		//重置密码
    		$scope.resetPass = function  () {
    			console.log(indexCur);
    		}
    		//删除
    		$scope.deleteButton = function  () {
    			console.log(indexCur);
    		}
    	}
    }
    
    
}]);