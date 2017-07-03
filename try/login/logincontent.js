
    var $context = $("#js-gb-login-logincontent"), 
        // 切换tab
        $tab = $(".js-gb-login-logincontent-tab", $context),
        $tabLi = $(".js-gb-login-logincontent-tab li", $context),
        // 扫码登录
        $newtabs = $(".js-gb-login-logincontent-tabs", $context),
        $scanbox = $(".js-gb-login-logincontent-scan", $context),
        $bodybox = $(".js-gb-login-logincontent-body", $context),
        $scancode = $(".js-gb-login-logincontent-code", $context),
        $codebox = $(".js-gb-login-logincontent-codebox", $context),
        $codecue = $(".js-gb-login-logincontent-codecue", $context),
        $codeimg = $(".js-gb-login-logincontent-codeimg", $context),
        $overdue = $(".js-gb-login-logincontent-overdue", $context),
        $overduebtn = $(".js-gb-login-logincontent-overduebtn", $context),
        $isshowpswback = $(".js-gb-login-other-isshowpswback"),

        // 用户名登录body
        $unamebody = $(".js-gb-login-logincontent-unamebody", $context),
        // 用户名错误提示
        $unameError = $(".js-gb-login-logincontent-uname-error", $context),
        // 用户名
        $unameIpt = $(".js-gb-login-logincontent-name", $context),
        // 登录密码
        $unamePwd = $(".js-gb-login-logincontent-unamepwd", $context),

        // 手机号登录body
        $telbody = $(".js-gb-login-logincontent-telbody", $context),
        // 错误提示
        $telError = $(".js-gb-login-logincontent-tel-error", $context),
        // 手机号
        $telIpt = $(".js-gb-login-logincontent-tel", $context),
        // 登录密码
        $telPwd = $(".js-gb-login-logincontent-telpwd", $context),

        // 验证码body
        $captchaBox = $(".js-gb-login-logincontent-captchabox", $context),
        // 验证码
        $captchaIpt = $(".js-gb-login-logincontent-captcha", $context),
        // 验证码图片
        $captchaImg = $(".js-gb-login-logincontent-captchaimg", $context),
        // 登录
        $loginBtn = $(".js-gb-login-logincontent-btn", $context);

        // 短信验证码body
        $telcodeBox = $(".js-gb-login-logincontent-telcodebox", $context),
        // 短信验证码
        $telcodeIpt = $(".js-gb-login-logincontent-telcode", $context),
        // 短信验证码获取btn
        $telcodeBtn = $(".js-gb-login-logincontent-telcodebtn", $context),
        // 短信验证码手机号body
        $telnumberBox = $(".js-gb-login-logincontent-telnumberbox", $context),
        // 用户名登录密码body
        $unamePwdBox = $(".js-gb-login-logincontent-unamepwdBox", $context),
        // 手机号登录密码body
        $telPwdBox = $(".js-gb-login-logincontent-telpwdBox", $context),
        // 短信验证码登录方式提示信息
        $telcodeMsg = $(".js-gb-login-logincontent-telcodemsg", $context);

    var passportUrl = $(".js-passporturl").val();

    var configString = {
        "noUname" : "请输入账号/手机号",
        "noPwd" : "请输入登录密码",
        "noCaptcha" : "请输入验证码",
        "noTel" : "请输入手机号",
        "noTelcode" : "请输入短信验证码",
        "errorTel" : "手机号不合法",
        "login" : "登 录",
        "logining" : "正在登录...",
        "loginPostUrl" : passportUrl+"/api/user/login",
        "getCaptchaPostUrl" : passportUrl+"/api/user/captcha",
        "isShowCaptchaPostUrl" : passportUrl+"/api/user/judge-view-code",
        "isShowTelcodePostUrl" : passportUrl+"/api/user/check-mobile",
        "getTelcodePostUrl" : passportUrl+"/api/user/user-send-code",
        "qrcodeUrl" : passportUrl+"/api/qrcode",
        "qrcodeMonitorUrl" : passportUrl+"/api/qrcode/monitor",
        "countdown" : 60,
        "canGet" : true,
        "timer" : null,
        "timer2" : null
    };

    var exporter = {};
//      event = require("common.static.js.event"),
//      browser = require("common.static.js.browser");
    // 登录神策统计
//  var comAjax = require("common.static.js.common");

    //载入加密文件
