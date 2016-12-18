$(document).ready(function(){
// 折页
	$(".computer").click();
var $zongList = $(".zong")
$zongList.click(function(){	

    $(this).addClass("cur").next().slideToggle(500)
    .parent().siblings().children(".zong").removeClass("cur").next().slideUp(500);

    var $point=$('.one:eq(1)').children(".second");
    $point.on("click","li",function(){
    	var index=$(this).index();
		$('.control_main_right>div').eq(index).show().siblings().hide();
    })

   //	$(this).children(".control_main_center_tu").toggleClass('control_img').siblings().removeClass("control_img");
    var $arrow = $(this).find(".control_main_center_tu");
    if($arrow.hasClass('control_img')){
    	$arrow.removeClass("control_img");
    }else{
    	$zongList.find(".control_main_center_tu").removeClass('control_img');
    	$arrow.addClass('control_img');
    }
    
 })

    $('.second').on('click',"li",function(){
    	$(this).addClass("zhe_change").siblings().removeClass("zhe_change")
    });

// 折页下拉
//var flag = true;
//$('.control_main_top').on('click',function(){
//	if (flag == true) {
//			$('.xialia').slideDown(500);
//	}else{
//			$('.xialia').slideUp(500);
//	}
//		flag = !flag;
//})

$('.xialia ul li').on("click",function(){
	Ynum1 = $(this).html();
	$('.control_main_top span').html(Ynum1)
	$('.xialia').slideUp(500);
})


//nav下拉
$('.nav_right').on('click',function(){
	$('.nav_xiala').slideToggle(500);
	return false;
});
$(document).on("click",function(e){
	var ele = e.target;
	if(ele.id == 'nav_right'){
		return false;
	}else{
		$('.nav_xiala').slideUp(500);
	}
})

$('.nav_xiala ul li').on("click",function(){
	Ynum1 = $(this).html();
	$('.nav_right a span').html(Ynum1)
	$('.nav_xiala').slideUp(500);
})

// 更多操作
$('.change_xiala').on('click',function(){
	$('.more_join').slideToggle(500);
	return false;
});
$(document).on("click",function(e){
	var ele = e.target;
	if(ele.id == 'more_join'){
		return false;
	}else{
		$('.more_join').slideUp(500);
	}
})

$('.more_join ul li').on("click",function(){
	Ynum1 = $(this).html();
	$('.change_xiala').html(Ynum1)
	$('.more_join').slideUp(500);
})

$('.more_kong').on("click","li",function(){
	$('.old').eq($(this).index()).hide();
	$('.change').eq($(this).index()).show();
	$(".more_kong ul li span").eq($(this).index()).css({'color':"#9ebdff"})
	$(".more_kong ul li h6").eq($(this).index()).css({'background':"#9ebdff"})
})
$('.more_kong').on("mouseleave","li",function(){
	$('.old').eq($(this).index()).show();
	$('.change').eq($(this).index()).hide();
	$(".more_kong ul li span").eq($(this).index()).css({'color':"#475f92"})
	$(".more_kong ul li h6").eq($(this).index()).css({'background':"#475f92"})
})


// 主机名下拉

$('.more_kong_right_xiala').on('click',function(){
	$('.master_xiala').slideToggle(500);
	return false;
});
$(document).on("click",function(e){
	var ele = e.target;
	if(ele.id == 'master_xiala'){
		return false;
	}else{
		$('.master_xiala').slideUp(500);
	}
})

$('.master_xiala ul li').on("click",function(){
	Ynum1 = $(this).html();
	$('.more_kong_right_xiala span').html(Ynum1)
	$('.master_xiala').slideUp(500);
})



$(".control_btn").on("click","li",function(event){
	$(this).addClass('cur').siblings().removeClass('cur')
	 x=event.target; 
	if (x.id=='indexpage') {
		var n=1
		$('.gdan span:eq(0)').html(n)
	}else if (x.id=="prepage") {
		var len = $('.mirror_list_main').length;
		$('.gdan span:eq(1)').html(len-1)
	}else if (x.id=="lastpage") {
		alert("nishaya")
	};
})

// $(".control_btn").on("click","li:eq(0)",function(){
// 	$('')
// })


})