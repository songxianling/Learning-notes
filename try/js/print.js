define('home.widget.games.detail.js.print',function(require,exports,module) {

	var $imglistbox = $(".js-b-common-gameimg-list"),
	    $btn = $(".js-b-common-gameimg-btn"),
	    $box = $(".js-b-common-gameimg-imglist");

	// var btn = ".js-b-common-gameimg-btn";
	var length = $imglistbox.find("li").length,
		imgR = 10,
		imgW = 260,
		imgA = imgW+imgR,
		boxW = 830,
		ulW = imgA*length-imgR;

    // 点击按钮图片滚动
	$btn.on("click",function(){
		if(!$box.is(":animated")){
			var _this = $(this),
				scrollSize = 0,
				scrollL = $box.scrollLeft(),
				scrollR = ulW-boxW-scrollL;
			if(_this.index()=="0" && scrollL>0){
				scrollSize = scrollL%imgA==0?imgA:scrollL%imgA;
				$box.animate({scrollLeft:(scrollL - scrollSize)},300);
			}else if(_this.index()=="1" && scrollR>0){
				scrollSize = scrollR%imgA==0?imgA:scrollR%imgA;
				$box.animate({scrollLeft:(scrollL + scrollSize)},300);
			}
		}
	});

	// 鼠标滚轮控制图片滚动
	var mousewheel = document.all?"mousewheel":"DOMMouseScroll";
	function stopScroll(e){
		e=e||window.event;
		if(e&&e.preventDefault){
			e.preventDefault();
			e.stopPropagation();
		}else{
			e.returnvalue=false;
			return false;
		}
	};
	$box.hover(function(){
		$(window).bind("mousewheel",stopScroll);
	},function(){
		$(window).unbind("mousewheel",stopScroll);
	});
	$box.on("mousewheel",function(event,delta){
		var _this = $(this),
			scrollL = $box.scrollLeft();
		if(delta>0){
			scrollL-=50;
		}else if(delta<0){
			scrollL+=50;
		}
		_this.scrollLeft(scrollL);
	});

	// 控制左右按钮状态
	function btnType(){
		var scrollL = $box.scrollLeft(),
			scrollR = ulW-boxW-scrollL;
		if(scrollL<=0 && scrollR<=0){
			$btn.removeClass("cur");
		}else if(scrollL<=0){
			$btn.eq(0).removeClass("cur");
		}else if(scrollR<=0){
			$btn.eq(1).removeClass("cur");
		}else{
			$btn.addClass("cur");
		}
	};
	$(document).ready(btnType);
	$box.on("scroll",btnType);

	//动态的获取图片数量乘以每个的宽度算出ul宽度
	$imglistbox.css({"width":ulW+"px"});

	//调用lightGallery插件
	$("#lightGallery").lightGallery();

});
