// components/shoppingItem/shoppingItem.js
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

  },

  /**
   * 组件的方法列表
   */
  methods: {
    addNum(event) {
      let id = event.target.dataset.id
      let cartList = wx.getStorageSync('cartList')
      let index = cartList.findIndex(item => {
        return item._id == id
      })
      cartList[index].num += 1
      wx.setStorageSync('cartList', cartList)
      this.setData({
        shoppingList: cartList
      })
      this.triggerEvent("getsetSub")
    },
    subNum(event) {
      let id = event.target.dataset.id
      let cartList = wx.getStorageSync('cartList')
      let index = cartList.findIndex(item => {
        return item._id == id
      })

      cartList[index].num -= 1
      wx.setStorageSync('cartList', cartList)
      this.setData({
        shoppingList: cartList
      })
      this.triggerEvent("getsetSub")
    },
  },
})
