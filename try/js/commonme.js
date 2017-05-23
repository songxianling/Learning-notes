//define('common.static.js.common', function () {
    //载入blockUI插件

    var exporter = {};

    var configString = {
        "errTitle" : "错误提示",
        "systemTitle" : "系统提示",
        "noticeTitle" : "通知消息",
        "clewTitle" : "用户提醒"
    };

    // cookie

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
    
    //使用方法
    
    
//      var commC =  require("common.static.js.common");
//
//      if(!commC.getCookie("mp4ad")){
//          $videoBox.show();
//          commC.setCookie("mp4ad","1",1);
//      }else{
//          $videoBox.hide();
//      }
//  
        

    //神策统计公共方法
    var commonAjax = {
        tjAjax:function(u,d){
            var postUrl = "";
            if(u == "look"){
                postUrl = "/com/statistics/page-view";
            }else{
                postUrl = "/com/statistics/cm-click";
            }
            $.ajax({
                url:postUrl,
                data : d,
                type : 'post',
                success : function(){

                }
            })
        },
        comAjax:function(u,data,callback){
            $.ajax({
                url:u,
                data : data,
                type : 'get',
                dataType :"json",
                success : function(data){
                    callback(data);
                }
            })
        }

    }

    //游戏中心公共百分比进度条
    var gameCenter = {
        showcont : function(n){
            var num = n ? n : "";
            $(".gb-js-stock"+num).each(function(){
                var html = "",
                    showNum = "";
                    showNum = $(this).attr("data-num");
                    html='<div class="gb-stock-box clearfix">'+
                            '<div class="stock-overplus">剩余:</div>'+
                            '<div class="stock-rate"><div class="stock-out"><div class="stock-in"></div></div></div>'+
                            '<div class="stock-percent">'+showNum+'%</div>'+
                          '</div>';
                    $(this).html(html);
                    $(this).find(".stock-in").width(showNum+"%")
            })
        }
    }

    // 公共弹窗
    var comDialog = {
        show1 :function(msg){
            if($(".js-gb-dialog-show1").length>0){
                $(".js-gb-dialog-show1").html(msg);
                $(".js-gb-dialog-show1").show();
            }else{
              var html="";
              html="<div class='gb-dialog-show1 js-gb-dialog-show1'>"+msg+"</div>";
              $(".box").append(html);  
            }
            
            setTimeout(function(){
                $(".js-gb-dialog-show1").hide();
            },1000)
        }
    }

    // 公用的js函数
    var commonClass = {
        showTips : function(data) {
            var config = { 
                title : data.title || "",
                body : data.body || "",
                timeshown : data.time || 0,
                status : data.status || 0,
                top : data.top || '35%',
                left : data.left || "35%",
                margin : data.margin || 0,
                parentclass : data.parentclass || "",
                zindex : data.zindex || 9999,
                cancelBtn : data.cancelBtn || false,
                okBtnCallBcak : data.okBtnCallBcak || false,
                okBtnText : data.okBtnText || "确定",
                onShow : data.onShow,
                onClose : data.onClose
            };
            switch(config.status){
                case 0:
                    config.title = configString.errTitle;
                    break;
                case 1:
                    config.title = configString.systemTitle;
                    break;
                case 2:
                    config.title = configString.noticeTitle;
                    break;
                case 3:
                    config.title = configString.clewTitle;
                    break;
            }

            commonClass._modalDialog(config);
        },
        _modalDialog : function(config){
            var title = config.title;//标题
            var body = config.body; //内容
            var timeshown = config.timeshown?config.timeshown:0;//多少秒后关闭窗口，如果为0 ，则不关闭

            function gettitlehtml(arg_title){
                return "<div class='gb-modaldialog-title'>"+arg_title+"</div>";
            }

            function getbodyhtml(arg_body){
                return "<div class='gb-modaldialog-content'>"+arg_body+"</div>";
            }

            var html = [];
            html.push('<div class="gb-modaldialog '+config.parentclass+'">');

            //如果有设置标题，显示标题的html;
            if(title!=null && title!=""){
                html.push(gettitlehtml(title));
            }

            //获取内容的html
            if(body!=null && body!=""){
                html.push(getbodyhtml(body));
            }

            //加入关闭按钮
            html.push('<div class="gb-modaldialog-closebtn" id="js-gb-modaldialog-closebtn"><i></i></div>');
            
            // 取消和确定按钮
            if (config.cancelBtn && config.okBtnCallBcak) {
                html.push('<div class="gb-modaldialog-btnwrap twobtn">');
            }else{
                html.push('<div class="gb-modaldialog-btnwrap">');
            }
            if (config.cancelBtn) {
                html.push('<em><span id="js-gb-modaldialog-cancelbtn" class="btncancel">取消</span></em>');
            }
            if (config.okBtnCallBcak) {
                html.push('<em><span id="js-gb-modaldialog-okbtn" class="btnok">' + config.okBtnText + '</span></em>');
            }
            html.push('</div>');


            // 关闭标签
            html.push('</div>');

            //显示模态窗口
            $.blockUI({
                message:html.join(''),
                css: { 
                     cursor:'default',
                     textAlign:'left',
                     width:'auto',
                     border:0,
                     top:config.top,
                     left:config.left,
                     backgroundColor:'transparent',
                     margin : config.margin
                },
                baseZ:config.zindex,
                overlayCSS:  { 
                    backgroundColor: '#000', 
                    opacity:0.6, 
                    cursor:'default' 
                },
                onBlock : callShow
            }); 

            //关闭窗口事件
            $("#js-gb-modaldialog-closebtn").click(function(){
                var $parent = $(this).parents(".gb-modaldialog");
                $.unblockUI();
                if (config.onClose) {
                    config.onClose($parent);
                }
            });
            $("#js-gb-modaldialog-cancelbtn").click(function(){
                var $parent = $(this).parents(".gb-modaldialog");
                $.unblockUI();
                if (config.onClose) {
                    config.onClose($parent);
                }
            });

            // 确定按钮事件
            $("#js-gb-modaldialog-okbtn").click(function(e){
                if (config.okBtnCallBcak) {
                    var $parentObj = $(this).parents(".gb-modaldialog");
                    config.okBtnCallBcak(e, $parentObj);
                }
            });

            // 窗体展现后，如果存在config.onShow事件，回掉
            function callShow(){
                var $parent = $("#js-gb-modaldialog-closebtn").parents(".gb-modaldialog");
                if (config.onShow) {
                    config.onShow($parent);
                }
            }

            //判断是否要在多少秒以后，自动关闭窗口
            if(timeshown!=0){
                setTimeout($.unblockUI, timeshown); 
            }
        },
        changeURLArg : function (url,arg,arg_val){ 
            var pattern=arg+'=([^&]*)'; 
            var replaceText=arg+'='+arg_val; 
            if(url.match(pattern)){ 
                var tmp='/('+ arg+'=)([^&]*)/gi'; 
                tmp=url.replace(eval(tmp),replaceText); 
                return tmp; 
            }else{ 
                if(url.match('[\?]')){ 
                    return url+'&'+replaceText; 
                }else{ 
                    return url+'?'+replaceText; 
                } 
            } 
            return url+'\n'+arg+'\n'+arg_val; 
        },
        // 获取url参数，使用方法：getRequest().desturl
        getRequest : function(curl) {
            var url = curl ? curl : location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        // 生成guid
        guid : function() {
            function S4() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            }
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        },
        //显示template
        showblockTemplate : function (id,data,fn) {
            $.blockUI({
                message : template(id),
                css: data,
                overlayCSS:  {
                    backgroundColor: '#000',
                    opacity:0.6,
                    cursor:'default'
                },
                onBlock:fn
            });
        },
        closeTemplate: function () {
            $.unblockUI();
        },
        /*替换url*/
        addUrl:function(data){
            var arr = window.location.href.split('?');
            var result = '';
            if(arr.length == 1){
                for(var i in data){
                    if(result == ''){
                        result += i + '=' + data[i];
                    }else{
                        result += '&' + i + '=' + data[i];
                    }
                }
                return arr[0] + '?' + result;
            }else{
                var valuelist = arr[1].split('&');
                var json = {};
                for(var i=0;i<valuelist.length;i++){
                    var keyvalue = valuelist[i].split('=');
                    json[keyvalue[0]] = keyvalue[1];
                }
                $.extend(json,data);
                for(var i in json){
                    if(result == ''){
                        result += i + '=' + json[i];
                    }else{
                        result += '&' + i + '=' + json[i];
                    }
                }
                return arr[0] + '?' + result;
            }
        },
        // input是否为空验证
        isEmptyValid : function(obj){
            if($.trim(obj.val()) == "" ) {
                return true;
            }else{
                return false;
            }
        },
        //验证是否超过length字符
        isOverValid : function(obj, len){
            if($.trim(obj.val()).length > len) {
                return true;
            }else{
                return false;
            }
        },
        // 验证手机号
        telValid : function(val){
            if (/^1[34578]\d{9}$/.test(val)) {
                return true;
            }else{
                return false;
            }
        },
        // 验证QQ号
        qqValid : function(val){
            if(/^[1-9][0-9]{4,12}$/.test(val)){
                return true;
            }else{
                return false;
            }
        },
        // 邮箱验证
        mailValid : function(val){
            var regeamil = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if(!regeamil.test(val)){
                return false;
            }else{
                return true;
            }
        },
        //验证汉字
        wordValid : function (val) {
            if(/^[\u4E00-\u9FFF]+$/g.test(val)){
                return true;
            }else{
                return false;
            }
        },
        //身份证
        idCardValid : function (val) {
            var Idcard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X|x)$/;
            if(!Idcard.test(val)){
                return false;
            }else{
                return true;
            }
        }

    };

    exporter = {
        showTips : commonClass.showTips,
        changeURLArg : commonClass.changeURLArg,
        getRequest : commonClass.getRequest,
        guid : commonClass.guid,
        closeTemplate:commonClass.closeTemplate,
        addUrl:commonClass.addUrl,
        showblockTemplate:commonClass.showblockTemplate,
        isEmptyValid : commonClass.isEmptyValid,
        isOverValid : commonClass.isOverValid,
        telValid : commonClass.telValid,
        qqValid : commonClass.qqValid,
        mailValid : commonClass.mailValid,
        wordValid : commonClass.wordValid,
        idCardValid : commonClass.idCardValid,
        commonAjax : commonAjax.tjAjax,
        newcommonAjax :commonAjax.comAjax,
        gameShow : gameCenter.showcont,
        comDialog : comDialog.show1,
        setCookie : comCookie.setCookie,
        getCookie : comCookie.getCookie,
        delCookie : comCookie.delCookie

    };

//  return exporter;
//});