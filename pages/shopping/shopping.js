// pages/shopping/shopping.js
import shoppingModel from '../../model/shoppingModel'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数据
    advertList:[],
  },
  // 获取轮播图数据
  getAdvertList(){
    // 模拟轮播图数据
    const data=[
      {
        id:1,
        imgUrl:"https://img1.baidu.com/it/u=2784910973,3857623495&fm=253&fmt=auto&app=138&f=JPEG?w=1200&h=375"
      },{
        id:2,
        imgUrl:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F87ea1b2a1e4f42ed03c02e337b16d09416d6039e21bd7-BFN8hx_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1669780070&t=a5f4129cc105be60254ac4a7fcd8154f"
      },{
        id:3,
        imgUrl:"https://img0.baidu.com/it/u=1745076922,209989677&fm=253&fmt=auto&app=138&f=JPEG?w=1200&h=375"
      },
    ]
    // 小程序中数据不是响应式的 使用 this.setData 修改数据 
    this.setData({
      advertList:data
    })
  
  },

  // 点击扫描商品事件
  handelScanCode(){
    wx.scanCode({
      onlyFromCamera: true,
      success:(res)=>{
        let {result} =res
        console.log(result);
        this.getProductInfo(result)
      }
    })
  },
 async getProductInfo(result){
   let data ={qcode:result}
    let response=await shoppingModel.getProductInfoApi(data)
    console.log(response,5);
    // let {result}=response
    console.log(response);
    if(response.result.length>0){
      console.log(123,response.result);
      
      wx.navigateTo({
        url: '/pages/cart/cart',
      })
    }
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    this.getAdvertList()
  },

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