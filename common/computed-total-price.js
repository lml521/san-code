// 总价格

const  getsetSub=()=> {
  let cartList = wx.getStorageSync('cartList')||[]
  let sum = 0;
  cartList.forEach(item => {
    sum += (Number(item.price) * Number(item.num))
  })
  console.log(sum.toFixed(2));
   return  sum.toFixed(2)
}

export default getsetSub