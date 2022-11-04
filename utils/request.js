import {
  config
} from '../config/config'; // 全局配置文件
import {
  wxToPromise
} from './wxToPromise'; //封装数据

import {exceptionMessage} from '../config/exceptionMessage'

// 使用class 定义类 
class Http {
  // 公有方法  公有方法就是能被外部访问并调用的方法
  static request({
    url,
    method = "GET",
    data = {},
    header = {}
  }) {

    // loading加载
    wx.showLoading({
      title: '加载中',
    })
    return Http._request({
      url,
      method,
      data,
      header
    })
  }
  // 私有方法 是指在对象的构造函数里声明，外部不可见且不可访问的方法。
  static async _request({
    url,
    method,
    data,
    header
  }) {
    try {
      let res = await wxToPromise("request", {
        url: config.baseUrl + url,
        method,
        data,
        header: {
          ...header
        }
      })
    //  当请求成功 返回数据 
      if(res.statusCode===200){
        return res.data
      }
      // 错误提示
      Http._showErrorMessage(res.statusCode, res.data.msg)
    } catch (error) {
      console.log(error);

    } finally {
      wx.hideLoading()
    }
  }

  _showErrorMessage (error_code,msg){
    console.log(error_code,msg);
    let title =exceptionMessage[error_code]||mag||"未知错误"
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000
    })
    
  }
}

export default Http

/**
 * static的作用
 * static是静态的意思，是一个修饰符，就像是一个形容词，
 * 是用来形容类，变量，方法的。在声明static关键字时，
 * 可以在前面加上static修饰，用static修饰的成员变量称做类变量
 * （static变量、静态变量）
 */