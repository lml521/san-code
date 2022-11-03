// components/code/code.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    status:{
      type:Array,
      default:()=>[]
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 子传父 当点击扫描商品按钮 传递到父组件
    handelScanCode(){
      this.triggerEvent('handelScanCode')
    },

  },

})