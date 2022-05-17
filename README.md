<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [hidari-music 开发文档](#hidari-music-%E5%BC%80%E5%8F%91%E6%96%87%E6%A1%A3)
  - [封装 request 组件](#%E5%B0%81%E8%A3%85-request-%E7%BB%84%E4%BB%B6)
  - [video 页面开发](#video-%E9%A1%B5%E9%9D%A2%E5%BC%80%E5%8F%91)
    - [页面展示](#%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA)
    - [实现上拉刷新和下拉加载](#%E5%AE%9E%E7%8E%B0%E4%B8%8A%E6%8B%89%E5%88%B7%E6%96%B0%E5%92%8C%E4%B8%8B%E6%8B%89%E5%8A%A0%E8%BD%BD)
      - [封装请求方法](#%E5%B0%81%E8%A3%85%E8%AF%B7%E6%B1%82%E6%96%B9%E6%B3%95)
      - [实现](#%E5%AE%9E%E7%8E%B0)
    - [点击 item 实现跳转到详情页面](#%E7%82%B9%E5%87%BB-item-%E5%AE%9E%E7%8E%B0%E8%B7%B3%E8%BD%AC%E5%88%B0%E8%AF%A6%E6%83%85%E9%A1%B5%E9%9D%A2)
  - [首页](#%E9%A6%96%E9%A1%B5)
    - [search 搜索框](#search-%E6%90%9C%E7%B4%A2%E6%A1%86)
    - [轮播图](#%E8%BD%AE%E6%92%AD%E5%9B%BE)
    - [推荐歌曲组件（插槽）](#%E6%8E%A8%E8%8D%90%E6%AD%8C%E6%9B%B2%E7%BB%84%E4%BB%B6%E6%8F%92%E6%A7%BD)
    - [封装 weapp 事件的全局状态管理工具](#%E5%B0%81%E8%A3%85-weapp-%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%85%A8%E5%B1%80%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7)
      - [封装hidari全局状态管理工具](#%E5%B0%81%E8%A3%85hidari%E5%85%A8%E5%B1%80%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7)
      - [使用全局状态管理工具](#%E4%BD%BF%E7%94%A8%E5%85%A8%E5%B1%80%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7)
    - [封装热门歌单组件](#%E5%B0%81%E8%A3%85%E7%83%AD%E9%97%A8%E6%AD%8C%E5%8D%95%E7%BB%84%E4%BB%B6)
    - [巅峰榜组件封装](#%E5%B7%85%E5%B3%B0%E6%A6%9C%E7%BB%84%E4%BB%B6%E5%B0%81%E8%A3%85)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# hidari-music 开发文档

## 封装 request 组件
- 封装 wx.request({}) 请求 `service\index.js`
```js
/**
 * 封装 wx.request({}) 请求
 */
// base_url 常量
const BASE_URL = 'http://123.207.32.32:9001'
class HidariRequest {
  /**
   * 封装 wx.request({})请求方法
   * @param {String} url 请求地址
   * @param {String} method 请求方法
   * @param {Object} params 请求参数
   */
  request(url, method, params) {
    // 通过 promise 返回拿到结果
    return new Promise((resolve, reject) => {
      wx.request({
        url: BASE_URL + url,
        method: method,
        data: params,
        success: (res) => {
          resolve(res.data)
          console.log(res.data)
        },
        fail: reject // js 简写形式 相当于
        /**
         * fail: (err) => reject(err)
         */
      })
    })
  }

  /**
   * 封装 get 请求
   * @param {String} url 请求地址
   * @param {String} params 请求参数
   */
  get(url, params) {
    return this.request(url, 'GET', params)
  }

  /**
   * 封装 post 请求
   * @param {String} url 请求地址
   * @param {String} params 请求参数
   */
  post(url, params) {
    return this.request(url, 'POST', params)
  }
}

const hidariRequest = new HidariRequest()

export default hidariRequest
```

**简写：**
```js
// 相当于调用fail: (err) => {}这个函数后再调用 reject(err) 函数
// 可以直接调用 reject，fail有参数 err 直接传给 reject
fail: (err) => {
  reject(err) 
}
```

## video 页面开发

### 页面展示
1. 封装 video 相关 api `service\api_video.js`
```js
import hidariRequest from './index'

/**
 * 请求视频数据api
 * @param {Number} offset 偏移量
 * @param {Number} limit 请求数据量
 */
export const getTopMV = (offset, limit = 10) => {
  return hidariRequest.get('/top/mv', {
    offset,
    limit
  })
}
```

2. 调用 api 存储数据 `pages\home-video\index.js`
```js
import { getTopMV } from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 视频数据列表
    topMVs: []
  },

  /**
   * 生命周期函数--监听页面加载 (created)
   */
  async onLoad(options) {
    /**
     * 请求视频数据api
     */
    const { data } = await getTopMV(0)
    this.setData({ topMVs: data })
  },
```

3. 基础页面搭建
```html
<view class="video">
  <block wx:for="{{topMVs}}" wx:key="id">
    <view class="item">
      <view class="album">
        <image class="image" src="{{item.cover}}" mode="widthFix"></image>
        <view class="info">
          <view class="count">{{item.playCount}}</view>
          <view class="duration">{{item.mv.videos[0].duration}}</view>
        </view>
      </view>
      <view class="content">
        {{item.name}}-{{item.artistName}}
      </view>
    </view>
  </block>
</view>
```

4. 数据格式化 `utils\format.wxs`
```js
/**
 * 格式化数据
 * wxs => 格式化 wxml 中的数据 不支持 es6
 * 语法参考 https://developers.weixin.qq.com/miniprogram/dev/reference/wxs/
 */

/**
 * 格式化播放量
 * @param count 播放量
 */
function formatCount(count) {
  var counter = parseInt(count)
  if (counter > 100000000) {
    /**
     * toFixed() 方法可把 Number 四舍五入为指定小数位数的数字。()中是小数位数
     * 其四舍五入的规则与数学中的规则不同，使用的是银行家舍入规则，
     * 银行家舍入：实质是一种四舍六入五取偶（又称四舍六入五留双）法。具体规则如下：
     * 简单来说就是：四舍六入五考虑，五后非零就进一，五后为零看奇偶，五前为偶应舍去，五前为奇要进一。
     * 其规则与数学中处理方式不同，可以自定义去使用Math.round方法进行自定义式 的实现指定保留多少位数据进行处理。
     * round() 方法可把一个数字舍入为最接近的整数。
     */
    return (counter / 100000000).toFixed(1) + "亿"
  } else if (counter > 10000) {
    return (counter / 10000).toFixed(1) + '万'
  } else {
    return counter + ''
  }
}

/**
 * 长度不够时左边补 0
 * @param time 时间
 */
function padLeftZero(time) {
  time = time.toString()
  // 字符串 time 前面补 00, 从第一位开始, slice去掉字符串 time 的长度 length
  // time = 12 => "0012" => time.length => 2 => 截掉2位, 剩余 "12"
  /**
   * es6 新增语法
   * (1) 在字符串前面插：String.prototype.padStart( 增加后的字符串长度, '用来填充的字符串' )
   * (2) 在字符串后面插：String.prototype.padEnd( 增加后的字符串长度, '用来填充的字符串' )
   */
  return ("00" + time).slice(time.length)
}

/**
 * 格式化歌曲时长
 * @param duration 歌曲时长(毫秒)
 */
function formatDuration(duration) {
  duration = duration / 1000 // 转化为秒
  var minute = Math.floor(duration / 60) // 向下取整 => 分钟
  var second = duration % 60 // 取余 => 秒
  return padLeftZero(minute) + ':' + padLeftZero(second)
}

// commonjs导出方式
module.exports = {
  formatCount: formatCount,
  formatDuration: formatDuration
}
```

5. 组件封装
  - 本页面需要用到 => 封装到本页面的文件夹下
  - 本项目需要用到 => 封装到 components
  - 其他项目也要用到 => 封装到 baseUI

封装 `video-item`
`components\video-item-v1\index.wxml`
```html
<!--video-item 组件-->

<!-- 引用wxs -->
<wxs src="../../utils/format.wxs" module="format"></wxs>
<view class="item">
  <view class="album">
    <image class="image" src="{{item.cover}}" mode="widthFix"></image>
    <view class="info">
      <view class="count">{{format.formatCount(item.playCount)}}</view>
      <view class="duration">{{format.formatDuration(item.mv.videos[0].duration)}}</view>
    </view>
  </view>
  <view class="content">
    {{item.name}}-{{item.artistName}}
  </view>
</view>
```
`components\video-item-v1\index.wxss`
```css
/* components/video-item-v1/index.wxss */

.item {
  width: 100%;
  margin-bottom: 30rpx;
}

.album {
  position: relative;
  border-radius: 12rpx;
  overflow: hidden;
  display: flex;
}

.album .image {
  width: 100%;
}

.info {
  position: absolute;
  padding: 0 10rpx;
  box-sizing: border-box;
  width: 100%;
  bottom: 8rpx;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 24rpx;
}

.info .count {
  padding-left: 36rpx;
  position: relative;
}

.info .count::before {
  content: "";
  position: absolute;
  left: -2rpx;
  top: 4rpx;
  width: 30rpx;
  height: 24rpx;
  background-size: cover;
  background-image: url("data:image/jpeg;base64,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");
}

.content {
  margin-top: 10rpx;
  font-size: 28rpx;

  /* 显示两行 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
}
```

- 引用组件
```html
<view class="video">
  <view class="item" wx:for="{{topMVs}}" wx:key="id">
    <video-item-v1 item="{{item}}"/>
  </view>
</view>
```
```json
{
  "usingComponents": {
    "video-item-v1": "/components/video-item-v1/index"
  }
}
```

### 实现上拉刷新和下拉加载

#### 封装请求方法
```js
  data: {
    // 视频数据列表
    topMVs: [],
    // 是否有更多数据
    hasMore: true
  },
  /**
   * 封装网络请求方法
   */
  async getTopMVData(offset) {
    // 判断是否可以请求
    // 如果没有更多数据, 直接返回
    if (!this.data.hasMore && offset !== 0) return
    // 展示加载动画
    wx.showNavigationBarLoading()
    // 主动触发下拉刷新 不能乱用 会一直刷新
    // if (offset === 0) {
    //   wx.startPullDownRefresh()
    // }
    // 请求数据
    const res = await getTopMV(offset)
    let newData = this.data.topMVs
    if (offset === 0) {
      newData = res.data
    } else {
      // 微信小程序的类库中没有包含数组的push()方法（给数组添加元素）
      newData = [...newData, ...res.data]
    }
    // 设置数据
    this.setData({
      topMVs: newData
    })
    this.setData({
      hasMore: res.hasMore
    })
    // 关闭加载动画
    wx.hideNavigationBarLoading()
    // 关闭下拉刷新动画 需要写 不然已经加载结束动画也不会停止
    if (offset === 0) {
      wx.stopPullDownRefresh()
    }
  },
```
```json
{
  // 设置为 true 可以下拉刷新
  "enablePullDownRefresh": true,
  // 设置为 dark 可以显示下拉刷新动画"..."
  "backgroundTextStyle": "dark",
  "usingComponents": {
    "video-item-v1": "/components/video-item-v1/index"
  }
}
```
#### 实现
```js
  /**
   * 生命周期函数--监听页面加载 (created)
   */
  onLoad(options) {
    /**
     * 请求视频数据api
     */
    this.getTopMVData(0)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.getTopMVData(0)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    this.getTopMVData(this.data.topMVs.length)
  },
```

### 点击 item 实现跳转到详情页面
1. 给 `item` 组件绑定点击事件
```html
<view class="video">
  <view class="item" wx:for="{{topMVs}}" wx:key="id">
    <!-- data-xxx 给组件添加上一个属性 可以在监听到事件之后 用 event 拿到 -->
    <video-item-v1 item="{{item}}" bindtap="handleVideoItemClick" data-item="{{item}}" />
  </view>
</view>
```

2. 监听 `item` 点击事件
```js
  /**
   * 封装事件处理的方法
   * 监听 item 点击事件
   */
  handleVideoItemClick(event) {
    // 得到点击的 item.id
    const id = event.currentTarget.dataset.item.id
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    })
  },
```

3. 新建 page `detail-video`
```html
<!--pages/detail-video/index.wxml-->
<wxs src="../../utils/format.wxs" module="format"></wxs>
<video class="video" autoplay danmu-list="{{danmuList}}" src="{{mvURLInfo.url}}" loop></video>
<view class="detail">
  <view class="title">{{mvDetail.name}}</view>
  <view class="author">{{mvDetail.artistName}} -</view>
  <view class="detail-info">{{format.formatCount(mvDetail.playCount)}}次播放 - {{mvDetail.publishTime}}</view>
</view>
<view class="more">推荐视频</view>
<view wx:for="{{relatedVideos}}" wx:key="vid" class="more-container" bindtap="handleVideoItemClick" data-item="{{item}}">
  <!-- widthFix => 宽完全显示 -->
  <view class="video-image">
    <image src="{{item.coverUrl}}" mode="widthFix" class="image"></image>
    <view class="info">
      <view class="count-more">{{format.formatCount(item.playTime)}}</view>
      <view class="duration">{{format.formatDuration(item.durationms)}}</view>
    </view>
  </view>
  <view class="other-detail">
    <view class="detail-title">{{item.title}}</view>
    <view class="detail-author">{{item.creator[0].userName}}</view>
  </view>
</view>
```
```css
/* pages/detail-video/index.wxss */
/* 整体页面布局 */
page {
  padding-top: 225px;
}

.video {
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 999;
  /* height: 225px; */
}

.detail {
  padding: 30rpx 30rpx 60rpx;
}

.detail .title {
  font-size: 48rpx;
  font-family: 'YouYuan';
  font-weight: 1000;
}

.detail .author,
.detail .detail-info {
  font-size: 30rpx;
  padding-top: 10rpx;
  color: rgb(90, 89, 89);
}

.more {
  padding: 0 30rpx;
  padding-bottom: 20rpx;
  font-size: 36rpx;
  font-weight: 700;
}

.more-container {
  padding: 0 30rpx 20rpx;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.more-container .video-image {
  width: 40%;
  position: relative;
}

.more-container .video-image .image {
  width: 100%;
}

.info .count-more {
  padding-left: 36rpx;
  position: relative;
}

.info .count-more::before {
  content: "";
  position: absolute;
  left: -2rpx;
  top: 4rpx;
  width: 30rpx;
  height: 24rpx;
  background-size: cover;
  background-image: url("data:image/jpeg;base64,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");
}

.more-container .other-detail {
  width: 60%;
  padding-left: 30rpx;
  line-height: 1.2rem;
}

.more-container .other-detail .detail-title {
  /* 显示两行 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
  font-size: 30rpx;
  font-weight: 600;
}

.more-container .other-detail .detail-author {
  padding-top: 8rpx;
  font-size: 30rpx;
  font-weight: 400;
  color: rgb(90, 89, 89);
}
```

4. 请求数据
```js
  data: {
    // 请求播放地址信息
    mvURLInfo: {},
    // mv详情信息
    mvDetail: {},
    // mv相关视频信息
    relatedVideos: [],
    // 弹幕数据
    danmuList: [{
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#00ff00',
        time: 3
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 得到传入的 id
    const id = options.id

    // 获取请求数据
    this.getPageData(id)
  },

  /**
   * 获取网络请求
   */
  getPageData(id) {
    // 如果用 async await 会等带上一个请求结束后再开始下一个请求, 效率低
    // 用 promise.then() 同时发送三个请求 效率更高

    // 请求播放地址
    getMVURL(id).then(res => {
      this.setData({
        mvURLInfo: res.data
      })
    })

    // 请求视频信息
    getMVDetail(id).then(res => {
      this.setData({
        mvDetail: res.data
      })
    })

    // 请求相关视频
    getRelatedVideo(id).then(res => {
      this.setData({
        relatedVideos: res.data
      })
    })
  },
```

## 首页

### search 搜索框
1. 导入 vant 组件库
```shell
npm install @vant/weapp
```
2. 使用：`工具 => 构建 npm`

3. 代码实现
```json
{
  "usingComponents": {
    "van-search": "@vant/weapp/search/index"
  }
}
```
```html
<!-- 搜索框 -->
<van-search background="#fafafa" shape="round" placeholder="搜索您喜欢的歌曲" bind:click-input="handleSearchClick"></van-search>
```
```css
/* 搜索框样式 */
.van-search__content {
  background-color: #fff;
}

.van-search {
  padding: 10px 0 !important;
}
```

### 轮播图
```html
<!-- 轮播图 -->
<swiper class="swiper" style="height: {{swiperHeight}}px;" indicator-dots autoplay circular>
  <block wx:for="{{banners}}" wx:key="bannerId">
    <swiper-item class="swiper-item">
      <!-- bindload => image 中监听到图片加载完毕 -->
      <image bindload="handleSwiperImageLoaded" class="swiper-image" src="{{item.pic}}" mode="widthFix"></image>
    </swiper-item>
  </block>
</swiper>
```
```css
/* pages/home-music/index.wxss */
page {
  padding: 0 20rpx;
}

/* 搜索框样式 */
.van-search__content {
  background-color: #fff;
}

.van-search {
  padding: 10px 0 !important;
}

/* 轮播图样式 */
.swiper {
  border-radius: 10rpx;
  /* 超出部分隐藏 */
  overflow: hidden;
  /* 处理一些机型适配左上角不是圆角的情况 */
  transform: translateY(0);
}

.swiper-item {
  /* 去掉图片底部默认3px */
  display: flex;
}

.swiper-item .swiper-image {
  width: 100%;
}
```

- 需求处理
1. 问题：`swipper` 固定高度`150px`，在不同机型下显示不一致
  - 思路：把`swipper`高度设置为图片在视图下的高度
  - 代码实现：
  `utils\query-rect.js`
  ```js
  /**
   * 查询显示区域矩形高度
  */
  const queryRect = (selector) => {
    // 获取结果 用 promise 返回 resolve()
    return new Promise((resolve) => {
      // 获取组件的高度
      const query = wx.createSelectorQuery()
      // 获取选择的 .swiper-image 组件矩形显示区域
      query.select(selector).boundingClientRect()
      // 滚动距离查询
      // query.selectViewport().scrollOffset()
      // 执行请求 返回 resolve(res)
      // 相当于 => 
      // query.exec((res) => {
      //   resolve(res)
      // })
      query.exec(resolve)
    })
  }

  export default queryRect
  ```
  - 节流 `utils\throttle.js`
  ```js
  /**
    * 节流：每隔一段时间请求一次
    * @param {*} fn 需要节流处理的函数
    * @param {*} interval 延时时间
    * @param {*} options leading 代表首次是否执行, trailing 代表结束后是否再执行一次
    */
  const throttle = (fn, interval = 1000, options = {
    leading: true,
    trailing: false
  }) => {
    // 1. 记录上次开始时间
    const {
      leading,
      trailing,
      resultCallback
    } = options
    // 初始化上次开始时间
    let lastTime = 0
    // 初始化延时器
    let timer = null

    // 2.事件触发时, 真正执行的函数
    const _throttle = function (...args) {
      // 方便处理回调，返回promise
      return new Promise((resolve, reject) => {
        // 2.1.获取当前事件触发时的时间
        const nowTime = new Date().getTime()
        // 如果第一次执行并且在开始时不先执行一次 把上次执行的时间设为当前事件触发时的时间
        if (!lastTime && !leading) lastTime = nowTime

        // 2.2.使用当前触发的时间和之前的时间间隔以及上一次开始的时间, 计算出还剩余多长事件需要去触发函数
        const remainTime = interval - (nowTime - lastTime)
        // 如果时间到了 需要触发函数
        if (remainTime <= 0) {
          // 如果有上一个延时器 清除
          if (timer) {
            clearTimeout(timer)
            timer = null
          }

          // 2.3.真正触发函数
          const result = fn.apply(this, args)
          // 如果有回调函数 执行回调函数
          if (resultCallback) resultCallback(result)
          resolve(result)
          // 2.4.保留上次触发的时间
          lastTime = nowTime
          return
        }

        // 如果结束后需要执行一次 并且没有延时器
        if (trailing && !timer) {
          timer = setTimeout(() => {
            timer = null
            // 如果需要刚开始执行一次 => lastTime = 0, 否则为当前时间
            lastTime = !leading ? 0 : new Date().getTime()
            const result = fn.apply(this, args)
            if (resultCallback) resultCallback(result)
            resolve(result)
          }, remainTime)
        }
      })
    }

    // 取消节流函数 重置数据
    _throttle.cancel = function () {
      if (timer) clearTimeout(timer)
      timer = null
      lastTime = 0
    }

    // 返回函数
    return _throttle
  }

  export default throttle
  ```
  - 监听到图片加载完毕后获取高度
  ```js
  // pages/home-music/index.js

  import {
    getBanners
  } from '../../service/api_music'
  import queryRect from '../../utils/query-rect'
  import throttle from '../../utils/throttle'

  // 生成节流函数
  const throttleQueryRect = throttle(queryRect)
  Page({

    /**
    * 页面的初始数据
    */
    data: {
      // 轮播图
      banners: [],
      // swiper轮播图高度(图片显示区域高度)
      swiperHeight: 0
    },

    /**
    * 生命周期函数--监听页面加载
    */
    onLoad(options) {
      // 获取页面数据
      this.getPageData()
    },

    /**
    * 事件处理 - 网络请求
    */
    getPageData() {
      getBanners().then(res => {
        /**
        * setData 是同步的还是异步的
        * setData 在设置 data 数据上 => 同步
        * 通过最新的数据对 wxml 进行渲染 => 异步
        * react 中是异步的
        */
        this.setData({
          banners: res.banners
        })
        // 可以直接拿到数据
        // console.log(this.data.banners)
      })
    },

    /**
    * 事件处理 - 点击搜索框
    */
    handleSearchClick() {
      // 跳转页面
      wx.navigateTo({
        url: '/pages/detail-search/index',
      })
    },

    /**
    * 事件处理 - 获取图片高度
    */
    handleSwiperImageLoaded() {
      // 获取 image 组件的高度
      throttleQueryRect('.swiper-image').then(res => {
        const rect = res[0]
        // 此时1s内只会执行一次
        this.setData({
          swiperHeight: rect.height
        })
      })
    }
  })
  ```
  ```html
  <!-- 轮播图 -->
  <swiper class="swiper" style="height: {{swiperHeight}}px;" indicator-dots autoplay circular>
    <block wx:for="{{banners}}" wx:key="bannerId">
      <swiper-item class="swiper-item">
        <!-- bindload => image 中监听到图片加载完毕 -->
        <image bindload="handleSwiperImageLoaded" class="swiper-image" src="{{item.pic}}" mode="widthFix"></image>
      </swiper-item>
    </block>
  </swiper>
  ```

2. 给轮播图图片设置圆角和`padding`
  - 思路：给页面整体设置`padding`，给轮播图设置`border-radios`（如果给图片设置，轮播图切换时会显示圆角）
  - 实现：
  ```css
  /* 轮播图样式 */
  .swiper {
    border-radius: 10rpx;
    /* 超出部分隐藏 */
    overflow: hidden;
    /* 处理一些机型适配左上角不是圆角的情况 */
    transform: translateY(0);
  }
  ```

### 推荐歌曲组件（插槽）
`components\area-header`
```html
<view class="header">
  <view class="title">{{title}}</view>
  <view class="right" wx:if="{{showMore}}" bindtap="handleRightClick">
    <view class="slot">
      <slot></slot>
    </view>
    <view class="default">
      <text class="text">{{rightText}}</text>
      <image class="icon" src="/assets/images/icons/arrow-right.png"></image>
    </view>
  </view>
</view>
```
```js
// components/area-header/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: '默认标题'
    },
    // 右边元素文本
    rightText: {
      type: String,
      value: '更多'
    },
    // 是否显示更多
    showMore: {
      type: Boolean,
      value: true
    }
  }
})
```
```css
/* components/area-header/index.wxss */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 88rpx;
}

.header .title {
  font-size: 36rpx;
  font-weight: 700;
}

.header .default {
  display: none;
  align-items: center;
  font-size: 28rpx;
  color: #777;
}

/* 伪类：判断slot 为空 */
/* 在 slot 为空时设置 .right 的 display 为flex */
.header .slot:empty+.default {
  display: flex;
}

.header .default .icon {
  width: 50rpx;
  height: 50rpx;
}
```

2. 使用
```html
<!-- 推荐歌曲 -->
<view class="recommend-song">
  <area-header title="推荐歌曲"></area-header>
</view>
```
```html
  <!-- 相关视频标题 -->
  <area-header title="猜你喜欢" showMore="{{false}}"></area-header>
```

- 需求：
1. 控制是否显示右边元素
  - 思路：`wx:if`控制右边更多是否显示
  - 实现：
  ```js
    /**
     * 组件的属性列表
    */
    properties: {
      // 是否显示右边元素
      showMore: {
        type: Boolean,
        value: true
      }
    }
  ```
  ```html
    <view class="right" wx:if="{{showMore}}" bindtap="handleRightClick">
  ```
2. 在有插槽内容时显示插槽内容，没有插槽内容时显示更多
  - 思路：写一个插槽 `slot`，默认右边更多为 `display:none`，在插槽内容为 `empty` 时，`display: flex;`
  - 实现：
  ```css
  .header .default {
    display: none;
    align-items: center;
    font-size: 28rpx;
    color: #777;
  }

  /* 伪类：判断slot 为空 */
  /* 在 slot 为空时设置 .right 的 display 为flex */
  .header .slot:empty+.default {
    display: flex;
  }
  ```

### 封装 weapp 事件的全局状态管理工具

#### 封装hidari全局状态管理工具
`index.js`
```js
module.exports = {
  hidariEventBus: require('./event-bus'),
  hidariEventStore: require('./event-store')
}
```

`utils.js`
- 两个连续的 " ! "号叠加就会把变量转为它理应代表的布尔值。
  - 以下为"!!"的规则
  - `number`类型： 不为`0` 就，`!!num` 等于`true`;
  - `string`类型： 不为"" (空字符串)，`!!str` 等于`true`;
  - `!!null` 等于false
  - !!undefined 等于false
  - `!!{}` 等于 `true`  //注意：对象就算为空都会被转为`true`
  - `!!function(){}` 等于 `true`   //注意：这样写`function` 并不会执行`function`，所以就算`function`里面写任何东西都会返回`true`
- `var o={flag:true};  var test=!!o.flag; // 等效于var test=o.flag||false;  alert(test);`
  - 由于对`null`与`undefined`用!操作符时都会产生`true`的结果，
  - 所以用两个感叹号的作用就在于，
  - 如果明确设置了`o`中`flag`的值（非 `null/undefined/0""`/等值），自然`test`就会取跟`o.flag`一样的值；
  - 如果没有设置，`test`就会默认为`false`，而不是 `null`或`undefined`。
```js
// 判断是否为object
function isObject(obj) {
  var type = typeof obj;
  return type === 'object' && !!obj; // !!obj => true
}

module.exports = {
  isObject
}
```
`event-bus`
```js
/**
 * 事件总线 eventBus
 */
class HidariEventBus {
  constructor() {
    // 挂载到原型上
    this.eventBus = {}
  }

  /**
   * 监听当前实例上的自定义事件。事件可以由 emit 触发。回调函数会接收所有传入事件触发函数的额外参数。
   * @param {String} eventName 事件名称
   * @param {Function} eventCallback 事件回调函数
   * @param {*} thisArg 传参
   */
  on(eventName, eventCallback, thisArg) {
    // 需要传入 string 类型的 eventName
    if (typeof eventName !== 'string') {
      throw new TypeError("the event name must be string type")
    }
    // 需要传入 function 类型的 eventCallback 回调函数
    if (typeof eventCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }
    let handlers = this.eventBus[eventName]
    // 如果没有事件，事件集合设为空数组
    if (!handlers) {
      handlers = []
      this.eventBus[eventName] = handlers
    }
    handlers.push({
      eventCallback,
      thisArg
    })
    // 返回当前this对象，以便链式调用
    return this
  }

  /**
   * 监听一个自定义事件，但是只触发一次。一旦触发之后，监听器就会被移除。
   * @param {String} eventName 事件名称
   * @param {Function} eventCallback 事件回调函数
   * @param {*} thisArg 传参
   */
  once(eventName, eventCallback, thisArg) {
    // 需要传入 string 类型的 eventName
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type")
    }
    // 需要传入 function 类型的 eventCallback 回调函数
    if (typeof eventCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }

    const tempCallback = (...payload) => {
      this.off(eventName, tempCallback)
      eventCallback.apply(thisArg, payload)
    }
    // 返回当前实例上的自定义事件
    return this.on(eventName, tempCallback, thisArg)
  }

  /**
   * 触发当前实例上的事件。附加参数都会传给监听器回调。
   * @param {String} eventName 事件名称
   * @param  {...Array} payload 参数数组
   */
  emit(eventName, ...payload) {
    // 需要传入 string 类型的 eventName
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type")
    }

    // 如果没有事件，默认为空数组
    const handlers = this.eventBus[eventName] || []
    handlers.forEach(handler => {
      // 循环为每个 handler 的回调函数绑定 handler.thisArg，传入 payload 数组参数
      handler.eventCallback.apply(handler.thisArg, payload)
    })
    // 返回当前this对象，以便链式调用
    return this
  }

  /**
   * 移除自定义事件监听器。
    如果没有提供参数，则移除所有的事件监听器；
    如果只提供了事件，则移除该事件所有的监听器；
    如果同时提供了事件与回调，则只移除这个回调的监听器。
   * @param {String} eventName 事件名称
   * @param {Function} eventCallback 事件回调函数
   */
  off(eventName, eventCallback) {
    // 需要传入 string 类型的 eventName
    if (typeof eventName !== "string") {
      throw new TypeError("the event name must be string type")
    }
    // 需要传入 function 类型的 eventCallback 回调函数
    if (typeof eventCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }

    const handlers = this.eventBus[eventName]
    // 如果有事件并且有回调函数
    if (handlers && eventCallback) {
      // 把事件集合转换为数组
      const newHandlers = [...handlers]
      // 找到对应回调函数并且移除
      for (let i = 0; i < newHandlers.length; i++) {
        const handler = newHandlers[i]
        if (handler.eventCallback === eventCallback) {
          const index = handlers.indexOf(handler)
          handlers.splice(index, 1)
        }
      }
    }

    // 如果所有事件都被移除
    if (handlers.length === 0) {
      // 移除此事件
      delete this.eventBus[eventName]
    }
  }
}
// 导出
module.exports = HidariEventBus
```
`event-store`
```js
const EventBus = require("./event-bus")
const {
  isObject
} = require('./utils')
/**
 * 仓库
 */
class HidariEventStore {
  constructor(options) {
    // 传入的 option 要是一个对象
    if (!isObject(options.state)) {
      throw new TypeError("the state must be object type")
    }
    // action 网络请求
    // 如果有 actions 并且是一个对象
    if (options.actions && isObject(options.actions)) {
      // Object.values() 方法返回一个给定对象 (options.actions) 自身的所有可枚举属性值的数组
      const values = Object.values(options.actions)
      for (const value of values) {
        // 每个 action 必须是一个方法
        if (typeof value !== "function") {
          throw new TypeError("the value of actions must be a function")
        }
      }
      // 挂载到原型上
      this.actions = options.actions
    }
    // 方法挂载到原型上
    this.state = options.state
    this._observe(options.state)
    this.event = new EventBus()
    this.eventV2 = new EventBus()
  }

  /**
   * 对数据进行双向绑定，通过Object.defineProperty来做数据劫持
   * @param {*} state 要绑定的Observer对象
   */
  _observe(state) {
    const _this = this
    // Object.keys 返回一个所有元素为字符串的数组,其元素来自于从给定的object上面可直接枚举的属性。
    Object.keys(state).forEach(key => {
      let _value = state[key]
      /**
       * Object.defineProperty() 方法会直接在一个对象上定义一个新属性,或者修改一个对象的现有属性,并返回此对象。
       * 第一个参数为要定义或修改的对象-object
       * 第二个参数为对象的属性名-string
       * 第三个参数为配置项
       */
      Object.defineProperty(state, key, {
        // 挂载 get 和 set 方法
        get: function () {
          return _value
        },
        set: function (newValue) {
          if (_value === newValue) return
          _value = newValue
          // 触发当前实例上的事件，分别传入值和键值对
          _this.event.emit(key, _value)
          _this.eventV2.emit(key, {
            [key]: _value
          })
        }
      })
    })
  }

  /**
   * 数据监听
   * @param {String} statekey 需要监听是否变化的state名称
   * @param {Function} stateCallback 回调函数
   */
  onState(stateKey, stateCallback) {
    const keys = Object.keys(this.state)
    // 事件名必须存在
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("the state does not contain your key")
    }
    // 监听事件
    this.event.on(stateKey, stateCallback)

    // 回调需要是一个函数
    if (typeof stateCallback !== "function") {
      throw new TypeError("the event callback must be function type")
    }
    const value = this.state[stateKey]
    stateCallback.apply(this.state, [value])
  }

  // ["name", "age"] callback1
  // ["name", "height"] callback2

  /**
   * 监听 state 状态
   * @param {String} statekeys 需要监听是否变化的state名称集合
   * @param {Function} stateCallback 回调函数
   */
  onStates(statekeys, stateCallback) {
    // state 中所有名称的元素为字符串的数组
    const keys = Object.keys(this.state)
    // 设空对象 value
    const value = {}
    for (const theKey of statekeys) {
      // 需要存在 state 名称
      if (keys.indexOf(theKey) === -1) {
        throw new Error("the state does not contain your key")
      }
      // 监听当前实例上的自定义事件，传入当前回调函数
      this.eventV2.on(theKey, stateCallback)
      value[theKey] = this.state[theKey]
    }
    // 把state中的每一项组成的数组作为参数绑定给回调函数
    stateCallback.apply(this.state, [value])
  }

  /**
   * 移除多个state监听器
   * @param {String} stateKeys 需要移除的 state 集合
   * @param {Funtion} stateCallback 回调函数
   */
  offStates(stateKeys, stateCallback) {
    const keys = Object.keys(this.state)
    // 移除每一个 state 监听
    stateKeys.forEach(theKey => {
      if (keys.indexOf(theKey) === -1) {
        throw new Error("the state does not contain your key")
      }
      this.eventV2.off(theKey, stateCallback)
    })
  }

  /**
   * 移除state监听器
   * @param {String} stateKeys 需要移除的 state
   * @param {Funtion} stateCallback 回调函数
   */
  offState(stateKey, stateCallback) {
    const keys = Object.keys(this.state)
    // 移除 state 监听
    if (keys.indexOf(stateKey) === -1) {
      throw new Error("the state does not contain your key")
    }
    this.event.off(stateKey, stateCallback)
  }

  /**
   * 修改 state 中的值
   * @param {String} stateKey 需要被修改的 state 名
   * @param {Function} stateValue 想要修改成的值
   */
  setState(stateKey, stateValue) {
    this.state[stateKey] = stateValue
  }

  /**
   * 异步发送网络请求
   * @param {String} actionName action名称
   * @param  {...Array} args 参数数组
   */
  dispatch(actionName, ...args) {
    // 名称需要是 string 类型
    if (typeof actionName !== "string") {
      throw new TypeError("the action name must be string type")
    }
    // 需要存在 action名称
    if (Object.keys(this.actions).indexOf(actionName) === -1) {
      throw new Error("this action name does not exist, please check it")
    }
    const actionFn = this.actions[actionName]
    // 把仓库的 state 和传入的参数绑定到事件上
    actionFn.apply(this, [this.state, ...args])
  }
}
// 导出
module.exports = HidariEventStore
```

#### 使用全局状态管理工具

1. `store`封装
`store\ranking-store.js`
```js
import {
  HidariEventStore
} from '../hidari-event-store/index'
import {
  getRankingData
} from '../service/api_music'
const rankingStore = new HidariEventStore({
  state: {
    hotRanking: {}
  },
  actions: {
    /**
     * 获取推荐歌曲
     * @param {*} ctx 执行上下文
     */
    async getRankingDataAction(ctx) {
      const res = await getRankingData(1)
      ctx.hotRanking = res.playlist
    }
  }
})

export {
  rankingStore
}
```
`store\index.js`
```js
// 统一导出
export {
  rankingStore
}
from './ranking-store'
```

2. 获取api
```js
/**
 * 获取推荐歌曲数据
 * @param {Number} idx 推荐歌曲类型 [0, 1, 2, 3]
 */
export const getRankingData = (idx) => {
  return hidariRequest.get('/top/list', {
    idx
  })
}
```

3. `pages\home-music\index.js`调用
```js
// pages/home-music/index.js

import {
  rankingStore
} from '../../store/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 推荐歌曲
    recommendSongs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getPageData()
    // 发起共享数据请求
    rankingStore.dispatch('getRankingDataAction')
    // 从 store 获取共享的数据
    rankingStore.onState('hotRanking', (res) => {
      if (!res.tracks) return
      this.setData({
        recommendSongs: res.tracks.slice(0, 6)
      })
    })
  }
})
```

4. 页面渲染
`components/song-item-v1/index.wxml`
```html
<!--components/song-item-v1/index.wxml-->
<view class="item" data-item="{{item}}">
  <image class="image" src="{{item.al.picUrl}}"></image>
  <view class="content">
    <view class="name">{{item.name}}</view>
    <view class="source">{{item.ar[0].name}} · {{item.al.name}}</view>
  </view>
  <view class="arrow">
    <image class="icon" src="/assets/images/icons/arrow-right.png"></image>
  </view>
</view>
```
`components/song-item-v1/index.wxss`
```css
/* components/song-item-v1/index.wxss */

.item {
  display: flex;
  padding: 16rpx 0;
  align-items: center;
}

.image {
  width: 120rpx;
  height: 120rpx;
  border-radius: 16rpx;
}

.content {
  margin-left: 16rpx;
  flex: 1;
}

.content .name {
  font-size: 32rpx;
  color: #555;
}

.content .source {
  margin-top: 16rpx;
  font-size: 24rpx;
  color: #999;
}

.arrow .icon {
  width: 40rpx;
  height: 40rpx;
}
```
```js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 歌曲数据项
    item: {
      type: Object,
      value: {}
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
  }
})
```

### 封装热门歌单组件
`components\song-menu-area`
```html
<area-header title="{{title}}"></area-header>
<!-- scroll-x x轴上滚动 -->
<scroll-view scroll-x class="scroll-list" style="width: {{screenWidth}}px">
  <block wx:for="{{songMenu}}" wx:key="id">
    <view class="menu-item">
      <song-menu-item item="{{item}}" data-item="{{item}}"></song-menu-item>
    </view>
  </block>
</scroll-view>
```
```css
.scroll-list {
  /* 不允许换行 */
  white-space: nowrap;
  /* width: 100vw; */
  position: relative;
  left: -20rpx;
}

.menu-item {
  display: inline-block;
  width: 220rpx;
  margin-left: 20rpx;
  /* 顶部对齐 防止某些机型不对齐 */
  vertical-align: top;
}

/* 给最后一个 item 添加右 padding */
.menu-item:last-of-type {
  margin-right: 20rpx;
}
```
`components\song-menu-area\index.json`
```json
{
  "component": true,
  "usingComponents": {
    "area-header": "/components/area-header/index",
    "song-menu-item": "/components/song-menu-item/index"
  }
}
```
```js
// components/song-menu-area/index.js

// 拿到app数据
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 标题
    title: {
      type: String,
      value: "默认歌单"
    },
    // 歌单
    songMenu: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 获取屏幕宽度
    screenWidth: app.globalData.screenWidth
  }
})
```
`app.js`
```js
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
```
`components\song-menu-item\index.wxml`
```html
<!--components/song-menu-item/index.wxml-->
<wxs src="../../utils/format.wxs" module="format"></wxs>
<view class="item">
  <view class="top">
    <image class="image" mode="widthFix" src="{{item.coverImgUrl}}"></image>
    <view class="play-counter">{{format.formatCount(item.playCount)}}</view>
  </view>
  <view class="bottom">{{item.name}}</view>
</view>
```
`components\song-menu-item\index.wxss`
```css
/* components/song-menu-item/index.wxss */

.item {
  display: inline-block;
  width: 100%;
}

.top {
  position: relative;
}

.top .image {
  width: 100%;
  border-radius: 12rpx;
  background-size: cover;
}

.top .play-counter {
  position: absolute;
  right: 0;
  bottom: 10rpx;
  color: #fff;
  font-size: 22rpx;
  border-radius: 12rpx;
  padding: 6rpx 10rpx;
  background: rgba(0, 0, 0, .5);
}

.item .bottom {
  width: 100%;
  font-size: 26rpx;

  /* 显示两行 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 2;
  -moz-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
}
```
`components/song-menu-item/index.js`
```js
// components/song-menu-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    item: {
      type: Object,
      value: {}
    }
  }
})
```
`pages\home-music\index.wxml`
```html
<!-- 热门歌单 -->
<song-menu-area title="热门歌单" wx:if="{{hotSongMenu.length > 0}}" songMenu="{{hotSongMenu}}"></song-menu-area>

<!-- 推荐歌单 -->
<song-menu-area title="推荐歌单" wx:if="{{recommendSongMenu.length > 0}}" songMenu="{{recommendSongMenu}}"></song-menu-area>
```

- 需求：app整体加了`padding`，需要取消推荐歌单的`padding`
- 思路：
  - 给推荐歌单加`width:100vw`
  - 获取屏幕宽度`screenWidth`，给推荐歌单加`style`，因为很多地方可能都需要用到屏幕宽度，所以写在
  `app.js`中
- 实现
`app.js`
```js
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
```
`components\song-menu-area\index.wxml`
```html
<scroll-view scroll-x class="scroll-list" style="width: {{screenWidth}}px">
```

### 巅峰榜组件封装

1. 获取数据
```js
import {
  HidariEventStore
} from '../hidari-event-store/index'
import {
  getRankingData
} from '../service/api_music'

// 榜单 map 键值对映射
const rankingMap = {
  0: "newRankings",
  1: "hotRankings",
  2: "originRankings",
  3: "upRankings"
}
const rankingStore = new HidariEventStore({
  state: {
    newRankings: {}, // 0 新歌
    hotRankings: {}, // 1 热门
    originRankings: {}, // 2 原创
    upRankings: {}, // 3 飙升
  },
  actions: {
    /**
     * 获取推荐歌曲
     * @param {*} ctx 执行上下文
     */
    async getRankingDataAction(ctx) {
      for (let i = 0; i < 4; i++) {
        const res = await getRankingData(i)
        // map 映射改进 switch
        const rankingName = rankingMap[i]
        ctx[rankingName] = res.playlist
        // switch (i) {
        //   case 0:
        //     ctx.newRankings = res.playlist
        //     break
        //   case 1:
        //     ctx.hotRankings = res.playlist
        //     break
        //   case 2:
        //     ctx.originRankings = res.playlist
        //     break
        //   case 3:
        //     ctx.upRankings = res.playlist
        //     break
        // }
      }
    }
  }
})

export {
  rankingStore,
  rankingMap
}
```

2. 处理函数
- 需求：分别按顺序展示三个榜单，每个榜单展示内容格式相同，封装成一个函数
- 思路：
  - 为了防止请求回来的数据有快有慢打乱顺序，给每组数据确定位置
  ```js
      // 巅峰榜数据 为了防止请求快的数据打乱原本的顺序，直接根据 idx 确定数据位置
    rankings: {
      0: {},
      2: {},
      3: {}
    },
  ```
  - 为了函数复用，给每个 `onState` 函数的回调函数传参，参数为 `idx`
  ```js
  // store 中取出巅峰榜数据
  rankingStore.onState("newRankings", this.getHandleRankingsData(0));
  rankingStore.onState("originRankings", this.getHandleRankingsData(2));
  rankingStore.onState("upRankings", this.getHandleRankingsData(3));
  ```
  - 真正的逻辑函数直接返回一个函数，传入的 `idx` 不同，会调用三次函数，但是需要监听的回调是一个函数，此时传参，相当于直接调用函数，此时返回`undefined`，所以此时返回一个函数，相当于回调的是返回的那个函数
  ```js
    /**
   * 事件处理 - 获取榜单数据
   * 因为有3个 state 都需要返回同一种格式的数据，调用三次，直接返回另外一个函数
   * 在state变化时会监听三个函数
   * @param {Number} idx 需要监听的 state 的回调函数参数
   */
  getHandleRankingsData(idx) {
    return (res) => {
      // 如果没有数据 => 直接返回
      if (Object.keys(res).length === 0) return
      // 设置需要的值的对象
      const name = res.name
      const songlist = res.tracks.slice(0, 3)
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const rankingObj = {
        name,
        songlist,
        coverImgUrl,
        playCount
      }
      // 展开拿到原来的数据 加上新的对象
      const newRankings = {
        ...this.data.rankings,
        // 如果不加 [] => idx，加上[] => 动态展示 idx 对应的数据
        [idx]: rankingObj
      };
      this.setData({
        rankings: newRankings
      })
    }
  }
  ```

`pages\home-music\index.js`
```js
import {
  rankingStore
} from '../../store/index'
import {
  getBanners,
  getSongMenu
} from '../../service/api_music'
import queryRect from '../../utils/query-rect'
import throttle from '../../utils/throttle'

// 生成节流函数
const throttleQueryRect = throttle(queryRect)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    banners: [],
    // swiper轮播图高度(图片显示区域高度)
    swiperHeight: 0,
    // 推荐歌曲
    recommendSongs: [],
    // 热门歌单
    hotSongMenu: [],
    // 推荐歌单
    recommendSongMenu: [],
    // 巅峰榜数据 为了防止请求快的数据打乱原本的顺序，直接根据 idx 确定数据位置
    rankings: {
      0: {},
      2: {},
      3: {}
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getPageData()
    // 发起共享数据请求
    rankingStore.dispatch('getRankingDataAction')
    // 从 store 获取共享的数据
    this.setupPlayerStoreListener()
  },

  /**
   * 事件处理 - 从 store 获取共享的数据
   */
  setupPlayerStoreListener() {
    // store 中取出热门歌单数据
    rankingStore.onState('hotRankings', (res) => {
      if (!res.tracks) return
      this.setData({
        recommendSongs: res.tracks.slice(0, 6)
      })
    })
    // store 中取出巅峰榜数据
    rankingStore.onState("newRankings", this.getHandleRankingsData(0));
    rankingStore.onState("originRankings", this.getHandleRankingsData(2));
    rankingStore.onState("upRankings", this.getHandleRankingsData(3));
  },

  /**
   * 事件处理 - 获取榜单数据
   * 因为有3个 state 都需要返回同一种格式的数据，调用三次，直接返回另外一个函数
   * 在state变化时会监听三个函数
   * @param {Number} idx 需要监听的 state 的回调函数参数
   */
  getHandleRankingsData(idx) {
    return (res) => {
      // 如果没有数据 => 直接返回
      if (Object.keys(res).length === 0) return
      const name = res.name
      const songlist = res.tracks.slice(0, 3)
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const rankingObj = {
        name,
        songlist,
        coverImgUrl,
        playCount
      }
      // 展开拿到原来的数据 加上新的对象
      const newRankings = {
        ...this.data.rankings,
        // 如果不加 [] => idx，加上[] => 动态展示 idx 对应的数据
        [idx]: rankingObj
      };
      this.setData({
        rankings: newRankings
      })
    }
  }
})
```

3. 展示
`components\song-ranking-item\index.wxml`
```html
<wxs src="../../utils/format.wxs" module="format"></wxs>
<view class="item">
  <view class="content">
    <view class="content-title">{{item.name}}</view>
    <view class="content-list">
      <block wx:for="{{3}}" wx:for-item="index" wx:key="*this">
        <view class="content-list-item">
          <text>{{index+1}}. {{item.songlist[index].name}}</text>
          <text class="singer"> - {{item.songlist[index].ar[0].name}}</text>
        </view>
      </block>
    </view>
  </view>
  <view class="album">
    <image class="image" mode="aspectFill" src="{{item.coverImgUrl}}"></image>
    <view class="play-count">{{format.formatCount(item.playCount)}}</view>
  </view>
</view>
```
`components\song-ranking-item\index.wxss`
```css
.item {
  display: flex;
  justify-content: space-between;
  background-color: #eee;
  border-radius: 12rpx;
  margin-bottom: 20rpx;
  overflow: hidden;
}

.content {
  padding: 24rpx;
  display: 1;
  overflow: hidden;
}

.content-title {
  font-size: 34rpx;
}

.content-list {
  font-size: 24rpx;
  width: 100%;
  margin-top: 6rpx;
}

.content-list-item {
  color: #333;
  margin-top: 6rpx;
  width: 100%;

  display: inline-block;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-emphasis: none;
}

.content-list-item .singer {
  color: #999;
}

.album {
  position: relative;
  width: 220rpx;
  /* display: flex; */
}

.album .image {
  width: 220rpx;
  height: 100%;
  display: block;
}

.album .play-count {
  position: absolute;
  right: 0;
  bottom: 0rpx;
  background: rgba(0, 0, 0, .5);
  color: #fff;
  font-size: 22rpx;
  border-radius: 12rpx;
  padding: 6rpx 10rpx;
}
```

- 需求：`歌曲名称-作者` 只展示一行，超出部分用`...`表示
- 思路：利用`text-overflow`属性可以使标签内容在确定的长度内显示，剩余部分用“ … ”或者其他字符串代替。
  - 设置一个宽度，并且设置`overflow`和`white-space`属性，并且`overflow`属性值必须为`hidden`，`white-space`属性必须为`nowrap`。
  - `white-space`属性设置为`nowrap`表示不折行
- 实现：
```css
.content-list-item {
  color: #333;
  margin-top: 6rpx;
  width: 100%;

  display: inline-block;
  white-space: nowrap;
  /* 溢出部分用...省略号代替 */
  text-overflow: ellipsis;
  overflow: hidden;
  text-emphasis: none;
}
```