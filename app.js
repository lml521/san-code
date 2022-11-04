// app.js
import Loginapi from './model/Login'
App({
  onLaunch() {
    this.initLoad()
  },


  // 0.  初始化
  async initLoad() {
    let code = this.wxLogin()
    let res = this.login({code})
    console.log(res);
    this.setUserInfo(res.userInfo)
  },

  // 1.获取小程序登录 的code码
  async wxLogin() {
    let {code} = await wx.login()
    console.log(code, '登录');
    return code
  },

  // 2. 获取登录接口 把id传递过去
  async login(code) {
    let res = await Loginapi.getLogin({code})
    console.log(res);
  },


  // 获取到optionid 存储 saveLocalInfo
  setUserInfo(userInfo){
    if(!userInfo) return 
    wx.setStorageSync('userInfo', userInfo)
  }
})