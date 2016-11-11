$(document).ready(function () {
	
	var $videoBox = $("#video-box");
    var $closeBtn = $("#close-btn");

    $closeBtn.on("click",function(){
        document.getElementById('video1').pause();
        $videoBox.hide();
    });
	var comCookie = {
        setCookie : function(name,value,days){

            days=days?days:30;
            var date=new Date();
            date.setTime(date.getTime()+days*24*60*60*1000);//过期日期
            document.cookie=name+'='+escape(value)+';expires='+date.toUTCString();
            //escape 进行编码  能将一些特殊符号或汉字用16进制表示
        },
        //获取cookie
        getCookie : function(name){

            var cookies=document.cookie;
            var arr=cookies.match(new RegExp('(^| )'+name+'=([^;]*)(;|$)'));
            if(arr!=null)return unescape(arr[2]); return "";
            //unescape解译escape编译过得对象
        },
        //删除cookie 不能直接删除  设置cookie的时间过期
        delCookie : function(name){

            var date=new Date();
            date.setTime(date.getTime()-1);
            document.cookie=name+'='+getCookie(name)+';expires='+date.toUTCString();

        }
    }
	
        if(!comCookie.getCookie("mp4ad")){
            $videoBox.show();
            comCookie.setCookie("mp4ad","1",1);
        }else{
            $videoBox.hide();
        }
	
});
