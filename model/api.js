import Http from '../utils/request'

const getBanner =()=>{
  return Http.request({url:"/app/banner",method:"GET"})
}

export default {
  getBanner
}