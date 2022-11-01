
/**  封装请求*/

function wxToPromise(methodes,options){
  return new Promise((resolve,reject)=>{
    options.success=resolve
    options.fail=(error)=>{
      reject(error)
    }
    
    wx[methodes](options)
  })
}
export {
  wxToPromise,
}