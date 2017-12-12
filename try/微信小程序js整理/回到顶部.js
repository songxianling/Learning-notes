// js
// 绑定滚动事件
scrollHandle:function(e){ //滚动事件
    this.setData({
      scrolltop:e.detail.scrollTop
    })
  },
goToTop:function(){ //回到顶部
    this.setData({
      scrolltop:0
    })
  },
  
// html
<icon class="gototop {{scrolltop>200?'active':''}}" bindtap="goToTop" type="download" size="36" color="#3399FF"></icon>
	</scroll-view>