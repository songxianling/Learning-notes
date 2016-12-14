 $(function() {   
    //点击增加类
    function eleActive (ele) {
    	ele.off('click').on('click',function (){
    		var that = $(this);
    		that.addClass('biao_button_active').siblings().removeClass('biao_button_active');
    	})
    }
    eleActive($('.biao_button_ul li'));
    
    $('.new_wai_p').click(function  () {
    	$('.wai_net_ip').toggle();
    })
})