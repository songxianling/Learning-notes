// 居中
display: flex;
flex - direction: row;
justify - content: center;
align - items: center;
// input
type = "number"
confirm - type = "done"
value = "{{car_price}}"
placeholder - style = "color:#FF6000;margin-right:10rpx;font-size:28rpx;"
placeholder = "请输入"
class = "car-price"
bindconfirm = "changeCarPrice"
bindblur = "changeCarPrice" / >
	// 从子页面返回数据到父页面
	wx.navigateBack() //返回上一页
var pages = getCurrentPages();
var currPage = pages[pages.length - 1]; //当前页面
var prevPage = pages[pages.length - 2]; //上一个页面
prevPage.setCarInfo({
	"car_model": e.currentTarget.dataset.car,
	"car_price": 289000
})
// 切换tab页面
wx.switchTab({
	url: '../CMSpecialCar/CMSpecialCar',
})
// 动态改变样式
style = "color:{{text_color}}" > 推荐车型
this.setData({
	text_color: '#ffffff'
})
// request
// 背景：整个小程序在运行时，同时存在的 request 请求数量限制在5个。解决办法是在页面出栈时将该页面的所有 request 请求全部销毁。 先给每一个 request 请求赋给一个变量，然后在 onUnload 事件中用 requestTask.abort() 方法将其销毁。
onLoad: function() {
	var that = this;
	var a = wx.request({
		url: 'http://192.168.200.146:8080/trwl/xcx/selcar',
		method: 'GET',
		dataType: 'json',
		success: function(res) {
			that.setData({
				carts: res.data
			})
			that.sum()
		},
		fail: function(res) {},
		complete: function(res) {},
	})
},
//将 request 进行销毁
onUnload: function() {
	requestTask.abort();
	a.abort();
}
// 往后台传数组不能直接以Array的格式传;需要将其转换为字符串形式
var cartIdArray = [];
var cartIdString = '';
var carts = this.data.carts;
for(var i=0;i<carts.length;i++){
  if(carts[i].ch){
    cartIdArray.push(this.data.carts[i].cartId)
  }
}
for (var i = 0; i < cartIdArray.length; i++) {
  cartIdString += cartIdArray[i] + ",";
}
// 加载进度条
<view class="body-view">
  <loading hidden="{{hidden}}" bindchange="loadingChange">
    加载中...
  loading>
<view>


    
