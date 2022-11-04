// 获取商品的总数量
const getProductTotalNum = ()=>{
  let cartList = wx.getStorageSync('cartList')||[]
  let sum = 0;
    cartList.forEach(item=>{
      sum += item.num
    })
    return sum
  }
export default getProductTotalNum


