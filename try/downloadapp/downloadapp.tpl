
<html>
	<head>
		<meta charset="UTF-8"/>
		<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
		<title></title>
	</head>
	<link rel="stylesheet" type="text/css" href="../css/reset.css"/>
	<link rel="stylesheet" type="text/css" href="downloadapp.css"/>
	<body>
		<div class="tsy-downloadapp-box js-tsy-downloadapp-box">
			<span class="left">
				<img src="img/app_icon.png" alt="">
			</span>
			<p class="text-cont">
				想享受折扣、即时收到发货/提现消息吗？安装淘手游APP
			</p>
			<p class="right">
				<span class="btn">
					<a href='/indexpage/index/downloadapp{if isset($from) && $from neq ""}?from={{$from}}&id={{$fromid}}&typeid={{$typeid}}{/if}'><span>{if isset($open) && $open neq ""}{$open}{else}下载{/if}</span></a>
				</span>
				<span class="closebtn js-closebtn">
					<img src="img/cancel.png" alt="">
				</span>
			</p>
		</div>
	</body>
	<script src="../js/jquery-2.1.1.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="downloadapp.js" type="text/javascript" charset="utf-8"></script>
</html>

	
