// 页面
<view class="register-container">
  <form bindsubmit="formSubmit">
    <view class="section">
      <picker class="country" bindchange="bindPickerChange" value="{{index}}"
        range="{{array}}" bindchange="bindPickerChange">
        <view class="picker">
          {{array[index]}}
          <image src="/images/ic_triangle.png" class="triangle"></image>
        </view>
      </picker>
      <input class="input phone" name="mobile" value="{{mobile}}" placeholder="手机号"
        placeholder-class="input-placeholder" bindinput="bindMobileInput" />
    </view>

    <view class="section">
      <input class="input verification" name="verification" value="{{verification}}" placeholder="验证码" placeholder-class="input-placeholder" />
      <button size="mini" plain="true" class="verification-btn" hover-class="btn-hover" bindtap="bindGetVerification"> 获取验证码 </button>
    </view>
    <view>
      <button formType="submit" size="mini" plain="true" class="next-btn" hover-class="btn-hover"> 下一步 </button>
    </view>
  </form>
</view>

// js
var api = require('../../utils/api.js')
Page({
  data: {
    array: ['中国', '新加坡', '日本', '香港', '韩国', '台湾', '澳门'],
    arrayNum: ['86', '65', '81', '852', '82', '886', '853'],
    index: 0,
    mobile: 0
  },

  onLoad () {
  },

  onPullDownRefresh () {
    wx.stopPullDownRefresh()
  },

  bindPickerChange (e) {
    this.setData({
      index: e.detail.value
    })
  },

  bindMobileInput (e) {
    console.log(e.detail.value)
    this.setData({
      mobile: e.detail.value
    })
  },

  bindGetVerification () {
    let that = this
    api.post(api.GET_VERIFICATION, {
      area: parseInt(this.data.arrayNum[this.data.index]),
      mobile: parseInt(this.data.mobile),
      type: 'sign'
    }).then(res => {
      console.log(res)
      // 后台验证了来源，故无法获取正确返回
    })
  },

  formSubmit: function(e) {
    console.log(e.detail.value)
  }
})


// css
.register-container {
  padding: 20px;
  display: flex;
}

form {
  width: 100%;
}

.section {
  display: flex;
}

.picker {
  padding: 0 0 0 10px;
}

.country {
  display: flex;
  font-size: 12px;
  border: 1px solid #ddd;
  width: 70px;
  height: 30px;
  line-height: 30px;
}

.triangle {
  width: 8px;
  height: 6px;
}

.phone {
  flex: 1;
  margin-left: -1px;
}

.verification {
  flex: 1;
  margin: 20px 0;
}

.input {
  border: 1px solid #ddd;
  font-size: 12px;
  padding: 0 10px;
  line-height: 30px;
  height: 30px;
}

.input-placeholder {
  color: #aaa!important;
}

.verification-btn {
  border: 1px solid #bbb!important;
  color: #777!important;
  border-radius: 0px;
  height: 32px;
  margin: 20px 0 20px 20px;
}

.btn-hover {
  background-color: #eee!important;
}

.next-btn {
  margin: 20px 0;
  border: 1px solid #bbb!important;
  color: #777!important;
  width: 100%;
  border-radius: 0px;
}

var mood = '开心';

var ren = '陈晓英';

if(ren === '陈晓英'){
	goShoping('线上&&网上')
}else if(mood === '开心'){
	goShoping('线下')
}else if(mood !== '开心'){
	goShoping('网上')
}else{
	goShoping()
}
