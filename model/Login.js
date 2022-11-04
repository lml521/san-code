// 登录接口

import Http from '../utils/request'


class  Login{
  static getLogin(data){
    return Http.request({url:"/weixinpay/login",method:"GET",data})
  }
}

export default Login