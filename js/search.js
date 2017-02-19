
// 搜索类型切换

var $se_type = $('#js-search-type'),
	$se_inp = $('#js-search-inp'),
	$se_ul = $('#js-search-ul'),
	$se_btn = $('#js-search-btn');

$se_type.on('click',function () {
	event.stopPropagation();
	$se_ul.show();
});

// ul ->li ->click
$se_ul.on('click','li',function () {
	$se_type.html($(this).html());	
	$se_ul.hide(); 	
});

$(document).on('click',function () {
	$se_ul.hide(); 
});

$se_btn.on('click',function () {
	_dataType = $se_type.html()=='全部' ? 1 : $se_type.html()=='IP' ? 2 : 3;
	console.log(_dataType);
});

