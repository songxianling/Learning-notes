## 目前打包后的文件不能超过2M，否则不能上传到微信服务器。
#### 不支持的
1.不支持sass语法
2.不支持window/document,所以也不能使用jq
3.不支持直接使用svg标签;但是可以放到image的src或则background-Image
4.不支持阻止事件;没有preventDefault
5.没有br标签
6.不支持table标签
7.不能使用&nbsp;来增大文字间距
#### 新增的
1.img标签换成了image
2.text标签内认\n换行;不能包裹<br/>会直接输出;类似textarea
3.小程序中nth-child(n)是从0开始的
4.switch标签;但是不能改变大小样式;想老的radio一样
5.picker标签;但是在开发者工具中选项不会循环
6.scroll-view标签;有滚动条的盒子;想要在进入页面的时候自动滚动到某处;可以使用scroll-view的scroll-into-view属性;不过一定要在scroll-view存在后设置才会生效;尤其是通过template引用的时候;比如同事通过setData设置使用该template和scroll-init-view的值;并不会使滚动生效
7.关于屏幕下拉露底;android不会;ios会;可以通过配置解决;disableScroll Boolean false设置为true则页面整体不能上下滚动;只在page.json中有效;无法在app.json中设置
https://mp.weixin.qq.com/debug/wxadoc/dev/framework/config.html
8.template标签   https://mp.weixin.qq.com/debug/wxadoc/dev/framework/view/wxml/template.html
9.在功能按钮上使用catchtap防止冒泡
10.hidden参数
#### 小窍门
1.关于下拉刷新;要在page.json中设置enablePullDownRefresh:true;然后onPullDownRefresh内要手动的stopPullDownRefresh;否则一直在loading
2.page的onload函数中有参数options可以获取路径的query
3.小程序的支付和微信的支付不是一个appid;需要后端新开发下单接口
http://www.wxapp-union.com/article-782-1.html
4.wxml最好在开发者工具编辑(有提示);js/wxss可以在熟悉的编辑器中编辑
5.小程序中如果赋新值是undefined的话;根本不会进行赋值;也不会覆盖之前的值
app.setData({
    isPaperCollected: finishedQuizList['id'+quizID] || false
})
6.通过多次使用Object.assign({}) 解决data也模块化后data不能深层复制的问题。
Object.assign不是深层复制。
7.在微信web开发者工具中一定要在动作->设置->勾上“不使用任何代理，勾选后直连网络”，否则老是报“
Failed to load resource: net::ERR_NAME_NOT_RESOLVED”的bug：链接
8.每一个小程序页面也可以使用.json文件来对本页面的窗口表现进行配置。 页面的配置比app.json全局配置简单得多，只是设置app.json中的window配置项的内容，页面中配置项会覆盖app.json的window中相同的配置项。页面的.json只能设置window相关的配置项，以决定本页面的窗口表现，所以无需写 window 这个键。链接。
9.data是在page中设置的，不是在app.js中的。不涉及渲染的可以不要放data里面。
10.Page.prototype.setData()变更数据同时更新页面数据。
setData 函数用于将数据从逻辑层发送到视图层，同时改变对应的 this.data 的值。直接修改 this.data 无效，无法改变页面的状态，还会造成数据不一致。单次设置的数据不能超过1024kB，请尽量避免一次设置过多的数据。
11.wx:if 是惰性的，如果在初始渲染条件为false，框架什么也不做，在条件第一次变成真的时候才开始局部渲染。











