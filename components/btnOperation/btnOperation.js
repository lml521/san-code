// components/btnOperation/btnOperation.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shoppingList: {
      type: Array,
      default: () => []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    subNum: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getSubNum() {
     let sum= wx.getStorageSync('subNum')
     console.log(sum);
      // let cartList = wx.getStorageSync('cartList')
      // let sum =0
      // cartList.forEach(item => {
      //   sum += Number(item.price) * Number(item.num)
      // })
      this.setData({
        subNum: sum
      })
      // wx.setStorageSync('subNum', sum)
    },
  },
  attached(){
    this.getSubNum()
  },
})