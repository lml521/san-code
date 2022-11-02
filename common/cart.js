const addCart = (data) => {
  let carts = wx.getStorageSync("cartList") || []
  let index = _hasData(data._id,carts)
  if (index < 0) {
    data.num = 1
    carts.push(data)
  } else {
    carts[index].num += 1
  }
  wx.setStorageSync('cartList', carts)
}
const _hasData = (id,carts) => {
  return carts.findIndex(item => {
    return item._id === id
  })
}
export {
  addCart
}