

	var closeBtn = $(".js-closebtn"),
		box = $(".js-tsy-downloadapp-box");
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
	

	if(comCookie.getCookie("closedownload")){
		box.hide();
	}else{
		box.show();
	}

	closeBtn.on("click",function(){
		comCookie.setCookie("closedownload","1")
		box.hide();
	})

