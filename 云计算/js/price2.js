/*价格计算器的js 陈晓英*/

$(document).ready(function function_name () {			
	var $seleAll = $('#jsSeleAll'),
		$yzjBox = $('#jsYjsOuterBox'),		
		$wlBox=$('#jsWlOuterBox'),
		$yypBox=$('#jsYypOuterBox'),
		
		$left_con=$('.left_con'),
		$sele_con = $('#js-selebox>div');
	   $seleAll.on('click','li',function () {	 
			var _this = $(this);
			_this.addClass('cur').siblings().removeClass('cur');
			$sele_con.eq(_this.index()).show().siblings().hide();				
	});

	
	/*
	 * 公共方法  点击增加外面的红边框
	 * seleauto -> 为ul里面的li执行选中操作
	 * ele ->  要求为jQuery对象
	 */
	function seleauto(ele) {
	//	var _this = ele.find('li');	
		ele.off('click').on('click',function () {
			
			that.addClass('sele-li').siblings().removeClass('sele-li');	
			var that = $(this);
			that.css('border-color','transparent').siblings().css('border-color','#e1e1e1')
		});	
	};
	seleauto($('.js-select li'));
	// 修改价格清单里面的总价格的值
	function totalPeice() {
		var sum = 0;
		$('.jsJG').each(function () {
			sum +=$(this).html()*1;
		})
		$jgqd.html(sum.toFixed(2));
		
	};
	
	/*
	 * 每个类型价格的总价计算
	 * obj ->让谁变，就传谁
	 * eaf ->类型对于的小计的类名
	 */
	function typePeice (obj,eaf) {

		var o = 0;
		eaf.each(function () {
		
			
			o +=$(this).html()*1;
		});
		obj.html("￥"+o.toFixed(2));
	}
	
	var $rightBox = $('.price_right');
	
	/*云主机点击加入清单*/
	var $Yjsjion=$('#Yjsjion'), //增加的按键
		$jgqd = $('#jsJgqd'),  //价格清单价格元素
		$type_yzj = $('#js_type_yzj'), //类型小计的总钱数
		$yzj_evone;
	 $Yjsjion.click(function  () {	
	 	$('#js_yjz_slide_box').append('<div class="qd_xiaoji_box" de="1">'+
	 										'<span>￥</span><span class="qd_xiaoji js_yzj_evone">'+snum+'</span><span> > </span>'+
	 									'</div>');
	 	$('#js_yjz_slide_box').append('<li class="right_three" id="right_three" style="display:none">'+
						'<p>云主机</p>'+
						'<p><span class="jsJG">'+snum+'</span>元</p>'+
						'<p><span>地域 :</span><span>'+$('#jsQyBoxOne .sele-li').html()+'</span></p>'+
						'<div>'+
							'<div>配置 :</div>'+
							'<div>'+
								'<span>CPU:</span><span>'+$('#jsCpuBox .sele-li').html()+'</span>'+'    '+
								'<span>内存:</span><span>'+$('#jsNcBox .sele-li').html()+'</span>'+'    '+
								'<span>镜像:</span><span>'+$('#jsJxBox .sele-li').html()+'</span>'+'    '+
								'<span>数据盘 :</span><span></span>'+'    '+
								'<span>数量 :</span><span>'+$('#jsTsBox').val()+'台'+'</span>'+'    '+
								'<span>付费方式 :</span><span>'+$('#jsFfBox .sele-li').html()+'</span>'+
							'</div>'+
							
						'</div>'+
						'<div class="shop_delete">'+			
							'<a href="javascript:;" title="删除" ><img src="images/delete.png" class="delete" dele-type="1"/></a>'+						
							'<a href="javascript:;" title="去购买"><img src="images/shop.png" alt="" /></a>'+										
						'</div>'+
					'</li>');		
		totalPeice();
		$yzj_evone = $('.js_yzj_evone');
		
		typePeice($type_yzj,$yzj_evone);
	 });
	 
	 
	var $qdul = $('.js-qdul');
	var ok = true,
		timedow  = null;
	$qdul.on('click',function () {
		clearInterval(timedow);
		if(ok){
			ok = false;			
			var _this = $(this);
			_this.next('div').slideToggle(500);
		}		
		timedow = setInterval(function () {
			ok = true;
		},500)
	});	
	$rightBox.on('click','.qd_xiaoji_box',function () {
		var _this = $(this);
		_this.next('li').slideToggle(500);
	});	
	
	
	  
	  /*网络的添加*/
	var $Wljion=$('#Wljion'),
	 	$type_wl = $('#js_type_wl'), //类型小计的总钱数
		$wl_evone;
	 $Wljion.click(function  () {
	 	if($type_yzj.html() == "￥0.00"){
	 		alert('请先选购云主机~~~');
	 		return;
	 	}
	 	$('#js_wl_slide_box').append('<div class="qd_xiaoji_box">'+
	 										'<span>￥</span><span class="qd_xiaoji js_wl_evone">'+wnum+'</span><span> > </span>'+
	 									'</div>');
	 	$('#js_wl_slide_box').append('<li class="right_three" id="right_three" style="display:none">'+
						'<p>网络</p>'+
						'<p><span class="jsJG">'+wnum+'</span>元</p>'+
						'<p><span>地域 :</span><span>'+$('#jsQyBoxThree .sele-li').html()+'</span></p>'+
						'<div>'+
							'<div>配置 :</div>'+
							'<div>'+
								'<span>计费方式:</span><span>'+$('#wlDk .sele-li').html()+'</span>'+'    '+
								'<span>带宽:</span><span>'+ +'</span>'+'    '+														
								'<span>数量 :</span><span>'+$('#jsWTsBox').val()+'台'+'</span>'+'    '+
								'<span>付费方式 :</span><span>'+$('#jsFfBoxThree .sele-li').html()+'</span>'+
							'</div>'+
							
						'</div>'+
						'<div class="shop_delete">'+			
							'<a href="javascript:;" title="删除" ><img src="images/delete.png" class="delete" dele-type="2"/></a>'+						
							'<a href="javascript:;" title="去购买"><img src="images/shop.png" alt="" /></a>'+										
						'</div>'+
					'</li>')
	 	totalPeice();
	 	$wl_evone = $('.js_wl_evone');
		typePeice($type_wl,$wl_evone);
	 });
	 
	 
	 
	 
	 
	 
	
	
	 /*云硬盘的添加*/
	var $Yypjion=$('#Yypjion'),
		$type_yyp = $('#js_type_yyp'),
	 	$yyp_evone;
	 $Yypjion.click(function  () {
	 	if($type_yzj.html() == "￥0.00"){
	 		alert('请先选购云主机~~~');
	 		return;
	 	}
	 	$('#js_yyp_slide_box').append('<div class="qd_xiaoji_box">'+
	 										'<span>￥</span><span class="qd_xiaoji js_yyp_evone">'+pnum+'</span><span> > </span>'+
	 									'</div>');
	 	$('#js_yyp_slide_box').append('<li class="right_three" id="right_three" style="display:none">'+
						'<p>云硬盘</p>'+
						'<p class="money_yuan"><span class="jsJG">'+pnum+'</span>元</p>'+
						'<p><span>地域 :</span><span>'+$('#jsQyBoxFour .sele-li').html()+'</span></p>'+
						'<div>'+
							'<div>配置 :</div>'+
							'<div>'+							
								'<span>数据盘:</span><span>'+ +'</span>'+'    '+														
								'<span>数量 :</span><span>'+$('#jsYpTsBox').val()+'台'+'</span>'+'    '+
								'<span>付费方式 :</span><span>'+$('#jsFfBoxFour .sele-li').html()+'</span>'+
							'</div>'+						
						'</div>'+
						'<div class="shop_delete">'+			
							'<a href="javascript:;  " title="删除" ><img src="images/delete.png" class="delete" dele-type="4"/></a>'+						
							'<a href="javascript:;" title="去购买"><img src="images/shop.png" alt="" /></a>'+										
						'</div>'+
					'</li>');
					
	 	totalPeice();
	 	$yyp_evone = $('.js_yyp_evone');
		typePeice($type_yyp,$yyp_evone);
	 });
	      
	/*点击删除项*/
	$rightBox.on('click','.delete',function () {
		var _this = $(this);	
		_this.parent().parent().parent().prev().remove();
		_this.parent().parent().parent().remove();
		if(_this.attr('dele-type') == 1){
			$yzj_evone = $('.js_yzj_evone');
			typePeice($type_yzj,$yzj_evone);
		}else if(_this.attr('dele-type') == 2){
			$wl_evone = $('.js_wl_evone');
			typePeice($type_wl,$wl_evone);
		}else{
			$yyp_evone = $('.js_yyp_evone');
			typePeice($type_yyp,$yyp_evone);
		}	
		// 修改价格清单的总价格
		totalPeice();
	});
	
	//   数量增加操作
	/*云主机数量的增减*/
	
	function jiaNum(num,inp,th) {
		if(num > 4){
			alert('最大数量要保持在5台以下哦！~~');
			return;
		}
		if(th.attr('zenga') == 1){
			//云主机
			Ynum1 ++;
			inp.val(Ynum1);
		}
		
		if(th.attr('zenga') == 3){
			// 网络
			Ynum3 ++;
			inp.val(Ynum3);
		}
		if(th.attr('zenga') == 4){
			//云硬盘
			Ynum4 ++;
			inp.val(Ynum4);
		}
		th.addClass('du_li').siblings().removeClass('du_li');	
	};
	function jianNum(num,inp,th) {
		if(num <= 1){
			alert('数量要保持在1台以上哦！~~');
			return false;
		}
		
		if(th.attr('jiana') == 1){
			//云主机
			Ynum1 --;
			inp.val(Ynum1);
		}
		
		if(th.attr('jiana') == 3){
			// 网络
			Ynum3 --;
			inp.val(Ynum3);
		}
		if(th.attr('jiana') == 4){
			//云硬盘
			Ynum4 --;
			inp.val(Ynum4);
		}	
		th.addClass('du_li').siblings().removeClass('du_li');	
	};
		
	
	
	
	var Ynum1  = $('#jsTsBox').val(),
		$Yrisen1  = $('#jsYrisen'),
		$Yreduce1 = $('#jsYreduce');
		
	$Yrisen1.on('click',function () {
		jiaNum(Ynum1,$('#jsTsBox'),$(this));	
	});	
	
	$Yreduce1.on('click',function () {	
		jianNum(Ynum1,$('#jsTsBox'),$(this));	
	});	
	
	$('#jsTsBox').on('blur',function () {
		if($(this).val() == "0"){
			alert('数量要保持在1台以上哦！~~');
			$('#jsTsBox').val(1);
			return;
		}
		Ynum1 = $(this).val();
		$('#jsTsBox').val(Ynum1);
	});
	
	
	/*网络的数量的增减*/
	var Ynum3  = $('#jsWTsBox').val(),
		$Yrisen3  = $('#jsWrisen'),
		$Yreduce3 = $('#jsWreduce');	
	$Yrisen3.on('click',function () {
		jiaNum(Ynum3,$('#jsWTsBox'),$(this));
	});	
	$Yreduce3.on('click',function () {
		jianNum(Ynum3,$('#jsWTsBox'),$(this));
	});
	$('#jsWTsBox').on('blur',function () {
		if($(this).val() == "0"){
			alert('数量要保持在1台以上哦！~~');
			$('#jsWTsBox').val(1);
			return;
		}
		Ynum3 = $(this).val();
		$('#jsWTsBox').val(Ynum3);
	});
	
	/*云硬盘数量的增减*/
	var Ynum4  = $('#jsYpTsBox').val(),
		$Yrisen4  = $('#jsPrisen'),
		$Yreduce4 = $('#jsPreduce');	
	$Yrisen4.on('click',function () {
		jiaNum(Ynum4,$('#jsYpTsBox'),$(this));
	});	
	$Yreduce4.on('click',function () {	
		jianNum(Ynum4,$('#jsYpTsBox'),$(this));
	});	
	$('#jsYpTsBox').on('blur',function () {
		if($(this).val() == "0"){
			alert('数量要保持在1台以上哦！~~');
			$('#jsYpTsBox').val(1);
			return;
		}
		Ynum4 = $(this).val();
		$('#jsYpTsBox').val(Ynum4);
	});
	
	//   数量增加操作结束
	
	//云主机部分数据盘的滚动条
	
	// 滚动条后面的加减操作
	var $yjia = $('#Yjia'),
		$yjian = $('#Yjian'),
		$ysinp = $('.preview').attr("value")*1;
		
	$yjia.on('click',function () {
		//$ysinp = parseInt($ysinp);
		if($ysinp == 0){
			$ysinp = 100;
		}else{
			$ysinp +=10;
		}
		
		$('.preview').attr("value",$ysinp);
		$('.sheng').css('width',($ysinp/10)+'px');
		$('#btn').css('left',($ysinp/10)-8+'px');
	});
	$yjian.on('click',function () {
		
		if($ysinp < 110){
			$ysinp = 0;
		}else{
			$ysinp -=10;
		}
		$('.preview').val($ysinp);	
		$('.sheng').css('width',($ysinp/10)+'px');	
		$('#btn').css('left',($ysinp/10)-8+'px');
	});
	
	
	
	
	$('.preview').on('blur',function () {	
		var _this = $(this);
			$ysinp = _this.val()*1;		
		$('.preview').val($ysinp);
		$('.sheng').css('width',($ysinp/10)+'px');
		$('#btn').css('left',($ysinp/10)-8+'px');
//		console.log($ysinp);	
	});

	//这里是点击包年包月的地方
	var $nian_yue=$('.nian_yue'),
	    $pan_anxu=$('.an_xu');
		
	function baoAll (inc) {
		$nian_yue.click(function  () {	
			inc.show();
		});
	}
	baoAll ($('#jsFfBoxFour'));
	baoAll ($('#jsFfBox'));
	baoAll ($('#jsFfBoxTwo'));
	baoAll ($('#jsFfBoxThree'));
	//这里是按需的地方
	function anxu (inct) {
		$pan_anxu.click(function  () {		
			inct.hide();
			
		});
	}
	anxu ($('#jsFfBoxFour'));
	anxu ($('#jsFfBox'));
	anxu ($('#jsFfBoxTwo'));
	anxu ($('#jsFfBoxThree'));

});

$(document).scroll(function  () {
	var window_scro=$(window).scrollTop();	
	if(window_scro > 213){
        $('.price_three_one').addClass('scro');
    };
    if(window_scro < 213) {
        $('.price_three_one').removeClass('scro');
    };
});
$(document).scroll(function  () {
	var window_scro=$(window).scrollTop();
	
	if(window_scro >94){
        $('.price_right').addClass('scro');
    };
    if(window_scro <94){
        $('.price_right').removeClass('scro');
    };

});