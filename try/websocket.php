<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = '聊天室-workerman';
?>
<script src="http://code.jquery.com/jquery-latest.js"></script>

<style>
.qqFace { margin-top: 4px; background: #fff; padding: 2px; border: 1px #dfe6f6 solid;}
.qqFace table td { padding: 0px;}
.qqFace table td img { cursor: pointer; border: 1px #fff solid;}
.qqFace table td img:hover { border: 1px #0066cc solid;}
</style>

<script>
var _name = "<?= Yii::$app->user->identity->username?>";
var _user_id = "<?= Yii::$app->user->identity->id?>";

$(document).ready(function(){
	
	//在线用户、我的好友切换
	$('.chat-online font').click(function(){
		$('.chat-online font').css('color', 'white');
		$(this).css('color', 'green');
		alert($(this).attr('data-action'));
	});

	//切换群组

	$(document).on('change', '#group_list', function(){
		ws.close();
	});
	//建立请求链接
	connect();

	//建群
	$('#groupButton').click(function(){
		if(! $(this).attr('is-lock')){
			$('#group_name').show();
			$(this).attr('is-lock',1).html('确定').after('<button id="cannel_group_button" class="btn btn-default">取消</button>');
		}else{ //发送请求
			ws.send('{"type":"create_group","group_name":"'+$('#group_name').val()+'"}');

		}
		
	});

	//取消建群
	$(document).on('click', '#cannel_group_button', function(){
		$('#group_name').val('').hide();
		$('#groupButton').html('建立群组').removeAttr('is-lock');
		$(this).remove();
	});

	$('#sendMsg').click(function(){
		var _content = $('#msg').html();
		$('#msg').focus();
		if(!_content){
			var _i = 0;
			var _st = setInterval(function(){
				if(_i == 4){
					clearInterval(_st);
					return false;
				}
				var _border = _i%2 ? '1px solid gray' : '3px solid red';
				$('#msg').css('border', _border);
				_i++;
			}, 150);
			return false;
		}
		var _data = '{"type":"msg","channel":"text","content":"'+_content+'", "to_user_id":"'+$('#users').val()+'"}';
		ws.send(_data);
		$('#msg').html('');
	});

	$('#sendImg').click(function(){
		$('input[type="file"]').click();
	});

	$('#qqFace').qqFace({
		assign:'msg', 
		path:'static/images/qq_face/'//表情存放的路径
	});

	//加入直播
	$(document).on('click', '#join_live_button', function(){
		var receiver_socket = new WebSocket("ws://"+document.domain+":8008");
        var image = document.getElementById('receiver');
        receiver_socket.onmessage = function(data){
            image.src=data.data;
        };
        receiver_socket.onopen=function(){
        	receiver_socket.send('{"live_client_id":"'+$('#join_live_button').attr('data-live-client-id')+'"}');
        };
	});

	//开启直播
	$('#liveButton').click(function(){
		var socket = new WebSocket("ws://"+document.domain+":8080");
        var back = document.getElementById('output');
        var backcontext = back.getContext('2d');
        var video = document.getElementsByTagName('video')[0];
        
        var success = function(stream){
            video.src = window.URL.createObjectURL(stream);
        }

        socket.onopen = function(e){
            draw();
        }
        socket.onmessage = function(data){
        	var _data = eval("("+data.data+")");
        	//通知server端
	        ws.send('{"type":"live_start", "user_id":"'+_user_id+'", "client_name":"'+_name+'", "group_id":"'+$('#group_list').val()+'","live_client_id":"'+_data.live_client_id+'"}');
        };

        var draw = function(){
            try{
                backcontext.drawImage(video,0,0, back.width, back.height);
            }catch(e){
                if(e.name == "NS_ERROR_NOT_AVAILABLE"){
                    return setTimeout(draw, 100);
                }else{
                    throw e;
                }
            }
            if(video.src){
                socket.send(back.toDataURL("image/jpeg", 0.5));
            }
            setTimeout(draw, 100);
        }
        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia || navigator.msGetUserMedia;
        navigator.getUserMedia({video:true, audio:true}, success, console.log);
	});

	//好友申请操作
	$(document).on('click', 'a[data-user-id]', function(){
		if(! $(this).attr('is-lock')){
			var _to_user_id = $(this).attr('data-user-id');
			_to_user_id = parseInt(_to_user_id);
			ws.send('{"type":"add_friends_request", "to_user_id":"'+_to_user_id+'"}');
			$(this).html('等待好友确定').attr('is-lock', 1);
		}
	});

	//同意、拒绝好友添加
	$('button[data-action-friend]').click(function(){
		ws.send('{"type":"add_friend_result", "to_user_id":"'+$('input[name="request_from_id"]').val()+'","result":"'+($(this).attr('data-action-friend')=='refuse'?0:1)+'"}');
	});
});

function loadImg(){
	// $.each($('input[type="file"]')[0].files, function(i, n){
	// 	var url = window.URL.createObjectURL(n);
 //        // 创建预览图片
 //        var img = new Image();
 //        img.src = url;
 //        img.style.width = "80px";
 //        img.style.height = "80px";
 //        ws.send('{"type":"msg","channel":"pic","content":"'+url+'","to_user_id":"'+$('#users').val()+'"}');

	// });
	// return false;
	$.each($('input[type="file"]')[0].files, function(i, n){
		console.log(i);

		//创建读取文件的对象
		var reader = new FileReader();

		//为文件读取成功设置事件
		reader.onload=function(e){
			console.log('发送图片'+i);
	      ws.send('{"type":"msg","channel":"pic","content":"'+this.result+'","to_user_id":"'+$('#users').val()+'"}');
		};
		reader.error=function(){
			console.log('上传失败');
		};
		reader.onprogress=function(e){
			
			console.log('读取中');
			console.log(e.loaded);
			console.log(e.lengthComputable);
			console.log(e.total);
			console.log(parseFloat(e.loaded/e.total)*100);

			$('#Progress').val((e.loaded/e.total)*100);

		};
		reader.onloadstart=function(){
			$('label, #Progress').show();
			console.log('读取开始时触发');
		};
		reader.onloadend=function(){
			setTimeout(function(){
				$('label, #Progress').hide();
			}, 3000);
			
			console.log('读取完成触发，无论成功或失败');	
		}
	    
		//正式读取文件  
		reader.readAsDataURL(n);  
	});
	return false;
	//获取文件  
	var file = $('input[type="file"]')[0].files[0];

	//创建读取文件的对象
	var reader = new FileReader();

	//为文件读取成功设置事件
	reader.onload=function(e){
      ws.send('{"type":"msg","channel":"pic","content":"'+this.result+'","to_user_id":"'+$('#users').val()+'"}');
	};
	reader.error=function(){
		console.log('上传失败');
	};
	reader.onprogress=function(e){
		console.log('读取中');
		console.log(e.loaded);
		console.log(e.lengthComputable);
		console.log(e.total);
		console.log(parseFloat(e.loaded/e.total)*100);

		$('#Progress').val((e.loaded/e.total)*100);
	};
	reader.onloadstart=function(){
		console.log('读取开始时触发');
	};
	reader.onloadend=function(){
		console.log('读取完成触发，无论成功或失败');	
	}
    
	//正式读取文件  
	reader.readAsDataURL(file);  
}
/**
 * 连接ws服务器
 */
function connect(){
	//判断浏览器是非支持H5
	if(typeof console == 'undefined'){
		alert('您的浏览器不支持H5特性，请更换浏览器进行访问');
		return false;
	}

	//创建webSocket
	ws = new WebSocket("ws://"+document.domain+":7272");
	ws.onopen = onopen;
	ws.onmessage = onmessage;
	ws.onclose = function(){
	  console.log("连接关闭，定时重连");
	  if(! $('#reconnect_msg').size()){
	  	$('.chat-body-ul').append("<li id='reconnect_msg' style='color: gray;'><center>断开连接，正在重连...</center></li>");
	  }
	  
      connect();
	};
	ws.onerror = function(){
 	  console.log("出现错误");
   };
}

/**
 * 连接建立时、握手成功后触发
 */
function onopen(){
	console.log('workerSocket握手成功');
	
	var _group_id = $('#group_list').val();
	var _data = '{"type":"login","name":"'+_name+'","user_id":"'+_user_id+'","group_id":"'+_group_id+'"}';
	ws.send(_data);
}

/**
 * 服务端发起消息时触发
 */
function onmessage(o){
	console.log('接收到的数据:'+o.data);

	var _data = eval("("+o.data+")");
	switch(_data.type){
		case 'login':
			$('.chat-body-ul').append("<li style='color: gray;'><center>欢迎"+_data.client_name+"上线<br />"+_data.time_format+"</center></li>");
			//刷新用户列表
			var _user_list = '';
			var _options = '<option value="0">所有用户</option>';
			var _selected_user_id = $('#users').val();
			$.each(_data.client_list, function(i, n){
				_user_list += '<li style="clear: both;" data-client-id="'+n.client_id+'">'+n.client_name;
				if(n.user_id != _user_id){
					if(n.is_friend == 1){
						_user_list += '<a href="javascript:;" style="float: right;">[好友]</a>';
					}else{
						_user_list += '<a href="javascript:;" style="float: right;" data-user-id="'+n.user_id+'">添加好友</a>';
					}
					
				}
				_user_list += '</li>';
				var _selected = n.user_id == _selected_user_id ? 'selected' : '' ;
				_options += '<option '+_selected+' value="'+n.user_id+'">'+n.client_name+'</option>';
			});
			$('.chat-users-li').html(_user_list);
			$('#users').html(_options);

			//刷新群组列表
			if(_data.group_list){
				var _g_option = '';
				var _selected_group_id = $('#group_list').val();

				$.each(_data.group_list, function(i, n){
					var _selected_group = n.id == _selected_group_id ? 'selected' : '';
					_g_option += '<option '+_selected_group+' value="'+n.id+'">'+n.gname+'</option>';
				});
				$("#group_list").html(_g_option);
			}

			//删除垃圾数据
			if($('#reconnect_msg').size()){
				$('#reconnect_msg').remove();
			}

			break;
		case 'logout':
			$('.chat-body-ul').append("<li style='color: gray;'><center>"+_data.client_name+"离开了聊天室<br />"+_data.time_format+"</center></li>");

			//更新用户列表
			$('li[data-client-id="'+_data.client_id+'"]').remove();

			break;
		case 'msg':
			var _float_right_1 = _data.from_client_name == _name ? 'float: right' : '';
			var _float_right_2 = 'clear: both; word-wrap:break-word;';
			var _padding = parseFloat($('.chat-body-ul').width())/2;
			if(_data.from_client_name == _name){
				_float_right_2 += 'margin-left: '+_padding+'px;background-color:#73bf00;border-radius:10px;padding-left:10px;padding-right:10px;padding-top:5px;padding-bottom:5px;';
			}else{
				_float_right_2 += 'margin-right: '+_padding+'px;background-color:white;border-radius:10px;padding-left:10px;padding-right:10px;padding-top:5px;padding-bottom:5px;';
			}

			//针对表情特殊处理
			_data.content = _data.content.replace(/\</g,'&lt;');
			_data.content = _data.content.replace(/\>/g,'&gt;');
			_data.content = _data.content.replace(/\n/g,'<br/>');
			_data.content = _data.content.replace(/\[em_([0-9]*)\]/g,'<img src="/static/images/qq_face/$1.gif" border="0" />');
			_data.content = _data.content.replace(/&lt;/g,'<');
			_data.content = _data.content.replace(/&gt;/g,'>');

			if(_data.channel == 'text'){
				$('.chat-body-ul').append('<li><p style="color:gray; '+_float_right_1+'"><strong>'+_data.from_client_name+'</strong>('+_data.time_format+')：</p><p style="'+_float_right_2+'">'+_data.content+'</p></li>');
			}else if(_data.channel == 'pic'){
				$('.chat-body-ul').append('<li><p style="color:gray; '+_float_right_1+'"><strong>'+_data.from_client_name+'</strong>('+_data.time_format+')：</p><p style="'+_float_right_2+'"><img src="'+_data.content+'" width="'+parseFloat(_padding-40)+'" /></p></li>');
			}
			break;
		case 'live_start':
			if(_data.client_name != _name){ //接受者
				$('.chat-body-ul').append("<li><center>"+_data.client_name+"开启了视频聊天,<a href='javascript:;' id='join_live_button' data-live-client-id='"+_data.live_client_id+"'>点击加入</a><br />"+_data.time_format+"</center></li>");

				$('#live_div').html('<img id="receiver" style="width:340px;height:240px"/>');
				$('#liveButton').remove();
			}
			break;
		case 'init':
			// if(_data.live_status){
			// 	$('.chat-body-ul').append("<li><center>"+_data.live_user_name+"开启了视频聊天,<a href='javascript:;' id='join_live_button'>点击加入</a><br />"+_data.time_format+"</center></li>");
			// 	$('#live_div').html('<img id="receiver" style="width:340px;height:240px"/>');
				// $('#liveButton,#sourcevid').remove();
			// }
			break;
		case 'add_friends_request': //申请添加好友通知
			var _left = parseFloat(parseFloat($(window).width()-parseFloat($('#notice_div').width())));
			$('#request_from_name').html(_data.from_user_name);
			$('#notice_div').css({'left':_left+'px','top':parseInt($(window).height())+'px'}).slideDown();

			//保存申请人ID
			$('input[name="request_from_id"]').val(_data.from_user_id);
			break;
		case 'add_friend_result':
			var _result = '拒绝';
			var _result_html = '添加好友';
			if(_data.result == 1){
				_result = '通过';
				_result_html = '[好友]';
				$('a[data-user-id='+_data.from_user_id+']').removeAttr('data-user-id'); //删除请求事件
			}
			$('.chat-body-ul').append("<li><center><font style='color:red;'>"+_data.from_user_name+"</font>"+_result+"了您的好友申请<br />"+_data.time_format+"</center></li>");
			$('a[data-user-id='+_data.from_user_id+']').removeAttr('is-lock').html(_result_html);
			
			break;
		case 'create_group': //创建群组通知
			$('.chat-body-ul').append("<li><center><font style='color:red;'>"+_data.client_name+"</font>创建了群组"+_data.group_name+"<br />"+_data.time_format+"</center></li>");
			break;
	}
	if($(".chat-body-ul > li").size()){
		$offset = $(".chat-body-ul > li:last").offset().top;
	    $('.chat-body-ul').scrollTop($('.chat-body-ul').scrollTop()+$offset);
	}
}
</script>
<div class='chat-index'>
	<div class="row">
		<div class="col-md-8" >
			<div class="chat-body">
				<div class="chat-body-ul"></div>
			</div>
		</div>
		<div class="col-md-4">
			<div class="chat-users">
				<div class="chat-users-ul">
					<p class="chat-online"><font data-action="client_list" style="cursor: pointer;color: green;">在线用户</font>&nbsp;&nbsp;<font data-action="my_friends" style="cursor: pointer;">我的好友</font></p>

					<div class="chat-users-li"></div>
				</div>
			</div>
		</div>
	</div>

	<div class="row">
		<div class="col-md-8 form-inline">
			用户列表：
			<select name="users" id="users">
				<option value="0">所有用户</option>
			</select>

			群组列表:
			<select id="group_list">
				<option value="0">--暂无群组--</option>
			</select>
			<br>

			<input style="display: none;" type="file" onchange="loadImg()" multiple accept="image/png, image/jpg, image/jpeg" />
			<button id="sendImg" class="btn btn-default">发图片</button>
			<button id="qqFace" class="btn btn-default">表情</button>
			<button id="liveButton" class="btn btn-default">视频聊天</button>
			<input type="text" id="group_name" class="form-control" placeholder="请输入群名称" style="display: none;" />
			<button id="groupButton" class="btn btn-default">建立群组</button>
			
			<div name='msg' id='msg' style="width: 100%;height: 100px;background-color: #ffffff;border: 1px solid gray;overflow: hidden;overflow-y: scroll;" contenteditable="true"></div>
			
			<button id="sendMsg" class="btn btn-success">发送</button>
			<label style="display: none;">读取进度：</label><progress style="display: none;" id="Progress" value="0" max="100"></progress>	
			

		</div>

		<div class="col-md-4">
			<div class="chat-users" id='live_div'>
				<video autoplay id="sourcevid" style="width:340;height:240px"></video>
				<canvas id="output" style="display:none"></canvas>
			</div>
		</div>
	</div>

	<div id='notice_div' style="background-color: #eee;width: 200px;height: 100px;border-radius: 12px;padding-top: 10px;position: absolute;display: none;">
		<input type="hidden" name="request_from_id" />
		<center><b>好友申请</b></center>
		<center><font id="request_from_name" style="color: red;"></font> 申请成为您的好友</center>
		<center>
			<button data-action-friend="agree" class="btn btn-default">通过</button>
			<button data-action-friend="refuse" class="btn">拒绝</button>
		</center>
		<br>
	</div>
    
</div>