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

    // 获取id 
    getId(event) {
      let id = event.target.dataset.id
      let cartList = wx.getStorageSync('cartList')
      console.log(cartList);
      let index = cartList.findIndex(item => {
        return item._id == id
      })
      return {
        cartList,
        index
      }
    },
    // 设置本地数据
    setList(cartList) {
      console.log(cartList,'本地数据');
      wx.setStorageSync('cartList', cartList)
      this.setData({
        shoppingList: cartList
      })
      this.triggerEvent("getsetSub")
    },
    // 加
    addNum(event) {
      let {cartList,index}= this.getId(event)
      cartList[index].num += 1
      // 设置本地数据 
      this.setList(cartList)
    },
    // 减

    subNum(event) {
      let {cartList,index}= this.getId(event)
      let num = cartList[index].num
      let cartStatus = this.removeCartItem(num,cartList,index)
        if(!cartStatus){
         cartList[index].num -= 1
        }
          this.setList(cartList)
      // wx.setStorageSync('cartList', cartList)
      // this.setData({
      //   shoppingList: cartList
      // })
      // this.triggerEvent("getsetSub")

    },

    // 删除 当数据为1的时候
    removeCartItem(num,cartList,index) {

      if (num == 1) {
        wx.showModal({
          content: "您确认要删除此商品吗",
          success: (res) => {
            if (res.confirm) {
              cartList.splice(index, 1)
            }
            console.log(cartList,'cartList');
            this.setList(cartList)
          },
        })
        return true
      }
    },
  },
})