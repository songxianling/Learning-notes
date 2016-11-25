/*11.11  陈晓英*/	

	// 滚动条后面的加减操作
	var $yjia = $('#Yjia'),
		$yjian = $('#Yjian'),
		$ysinp = $('.yun_right_input').attr("value")*1;
		
	$yjia.on('click',function () {
		//$ysinp = parseInt($ysinp);
		//console.log($ysinp);
		if($ysinp == 0){
			$ysinp = 100;
		}else{
			$ysinp +=10;
		}
		
		$('.yun_right_input').attr("value",$ysinp);
		$('.sheng').css('width',($ysinp/10)+'px');
		$('#btn').css('left',($ysinp/10)-8+'px');
	});
	$yjian.on('click',function () {
		
		if($ysinp < 110){
			$ysinp = 0;
		}else{
			$ysinp -=10;
		}
		$('.yun_right_input').val($ysinp);	
		$('.sheng').css('width',($ysinp/10)+'px');	
		$('#btn').css('left',($ysinp/10)-8+'px');
	});
	
	//input里面的值		
	$('.yun_right_input').on('blur',function () {	
		var _this = $(this);
			$ysinp = _this.val()*1;		
		$('.yun_right_input').val($ysinp);
		$('.sheng').css('width',($ysinp/10)+'px');
		$('#btn').css('left',($ysinp/10)-8+'px');
		console.log($ysinp);	
	});

	// 滚动条后面的加减操作
	var $Wjia = $('#Wjia'),
		$Wjian = $('#Wjian'),
		$Wsinp = $('.right_input').attr("value")*1;
		
	$Wjia.on('click',function () {
		//$ysinp = parseInt($ysinp);
		
		if($Wsinp == 0){
			$Wsinp = 100;
		}else{
			$Wsinp +=10;
		}
		
		$('.right_input').attr("value",$Wsinp);
		$('.Wsheng').css('width',($Wsinp/10)+'px');
		$('#btnB').css('left',($Wsinp/10)-8+'px');
	});
	$Wjian.on('click',function () {
		
		if($Wsinp < 110){
			$Wsinp = 0;
		}else{
			$Wsinp -=10;
		}
		$('.right_input').val($Wsinp);	
		$('.Wsheng').css('width',($Wsinp/10)+'px');	
		$('#btnB').css('left',($Wsinp/10)-8+'px');
	});
	
	//input里面的值		
	$('.right_input').on('blur',function () {	
		var _this = $(this);
			$Wsinp = _this.val()*1;		
		$('.right_input').val($Wsinp);
		$('.Wsheng').css('width',($Wsinp/10)+'px');
		$('#btnB').css('left',($Wsinp/10)-8+'px');
			
	});
