// pages/confirmPayment/confirmPayment.js
import getsetSub from '../../common/computed-total-price'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderlist: [], //总数据
    orderSize: 1, //展示数量
    switchStatus: true, //是否开启余额减扣
    balance :4,//余额
    practicalPrice: 0, //商品金额   总价格
    reducePrice: 4, //余额减扣
    actualPrice: 0, //实际支付的钱

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
  paymentBtn() {
    wx.removeStorageSync('cartList')
    wx.navigateTo({
      url: '/pages/paySuccess/paySuccess',
    })
  },

  //商品金额 余额
  getsetNumber() {
    let practicalPrice = Number(getsetSub())//总价格
    console.log(practicalPrice, this.data.balance);
    // 判断是否开启 余额
    if (this.data.switchStatus) {
      console.log(this.data.balance,);
      if (this.data.balance > practicalPrice) {
        let balance=this.data.balance-practicalPrice
        console.log(balance);
        this.setData({
          balance,
          practicalPrice,
          reducePrice:practicalPrice,
          actualPrice:0,
        })
       }else{
        console.log(123);
        this.setData({
          balance :4,//余额
          practicalPrice, //商品金额   总价格
          reducePrice: 4, //余额减扣
          actualPrice:practicalPrice - this.data.balance, //实际支付的
        })
      }
    }else{
       this.setData({
        balance :4,//余额
        practicalPrice, //商品金额   总价格
        reducePrice: 0, //余额减扣
        actualPrice:practicalPrice, //实际支付的钱
    })
    }

   
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