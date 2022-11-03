// pages/cart/cart.js\\\

import shoppingModel from '../../model/shoppingModel'
import {addCart} from '../../common/cart'
import getsetSub from '../../common/computed-total-price'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shoppingList: [],
    subNum: 0
  },

 
  // 总计
  getsetNumber() {
  let subNum=  getsetSub()
    this.setData({
      subNum
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
// 调用接口
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
     this.getsetNumber()
   },
// 去结算
   closeAccount(){
     wx.navigateTo({
       url: '/pages/confirmPayment/confirmPayment',
     })
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getsetNumber()
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
    this.getsetNumber()
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