// 在微信小程序中;从一个页面转到另一个页面;一般情况下可以通过navigate或则redirect时候的url来携带参数;然后在目标页面的onload函数参数中获取这些url参数
// 源页面A相关代码
wx.navigateTo({
  url: "/pages/mypage/mypage?a=1&b=2"
})

// 目标页面B相关代码
Page({
  onLoad: function (options) {
    var a = options.a; // 值：1
    var b = options.b; // 值：2
  }
})

// 但是;这种方式只有在目标页面还没有创建的时候才有效;因为一个页面的onLoad方法在页面的生命周期中只执行一次

// 另一个场景

// 1. 在【页面A】中调用wx.navigateTo方法跳转到【页面B】
// 2. 然后从【页面B】返回【页面A】, 并将【页面B】中的一些数据传回【页面A】

// 方案一：存储全局
//=== 1. 存储到app对象上的方式 ========
var app = getApp()
app.globalData.mydata = {a:1, b:2};  //存储数据到app对象上
wx.navigateBack();  //返回上一个页面

//=== 2.存储到数据缓存的方式 =========
wx.setStorage({
  key: "mydata",
  data: {a:1, b:2},
  success: function () {
    wx.navigateBack();   //返回上一个页面
  }
})

// 方案二：从页面的路由栈中直接获取和操作目标Page对象
var pages = getCurrentPages();
var currPage = pages[pages.length - 1];   //当前页面
var prevPage = pages[pages.length - 2];  //上一个页面

//直接调用上一个页面的setData()方法，把数据存到上一个页面中去
prevPage.setData({
  mydata: {a:1, b:2}
})

