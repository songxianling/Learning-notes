
// 获取验证码倒计时
var timer,
	wati = 60 ;
	
// 倒计时函数
function time (ele) {
	if(wati == 0){
		ele.removeClass('no-click');
		wati = 60;
		ele.val('重新获取');
		yzm_va = true;
		clearTimeout(timer);
	}else{
		ele.addClass('no-click');
		wati--;
		ele.val(wati + 's后重试');
		timer = setTimeout(function () {
			time(ele);
		},1000)
	}
}

var $gsms = $('#js-gsms'),
	mobile = $('#js-mobile').val(),
	yzm_va = true; //验证码按钮ajax前的限制


$gsms.on('click',function () {
	if(yzm_va){
		yzm_va = false;
		var _data = {
			mobile : mobile
		}
		var urlyan = 'http://192.168.10.240:8001/computeCloudHost/sendPhoneMessageCode';
//		$rootScope.ngAxjx(urlyan,_data,'',callback);
//		function callback (data){
//			if(data.errcode == 200){
				time($gsms);
//			}else{
				//未能进行获取手机验证码（可能系统繁忙）的错误信息
//				yzm_va = true;
//			}
//		}
	}else{
		//  ajax没有返回值之前的逻辑
	}
	
})