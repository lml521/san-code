// pages/confirmPayment/confirmPayment.js
import getsetSub from '../../common/computed-total-price'

import Order from '../../model/Order'

import getProductTotalNum from "../../common/total-number"
import sign from "../../common/sign"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [], //总数据
    orderSize: 1, //展示数量
    switchStatus: true, //是否开启余额减扣
    balance: 4, //余额
    practicalPrice: 0, //商品金额   总价格
    reducePrice: 4, //余额减扣
    actualPrice: 0, //实际支付的钱
    totalNum: 0, //购买商品数量

  },
  // 获取 订单页面 数据
  getOrderList() {
    let orderlist = wx.getStorageSync("cartList")
    this.setData({
      orderlist,
    })
  },

  // 切换展开收起 
  handelChangeSpread() {
    let size = this.data.orderSize == 1 ? this.data.orderlist.length : 1
    this.setData({
      orderSize: size
    })
  },

  // 是否开启 余额减扣
  switchStatusChange(e) {
    let value = e.detail.value
    this.setData({
      switchStatus: value,
    })
    this.getsetNumber()
  },
  // 确认支付
  async paymentBtn() {
    const userinfo = wx.getStorageSync("userInfo")
    console.log(userinfo);

    const signData = sign({
      openid : userinfo.openid,
      salt : userinfo.salt,
      uid : userinfo._id
    })
    let data = {
      openid: userinfo.openid,
      uid: userinfo._id,
      sign: signData,
      total_price: this.data.practicalPrice,
      total_num: this.data.totalNum,
      derate_price: this.data.reducePrice,
      real_price: this.data.actualPrice,
      order: JSON.stringify(this.data.orderList)
    }
    const res = await Order.doOrder(data)
    console.log(res);
    // this.wxPay(res)

    wx.removeStorageSync('cartList')
    wx.navigateTo({
      url: '/pages/paySuccess/paySuccess',
    })
  },
// 拉起微信支付
  wxPay(res){
    // const data = JSON.parse(res.result)
    // console.log("支付所需要的参数", data)
    // wx.requestPayment({
    //   timeStamp: data.timeStamp,
    //   nonceStr: data.nonceStr,
    //   package: data.package,
    //   signType: 'MD5',
    //   paySign: data.paySign,
    //   success: (res)=> {
        // console.log("res=>===", res)
        // if(res.errMsg === 'requestPayment:ok'){
          // wx.removeStorageSync(cartList)
          // wx.navigateTo({
          //     url: '/pages/paySuccess/paySuccess',
          //   })
        // }
      //  },
    //   fail : (error)=> { 
    //     console.log("error===>",error)
    //   }
    // })
  },

  //商品金额 余额
  getsetNumber() {
    let practicalPrice = Number(getsetSub()) //总价格
    console.log(practicalPrice, this.data.balance);
    // 判断是否开启 余额
    if (this.data.switchStatus) {
      console.log(this.data.balance, );
      if (this.data.balance > practicalPrice) {
        let balance = this.data.balance - practicalPrice
        console.log(balance);
        this.setData({
          balance,
          practicalPrice,
          reducePrice: practicalPrice,
          actualPrice: 0,
        })
      } else {
        console.log(123);
        this.setData({
          balance: 4, //余额
          practicalPrice, //商品金额   总价格
          reducePrice: 4, //余额减扣
          actualPrice: practicalPrice - this.data.balance, //实际支付的
        })
      }
    } else {
      this.setData({
        balance: 4, //余额
        practicalPrice, //商品金额   总价格
        reducePrice: 0, //余额减扣
        actualPrice: practicalPrice, //实际支付的钱
      })
    }


  },

  // 商品数量 
  handleComputedNum() {
    const totalNum = getProductTotalNum(this.data.orderList)
    this.setData({
      totalNum
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getOrderList()
    this.getsetNumber()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // this.getsetNumber()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})