

let carts =wx.getStorageSync("cartList")||[]
console.log(carts,555);
const addCart =(data)=>{
let index=_hasData(data._id)
console.log(index,'index');
  if(index<=0){
    data.num=1
    console.log(data);
    carts.push(data)
  }else{
    carts[index].num+=1
  }
  wx.setStorageSync('cartList', carts)
}
const _hasData=(id)=>{
  console.log(carts,18);
 return  carts.findIndex(item=>{
   console.log(item);
   return  item._id===id
  })
}
export {
  addCart
}