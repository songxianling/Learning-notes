// 居中
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
// input
type="number" confirm-type="done"  value="{{car_price}}" placeholder-style="color:#FF6000;margin-right:10rpx;font-size:28rpx;" placeholder="请输入" class="car-price" bindconfirm="changeCarPrice" bindblur="changeCarPrice"/>
// 从子页面返回数据到父页面
wx.navigateBack()   //返回上一页
var pages = getCurrentPages();
var currPage = pages[pages.length - 1];   //当前页面
var prevPage = pages[pages.length - 2];  //上一个页面
prevPage.setCarInfo({ 
  "car_model": e.currentTarget.dataset.car, 
  "car_price": 289000
})
// 切换tab页面
wx.switchTab({
  url: '../CMSpecialCar/CMSpecialCar',
})
// 动态改变样式
style="color:{{text_color}}">推荐车型
this.setData({
    text_color: '#ffffff'
})
