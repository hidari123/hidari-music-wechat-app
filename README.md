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