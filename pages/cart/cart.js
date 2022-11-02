// pages/cart/cart.js\\\

import shoppingModel from '../../model/shoppingModel'
import {addCart} from '../../common/cart'
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
  //  继续添加
  continueAdd(){
    wx.scanCode({
      onlyFromCamera: true,
      success:(res)=>{
        let {result} =res
        console.log(res);
        this.getProductInfo(result)
      }
    })

  },


  async getProductInfo(result){
    let data ={qcode:result}
    console.log(data);
     let response=await shoppingModel.getProductInfoApi(data)
     if(response.result.length>0){
       console.log(response.result[0],'response.result[0]');
       addCart(response.result[0])

      this.setData({
        shoppingList: wx.getStorageSync('cartList')
      })
     }else{
       wx.showToast({
         title:"获取不到商品信息",
         icon:"none"
       })
     }
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
    this.getsetSub()
    this.getCartList()
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