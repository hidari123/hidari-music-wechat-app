// components/navigation-bar/index.js
const {
  globalData
} = getApp()
Component({
  options: {
    // 启用多个插槽
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: "默认标题"
    }
  },

  data: {
    statusBarHeight: globalData.statusBarHeight,
    navBarHeight: globalData.navBarHeight
  },

  /**
   * 组件的生命周期
   */
  lifetimes: {},

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击左边
    handleleftBtnClick() {
      this.triggerEvent('click')
    }
  }
})