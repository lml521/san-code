// 支付接口 

import Http from '../utils/request'


class  Order{
  static doOrder(data){
    return Http.request({url:"/weixinpay/doOrder",method:"GET",data})
  }
}

export default Order