$(document).scroll(function  () {
	var window_scro=$(window).scrollTop();	
	if(window_scro > 213){
        $('.price_three_one').addClass('scro');
    };
    if(window_scro < 213) {
        $('.price_three_one').removeClass('scro');
    };
    if(window_scro >94){
        $('.price_right').addClass('scro');
    };
    if(window_scro <94){
        $('.price_right').removeClass('scro');
    };
    
    var $rigBox_offtop = $('#js-price-right').offset().top;
    	$btoBox_offtop  =$('#js-fot-bto').offset().top;
	
	var rHeight = $btoBox_offtop-$rigBox_offtop;
	$('#js-price-right').css({
		'overflowX':'hidden',
		'overflowY':'auto',
		'height':rHeight+"px"
	})
//	.mouseenter(function () {
//		$(this).css('overflow','auto');
//	}).mouseleave(function () {
//		$(this).css('overflow','hidden');
//	});
    	
    	
    	
    
    
    
    
    
});
