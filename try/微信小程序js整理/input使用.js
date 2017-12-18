1.input的类型;有效值有text/number/idcard/digit/time/date.input不需要设置inline-height或padding来纵向居中;默认placeholder的文字是居中的;小程序把checkbox和radio都单独做成了组件;默认的input只支持输入文本;上传文件在小程序里需要调用chooseImage事件完成
//  html5上传文件
<input type="file" class="upload-input" accept="imgae/*">
// 小程序
<view class="upload-block" bindtap="chooseImage"></view>
<view class="upload-block" wx:for="{{imageList}}" wx:for-item="image">
	<image src="{{image}}" class="pic" data-src="{{image}}" bindtap="previewImage"></image>
</view>
