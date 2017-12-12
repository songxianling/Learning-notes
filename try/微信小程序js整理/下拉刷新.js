// 分为绑定和不绑定
// 绑定
在json中配置
{
    "enablePullDownRefresh": true 
}
在滑动的标签上  bindscrolltoupper="upper"
在js中
upper: function(e) {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    
        //模拟加载
        setTimeout(function()
        {
          // complete
          wx.hideNavigationBarLoading() //完成停止加载
          wx.stopPullDownRefresh() //停止下拉刷新
        },1500);
  },
  

// 不绑定
onPullDownRefresh: function(){
    console.log('刷新')
  },