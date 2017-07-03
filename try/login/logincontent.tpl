<html>

	<head>
		<meta charset="UTF-8" />
		<title></title>
	</head>
	<link rel="stylesheet" type="text/css" href="../../chen/css/reset.css"/>
	<link rel="stylesheet" type="text/css" href="../css/common.css"/>
	<link rel="stylesheet" type="text/css" href="logincontent.css"/>
	<body>
		<div class="gb-login-logincontent" id="js-gb-login-logincontent" style="position: relative;background-color: #fff;border: 1px solid #dddddd;width: 350px;">
			<input type="hidden" value="{$passportServerHost}" class="js-passporturl" />
			<div class="gb-login-logincontent-nav clearfix js-gb-login-logincontent-tabs">
				<div class="tab left ac">扫码登录</div>
				<div class="tab right">账户登录</div>
			</div>
			<div class="gb-login-logincontent-scan js-gb-login-logincontent-scan">
				<div class="code js-gb-login-logincontent-code">
					<div class="codebox js-gb-login-logincontent-codebox">
						<img class="codeimg js-gb-login-logincontent-codeimg" src="">
						<div class="overdue js-gb-login-logincontent-overdue">
							<p>二维码已失效</p>
							<span class="js-gb-login-logincontent-overduebtn">刷新</span>
						</div>
					</div>
					<div class="codecue js-gb-login-logincontent-codecue"></div>
				</div>
				<p class="msg1">打开<span>淘手游APP</span>扫描二维码</p>
				<p class="msg2 clearfix"><span><i></i>免输入</span><span><i></i>更快</span><span><i></i>更安全</span></p>
			</div>
			<div class="gb-login-logincontent-body js-gb-login-logincontent-body">
				<!-- 用户名或手机号登录 -->
				<div class="js-gb-login-logincontent-unamebody">
					<p class="gb-login-logincontent-error js-gb-login-logincontent-uname-error">
						<b></b><span></span>
					</p>
					<div class="gb-login-logincontent-con">
						<p class="gb-login-logincontent-unameaccBox" title="请输入账号/手机号">
							<input type="text" autocomplete="off" maxlength="50" class="js-gb-login-logincontent-name" placeholder="请输入账号/手机号">
						</p>
						<p class="js-gb-login-logincontent-unamepwdBox" title="请输入登录密码">
							<input type="password" flag="login" class="js-gb-login-logincontent-unamepwd" placeholder="请输入登录密码">
						</p>
					</div>
				</div>
				<!-- 验证码和按钮模块 -->
				<div class="gb-login-logincontent-con">
					<p class="gb-login-logincontent-captcha js-gb-login-logincontent-captchabox" title="请输入验证码">
						<span class="gb-login-logincontent-captchabox">
				  <input type="text" flag="login" class="js-gb-login-logincontent-captcha" value="" placeholder="请输入验证码" autocomplete="off" maxlength="6">
				</span>
						<img class="js-gb-login-logincontent-captchaimg" alt="验证码">
					</p>
					<p class="gb-login-logincontent-telcode js-gb-login-logincontent-telcodebox" title="请输入短信验证码">
						<span class="gb-login-logincontent-telcodebox">
                  <input type="text" class="js-gb-login-logincontent-telcode" value="" placeholder="请输入短信验证码" autocomplete="off" maxlength="6">
                </span>
						<span class="js-gb-login-logincontent-telcodebtn gb-login-logincontent-telcodebtn">发送短信</span>
					</p>
					<p class="gb-login-logincontent-telnumber js-gb-login-logincontent-telnumberbox">
						接收短信手机号：<span></span><br/>已换手机号请联系QQ：4009939669
					</p>
					<div>
						<span class="js-gb-login-logincontent-btn" rel="">登 录</span>
					</div>
				</div>
			</div>
		</div>

	</body>
	<script src="jquery-2.1.1.min.js" type="text/javascript" charset="utf-8"></script>
	<!--<script src="event.js" type="text/javascript" charset="utf-8"></script>-->
	<!--<script src="common.js" type="text/javascript" charset="utf-8"></script>-->
	<!--<script src="browser.js" type="text/javascript" charset="utf-8"></script>-->
	<script src="logincontent.js" type="text/javascript" charset="utf-8"></script>

</html>