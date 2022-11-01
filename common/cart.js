

let carts =wx.getStorageSync("cartList")||[]
const addCart =(data)=>{
let index=_hasData(data._id)
console.log(index,'index');
  if(index<0){
    data.num=1
    carts.push(data)
  }else{
    carts[index].num+=1
  }
  wx.setStorageSync('cartList', carts)
}
const _hasData=(id)=>{
 return  carts.findIndex(item=>{
   return  item._id===id
  })
}
export {
  addCart
}