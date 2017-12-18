// 一般的推荐是会有name、id的字段标识
<view class="hot-city hot">
    <view class="title">
      <text></text>
      <text>周边热门城市</text>
      <text></text>
    </view>
    <view class="city-box">
      <text class="city" wx:for="{{nearbyCity}}" wx:key="{{index}}" bindtap="enterCity" data-cityname="{{item}}">{{item}}</text>
    </view> 
     
//　这个可以认为是name标识；点击事件为
enterCity(e){
    let cityname=e.currentTarget.dataset.cityname;
    wx.navigateTo({
      url: 'cityView/cityView?cityname='+cityname+''
    })
  }

//　在跳转到cityView页时
 onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    let cityname=options.cityname;
    wx.setNavigationBarTitle({
      title: ''+cityname+''
    })
  }
 
 //　成功设置当前的标题

