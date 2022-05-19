// app.js
App({
  // 定义全局数据
  globalData: {
    // 初始化屏幕宽度
    screenWidth: 0,
    // 初始化屏幕高度
    screenHeight: 0,
    // 状态栏高度
    statusBarHeight: 0,
    // 导航栏的高度
    navBarHeight: 44,
    // 屏幕高宽比
    deviceRatio: 0
  },
  // 程序启动生命周期
  onLaunch() {
    // 获取屏幕宽高
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    // 获取状态栏高度
    this.globalData.statusBarHeight = info.statusBarHeight
    // 计算高宽比
    const ratio = info.screenHeight / info.screenWidth;
    this.globalData.deviceRatio = ratio;
  }
})