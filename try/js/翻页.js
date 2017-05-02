
$(function(){
//	getdata();
	setTimeout('getdata()', 3000);
});

function getdata(){
	var num = $("#cur_num").val();
//	$.ajax({
//	    url: 'data.php',
//		type: 'POST',
//		dataType: "json",
//		data:{'total':num},
//		cache: false,
//		timeout: 10000,
//		error: function(){},
//		success: function(data){
//			show_num(data.count);
//	    }
// 	});
	show_num(num);
}

function show_num(n){
	var it = $(".t_num em");
	var len = String(n).length;
	
	for(var i=0;i<len;i++){
		if(it.length<=i){
			$(".t_num").append("<em></em>");
		}
		var num=String(n).charAt(i);
		var y = -parseInt(num)*30;
		var obj = $(".t_num em").eq(i);
		console.log(String(y));
		obj.animate({
			backgroundPosition :'(0px '+String(y)+'px)' 
		}, 'slow','swing',function(){}
		);
	}
	$("#cur_num").val(n);
}
