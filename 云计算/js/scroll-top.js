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
    
    var $rigBox_offtop = $('#elephent').offset().top;
    	$btoBox_offtop  =$('#js-fot-bto').offset().top;
	
	var rHeight = $btoBox_offtop-$rigBox_offtop-100;
	$('#elephent').css({		
		'height':rHeight+"px"
	})
	  
    
});
    	
    	    	


