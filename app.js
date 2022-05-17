// app.js
App({
  // 定义全局数据
  globalData: {
    // 初始化屏幕宽度
    screenWidth: 0,
    // 初始化屏幕高度
    screenHeight: 0
  },
  // 程序启动生命周期
  onLaunch() {
    // 获取屏幕宽高
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.srceenHeight = info.srceenHeight
    console.log(this.globalData.screenWidth);
  }
})