// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingList: [],
    subNum: 0
  },
  // 总计
  getsetSub() {
    let cartList = wx.getStorageSync('cartList')||[]
    let sum = 0;
    cartList.forEach(item => {
      sum += (Number(item.price) * Number(item.num))
    })
    this.setData({
      subNum: sum.toFixed(2)
    })
  },

  // 获取本地购物车数据
  getCartList() {
    let shoppingList = wx.getStorageSync('cartList')
    this.setData({
      shoppingList,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getsetSub()
    this.getCartList()

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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