//  if(!$.jCryption){
//      require.loadJs('/static/common/static/js/jquery/jquery_jcryption_3_1_0.js');
//  }
    
    var signinClass = {
        // 错误提示
        showErrorTip : function(data){
            data.obj.find("span").html(data.str);
            data.obj.css("visibility", "visible");
            data.obj.attr("visibility", "visible");
            // data.obj.show();
        },
        // 隐藏错误提示
        hideErrorTip : function(obj){
            obj.find("span").html("");
            obj.css("visibility", "hidden");
            obj.attr("visibility", "hidden");
            // obj.hide();
        },
        // 检查是否为空
        checkNoEmpty : function(data){
            if (!data.str) {
                signinClass.showErrorTip({obj : data.obj, str : data.err});
                return false;
            }
            return true;
        },
        // 检查是否为空(不展示错误信息)
        checkEmptyNoTip : function(data){
            if (!data.str) {
                return false;
            }
            return true;
        },
        // 刷新验证码
        refreshVerifyImg : function(obj) {
            $.ajax({
                url : configString.getCaptchaPostUrl,
                type : 'get',
                dataType : 'json',
                data : {
                    refresh: 1,
                    _: (Math.random() * (100000 + 1))
                },
                xhrFields:{
                    withCredentials:true
                },
                success:function( res ) {
                    obj.attr('src', passportUrl+res.url);
                },
                error:function(res){ 
                    
                }
            });
        },
        // 是否显示验证码
        isShowCaptcha : function(data){
            $.ajax({
                url : configString.isShowCaptchaPostUrl,
                type : 'get',
                dataType : 'json',
                cache : false,
                xhrFields:{
                    withCredentials:true
                },
                data : {},
                success:function( res ) {
                    if (res.errcode == 0) {
                        if (res.data.errorNum > 2) {
                            data.captchabox.show();
                            data.captchabox.attr("rel", 1);
                            signinClass.refreshVerifyImg(data.captchaImg);
                        };
                    }
                }
            }); 
        },
        // 登录提交
        uLogin : function(postdata, otherdata){
            //-------------大数据日志记录----begin
            $.get("/com/big-log",{event:"openloginlayer_clicksubmitbtn_fromfe"});
            //-------------大数据日志记录----end

            // 增加 加密
            // var encryptedString = $.jCryption.encrypt($.param(postdata), "");
            // var _data = {
            //     jCryption: encryptedString,
            //     _csrf:$('meta[name="csrf-token"]').attr('content')
            // };

            var _data = postdata;

            //post发送请求
            $.ajax({
                url : otherdata.posturl,
                type : 'post',
                dataType : 'json',
                data : _data,
                xhrFields:{
                    withCredentials:true
                },
                success:function( res ) {
                    otherdata.clickobj.text(configString.login);
                    if (res.errcode == 0) {
                        // 记录用户名
                        var rebname = {};
                        if (postdata.mobile) {
                            rebname.tel = postdata.mobile;
                        }else if (postdata.userName) {
                            rebname.name = postdata.userName;
                        };
                        signinClass.remeberLoginName(rebname);
                        
                        // 注册登录成功事件
                        exporter.emit('userLoginSucc');
                    }else if(res.errcode == 101092){
                        clearInterval(configString.timer2);
                        var resTime = parseInt(res.data.time);
                        var resTimeMsg;
                        if(!resTime<=0){
                            resTimeMsg = signinClass.timereset(resTime);
                            signinClass.showErrorTip({obj : otherdata.errobj, str : res.msg+resTimeMsg+"后登录"});
                        }
                        configString.timer2 = setInterval(function(){
                            if(resTime<=0){
                                signinClass.hideErrorTip(otherdata.errobj);
                                clearInterval(configString.timer2);
                            }else{
                                resTime--;
                                resTimeMsg = signinClass.timereset(resTime);
                                signinClass.showErrorTip({obj : otherdata.errobj, str : res.msg+resTimeMsg+"后登录"});
                            }
                        },1000);
                    }else{
                        signinClass.showErrorTip({obj : otherdata.errobj, str : res.msg});
                        // 检查是否显示验证码
                        if (res.data.errorNum > 2) {
                            otherdata.captchabox.show();
                            otherdata.captchabox.attr("rel", 1);
                            signinClass.refreshVerifyImg(otherdata.captchaImgObj);
                        };
                    }
                    otherdata.clickobj.attr("rel", "");
                },
                error:function(){ 
                    otherdata.clickobj.attr("rel", "");
                    otherdata.clickobj.text(configString.login);
                    // 注册登录失败事件
                    exporter.emit('userLoginFail');
                }
            });   
        },
        // 触发登录事件
        loginEvent : function(data){
            var rel = data.clickobj.attr("rel") || "";
            if (!rel) {
                // 检查输入信息
                var acc = $.trim(data.acc.val()),
                    pwd = data.pwd.val(),
                    captcha = $.trim(data.captcha.val());

                // 组合数据提交登录
                var postdata = {},
                otherdata = {
                    clickobj : data.clickobj,
                    errobj : data.errobj,
                    captchabox : data.captchabox,
                    posturl : data.posturl,
                    captchaImgObj : data.captchaImgObj
                };

                // 检查用户名or手机号
                if (signinClass.checkNoEmpty({obj:data.errobj,str:acc,err:data.accerrstr})) {
                    postdata.userName = acc;
                }else{
                    return false;
                }



                // 检查是否需要验证码
                var crel = data.captchabox.attr("rel") || "";
                if (crel) {
                    if (signinClass.checkNoEmpty({obj:data.errobj,str:captcha,err:configString.noCaptcha})) {
                        postdata.picVerifyCode = captcha;
                    }else{
                        return false;
                    }
                }
                // 检查是否需要短信验证码
                var telCrel = $telcodeBox.attr("rel") || "";
                var telcode = $telcodeIpt.val();
                if (telCrel) {
                    if (signinClass.checkNoEmpty({obj:data.errobj,str:telcode,err:configString.noTelcode})) {
                        postdata.smsVerifyCode = telcode;
                    }else{
                        return false;
                    }
                }else{
                    // 检查密码
                    if (signinClass.checkNoEmpty({obj:data.errobj,str:pwd,err:configString.noPwd})) {
                        postdata.password = pwd;
                    }else{
                        return false;
                    }
                }

                // 改变成登陆中状态
                data.clickobj.attr("rel", "1");
                data.clickobj.text(configString.logining);
                signinClass.uLogin(postdata, otherdata);
            };
        },
        // 登录方式切换
        changeLoginType : function(obj){
            $tabLi.addClass("noactive");
            var rel = obj.attr("rel") || "1";
            if (rel == 1) {
                $unamebody.show();
                $telbody.hide();
                $tab.attr("rel", "1");
                $.cookie("logintype", "1", {expires: 3650, path: '/'});
                $telcodeBox.hide();//短信验证码
                $telnumberBox.hide();//短信手机号
                $telcodeIpt.val("");
                $unamePwdBox.show();//用户名密码
                $unameIpt.focus();
            }else{
                $unamebody.hide();
                $telbody.show();
                $tab.attr("rel", "2");
                $.cookie("logintype", "2", {expires: 3650, path: '/'});
                $telcodeBox.hide();//短信验证码
                $telnumberBox.hide();//短信手机号
                $telcodeIpt.val("");
                $telPwdBox.show();//手机号密码
                $telIpt.focus();
            }
            obj.removeClass("noactive");
        },
        // 记住登录名
        remeberLoginName : function(data){
            var info = $.cookie("login_info") || {};
            if (info) {
                try{
                    info = JSON.parse(info);
                }catch(e){
                    info = {};
                }
            }
            // 用户名
            if (data.name) {
                info.name = data.name;
            }else if(data.tel){
                info.tel = data.tel;
            }else{
                return;
            }
            info = JSON.stringify(info);
            $.cookie("login_info", info, {expires: 3650, path: '/'});
        },

        // 是否显示短信验证码
        isShowTelcode : function(data){
            var _this = $.trim(data._this.val());
            if (signinClass.checkEmptyNoTip({obj:data.errobj,str:_this,err:data.err})) {
                $.ajax({
                    url : data.postUrl,
                    type : 'post',
                    dataType : 'json',
                    data : {
                        // ismobile : data.ismobile,
                        userName : _this
                    },
                    success:function( res ) {
                        if (res.errcode == 0) {
                            if (res.data.ischeck == 1) {
                                signinClass.cleartime($telcodeBtn);

                                $unamePwdBox.hide();//用户名密码
                                $telPwdBox.hide();//手机号密码
                                $telcodeBox.show();//短信验证码
                                $telnumberBox.show();//短信手机号
                                $telcodeBox.attr("rel", 1);
                                $telnumberBox.find("span").text(res.data.mobile);
                                // $telcodeMsg.show();

                                signinClass.showErrorTip({obj:data.errobj,str:"您不是在常用的地方登录哦，请确保账号安全"});
                            }else{
                                $telcodeBox.hide();//短信验证码
                                $telnumberBox.hide();//短信手机号
                                $telcodeBox.attr("rel", "");
                                $telnumberBox.find("span").text("");
                                // $telcodeMsg.hide();
                                $unamePwdBox.show();//用户名密码
                                $telPwdBox.show();//手机号密码

                                signinClass.hideErrorTip(data.errobj);
                            }
                        }else{
                            $telcodeBox.hide();//短信验证码
                            $telnumberBox.hide();//短信手机号
                            $telcodeBox.attr("rel", "");
                            $telnumberBox.find("span").text("");
                            // $telcodeMsg.hide();
                            $unamePwdBox.show();//用户名密码
                            $telPwdBox.show();//手机号密码

                            signinClass.showErrorTip({obj:data.errobj,str:res.msg});
                        }
                    },
                    error:function(){ 

                    }
                });
            }else{
                return false;
            }
        },
        // 获取短信验证码
        getTelcode : function(data){
            if(configString.canGet){
                configString.canGet = false;

                var _this = $.trim(data._this.val());
                if (signinClass.checkNoEmpty({obj:data.errobj,str:_this,err:data.err})) {
                    $.ajax({
                        url : data.postUrl,
                        type : 'post',
                        dataType : 'json',
                        data : {
                            // ismobile : data.ismobile,
                            userName : _this
                        },
                        success:function( res ) {
                            if (res.errcode == 0) {
                                signinClass.settime($telcodeBtn);
                                signinClass.hideErrorTip(data.errobj);
                            }else{
                                configString.canGet = true;
                                signinClass.showErrorTip({obj:data.errobj,str:res.msg});
                            }
                        },
                        error:function(){ 
                            console.log('error!');
                        }
                    });
                }else{
                    return false;
                }
            }
        },
        // 短信验证码倒计时
        settime : function(val){
            if(configString.countdown<=0){
                signinClass.cleartime(val);
            }else{
                configString.canGet = false;
                val.addClass("dis");
                val.text('重新发送('+configString.countdown+')');
                configString.countdown--;
                configString.timer=setTimeout(function(){
                  signinClass.settime(val)
                },1000);
            }
        },
        // 清除倒计时
        cleartime : function(val){
            configString.canGet = true;
            val.removeClass("dis");
            val.text('发送短信');
            configString.countdown=60;
            clearTimeout(configString.timer);
        },
        // 时间格式
        timereset : function(data){
            var theTime = parseInt(data);//秒
            var theTime1 = 0;//分
            var theTime2 = 0;//时
            if(theTime>60){
                theTime1 = parseInt(theTime/60);
                theTime = parseInt(theTime%60);
                if(theTime1>60){
                    theTime2 = parseInt(theTime1/60);
                    theTime1 = parseInt(theTime1%60);
                }
            }
            var result = ""+parseInt(theTime)+"秒";
            if(theTime1>0){
                result=""+parseInt(theTime1)+"分"+result;
            }
            if(theTime2>0){
                result=""+parseInt(theTime2)+"时"+result;
            }
            return result;
        },
        // 登录神策统计
        shence : function(n_en){
            var postUrl = "click",
                data = {};
            data.clk_page_uri = "/siteauth/auth/login";
            data.clk_target_url = "";
            data.clk_item_index = 0;
            data.clk_name_en = n_en;
            comAjax.commonAjax(postUrl,data); 
        }

    }

    $unameIpt.focus();

    // 登录切换
    // $tabLi.on("click", function(){
    //     signinClass.changeLoginType($(this));
    // });

    // 扫码登录begin
    $newtabs.on("click",".tab",function(){
        $(this).addClass("ac").siblings().removeClass("ac");
        if($(this).hasClass("left")){
            $bodybox.hide();
            $scanbox.show();
            $isshowpswback.removeClass("show");
        }else if($(this).hasClass("right")){
            $scanbox.hide();
            $bodybox.show();
            $isshowpswback.addClass("show");
            $unameIpt.blur();
        }
    });
    $scancode.hover(function(){
        if(!$scancode.hasClass("isoverdue")){
            $codebox.stop().animate({left:'0px'},250,function(){
                $codecue.show();
            });
        }
    },function(){
        if(!$scancode.hasClass("isoverdue")){
            $codecue.hide();
            $codebox.stop().animate({left:'80px'},250);
        }
    });
    function ajaxPost(){
        $codeimg.attr('src',configString.qrcodeUrl+"?"+Math.random());
        var timer = setTimeout(function(){
            lunxun();
        },2000);
    }
    $overduebtn.on("click",function(){
        $scancode.removeClass("isoverdue");
        $codeimg.attr('src',configString.qrcodeUrl+"?"+Math.random());
        var timer = setTimeout(function(){
            lunxun();
        },2000);
    });
    function lunxun(){
        $.ajax({
            url : configString.qrcodeMonitorUrl,
            type : 'post',
            dataType : 'json',
            data : {},
            xhrFields:{withCredentials:true},
            success:function(res){
                if(res.errcode==0){
                    if(res.data.codeNum==1000){
                        $scancode.addClass("isoverdue");
                    }else if(res.data.codeNum==1001){
                        var timer = setTimeout(function(){
                            lunxun();
                        },2000);
                    }else if(res.data.codeNum==1002){
                        var timer = setTimeout(function(){
                            lunxun();
                        },2000);
                    }else if(res.data.codeNum==1003){
                        // 注册登录成功事件
                        exporter.emit('userLoginSucc');
                    }
                }else{
                    signinClass.showErrorTip({obj : $unameError , str : res.msg});
                }
            },
            error:function(){

            }
        });
    }
    // 扫码登录end


    // 用户名登录
    $loginBtn.on("click", function(){
        var pdata = {
            clickobj : $(this),
            captcha : $captchaIpt,
            captchabox : $captchaBox,
            captchaImgObj : $captchaImg,
            acc : $unameIpt,
            pwd : $unamePwd,
            errobj : $unameError,
            accerrstr : configString.noUname,
            posturl : configString.loginPostUrl
        };
        signinClass.loginEvent(pdata);
        signinClass.shence("website_login_btn");
    });

    // 刷新验证码
    $captchaImg.on("click", function(){
        signinClass.refreshVerifyImg($(this));
    });

    // 是否显示短信验证码
    $unameIpt.on("blur",function(){
        var pdata = {
            _this : $(this),
            errobj : $unameError,
            postUrl : configString.isShowTelcodePostUrl,
            ismobile : 0,
            err : configString.noUname
        };
        signinClass.isShowTelcode(pdata);
    });
    $telIpt.on("blur",function(){
        var pdata = {
            _this : $(this),
            errobj : $telError,
            postUrl : configString.isShowTelcodePostUrl,
            ismobile : 1,
            err : configString.noTel
        };
        signinClass.isShowTelcode(pdata);
    });
    // 获取短信验证码
    $telcodeBtn.on("click",function(){
        var pdata = {
            postUrl : configString.getTelcodePostUrl
        };
        var rel = $tab.attr("rel") || 1;
        if (rel == 1) {
            pdata._this = $unameIpt;
            pdata.errobj = $unameError;
            pdata.ismobile = 0;
            pdata.err = configString.noUname;
        }else{
            pdata._this = $telIpt;
            pdata.errobj = $telError;
            pdata.ismobile = 1;
            pdata.err = configString.noTel;
        }
        signinClass.getTelcode(pdata);
        signinClass.shence("website_login_smscode_btn");
    });    

    // 初始化
    function init() {
        var data = {
            captchabox : $captchaBox,
            captchaImg : $captchaImg
        };
        // 是否显示验证码
        signinClass.isShowCaptcha(data);
        // 附加特定属性标识登录层打开
        $loginBtn.attr("flag", 1);
    }

    // 注册回车登录
    $(document).on('keypress', function (ev) {
        var flag = $loginBtn.attr("flag") || "";
        if (flag && ev.keyCode == "13") {
            $loginBtn.trigger("click");
        };
    });

    // 清理标记，表示登录已经关闭
    function resetFlag(){
        $loginBtn.attr("flag", "");
    }

    // 从cookies获取用户名
//  var login_info = $.cookie("login_info") || {};
//  if (login_info) {
//      try{
//          login_info = JSON.parse(login_info);
//      }catch(e){
//          login_info = {};
//      }
//  }
//  if (login_info.name) {
//      $unameIpt.val(login_info.name);
//  };
//  if (login_info.tel) {
//      $telIpt.val(login_info.tel);
//  };

    // 从cookies判断登录的方式
    // var logintype = $.cookie("logintype");
    // if (!logintype || logintype == 1) {
    //     signinClass.changeLoginType($tabLi.eq(0));
    // }else{
    //     signinClass.changeLoginType($tabLi.eq(1));
    // }

    


