import Http from '../utils/request'

class shoppingModel{
  static getProductInfoApi(data){
    return Http.request({url:"/api/getProduct",method:"GET",data})
  }
}

export default shoppingModel