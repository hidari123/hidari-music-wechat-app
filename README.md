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
    - [轮播图(节流，图片高度)](#%E8%BD%AE%E6%92%AD%E5%9B%BE%E8%8A%82%E6%B5%81%E5%9B%BE%E7%89%87%E9%AB%98%E5%BA%A6)
      - [轮播图高度处理](#%E8%BD%AE%E6%92%AD%E5%9B%BE%E9%AB%98%E5%BA%A6%E5%A4%84%E7%90%86)
    - [推荐歌曲组件（插槽）](#%E6%8E%A8%E8%8D%90%E6%AD%8C%E6%9B%B2%E7%BB%84%E4%BB%B6%E6%8F%92%E6%A7%BD)
    - [封装 weapp 事件的全局状态管理工具](#%E5%B0%81%E8%A3%85-weapp-%E4%BA%8B%E4%BB%B6%E7%9A%84%E5%85%A8%E5%B1%80%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7)
      - [封装hidari全局状态管理工具](#%E5%B0%81%E8%A3%85hidari%E5%85%A8%E5%B1%80%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7)
      - [使用全局状态管理工具](#%E4%BD%BF%E7%94%A8%E5%85%A8%E5%B1%80%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E5%B7%A5%E5%85%B7)
    - [封装热门歌单组件](#%E5%B0%81%E8%A3%85%E7%83%AD%E9%97%A8%E6%AD%8C%E5%8D%95%E7%BB%84%E4%BB%B6)
    - [巅峰榜组件封装](#%E5%B7%85%E5%B3%B0%E6%A6%9C%E7%BB%84%E4%BB%B6%E5%B0%81%E8%A3%85)
  - [歌曲详情](#%E6%AD%8C%E6%9B%B2%E8%AF%A6%E6%83%85)
    - [跳转页面](#%E8%B7%B3%E8%BD%AC%E9%A1%B5%E9%9D%A2)
    - [页面展示](#%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA-1)
    - [歌曲详情头部组件封装](#%E6%AD%8C%E6%9B%B2%E8%AF%A6%E6%83%85%E5%A4%B4%E9%83%A8%E7%BB%84%E4%BB%B6%E5%B0%81%E8%A3%85)
  - [搜索](#%E6%90%9C%E7%B4%A2)
    - [热门搜索模块](#%E7%83%AD%E9%97%A8%E6%90%9C%E7%B4%A2%E6%A8%A1%E5%9D%97)
    - [搜索建议](#%E6%90%9C%E7%B4%A2%E5%BB%BA%E8%AE%AE)
      - [防抖处理](#%E9%98%B2%E6%8A%96%E5%A4%84%E7%90%86)
      - [搜索关键字高亮](#%E6%90%9C%E7%B4%A2%E5%85%B3%E9%94%AE%E5%AD%97%E9%AB%98%E4%BA%AE)
      - [搜索结果](#%E6%90%9C%E7%B4%A2%E7%BB%93%E6%9E%9C)
  - [播放页](#%E6%92%AD%E6%94%BE%E9%A1%B5)
    - [播放页UI设计](#%E6%92%AD%E6%94%BE%E9%A1%B5ui%E8%AE%BE%E8%AE%A1)
      - [跳转到播放页](#%E8%B7%B3%E8%BD%AC%E5%88%B0%E6%92%AD%E6%94%BE%E9%A1%B5)
      - [自定义导航栏组件](#%E8%87%AA%E5%AE%9A%E4%B9%89%E5%AF%BC%E8%88%AA%E6%A0%8F%E7%BB%84%E4%BB%B6)
      - [分页效果处理](#%E5%88%86%E9%A1%B5%E6%95%88%E6%9E%9C%E5%A4%84%E7%90%86)
      - [动态计算是否展示歌词](#%E5%8A%A8%E6%80%81%E8%AE%A1%E7%AE%97%E6%98%AF%E5%90%A6%E5%B1%95%E7%A4%BA%E6%AD%8C%E8%AF%8D)
    - [事件处理](#%E4%BA%8B%E4%BB%B6%E5%A4%84%E7%90%86)
      - [设置音乐自动播放](#%E8%AE%BE%E7%BD%AE%E9%9F%B3%E4%B9%90%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE)
      - [进度条进度控制](#%E8%BF%9B%E5%BA%A6%E6%9D%A1%E8%BF%9B%E5%BA%A6%E6%8E%A7%E5%88%B6)
      - [切割歌词](#%E5%88%87%E5%89%B2%E6%AD%8C%E8%AF%8D)
      - [匹配歌词](#%E5%8C%B9%E9%85%8D%E6%AD%8C%E8%AF%8D)
      - [歌词](#%E6%AD%8C%E8%AF%8D)
    - [逻辑抽取](#%E9%80%BB%E8%BE%91%E6%8A%BD%E5%8F%96)
      - [状态管理逻辑抽取](#%E7%8A%B6%E6%80%81%E7%AE%A1%E7%90%86%E9%80%BB%E8%BE%91%E6%8A%BD%E5%8F%96)
      - [播放页播放监听逻辑抽取](#%E6%92%AD%E6%94%BE%E9%A1%B5%E6%92%AD%E6%94%BE%E7%9B%91%E5%90%AC%E9%80%BB%E8%BE%91%E6%8A%BD%E5%8F%96)
      - [播放状态栏处理](#%E6%92%AD%E6%94%BE%E7%8A%B6%E6%80%81%E6%A0%8F%E5%A4%84%E7%90%86)
    - [细节补充](#%E7%BB%86%E8%8A%82%E8%A1%A5%E5%85%85)
      - [暂停后跳转到指定时间依旧暂停](#%E6%9A%82%E5%81%9C%E5%90%8E%E8%B7%B3%E8%BD%AC%E5%88%B0%E6%8C%87%E5%AE%9A%E6%97%B6%E9%97%B4%E4%BE%9D%E6%97%A7%E6%9A%82%E5%81%9C)
      - [切换歌曲后清空上次歌曲数据防止继续显示](#%E5%88%87%E6%8D%A2%E6%AD%8C%E6%9B%B2%E5%90%8E%E6%B8%85%E7%A9%BA%E4%B8%8A%E6%AC%A1%E6%AD%8C%E6%9B%B2%E6%95%B0%E6%8D%AE%E9%98%B2%E6%AD%A2%E7%BB%A7%E7%BB%AD%E6%98%BE%E7%A4%BA)
      - [切换上一首 / 下一首](#%E5%88%87%E6%8D%A2%E4%B8%8A%E4%B8%80%E9%A6%96--%E4%B8%8B%E4%B8%80%E9%A6%96)
      - [监听歌曲 自动播放下一首](#%E7%9B%91%E5%90%AC%E6%AD%8C%E6%9B%B2-%E8%87%AA%E5%8A%A8%E6%92%AD%E6%94%BE%E4%B8%8B%E4%B8%80%E9%A6%96)
    - [首页播放栏](#%E9%A6%96%E9%A1%B5%E6%92%AD%E6%94%BE%E6%A0%8F)
    - [使用背景播放器播放音乐](#%E4%BD%BF%E7%94%A8%E8%83%8C%E6%99%AF%E6%92%AD%E6%94%BE%E5%99%A8%E6%92%AD%E6%94%BE%E9%9F%B3%E4%B9%90)
      - [使用背景播放器暂停 / 开始状态控制](#%E4%BD%BF%E7%94%A8%E8%83%8C%E6%99%AF%E6%92%AD%E6%94%BE%E5%99%A8%E6%9A%82%E5%81%9C--%E5%BC%80%E5%A7%8B%E7%8A%B6%E6%80%81%E6%8E%A7%E5%88%B6)
      - [控制后台播放停止后，页面状态改变和点击重新开始播放](#%E6%8E%A7%E5%88%B6%E5%90%8E%E5%8F%B0%E6%92%AD%E6%94%BE%E5%81%9C%E6%AD%A2%E5%90%8E%E9%A1%B5%E9%9D%A2%E7%8A%B6%E6%80%81%E6%94%B9%E5%8F%98%E5%92%8C%E7%82%B9%E5%87%BB%E9%87%8D%E6%96%B0%E5%BC%80%E5%A7%8B%E6%92%AD%E6%94%BE)
  - [用户登录](#%E7%94%A8%E6%88%B7%E7%99%BB%E5%BD%95)
    - [登陆步骤解析](#%E7%99%BB%E9%99%86%E6%AD%A5%E9%AA%A4%E8%A7%A3%E6%9E%90)
    - [实现登录](#%E5%AE%9E%E7%8E%B0%E7%99%BB%E5%BD%95)
      - [封装请求](#%E5%B0%81%E8%A3%85%E8%AF%B7%E6%B1%82)
    - [判断token和session是否过期](#%E5%88%A4%E6%96%ADtoken%E5%92%8Csession%E6%98%AF%E5%90%A6%E8%BF%87%E6%9C%9F)
    - [封装 header](#%E5%B0%81%E8%A3%85-header)
    - [获取用户信息](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E4%BF%A1%E6%81%AF)
      - [openid 和 unionid](#openid-%E5%92%8C-unionid)
      - [获取用户手机号](#%E8%8E%B7%E5%8F%96%E7%94%A8%E6%88%B7%E6%89%8B%E6%9C%BA%E5%8F%B7)

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
  // 要先变成整数 不然会出现很多小数点
  // 222.683 % 60 => 42.68299999999999
  // 222 % 60 => 42
  var second = Math.floor(duration) % 60 // 向下取整 => 取余 => 秒
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
```js
/**
 * 请求相关mv详情
 * @param {number} id MV的id
 */
export const getMoreVideoDetail = (id) => {
  return hidariRequest.get("/video/detail", {
    id
  })
}

/**
 * 请求相关MV的播放地址
 * @param {number} id MV的id 
 */
export const getMoreMVURL = (id) => {
  return hidariRequest.get("/video/url", {
    id
  })
}
```
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
<!-- referrer-policy="origin" 告诉服务器请求源 -->
<video class="video" referrer-policy="origin" autoplay danmu-list="{{danmuList}}" src="{{mvURLInfo.url}}" loop></video>
<view class="more">
  <view class="detail">
    <view class="title" wx:if="{{mvDetail.name}}">{{mvDetail.name}}</view>
    <view class="title" wx:elif="{{mvDetail.title}}">{{mvDetail.title}}</view>
    <view class="author" wx:if="{{mvDetail.artistName}}">{{mvDetail.artistName}} -</view>
    <view class="author" wx:elif="{{mvDetail.nickname}}">{{mvDetail.nickname}} -</view>
    <view class="detail-info" wx:if="{{mvDetail.playCount}}">{{format.formatCount(mvDetail.playCount)}}次播放 - {{mvDetail.publishTime}}</view>
    <view class="detail-info" wx:elif="{{mvDetail.playTime}}">{{format.formatCount(mvDetail.playTime)}}次播放 - {{publishTime}}</view>
  </view>
  <!-- 相关视频标题 -->
  <area-header title="猜你喜欢" showMore="{{false}}"></area-header>
  <!-- 相关视频 -->
  <view wx:for="{{relatedVideos}}" wx:key="vid">
    <!-- widthFix => 宽完全显示 -->
    <view bindtap="handleVideoItemClick" data-item="{{item}}" class="more-container">
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
// pages/detail-video/index.js

import {
  getMVURL,
  getMVDetail,
  getRelatedVideo,
  getMoreVideoDetail,
  getMoreMVURL
} from '../../service/api_video'
Page({

  /**
   * 页面的初始数据
   */
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
    ],
    // 发布时间
    publishTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 打开时暂停歌曲播放
    playerStore.dispatch('changeMusicPlayStatusAction', false)
    // 得到传入的 id
    const id = options.id
    // 获取请求数据
    if (id.length < 20) {
      this.getPageData(id)
    } else {
      this.getMoreData(id)
    }

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

  /**
   * 请求更多视频信息
   * @param {*} event 
   */
  getMoreData(vid) {
    // 请求更多视频详情
    getMoreVideoDetail(vid).then(res => {
      this.setData({
        mvDetail: res.data,
        // /(?<=\u0020).*/ => 匹配空格后的字符，替换为空格（删除）
        publishTime: new Date(parseInt(res.data.publishTime)).toLocaleString().replace(/(?<=\u0020).*/, ' ')
      })
    })
    // 请求更多视频播放地址
    getMoreMVURL(vid).then(res => {
      this.setData({
        mvURLInfo: res.urls[0]
      })
    })
    // 请求相关视频
    getRelatedVideo(vid).then(res => {
      this.setData({
        relatedVideos: res.data
      })
    })
  },

  /**
   * 封装事件处理的方法
   * 监听item点击事件
   */
  handleVideoItemClick(event) {
    // 得到点击的 item.id
    const vid = event.currentTarget.dataset.item.vid
    // 页面跳转
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${vid}`,
    })
  }
})
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

### 轮播图(节流，图片高度)
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
    * 获取当前时间和上次开始时间 如果超过设定时间就执行一次
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
      if (rect && rect.height) {
        this.setData({
          swiperHeight: rect.height
        })
      }
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

#### 轮播图高度处理

> 因为开启节流，第一次轮播图图片还未加载完，默认高度240，图片加载完毕后没有再次执行函数，导致有时候图片高度不对，在最后执行一次函数，解决问题

```diff
// 生成节流函数
+ const throttleQueryRect = throttle(queryRect, 1000, {
+  // 最后执行一次
+  trailing: true
})
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
    srceenHeight: 0
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
/**
 * 榜单仓库
 */
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
`store\index.js`
```js
// 统一导出
export {
  rankingStore,
  rankingMap
}
from './ranking-store'
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
```html
<!-- 巅峰榜 -->
<view class="ranking">
  <area-header title="巅峰榜" showMore="{{false}}"></area-header>
  <view class="ranking-list">
    <block wx:for="{{rankings}}" wx:key="name">
      <song-ranking-item item="{{item}}" bindtap="handleRankingMoreClick" data-id="{{index}}"></song-ranking-item>
    </block>
  </view>
</view>
```

## 歌曲详情
### 跳转页面
```diff
<!-- 推荐歌曲 -->
<view class="recommend-song">
+  <area-header title="推荐歌曲" bind:click="handlerMoreClick"></area-header>
  <view class="song-list">
    <block wx:for="{{recommendSongs}}" wx:key="id">
      <song-item-v1 item="{{item}}"></song-item-v1>
    </block>
  </view>
</view>

<!-- 热门歌单 -->
<song-menu-area title="热门歌单" wx:if="{{hotSongMenu.length > 0}}" songMenu="{{hotSongMenu}}"></song-menu-area>

<!-- 推荐歌单 -->
<song-menu-area title="推荐歌单" wx:if="{{recommendSongMenu.length > 0}}" songMenu="{{recommendSongMenu}}"></song-menu-area>

<!-- 巅峰榜 -->
<view class="ranking">
  <area-header title="巅峰榜" showMore="{{false}}"></area-header>
  <view class="ranking-list">
    <!-- 遍历的是对象时，key为index -->
    <block wx:for="{{rankings}}" wx:key="name">
+      <song-ranking-item item="{{item}}" bindtap="handleRankingMoreClick" data-idx="{{index}}"></song-ranking-item>
    </block>
  </view>
</view>
```
`components/song-menu-area/index.wxml`
```diff
<!--components/song-menu-area/index.wxml-->
<area-header title="{{title}}" bind:rightClick="handleMenuMoreClick"></area-header>
<!-- scroll-x x轴上滚动 -->
<scroll-view scroll-x class="scroll-list" style="width: {{screenWidth}}px">
  <block wx:for="{{songMenu}}" wx:key="id">
    <view class="menu-item">
+      <song-menu-item item="{{item}}" b bindtap="handleMenuItemClick" data-item="{{item}}"></song-menu-item>
    </view>
  </block>
</scroll-view>
```
`components/song-menu-area/index.js`
```js
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 事件处理 - 点击歌单 item 跳转到更多歌曲页面
     */
    handleMenuItemClick(event) {
      const item = event.currentTarget.dataset.item
      wx.navigateTo({
        url: `/pages/detail-songs/index?id=${item.id}&&type=menu`,
      })
    },
  }
```
`components\area-header\index.wxml`
```diff
<view class="header">
  <view class="title">{{title}}</view>
+  <view class="right" wx:if="{{showMore}}" bindtap="handleRightClick">
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
`components\area-header\index.js`
```js
  /**
   * 组件的方法列表
   */
  methods: {
    // 更多的点击事件
    handleRightClick() {
      this.triggerEvent('click')
    }
  }
```
`pages\home-music\index.js`
```js
  /**
   * 事件处理 - 点击更多跳转更多歌曲页面
   */
  handlerMoreClick() {
    this.navigateToDetailSongPage('hotRankings')
  },
  /**
   * 事件处理 - 点击巅峰榜跳转更多歌曲页面
   */
  handleRankingMoreClick(event) {
    const idx = event.currentTarget.dataset.idx
    const rankingName = rankingMap[idx]
    this.navigateToDetailSongPage(rankingName)
  },

  /**
   * 跳转到更多歌曲页面函数封装
   * @param {String} name 点击的组件名
   */
  navigateToDetailSongPage(name) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${name}&&type=rank`,
    })
  }
```

- 需求：点击不同的组件显示不同的页面
  - 思路：跳转 `url` 上添加 `type`，根据 `type` 判断是哪个组件点击跳转来的
  - 代码实现：
  ```js
    /**
   * 跳转到更多歌曲页面函数封装
   * @param {String} name 点击的组件名
   */
  navigateToDetailSongPage(name) {
    wx.navigateTo({
      url: `/pages/detail-songs/index?ranking=${name}&&type=rank`,
    })
  }
  ```
  ```js
  /**
   * 事件处理 - 点击歌单 item 跳转到更多歌曲页面
   */
  handleMenuItemClick(event) {
    const item = event.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/detail-songs/index?id=${item.id}&&type=menu`,
    })
  }
  ```

### 页面展示
`pages\detail-songs\index.js`
```js
import {
  rankingStore
} from '../../store/index'
import {
  getSongData
} from '../../service/api_music'
// pages/detail-songs/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 跳转过来的榜单名称
    rankingName: "",
    // 歌单信息
    songsInfo: {},
    // 跳转过来的数据是哪个类型
    type: ''
  },


  /**
   * 生命周期函数--监听页面加载
   * @param {*} options 路径传递来的参数集合对象
   */
  onLoad(options) {
    this.setData({
      type: options.type
    })
    if (this.data.type === 'menu') {
      // type 是歌单 => 从歌单跳转
      const id = options.id
      // 请求数据
      getSongData(id).then(res => {
        this.setData({
          songsInfo: res.playlist
        })
      })
    } else if (this.data.type === 'rank') {
      // type 是 榜单 => 从榜单跳转
      const rankingName = options.ranking
      this.setData({
        rankingName
      })
      // 获取数据
      rankingStore.onState(rankingName, this.getRankingDataHandler)
    }
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 取消监听
    if (this.data.rankingName) {
      rankingStore.offState(this.data.rankingName, this.getRankingDataHandler)
    }
  },
  /**
   * 设置榜单详情信息
   * @param {Object} res onState 传来的榜单详情信息
   */
  getRankingDataHandler(res) {
    if (res) {
      this.setData({
        songsInfo: res
      })
    }
  }
})
```
`pages\detail-songs\index.json`
```json
{
  "usingComponents": {
    "area-header": "/components/area-header",
    "song-item-v2": "/components/song-item-v2",
    "song-detail-header": "/components/song-detail-header/index"
  }
}
```
`pages\detail-songs\index.wxml`
```html
<!--pages/detail-songs/index.wxml-->
<block wx:if="{{type === 'rank'}}">
  <area-header title="{{songsInfo.name}}" showMore="{{false}}"></area-header>
</block>
<block wx:if="{{type === 'menu'}}">
  <song-detail-header songsInfo="{{songsInfo}}"></song-detail-header>
</block>

<view class="song-list">
  <block wx:for="{{songsInfo.tracks}}" wx:key="id">
    <!-- index 自增 +1 -->
    <song-item-v2 index="{{index+1}}" item="{{item}}" bindtap="handleSongItemClick" data-index="{{index}}"></song-item-v2>
  </block>
</view>
```
`pages\detail-songs\index.wxss`
```css
page {
  padding: 0 20rpx
}
```

- 需求：列表前显示标号，自增
  - 实现：`index="{{index+1}}"`

### 歌曲详情头部组件封装
`components\song-detail-header\index.js`
```js
  /**
   * 组件的属性列表
   */
  properties: {
    songsInfo: {
      type: Object,
      value: {}
    }
  },
```
`components\song-detail-header\index.wxml`
```html
<wxs src="../../utils/format.wxs" module="format"></wxs>

<view class="header">
  <!-- 背景 -->
  <image class="bg-image" mode="aspectFill" src="{{songsInfo.coverImgUrl}}"></image>
  <view class="bg-cover"></view>

  <!-- 内容 -->
  <view class="content">
    <image class="image" mode="aspectFill" src="{{songsInfo.coverImgUrl}}"></image>
    <view class="info">
      <view class="title">{{songsInfo.name}}</view>
      <view class="anthor">
        <image class="avatar" mode="aspectFill" src="{{songsInfo.creator.avatarUrl}}"></image>
        <text class="nickname">{{songsInfo.creator.nickname}}</text>
      </view>
      <view class="desc">简介: {{songsInfo.description}}</view>
    </view>
  </view>
  <view class="operation">
    <view class="favor item">
      <image class="icon" mode="widthFix" src="/assets/images/icons/favor_icon.png"></image>
      <text class="text">{{format.formatCount(songsInfo.playCount || 0)}}</text>
    </view>
    <view class="share item">
      <image class="icon" mode="widthFix" src="/assets/images/icons/share_icon.png"></image>
      <text class="text">分享</text>
    </view>
  </view>
</view>
```
`components/song-detail-header/index.wxss`
```css
/* components/song-detail-header/index.wxss */

.header {
  width: 100vw;
  position: relative;
  left: -20rpx;
  display: flex;
  flex-direction: column;
  height: 450rpx;
  color: #fff;
}

.header .bg-image {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.header .bg-cover {
  position: absolute;
  /* 置于底层 */
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 图片变暗 */
  background-color: rgba(0, 0, 0, .5);
  /* backdrop-filter:透过该层的底部元素模糊化 */
  /* 防止透过遮罩层内容过暗，配合了saturate(150%)使用，意为使…饱和，类似ps饱和度效果，<100%变暗，>100%变亮 */
  backdrop-filter: saturate(150%) blur(5px);
}

.content {
  display: flex;
  margin-top: 60rpx;
  padding: 0 50rpx;
}

.content .image {
  width: 220rpx;
  height: 220rpx;
  border-radius: 16rpx;
}

.content .info {
  position: relative;
  height: 220rpx;
  flex: 1;
  margin-left: 50rpx;
}

.content .info .title {
  /* 显示两行 */
  text-overflow: ellipsis;
  display: -webkit-box;
  /* 展示行数为2 */
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

.content .anthor {
  margin-top: 20rpx;
  display: flex;
  align-items: center;
}

.content .anthor .avatar {
  width: 50rpx;
  height: 50rpx;
  border-radius: 25rpx;
}

.content .anthor .nickname {
  font-size: 24rpx;
  margin-left: 18rpx;
}

.content .info .desc {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  margin-top: 30rpx;
  font-size: 24rpx;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.operation {
  display: flex;
  justify-content: space-around;
  padding: 30rpx;
  margin-top: 30rpx;
}

.operation .item {
  display: flex;
  align-items: center;
}

.operation .item .icon {
  width: 48rpx;
  margin-right: 10rpx;
}

.operation .item .text {
  font-size: 28rpx;
}
```

- 需求：背景图片显示毛玻璃效果
  - 实现：
  ```css
  .header .bg-cover {
    position: absolute;
    /* 置于底层 */
    z-index: -1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 图片变暗 */
    background-color: rgba(0, 0, 0, .5);
    /* backdrop-filter:透过该层的底部元素模糊化 */
    /* 防止透过遮罩层内容过暗，配合了saturate(150%)使用，意为使…饱和，类似ps饱和度效果，<100%变暗，>100%变亮 */
    backdrop-filter: saturate(150%) blur(5px);
  }
  ```
- 需求：歌曲标题最多展示两行
  - 实现：
  ```css
  .content .info .title {
    /* 显示两行 */
    text-overflow: ellipsis;
    display: -webkit-box;
    /* 展示行数为2 */
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

## 搜索

### 热门搜索模块
`pages/detail-search/index.wxml`
```html
<!--pages/detail-search/index.wxml-->
<!-- 搜索框 -->
<van-search class="search" background="#f7f7f7" shape="round"></van-search>

<!-- 热门搜索 -->
<view class="hots">
  <area-header title="热门搜索" showMore="{{false}}"></area-header>
  <view class="hot-list">
    <block wx:for="{{hotKeyWords}}" wx:key="first">
      <view class="tags">{{item.first}}</view>
    </block>
  </view>
</view>
```
```js
  /**
   * 页面的初始数据
   */
  data: {
    // 热门搜索关键字
    hotKeyWords: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getSearcData()
  },

  /**
   * 网络请求
   */
  getSearcData() {
    getSearchHot().then(res => {
      this.setData({
        hotKeyWords: res.result.hots
      })
    })
  }
```
```css
page {
  padding: 0 20rpx;
  padding-top: 56px;
}

/* 搜索框 */
.search {
  position: fixed;
  top: 0;
  left: 20rpx;
  right: 20rpx;
}

/* 热门搜索 */
.hot-list {
  display: flex;
  flex-wrap: wrap;
}

.hot-list .tags {
  background-color: #fff;
  font-size: 26rpx;
  padding: 10rpx 12rpx;
  border-radius: 16rpx;
  margin-right: 20rpx;
  margin-top: 20rpx;
}

.hot-list .tags:first-of-type {
  color: #26ce8a;
}
```
```json
{
  "usingComponents": {
    "van-search": "@vant/weapp/search/index",
    "area-header": "/components/area-header/index"
  }
}
```

### 搜索建议
```html
<!-- 搜索建议 -->
<view class="suggest" wx:else>
  <view class="title">搜索“{{searchValue}}”</view>
  <view class="list">
    <block wx:for="{{suggestSongs}}" wx:key="keyword">
      <view class="item">
        <image class="icon" mode="widthFix" src="/assets/images/icons/search_icon.png"></image>
        <text class="text">{{item.keyword}}</text>
      </view>
    </block>
  </view>
</view>
```
```css
/* 建议搜索 */
.suggest {
  padding: 10rpx;
}

.suggest .title {
  font-size: 34rpx;
  color: #26ce8a;
  font-weight: 700;
}

.suggest .item {
  display: flex;
  align-items: center;
  margin-top: 16rpx;
}

.suggest .item .icon {
  width: 66rpx;
  margin-left: -20rpx;
}

.suggest .item .text {
  font-size: 28rpx;
  display: 1;

  /* 显示两行 */
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  display: -moz-box;
  -moz-line-clamp: 1;
  -moz-box-orient: vertical;
  word-wrap: break-word;
  word-break: break-all;
  white-space: normal;
  overflow: hidden;
}
```

#### 防抖处理
`utils\debounce.js`
```js
/**
 * 防抖：只会在最后调用一次
 * 每次调用函数时会先清除原先的定时器，调用函数时会一直清除定时器并设定下一个定时器，直到最后一次定时器清除后执行延迟操作
 * @param {*} fn 需要防抖的函数
 * @param {*} delay 延迟时间
 * @param {*} immediate 是否立即执行一次
 * @param {*} resultCallback 回调函数
 */

export default function debounce(fn, delay = 500, immediate = false, resultCallback) {
  // 1.定义一个定时器, 保存上一次的定时器
  let timer = null
  let isInvoke = false // 是否已经执行一次

  // 2.真正执行的函数
  const _debounce = function (...args) {
    return new Promise((resolve, reject) => {
      // 取消上一次的定时器
      if (timer) clearTimeout(timer)

      // 判断是否需要立即执行
      if (immediate && !isInvoke) {
        const result = fn.apply(this, args)
        if (resultCallback) resultCallback(result)
        resolve(result)
        isInvoke = true
      } else {
        // 延迟执行
        timer = setTimeout(() => {
          // 外部传入的真正要执行的函数
          const result = fn.apply(this, args)
          if (resultCallback) resultCallback(result)
          resolve(result)
          isInvoke = false
          timer = null
        }, delay)
      }
    })
  }

  // 封装取消功能
  _debounce.cancel = function () {
    console.log(timer)
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}
```
`pages\detail-search\index.js`
```js
const {
  getSearchHot,
  getSearchSuggest
} = require("../../service/api_search")
// 引入防抖
import debounce from '../../utils/debounce'

// 返回经过防抖处理的函数
const debounceGetSearchSuggest = debounce(getSearchSuggest)

// pages/detail-search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门搜索关键字
    hotKeyWords: [],
    // 搜索建议
    suggestSongs: [],
    // 搜索输入值
    searchValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getSearcData()
  },

  /**
   * 网络请求
   */
  getSearcData() {
    getSearchHot().then(res => {
      this.setData({
        hotKeyWords: res.result.hots
      })
    })
  },

  /**
   * 事件处理 - 监听搜索框输入内容
   */
  async handleSearchChange(event) {
    // 获取输入的关键字
    const searchValue = event.detail.trim()
    // 保存关键字
    this.setData({
      searchValue
    })
    // 判断关键字为字符串
    if (!this.data.searchValue.length) {
      // 清空搜索建议
      this.setData({
        suggestSongs: []
      })
      // 清空 node 节点
      this.setData({
        suggestSongsNodes: []
      })
      // 如果长度为空 取消发送请求
      debounceGetSearchSuggest.cancel()
      return
    }
    // 根据关键字搜索
    const res = await debounceGetSearchSuggest(this.data.searchValue)
    // 如果没有长度 不渲染页面
    // if (!this.data.searchValue.length) {
    //   return
    // }
    // 获取建议的关键字歌曲
    this.setData({
      suggestSongs: res.result.allMatch
    })
  },
```

#### 搜索关键字高亮

> 思路：利用富文本框，`startsWith`检测是否以`keyword`开头，如果是进行截取，分为两个`node`节点再拼接，否则整体传送`node`节点
```html
<!-- 搜索建议 -->
<view class="suggest" wx:else>
  <view class="title">搜索“{{searchValue}}”</view>
  <view class="list">
    <block wx:for="{{suggestSongsNodes}}" wx:key="keyword">
      <view class="item">
        <image class="icon" mode="widthFix" src="/assets/images/icons/search_icon.png"></image>
        <!-- <text class="text">{{item.keyword}}</text> -->
        <!-- 富文本 -->
        <rich-text class="text" nodes="{{item}}"></rich-text>
      </view>
    </block>
  </view>
</view>
```
`utils\string2Nodes.js`
```js
/**
 * 字符串转化为 nodes 高亮显示
 */

const string2Nodes = (keyword, value) => {
  const nodes = []
  /**
   * startsWith() 方法用于检测字符串是否以指定的前缀开始。
   * 返回值：如果字符串以指定的前缀开始，则返回 true；否则返回 false。
   * ps: endWith() 以什么结尾 返回布尔值
   */
  // 全部转化为大写匹配
  if (keyword.toUpperCase().startsWith(value.toUpperCase())) {
    // 截取需要高亮显示的关键字
    const key1 = keyword.slice(0, value.length)
    const node1 = {
      name: 'span',
      attrs: {
        style: "color: #26ce8a"
      },
      children: [{
        type: "text",
        text: key1
      }]
    }
    nodes.push(node1)
    // 截取关键字以外的字符
    const key2 = keyword.slice(value.length)
    const node2 = {
      name: 'span',
      attrs: {
        style: "color: #000"
      },
      children: [{
        type: "text",
        text: key2
      }]
    }
    nodes.push(node2)
  } else {
    // 没有匹配到
    const node = {
      name: 'span',
      attrs: {
        style: "color: #000"
      },
      children: [{
        type: "text",
        text: keyword
      }]
    }
    nodes.push(node)
  }
  return nodes
}

export default string2Nodes
```
```js
const {
  getSearchHot,
  getSearchSuggest
} = require("../../service/api_search")
// 引入防抖
import debounce from '../../utils/debounce'
// 导入高亮显示搜索关键字方法
import stringToNodes from '../../utils/string2Nodes'
// 返回经过防抖处理的函数
const debounceGetSearchSuggest = debounce(getSearchSuggest)
// pages/detail-search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门搜索关键字
    hotKeyWords: [],
    // 搜索建议
    suggestSongs: [],
    // 转化为节点
    suggestSongsNodes: [],
    // 搜索输入值
    searchValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getSearcData()
  },

  /**
   * 网络请求
   */
  getSearcData() {
    getSearchHot().then(res => {
      this.setData({
        hotKeyWords: res.result.hots
      })
    })
  },

  /**
   * 事件处理 - 监听搜索框输入内容
   */
  async handleSearchChange(event) {
    // 获取输入的关键字
    const searchValue = event.detail.trim()
    // 保存关键字
    this.setData({
      searchValue
    })
    console.log(this.data.searchValue);
    // 判断关键字为字符串
    if (!this.data.searchValue.length) {
      // 清空搜索建议
      this.setData({
        suggestSongs: []
      })
      this.setData({
        suggestSongsNodes: []
      })
      return
    }
    // 根据关键字搜索
    const res = await debounceGetSearchSuggest(this.data.searchValue)
    // 获取建议的关键字歌曲
    this.setData({
      suggestSongs: res.result.allMatch
    })
    if (!this.data.suggestSongs) return
    // 转成 node 节点
    const suggestKeywords = this.data.suggestSongs.map(item => item.keyword)
    const suggestSongsNodes = []
    for (const keyword of suggestKeywords) {
      const nodes = stringToNodes(keyword, this.data.searchValue)
      suggestSongsNodes.push(nodes)
    }
    this.setData({
      suggestSongsNodes
    })
  }
})
```

#### 搜索结果

```html
<!--pages/detail-search/index.wxml-->
<!-- 搜索框 -->
<van-search class="search" background="#f7f7f7" bind:search="handleSearchAction" bind:change="handleSearchChange" value="{{searchValue}}" show-action="{{searchValue}}" shape="round" placeholder="搜索 音乐/视频/歌手/歌单/电台"></van-search>

<!-- 热门搜索 -->
<view class="hots" wx:if="{{!searchValue.length}}">
  <area-header title="热门搜索" showMore="{{false}}"></area-header>
  <view class="hot-list">
    <block wx:for="{{hotKeyWords}}" wx:key="first">
      <view class="tags" bindtap="handleKeywordClick" data-keyword="{{item.first}}">{{item.first}}</view>
    </block>
  </view>
</view>

<!-- 搜索建议 -->
<view class="suggest" wx:elif="{{suggestSongs.length && !resultSongs.length}}">
  <view class="title">搜索“{{searchValue}}”</view>
  <view class="list">
    <block wx:for="{{suggestSongs}}" wx:key="keyword">
      <view class="item" bindtap="handleKeywordClick" data-keyword="{{item.keyword}}">
        <image class="icon" mode="widthFix" src="/assets/images/icons/search_icon.png"></image>
        <!-- 富文本 -->
        <rich-text class="text" nodes="{{suggestSongsNodes[index]}}"></rich-text>
      </view>
    </block>
  </view>
</view>

<!-- 搜索结果 -->
<view class="result" wx:elif="{{resultSongs.length}}">
  <view class="title">最佳匹配</view>
  <view class="list">
    <block wx:for="{{resultSongs}}" wx:key="id">
      <!-- index 自增 -->
      <song-item-v2 item="{{item}}" index="{{index + 1}}"></song-item-v2>
    </block>
  </view>
</view>
```
```js
const {
  getSearchHot,
  getSearchSuggest,
  getSearchResult
} = require("../../service/api_search")
// 引入防抖
import debounce from '../../utils/debounce'
// 导入高亮显示搜索关键字方法
import stringToNodes from '../../utils/string2Nodes'
// 返回经过防抖处理的函数
const debounceGetSearchSuggest = debounce(getSearchSuggest)
// pages/detail-search/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 热门搜索关键字
    hotKeyWords: [],
    // 搜索建议
    suggestSongs: [],
    // 转化为节点
    suggestSongsNodes: [],
    // 搜索输入值
    searchValue: '',
    // 搜索结果
    resultSongs: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取页面数据
    this.getSearcData()
  },

  /**
   * 网络请求
   */
  getSearcData() {
    getSearchHot().then(res => {
      this.setData({
        hotKeyWords: res.result.hots
      })
    })
  },

  /**
   * 事件处理 - 监听搜索框输入内容
   */
  async handleSearchChange(event) {
    // 获取输入的关键字
    const searchValue = event.detail.trim()
    // 保存关键字
    this.setData({
      searchValue
    })
    // 清空搜索结果
    this.setData({
      resultSongs: []
    })
    console.log(this.data.searchValue);
    // 判断关键字为字符串
    if (!this.data.searchValue.length) {
      // 清空搜索建议
      this.setData({
        suggestSongs: []
      })
      // 清空 node 节点
      this.setData({
        suggestSongsNodes: []
      })
      return
    }
    // 根据关键字搜索
    const res = await debounceGetSearchSuggest(this.data.searchValue)
    // 获取建议的关键字歌曲
    this.setData({
      suggestSongs: res.result.allMatch
    })
    // 转成 node 节点
    if (this.data.suggestSongs) {
      const suggestKeywords = this.data.suggestSongs.map(item => item.keyword)
      const suggestSongsNodes = []
      for (const keyword of suggestKeywords) {
        const nodes = stringToNodes(keyword, this.data.searchValue)
        suggestSongsNodes.push(nodes)
      }
      this.setData({
        suggestSongsNodes
      })
    }
  },

  /**
   * 事件处理 - 根据关键字搜索
   */
  handleSearchAction() {
    const searchValue = this.data.searchValue
    getSearchResult(searchValue).then(res => {
      this.setData({
        resultSongs: res.result.songs
      })
    })
  },

  /**
   * 拿到点击的关键字
   */
  handleKeywordClick(event) {
    // 获取点击的关键字
    const keyword = event.currentTarget.dataset.keyword
    // 将关键字设置到 searchValue 中
    this.setData({
      searchValue: keyword
    })

    // 发送网络请求
    this.handleSearchAction()
  }
})
```
```json
{
  "usingComponents": {
    "van-search": "@vant/weapp/search/index",
    "area-header": "/components/area-header/index",
    "song-item-v2": "/components/song-item-v2/index"
  }
}
```

## 播放页
### 播放页UI设计
#### 跳转到播放页
`components/song-item-v1/index.wxml`和`components/song-item-v2/index.wxml`
```html
<view class="item" bindtap="handleItemClick">
```
`components/song-item-v1/index.js`和`components/song-item-v2/index.js`
```js
    handleItemClick() {
      // 获取歌曲 id
      const id = this.properties.item.id
      // playerStore.dispatch("playMusicWithSongIdAction", {
      //   id
      // });
      wx.navigateTo({
        url: `/pages/music-player/index?id=${id}`,
      })
    }
```

#### 自定义导航栏组件

> 思路：设置原先的`nav`不显示，利用插槽选择显示，`css`中设置`.xxx-slot:empty+.yyy-zzz`选择展示样式
```json
{
  // 不显示 nav
  "navigationStyle": "custom",
  "usingComponents": {
    "navigation-bar": "/components/navigation-bar/index"
  }
}
```
```html
<view class="nav">
  <!-- 状态栏 -->
  <view class="status" style="height: {{statusBarHeight}}px;"></view>
  <!-- 导航栏 -->
  <view class="nav-bar" style="height:{{navBarHeight}}px">
    <!-- 左边 -->
    <view class="left">
      <!-- 具名插槽 -->
      <view class="left-slot">
        <slot name="left-slot"></slot>
      </view>
      <view class="left-arrow" bindtap="handleleftBtnClick">
        <image class="arrow" mode="widthFix" src="/assets/images/icons/arrow-left.png"></image>
      </view>
    </view>
    <!-- 中间 -->
    <view class="center">
      <!-- 插槽 slot 需要放在前面才能插槽内容为空显示后面的 title -->
      <view class="center-slot">
        <slot name="center-slot"></slot>
      </view>
      <view class="center-title">{{title}}</view>
    </view>
    <!-- 右边 -->
    <view class="right"></view>
  </view>
</view>
```
```js
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
  }
})
```
```css
/* components/navigation-bar/index.wxss */


.nav-bar {
  display: flex;
  text-align: center;
}

.left,
.right {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100rpx;
}

.left-arrow {
  display: block;
}

.left-slot:empty+.left-arrow {
  display: block;
}

.center-title {
  display: none;
}

.center-slot:empty+.center-title {
  display: block;
}

.left .left-arrow .arrow {
  width: 44rpx;
  display: block;
}

.center {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
}
```

#### 分页效果处理

> 思路：`swiper`处理分页

```html
<!-- 内容 -->
<swiper class="content" style="height: {{contentHeight}}px;" bindchange="handleSwiperChange">
  <swiper-item>1</swiper-item>
  <swiper-item>2</swiper-item>
</swiper>
```
```js
// pages/music-player/index.js

import {
  getSongDetail
} from '../../service/api_player'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面跳转传入的 id
    id: 0,
    // 当前歌曲
    currentSong: {},
    // 当前页
    currentPage: 0,
    // 内容区高度
    contentHeight: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取传入的 id
    const id = options.id
    this.setData({
      id
    })

    // 根据 id 获取数据
    this.getPageData()

    // 动态计算内容区高度
    this.getContentHeight()
  },

  /**
   * 网络请求
   */
  async getPageData() {
    const res = await getSongDetail(this.data.id)
    this.setData({
      currentSong: res.songs[0]
    })
  },

  /**
   * 动态计算内容区高度
   */
  getContentHeight() {
    const {
      statusBarHeight,
      navBarHeight,
      screenHeight
    } = getApp().globalData
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({
      contentHeight
    })
  },

  /**
   * 事件处理 - 切换 swiper
   */
  handleSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({
      currentPage
    })
  }
})
```

#### 动态计算是否展示歌词

> 通过计算屏幕高宽比判断是否展示歌词

`app.js`
```diff
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
+    // 屏幕高宽比
+    deviceRatio: 0
  },
  // 程序启动生命周期
  onLaunch() {
    // 获取屏幕宽高
    const info = wx.getSystemInfoSync()
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    // 获取状态栏高度
    this.globalData.statusBarHeight = info.statusBarHeight
+    // 计算高宽比
+    const ratio = info.screenHeight / info.screenWidth;
+    this.globalData.deviceRatio = ratio;
  }
})
```

`pages\music-player\index.wxml`
```html
      <!-- 歌词 -->
      <view class="lyric" wx:if="{{isMusicLyric}}">{{currentLyricText}}</view>
```
```diff
// pages/music-player/index.js

import {
  getSongDetail
} from '../../service/api_player'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 页面跳转传入的 id
    id: 0,
    // 当前歌曲
    currentSong: {},
    // 当前页
    currentPage: 0,
    // 内容区高度
    contentHeight: 0,
+    // 是否显示歌词
+    isMusicLyric: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 获取传入的 id
    const id = options.id
    this.setData({
      id
    })

    // 根据 id 获取数据
    this.getPageData()

    // 动态计算内容区高度
    this.getContentHeight()
  },

  /**
   * 网络请求
   */
  async getPageData() {
    const res = await getSongDetail(this.data.id)
    this.setData({
      currentSong: res.songs[0]
    })
  },

  /**
   * 动态计算内容区高度
   */
  getContentHeight() {
    const {
      statusBarHeight,
      navBarHeight,
      screenHeight,
+      deviceRatio
    } = getApp().globalData
    const contentHeight = screenHeight - statusBarHeight - navBarHeight
    this.setData({
      contentHeight
    })
+    this.setData({
+      isMusicLyric: deviceRatio >= 2
+    })
  },

  /**
   * 事件处理 - 切换 swiper
   */
  handleSwiperChange(event) {
    const currentPage = event.detail.current
    this.setData({
      currentPage
    })
  }
})
```

### 事件处理

#### 设置音乐自动播放
```js
/**
 * 播放相关仓库
 */

const audioContext = wx.createInnerAudioContext()

export {
  audioContext
}
```
```js
    // 创建播放器
    // 停止上一个音乐
    audioContext.stop()
    audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
    // 自动开启播放
    audioContext.autoplay = true
    audioContext.onCanplay(() => {
      // 想要跳转播放需要 play() 方法
      audioContext.play()
    })
```

#### 进度条进度控制

> weapp `slider`滑块有`bindchange`滑块位置改变事件和`bindchanging`拖动滑块事件

```html
        <slider class="slider" block-size="{{12}}" value="{{sliderValue}}" bindchange="handleSliderChange" bindchanging="handleSliderChanging">
```
```js
  data: {
    // 歌曲时长
    durationTime: 0,
    // 当前播放时间
    currentTime: 0,
    // 滑块值
    sliderValue: 0,
    // 是否正在移动滑块
    isSliderChanging: false
  },
```
1. 随时间移动获取当前播放时间，改变滑块移动位置
```js
    audioContext.onTimeUpdate(() => {
      // 当前播放时间
      const currentTime = audioContext.currentTime * 1000
      // 如果滑块在移动，停止监听随时间变化的事件
      if (this.data.isSliderChanging) return
      // 滑块移动值
      const sliderValue = currentTime / this.data.durationTime * 100
      this.setData({
        currentTime,
        sliderValue
      })
    })
```
2. 点击移动滑块跳转到指定位置播放

```js
  /**
   * 事件处理 - slider点击获取变化的百分比
   */
  handleSliderChange(event) {
    const value = event.detail.value
    // 拿到需要播放的 currentTime
    const currentTime = this.data.durationTime * value / 100
    // 设置 context 播放 currentTime 位置的值
    // 先暂停音乐
    audioContext.pause()
    // 转到想要播放的时间 转化成秒
    audioContext.seek(currentTime / 1000)
    // 记录最新的 sliderValue
    this.setData({
      sliderValue: value,
      isSliderChanging: false
    })
  },
```

3. 拖动滑块改变进度条和时间
- 在拖动时需要暂停随时间变化而变化的进度条和播放时间，防止冲突，设定变量`isSliderChanging`
```diff
    audioContext.onTimeUpdate(() => {
+      // 如果滑块在移动，停止监听随时间变化的事件
+      if (this.data.isSliderChanging) return
      // 当前播放时间
      const currentTime = audioContext.currentTime * 1000
      // 滑块移动值
      const sliderValue = currentTime / this.data.durationTime * 100
      this.setData({
        currentTime,
        sliderValue
      })
    })
```
```js
  /**
   * 事件处理 - 滑动滑块 swiper
   */
  handleSliderChanging(event) {
    // 确定滑块移动位置
    const value = event.detail.value
    // 更改当前播放时间
    const currentTime = this.data.durationTime * value / 100
    this.setData({
      isSliderChanging: true,
      currentTime
    })
  }
```

#### 切割歌词
`utils\parse-lyric.js`
```js
/**
 * 切割歌词
 */

// 正则表达式匹配时间 () 分块 不要乱加空格
// [00:00.000] 
const timeRegExp = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
export const getParseLyric = (lyricString) => {
  const lyricStrings = lyricString.split('\n')
  const lyricInfos = []
  // 正则截取时间
  // for in => 遍历键名  for of => 遍历键值
  for (const lineString of lyricStrings) {
    // [00:00.000] 作词 : 唐恬
    // continue 跳过本次循环 执行下一次
    if (lineString === "") continue

    // 获取时间
    const timeResult = timeRegExp.exec(lineString)
    // 字符串 * 数字 隐式转化
    const minite = timeResult[1] * 60 * 1000 // 分
    const second = timeResult[2] * 1000 // 秒
    const millisecondTime = timeResult[3] // 毫秒
    const millisecond = millisecondTime.length === 2 ? millisecondTime * 10 : millisecondTime * 1
    const time = minite + second + millisecond

    // 获取文本
    const text = lineString.replace(timeRegExp, "")
    lyricInfos.push({
      time,
      text
    })
  }
  return lyricInfos
}
```

#### 匹配歌词

> 思路：取出歌词时间，对比当前时间，通过循环找到当前时间对应的歌词（判断当前时间是否小于歌词时间，如果小于，取前一条歌词进行展示）。因为歌曲一直在播放，所以不停的进入for循环，找到了之后break退出当前循环，因为一直在播放所以进入下一次循环，再break

```js
// 监听事件改变
audioContext.onTimeUpdate(() => {
  // 根据当前时间查找对应歌词
  // 每次都是从 0 开始匹配 保证无论前进还是后退都能匹配上
  let i = 0
  for (; i < this.data.lyricInfos.length; i++) {
    // 拿到每句歌词
    const lyricInfo = this.data.lyricInfos[i]
    if (currentTime < lyricInfo.time) {
      // 找到了之后不需要再找 break 跳出循环
      break
    }
  }

  // 设置当前歌词和索引
  // 找到正确的需要显示的歌词的 index
  const currentLyricIndex = i - 1
  console.log(i);
  // 如果当前 index 和 歌词的 index 不相同 设置 currentLyricText
  if (this.data.currentLyricIndex !== currentLyricIndex) {
    // 找到对应歌词
    const currentLyricText = this.data.lyricInfos[currentLyricIndex].text
    this.setData({
      currentLyricText,
      currentLyricIndex
    })
  }
})
```

#### 歌词
1. UI设计
```html
    <swiper-item class="lyric">
      <scroll-view class="lyric-list" scroll-y scroll-with-animation scroll-top="{{lyricScrollTop}}">
        <block wx:for="{{lyricInfos}}" wx:key="index">
          <view class="item {{currentLyricIndex === index ? 'active' : ''}}" style="padding-top: {{index === 0 ? (contentHeight/2 - 150) : 0}}px; padding-bottom: {{index === lyricInfos.length - 1 ? (contentHeight/2) : 0}}px;">
            {{item.text}}
          </view>
        </block>
      </scroll-view>
    </swiper-item>
```
- 给第一句歌词和最后一句歌词加`padding`
```html
<view class="item {{currentLyricIndex === index ? 'active' : ''}}" style="padding-top: {{index === 0 ? (contentHeight/2 - 150) : 0}}px; padding-bottom: {{index === lyricInfos.length - 1 ? (contentHeight/2) : 0}}px;">
```
```diff
      if (this.data.currentLyricIndex !== currentLyricIndex) {
        // 找到对应歌词
        const currentLyricText = this.data.lyricInfos[currentLyricIndex].text
        this.setData({
          currentLyricText,
          currentLyricIndex,
+          // 设置歌词向上滚动距离 也可以抽取出来常量 放到js和css文件中
+          lyricScrollTop: currentLyricIndex * 35
        })
      }
```
- 歌词滚动时添加动画`scroll-with-animation`
```html
<scroll-view class="lyric-list" scroll-y scroll-with-animation scroll-top="{{lyricScrollTop}}">
```

### 逻辑抽取

#### 状态管理逻辑抽取
1. 封装数据保存到仓库并播放歌曲`store\player-store.js`
```js
/**
 * 播放相关仓库
 */
import {
  getSongDetail,
  getSongLyric
} from '../service/api_player'

import {
  getParseLyric
} from '../utils/parse-lyric'

import {
  HidariEventStore
} from '../hidari-event-store/index'

const audioContext = wx.createInnerAudioContext()
const playerStore = new HidariEventStore({
  state: {
    // 歌曲 id
    id: 0,
    // 当前播放的歌曲
    currentSong: {},
    // 歌曲时长
    durationTime: 0,
    // 歌词数组
    lyricInfos: []
  },
  actions: {
    /**
     * 根据歌曲id播放音乐
     * @param {*} ctx 上下文
     * @param {*} id 歌曲id
     */
    playMusicWithSongIdAction(ctx, {
      id
    }) {
      ctx.id = id
      /**
       * 请求歌曲信息
       */
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })
      /**
       * 请求歌词信息
       */
      getSongLyric(id).then(res => {
        const lyricInfos = getParseLyric(res.lrc.lyric)
        ctx.lyricInfos = lyricInfos
      })
      // 创建播放器 播放对应歌曲
      // 停止上一个音乐
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // 自动开启播放
      audioContext.autoplay = true
    }
  }
})
export {
  audioContext,
  playerStore
}
```
2. 在页面跳转时发送请求
`components\song-item-v1\index.js`
`components\song-item-v2\index.js`
```js
handleItemClick() {
  // 获取歌曲 id
  const id = this.properties.item.id
  // 发送请求
  playerStore.dispatch("playMusicWithSongIdAction", {
    id
  });
  wx.navigateTo({
    url: `/pages/music-player/index?id=${id}`,
  })
}
```
- 搜索页面`pages\detail-search\index.wxml`
```html
<!-- 搜索结果 -->
<view class="result" wx:elif="{{resultSongs.length}}">
  <view class="title">最佳匹配</view>
  <view class="list">
    <block wx:for="{{resultSongs}}" wx:key="id">
      <!-- index 自增 -->
      <song-item-v2 item="{{item}}" index="{{index + 1}}" bindtap="handleSongItemClick" data-index="{{index}}"></song-item-v2>
    </block>
  </view>
</view>
```
```js
  /**
   * 事件监听 - 监听歌曲点击事件获取歌单和index
   */
  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    playerStore.setState('playListSongs', this.data.resultSongs)
    playerStore.setState('playListIndex', index)
  }
```
3. 保存数据
```js
  /**
   * 从store中取值
   */
  setupPlayerStoreListener() {
    playerStore.onStates(["currentSong", "durationTime", "lyricInfos"], ({
      currentSong,
      durationTime,
      lyricInfos
    }) => {
      // 有值改变时重新赋值
      if (currentSong) this.setData({
        currentSong
      })
      if (durationTime) this.setData({
        durationTime
      })
      if (lyricInfos) this.setData({
        lyricInfos
      })
    })
  }
```

4. 返回上一页并且不停止播放
`pages\music-player\index.js`
```js
  /**
   * 事件处理 - 点击左边返回
   */
  handleNavbarBackClick() {
    // 返回 还会继续播放歌曲
    wx.navigateBack()
  }
```

#### 播放页播放监听逻辑抽取
1. 封装数据`store\player-store.js`
```js
    /**
     * 事件监听 - audioContext
     * @param {*} ctx 上下文
     */
    setupAudioContextListenerAction(ctx) {
      // 可以开始播放
      audioContext.onCanplay(() => {
        // 想要跳转播放需要 play() 方法 这个方法也可以自动播放
        audioContext.play()
      })
      // 监听事件改变
      audioContext.onTimeUpdate(() => {
        // 当前播放时间
        const currentTime = audioContext.currentTime * 1000
        // 根据当前时间修改 currentTime
        ctx.currentTime = currentTime
  
        // 根据当前时间查找对应歌词
        // 每次都是从 0 开始匹配 保证无论前进还是后退都能匹配上
        if (!ctx.lyricInfos.length) return
        let i = 0
        for (; i < ctx.lyricInfos.length; i++) {
          // 拿到每句歌词
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            // 找到了之后不需要再找 break 跳出循环
            break
          }
        }
  
        // 设置当前歌词和索引
        // 找到正确的需要显示的歌词的 index
        const currentLyricIndex = i - 1
        // 如果当前 index 和 歌词的 index 不相同 设置 currentLyricText
        if (ctx.currentLyricIndex !== currentLyricIndex) {
          // 找到对应歌词
          const currentLyricText = ctx.lyricInfos[currentLyricIndex].text
          ctx.currentLyricText = currentLyricText
          ctx.currentLyricIndex = currentLyricIndex
        }
      })
    }
```
2. 监听数据`pages\music-player\index.js`
```js
    // "currentTime", "currentLyricIndex", "currentLyricText"
    playerStore.onStates(["currentTime", "currentLyricIndex", "currentLyricText"], ({
      currentTime,
      currentLyricIndex,
      currentLyricText
    }) => {
      // 时间变化
      // 如果滑块不在移动，监听随时间变化的事件
      if (currentTime && !this.data.isSliderChanging) {
        // 滑块移动值
        const sliderValue = currentTime / this.data.durationTime * 100
        this.setData({
          currentTime,
          sliderValue
        })
      }
      // 歌词变化
      if (currentLyricText) {
        this.setData({
          currentLyricText
        })
      }
      // 歌词下标变化
      if (currentLyricIndex) {
        this.setData({
          currentLyricIndex,
          // 设置歌词向上滚动距离 也可以抽取出来常量 放到js和css文件中
          lyricScrollTop: currentLyricIndex * 35
        })
      }
    })
```
3. 发送请求改变数据
```diff
    /**
     * 根据歌曲id播放音乐
     * @param {*} ctx 上下文
     * @param {*} id 歌曲id
     */
    playMusicWithSongIdAction(ctx, {
      id
    }) {
      ctx.id = id
      /**
       * 请求歌曲信息
       */
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })
      /**
       * 请求歌词信息
       */
      getSongLyric(id).then(res => {
        const lyricInfos = getParseLyric(res.lrc.lyric)
        ctx.lyricInfos = lyricInfos
      })

      // 创建播放器 播放对应歌曲
      // 停止上一个音乐
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // 自动开启播放
      audioContext.autoplay = true

+      // 监听 audioContext 一些事件
+      this.dispatch('setupAudioContextListenerAction')
    },
```

#### 播放状态栏处理
1. 播放模式记录和修改
- `store\player-store.js`
```diff
  state: {
    // 歌曲 id
    id: 0,
    // 当前播放的歌曲
    currentSong: {},
    // 歌曲时长
    durationTime: 0,
    // 歌词数组
    lyricInfos: [],
    // 当前播放的事件
    currentTime: 0,
    // 当前播放的歌词index
    currentLyricIndex: 0,
    // 当前播放的歌词
    currentLyricText: '',
+    // 播放模式 => 0 循环播放， 1 单曲播放， 2 随机播放
+    playModeIndex: 0
  },
```
`pages\music-player\index.js`
```js
  /**
   * 事件监听 - 播放模式变化
   */
  handleModeBtnClick() {
    // 计算最新的 playModeIndex
    let playIndex = this.data.playModeIndex + 1
    if (playIndex === 3) playIndex = 0
    console.log(playIndex)
    playerStore.setState('playModeIndex', playIndex)
  }
```
```js
    // 监听播放模式相关数据
    playerStore.onState('playModeIndex', (playModeIndex) => {
      this.setData({
        playModeIndex,
        playModeName: playModeNames[playModeIndex]
      })
    })
```

2. 播放状态的控制
`store\player-store.js`
```diff
  state: {
    // 歌曲 id
    id: 0,
    // 当前播放的歌曲
    currentSong: {},
    // 歌曲时长
    durationTime: 0,
    // 歌词数组
    lyricInfos: [],
    // 当前播放的事件
    currentTime: 0,
    // 当前播放的歌词index
    currentLyricIndex: 0,
    // 当前播放的歌词
    currentLyricText: '',
    // 播放模式 => 0 循环播放， 1 单曲播放， 2 随机播放
    playModeIndex: 0,
+    // 是否在播放
+    isPlaying: false
  },
```
```js
    /**
     * 切换歌曲播放状态
     * @param {*} ctx 上下文
     * @param {*} isPlaying 是否正在播放 如果不传默认为 true
     */
    changeMusicPlayStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying;
      ctx.isPlaying ? audioContext.play() : audioContext.pause()
    }
```
`pages\music-player\index.js`
```js
    // 监听播放模式相关数据 'playModeIndex', 'isPlaying'
    playerStore.onStates(['playModeIndex', 'isPlaying'], ({
      playModeIndex,
      isPlaying
    }) => {
      // 如果修改播放模式
      if (playModeIndex !== undefined) {
        this.setData({
          playModeIndex,
          playModeName: playModeNames[playModeIndex]
        })
      }
      // 如果修改播放状态
      if (isPlaying !== undefined) {
        this.setData({
          isPlaying,
          playingName: isPlaying ? 'pause' : 'resume'
        })
      }
    })
```
```js
  /**
   * 事件监听 - 播放状态变化 => 播放、暂停
   */
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  }
```
### 细节补充
#### 暂停后跳转到指定时间依旧暂停

1. 更改 store 中重新开始播放位置为当前位置
```js
    /**
     * 切换歌曲播放状态
     * @param {*} ctx 上下文
     * @param {*} isPlaying 是否正在播放 如果不传默认为 true
     */
    changeMusicPlayStatusAction(ctx, isPlaying = true) {
      ctx.isPlaying = isPlaying;
      console.log(isPlaying ? 'play' : 'pause');
      // 暂停再开始时从当前位置开始播放
      ctx.isPlaying ? audioContext.seek(ctx.currentTime / 1000) : audioContext.pause()
    }
```
2. 只有在播放状态下会继续播放，否则把跳转后的时间传递给 store
```js
  /**
   * 事件处理 - slider点击获取变化的百分比
   */
  handleSliderChange(event) {
    const value = event.detail.value
    // 拿到需要播放的 currentTime
    const currentTime = this.data.durationTime * value / 100
    // 设置 context 播放 currentTime 位置的值
    // 先暂停音乐
    audioContext.pause()
    // 记录最新的 sliderValue
    this.setData({
      sliderValue: value,
      currentTime,
      isSliderChanging: false
    })
    // 把当前播放时间传给 store 记录
    playerStore.setState('currentTime', currentTime)
    // 如果在播放，跳转，未在播放，依旧暂停
    if (this.data.isPlaying) {
      // 转到想要播放的时间 转化成秒
      audioContext.seek(currentTime / 1000)
    }
  },
```

#### 切换歌曲后清空上次歌曲数据防止继续显示
```diff
    /**
     * 根据歌曲id播放音乐
     * @param {*} ctx 上下文
     * @param {*} id 歌曲id
     */
    playMusicWithSongIdAction(ctx, {
      id
    }) {
      // 如果播放的是上次的歌
      if (ctx.id == id) {
        // 每次点进来就直接开始播放
        this.dispatch('changeMusicPlayStatusAction')
        return
      }
      ctx.id = id
      // 修改播放状态
      ctx.isPlaying = true

+      // 0、清空之前的数据
+      ctx.currentSong = {}
+      ctx.durationTime = 0
+      ctx.lyricInfos = []
+      ctx.currentTime = 0
+      ctx.currentLyricIndex = 0
+      ctx.currentLyricText = ""
      /**
       * 请求歌曲信息
       */
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })
      /**
       * 请求歌词信息
       */
      getSongLyric(id).then(res => {
        const lyricInfos = getParseLyric(res.lrc.lyric)
        ctx.lyricInfos = lyricInfos
      })

      // 创建播放器 播放对应歌曲
      // 停止上一个音乐
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // 自动开启播放
      audioContext.autoplay = true

      // 监听 audioContext 一些事件
      this.dispatch('setupAudioContextListenerAction')
    },
```

#### 切换上一首 / 下一首
1. store 中添加字段
```js
    // 当前播放的歌单
    playListSongs: [],
    // 当前播放的歌曲在歌单中的位置
    playListIndex: 0
```
2. 监听点击事件，把数据保存到 store
`pages\detail-songs\index.js`
```js
  /**
   * 事件监听 - 监听歌曲点击事件获取歌单和index
   */
  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    console.log(this.data.songsInfo.tracks, index)
    playerStore.setState('playListSongs', this.data.songsInfo.tracks)
    playerStore.setState('playListIndex', index)
  }
```
`pages\home-music\index.js`
```js
  /**
   * 事件监听 - 监听歌曲点击事件获取歌单和index
   */
  handleSongItemClick(event) {
    const index = event.currentTarget.dataset.index
    console.log(this.data.recommendSongs, index)
    playerStore.setState('playListSongs', this.data.recommendSongs)
    playerStore.setState('playListIndex', index)
  }
```

3. 点击事件
```js

  /**
   * 事件监听 - 切换上一首
   */
  handlePrevBtnClick() {
    playerStore.dispatch('changeNewMusicAction', false)
  },

  /**
   * 事件监听 - 播放下一首
   */
  handleNextBtnClick() {
    playerStore.dispatch('changeNewMusicAction')
  }
```

4. store 中逻辑封装
```js
    /**
     * 切换上一首 / 下一首歌曲
     */
    changeNewMusicAction(ctx, isNext = true) {
      // 获取当前索引
      let currentIndex = ctx.playListIndex
      // 根据不同模式，获取下一首歌索引
      switch (ctx.playModeIndex) {
        case 0:
          // 顺序播放
          currentIndex = isNext ? currentIndex + 1 : currentIndex - 1
          // 如果是最后一首，播放第一首
          if (currentIndex === ctx.playListSongs.length) currentIndex = 0
          // 如果是第一首，播放最后一首
          if (currentIndex === -1) currentIndex = ctx.playListSongs.length - 1
          break
        case 1:
          // 单曲循环 直接退出 还是播放这首歌
          // index = index
          break
        case 2:
          // 随机播放
          // Math.random() 后面有()
          const index = Math.floor(Math.random() * ctx.playListSongs.length)
          // 如果是同一首歌 继续切换下一首
          if (index === currentIndex) {
            this.dispatch('changeNewMusicAction', isNext)
            return
          }
          currentIndex = index
          // 记录新的索引
          ctx.playListIndex = currentIndex
          break
      }

      // 获取歌曲
      let currentSong = ctx.playListSongs[currentIndex]
      // 如果没有值 播放同一曲
      if (!currentSong) {
        currentSong = ctx.currentSong
      } else {
        // 记录新的索引
        ctx.playListIndex = currentIndex
      }

      // 播放新的歌曲
      this.dispatch('playMusicWithSongIdAction', {
        id: currentSong.id,
        isRefresh: true
      })
    }
```

5. 如果单曲循环，点击上一首 / 下一首重新开始播放
```diff
    /**
     * 根据歌曲id播放音乐
     * @param {*} ctx 上下文
     * @param {*} id 歌曲id 
+     * @param {*} isRefresh 是否需要刷新 默认不需要
     */
    playMusicWithSongIdAction(ctx, {
      id,
+      isRefresh = false
    }) {
      // 如果播放的是上次的歌
      // 如果不需要刷新，继续播放
+      if (ctx.id == id && !isRefresh) {
        // 每次点进来就直接开始播放
        this.dispatch('changeMusicPlayStatusAction')
        return
      }
      ctx.id = id
      // 修改播放状态
      ctx.isPlaying = true

      // 0、清空之前的数据
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""
      /**
       * 请求歌曲信息
       */
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })
      /**
       * 请求歌词信息
       */
      getSongLyric(id).then(res => {
        const lyricInfos = getParseLyric(res.lrc.lyric)
        ctx.lyricInfos = lyricInfos
      })

      // 创建播放器 播放对应歌曲
      // 停止上一个音乐
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // 自动开启播放
      audioContext.autoplay = true

      // 监听 audioContext 一些事件
      this.dispatch('setupAudioContextListenerAction')
    },
```

#### 监听歌曲 自动播放下一首

1. 用的是同一个 `audioContext` 不用每次都开始监听
```diff
    /**
     * 根据歌曲id播放音乐
     * @param {*} ctx 上下文
     * @param {*} id 歌曲id 
     * @param {*} isRefresh 是否需要刷新 默认不需要
     */
    playMusicWithSongIdAction(ctx, {
      id,
      isRefresh = false
    }) {
      // 如果播放的是上次的歌
      // 如果不需要刷新，继续播放
      if (ctx.id == id && !isRefresh) {
        // 每次点进来就直接开始播放
        this.dispatch('changeMusicPlayStatusAction')
        return
      }
      ctx.id = id
      // 修改播放状态
      ctx.isPlaying = true

      // 0、清空之前的数据
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""
      /**
       * 请求歌曲信息
       */
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
      })
      /**
       * 请求歌词信息
       */
      getSongLyric(id).then(res => {
        const lyricInfos = getParseLyric(res.lrc.lyric)
        ctx.lyricInfos = lyricInfos
      })

      // 创建播放器 播放对应歌曲
      // 停止上一个音乐
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // 自动开启播放
      audioContext.autoplay = true

      // 监听 audioContext 一些事件
+      // 用的是同一个 audioContext 不用每次都开始监听
+      // 第一次播放添加监听
+      if (ctx.isFirstPlay) {
        this.dispatch('setupAudioContextListenerAction')
+        ctx.isFirstPlay = false
+      }
    },
```

2. 自动播放下一首
```diff
    /**
     * 监听播放器时间变化
     * @param {*} ctx 上下文
     */
    setupAudioContextListenerAction(ctx) {
      // 可以开始播放
      audioContext.onCanplay(() => {
        // 想要跳转播放需要 play() 方法 这个方法也可以自动播放
        audioContext.play()
      })
      // 监听事件改变
      audioContext.onTimeUpdate(() => {
        // 当前播放时间
        const currentTime = audioContext.currentTime * 1000
        // 根据当前时间修改 currentTime
        ctx.currentTime = currentTime

        // 根据当前时间查找对应歌词
        // 每次都是从 0 开始匹配 保证无论前进还是后退都能匹配上
        if (!ctx.lyricInfos.length) return
        let i = 0
        for (; i < ctx.lyricInfos.length; i++) {
          // 拿到每句歌词
          const lyricInfo = ctx.lyricInfos[i]
          if (currentTime < lyricInfo.time) {
            // 找到了之后不需要再找 break 跳出循环
            break
          }
        }

        // 设置当前歌词和索引
        // 找到正确的需要显示的歌词的 index
        const currentLyricIndex = i - 1
        // 如果当前 index 和 歌词的 index 不相同 设置 currentLyricText
        if (ctx.currentLyricIndex !== currentLyricIndex) {
          // 找到对应歌词
          const currentLyricText = ctx.lyricInfos[currentLyricIndex].text
          ctx.currentLyricText = currentLyricText
          ctx.currentLyricIndex = currentLyricIndex
        }
      })

+      // 监听播放完成，自动播放下一首歌曲。
+      audioContext.onEnded(() => {
+        this.dispatch("changeNewMusicAction")
+      })
    },
```

### 首页播放栏

1. UI设计
`pages\home-music\index.wxml`
```html
<!-- 播放工具栏 -->
<view class="play-bar-placeholder" wx:if="{{currentSong.id}}"></view>
<view class="play-bar" wx:if="{{currentSong.id}}" bindtap="handlePlayBarClick">
  <view class="left">
    <!-- animation-play-state 动画状态 -->
    <image class="album ablum-anim" style="animation-play-state: {{playAnimState}};" mode="aspectFill" src="{{currentSong.al.picUrl}}"></image>
    <view class="name">{{currentSong. name}}</view>
  </view>
  <view class="right">
    <image class="icon icon-play" src="/assets/images/music/{{isPlaying ? 'pause' : 'play'}}_icon.png" catchtap="handlePlayBtnClick"></image>
    <image class="icon icon-list" src="/assets/images/music/playlist_icon.png"></image>
  </view>
</view>
```
`pages\home-music\index.wxss`
```css

.play-bar-placeholder {
  height: 44px;
}

/* 播放工具栏 */
.play-bar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 44px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 20rpx;

  background-color: #fafafa;
  box-shadow: 0 -1px 5px rgba(0, 0, 0, .3);
}

.play-bar .left,
.play-bar .right {
  display: flex;
  align-items: center;
}

.play-bar .left .album {
  width: 44px;
  height: 44px;
  border-radius: 50%;

  position: relative;
  top: -8px;
}

.play-bar .left .name {
  margin-left: 16px;
  font-size: 30rpx;
  color: #333;
}

.play-bar .right .icon {
  width: 30px;
  height: 30px;
}

.play-bar .right .icon-play {
  width: 25px;
  height: 25px;
  margin-right: 16rpx;
}

/* album 动画 */
@keyframes ablumRotate {
  from {
    transform: rotate(0deg)
  }

  to {
    transform: rotate(360deg)
  }
}

.ablum-anim {
  /* 线性、 无线循环 */
  animation: ablumRotate 16s linear infinite;
}
```

2. 设置播放停止
- 添加 data
```js
    // 正在播放的歌曲
    currentSong: {},
    // 是否正在播放
    isPlaying: false,
    // 动画状态
    playAnimState: "paused"
```

- 从 store 读取数据
```js
  /**
   * 事件处理 - 从 store 获取共享的数据
   */
  setupPlayerStoreListener() {
    // 1. 排行榜监听
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

    // 2. 播放器监听 'currentSong', 'isPlaying'
    playerStore.onStates(['currentSong', 'isPlaying'], ({
      currentSong,
      isPlaying
    }) => {
      if (currentSong) this.setData({
        currentSong
      })
      if (isPlaying !== undefined) this.setData({
        isPlaying,
        playAnimState: isPlaying ? 'running' : 'paused'
      })
    })
  },
```

- 监听播放暂停事件
```js
  /**
   * 事件处理 - 点击控制播放暂停
   */
  handlePlayBtnClick() {
    playerStore.dispatch("changeMusicPlayStatusAction", !this.data.isPlaying)
  },
```

3. 点击播放栏跳转页面

- 跳转页面
```js
  /**
   * 事件处理 - 点击播放栏跳转到播放页
   */
  handlePlayBarClick() {
    wx.navigateTo({
      url: `/pages/music-player/index?id=${this.data.currentSong.id}`,
    })
  },
```

- 阻止事件冒泡

> `catchtap` 事件不会冒泡不会向上传递

```html
    <!-- catchtap 事件不会冒泡不会向上传递 -->
    <image class="icon icon-play" src="/assets/images/music/{{isPlaying ? 'pause' : 'play'}}_icon.png" catchtap="handlePlayBtnClick"></image>
```

4. 改善播放栏高度

> 在播放时设定`padding`
```html
<view class="play-bar-placeholder" wx:if="{{currentSong.id}}"></view>
```
```css
.play-bar-placeholder {
  height: 44px;
}
```

### 使用背景播放器播放音乐

> api: `wx.getBackgroundAudioManager()`

`app.json`
```json
  "requiredBackgroundModes": ["audio"],
```
```js
// const audioContext = wx.createInnerAudioContext()
// 切换背景播放模式 切出后台也可以播放
const audioContext = wx.getBackgroundAudioManager()
```
```diff
    /**
     * 根据歌曲id播放音乐
     * @param {*} ctx 上下文
     * @param {*} id 歌曲id 
     * @param {*} isRefresh 是否需要刷新 默认不需要
     */
    playMusicWithSongIdAction(ctx, {
      id,
      isRefresh = false
    }) {
      // 如果播放的是上次的歌
      // 如果不需要刷新，继续播放
      if (ctx.id == id && !isRefresh) {
        // 每次点进来就直接开始播放
        this.dispatch('changeMusicPlayStatusAction')
        return
      }
      ctx.id = id
      // 修改播放状态
      ctx.isPlaying = true

      // 0、清空之前的数据
      ctx.currentSong = {}
      ctx.durationTime = 0
      ctx.lyricInfos = []
      ctx.currentTime = 0
      ctx.currentLyricIndex = 0
      ctx.currentLyricText = ""
      /**
       * 请求歌曲信息
       */
      getSongDetail(id).then(res => {
        ctx.currentSong = res.songs[0]
        ctx.durationTime = res.songs[0].dt
+        audioContext.title = res.songs[0].name
      })
      /**
       * 请求歌词信息
       */
      getSongLyric(id).then(res => {
        const lyricInfos = getParseLyric(res.lrc.lyric)
        ctx.lyricInfos = lyricInfos
      })
      // 创建播放器 播放对应歌曲
      // 停止上一个音乐
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      // 自动开启播放
+      // 切换后台播放 wx.getBackgroundAudioManager() 需要有 title 
+      audioContext.title = id
      audioContext.autoplay = true

      // 监听 audioContext 一些事件
      // 用的是同一个 audioContext 不用每次都开始监听
      // 第一次播放添加监听
      if (ctx.isFirstPlay) {
        this.dispatch('setupAudioContextListenerAction')
        ctx.isFirstPlay = false
      }
    },
```

#### 使用背景播放器暂停 / 开始状态控制
```js
      // 监听音乐 暂停 / 播放
      // 播放
      audioContext.onPlay(() => {
        ctx.isPlaying = true
      })
      // 暂停
      audioContext.onPause(() => {
        ctx.isPlaying = false
      })
```

- 问题：此时会导致跳转播放时间时按钮会先显示暂停后恢复
- 原因：在改变进度时，暂停音乐，此时为暂停状态 调用 `onPause()` 方法改变了状态按钮，缓存完成后播放时又改回来
- 解决思路：
1. 音乐播放器内不做暂停
`pages\music-player\index.js`
```diff
-    // 先暂停音乐
-    // audioContext.pause()
```
2. 在暂停状态下添加标记，如果是从进度栏改变，直接`return`，不改变状态
- 因为小程序 `onCanplay`有bug，所以删除暂停音乐

#### 控制后台播放停止后，页面状态改变和点击重新开始播放

> 设置播放状态是否停止

- 改变`isStopping`状态
```js
      // 停止
      audioContext.onStop(() => {
        ctx.isPlaying = false
        // 设置为停止状态
        ctx.isStopping = true
      })
```
- 点击播放时重新开始播放，因为已经清空信息，所以需要再加一次
```js
      if (ctx.isStopping && ctx.isPlaying) {
        audioContext.src = `https://music.163.com/song/media/outer/url?id=${ctx.id}.mp3`
        // 自动开启播放
        // 切换后台播放 wx.getBackgroundAudioManager() 需要有 title 
        audioContext.title = ctx.currentSong.name
        // 再次开始时从关闭位置开始播放
        audioContext.startTime = ctx.currentTime / 1000
        ctx.isStopping = false
      }
```

## 用户登录
### 登陆步骤解析
1. 小程序端：
  1. 需要在小程序拿到一个临时 `code`
    - `wx.login` -> `code`
  2. 将`code`传递给自己的服务器
    - `code` -> 服务器

2. 服务器端：
  1. 拿到小程序发来的 `code`
  - `code`
  2. 服务器端 `code` + `appid` + `appsecret`
  3. 服务器向微信服务器发送网络请求
  - 携带 `code` + `appid` + `appsecret`
  - `axios`
  4. `openid` + `session_key`
  - `access_token`
  5. 问题：用户不知道自己登陆成功
  - `openid` + `session_key` + 其他信息
  - 生成的东西 => 自己的服务器 `token`
  6. 将这个 `token` 返回给小程序
3. 小程序端：
  1. 获取到服务器返回的 `token`
  2. 用户进行其他操作
     - 收藏，喜欢，评论
     - 将 `token` 发送给自己的服务器
4. 自己的服务器拿到 `token`
  - 解析 `token` 得到 `openid\session_key`
  - 数据库中保存用户的一些操作

### 实现登录
#### 封装请求
`service\index.js`

- 添加 `base_url` 再封装一个请求，动态导入 `base_url`
```diff
/**
 * 封装 wx.request({}) 请求
 */
// base_url 常量
const BASE_URL = 'http://123.207.32.32:9001'
+// 登录的 base_URL
+const LOGIN_BASE_URL = "http://123.207.32.32:3000"
class HidariRequest {
+  // 外界传进来一个 baseUrl
+  constructor(baseURL) {
+    this.baseURL = baseURL
+  }
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
-        url: BASE_URL + url,
+        url: this.baseURL + url,
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

-const hidariRequest = new HidariRequest()
+const hidariRequest = new HidariRequest(BASE_URL)

+const hidariLoginRequest = new HidariRequest(LOGIN_BASE_URL)

export default hidariRequest
+export {
+  hidariLoginRequest
+}
```
`service\api_login.js`
```js
/**
 * 封装登录api
 */

import {
  hidariLoginRequest
} from './index'

/**
 * 获取 code
 */
export const getLoginCode = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 1000,
      success: res => {
        // code
        const code = res.code
        console.log(code)
        resolve(code)
      },
      fail: reject
    })
  })
}

/**
 * code 发送给服务器
 * @param {String} code 唯一标识（令牌）
 */
export const codeToToken = (code) => {
  // 注意要 return 否则返回的是 undefined
  return hidariLoginRequest.post('/login', {
    code
  })
}
```
2. 设置常量
`constants\login-const.js`
```js
/**
 * 登陆相关常量
 */
export const TOKEN_KEY = "token_key"
```
3. 登陆实现
```js
  /**
   * 登录
   */
  async loginAction() {
    // 获取 code
    const code = await getLoginCode()
    // code 发送给服务器
    const {
      token
    } = await codeToToken(code)
    // token 保存在 weapp 的 storage 中
    wx.setStorageSync(TOKEN_KEY, token)
  }
```
`app.js`
```diff
  // 程序启动生命周期
  onLaunch() {
    // 设置设备信息
    const info = wx.getSystemInfoSync()
    // 获取屏幕宽高
    this.globalData.screenWidth = info.screenWidth
    this.globalData.screenHeight = info.screenHeight
    // 获取状态栏高度
    this.globalData.statusBarHeight = info.statusBarHeight
    // 计算高宽比
    const ratio = info.screenHeight / info.screenWidth
    this.globalData.deviceRatio = ratio

+    // 用户默认进行登录
+    this.loginAction()
  },
```

### 判断token和session是否过期
`app.js`
```js
    // 用户默认进行登录
    const token = wx.getStorageSync(TOKEN_KEY)
    // token 是否过期
    const checkRes = await checkToken(token)
    // 判断 session 是否过期
    const isSessionExpire = await checkSession()
    if (!token || checkRes.errorCode || !isSessionExpire) {
      this.loginAction()
    }
```
`service\api_login.js`
```js
/**
 * 检查 token 是否过期
 * @param {String} token 服务器返回的 token
 */
export const checkToken = (token) => {
  return hidariLoginRequest.post('/auth', {}, {
    token
  })
}

/**
 * 判断 session 是否过期
 * 过期 => false
 * 未过期 => true
 */
export const checkSession = () => {
  return new Promise((resolve) => {
    wx.checkSession({
      success: () => {
        resolve(true)
      },
      fail: () => {
        resolve(false)
      }
    })
  })
}
```

### 封装 header

> 设定isAuth判断是否需要认证，默认为 false，如果是true，需要传token
> 设置默认 token，为 true 时添加

- 更改`service\index.js`
```diff
/**
 * 封装 wx.request({}) 请求
 */
+import {
+  TOKEN_KEY
+} from '../constants/login-const'
+const token = wx.getStorageSync(TOKEN_KEY)
// base_url 常量
const BASE_URL = 'http://123.207.32.32:9001'
// 登录的 base_URL
const LOGIN_BASE_URL = "http://123.207.32.32:3000"
class HidariRequest {
  // 外界传进来一个 baseUrl
-  constructor(baseURL) {
+  constructor(baseURL, authHEADER = {}) {
    this.baseURL = baseURL
+    this.authHEADER = authHEADER
  }
  /**
   * 封装 wx.request({})请求方法
   * @param {String} url 请求地址
   * @param {String} method 请求方法
   * @param {Object} params 请求参数
   * @param {*} isAuth 是否需要授权 默认 false
   * @param {*} header 请求头 默认为空对象
   */
-  request(url, method, params, header = {}) {   
+  request(url, method, params, isAuth = false, header = {}) {
+    // 获取最终 header，如果需要授权，把header和传进来的header放到同一个数组中
+    const finalHeader = isAuth ? {
+      ...this.authHEADER,
+      ...header
+    } : header
    // 通过 promise 返回拿到结果
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseURL + url,
        method: method,
        data: params,
+        header: finalHeader,
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
   * @param {*} isAuth 是否需要授权 默认 false
   * @param {*} header 请求头 默认为空对象
   */
-  get(url, params, header) {
-    return this.request(url, 'GET', params, header)
+  get(url, params, isAuth = false, header) {
+    return this.request(url, 'GET', params, isAuth, header)
  }

  /**
   * 封装 post 请求
   * @param {String} url 请求地址
   * @param {String} params 请求参数
   * @param {*} isAuth 是否需要授权 默认 false
   * @param {*} header 请求头 默认为空对象
   */
-  post(url, params, header) {
-    return this.request(url, 'POST', params, header)
+  post(url, params, isAuth = false, header) {
+    return this.request(url, 'POST', params, isAuth, header)
  }
}
// 其他request
const hidariRequest = new HidariRequest(BASE_URL)
// 登录相关request
-const hidariLoginRequest = new HidariRequest(LOGIN_BASE_URL)
+const hidariLoginRequest = new HidariRequest(LOGIN_BASE_URL, {
+  token
+})

export default hidariRequest
export {
  hidariLoginRequest
}
```
- 改造封装的接口`service\api_login.js`
```js
/**
 * 检查 token 是否过期
 * @param {String} token 服务器返回的 token => 封装后不需要再传
 */
export const checkToken = () => {
  /**
   * {} => 参数
   * true => 需要包含请求头
   */
  return hidariLoginRequest.post('/auth', {}, true)
}
```

### 获取用户信息

- 新添加页面`pages\home-profile`
```html
<!--pages/home-profile/index.wxml-->
<!-- open-type="getUserInfo" 表示 button 用来获取用户信息 -->
<button open-type="getUserInfo" bindtap="handleGetUserInfo">获取用户信息</button>
<!-- open-type="getPhoneNumber" 表示 button 用来获取用户手机号 -->
<button open-type="getPhoneNumber" bindgetphonenumber="handleGetPhoneNumber">获取用户手机号</button>
```
- 添加 navbar
`app.json`
```diff
    "list": [{
        "pagePath": "pages/home-music/index",
        "text": "音乐",
        "iconPath": "assets/images/tabbar/music_normal.png",
        "selectedIconPath": "assets/images/tabbar/music_active.png"
      },
      {
        "pagePath": "pages/home-video/index",
        "text": "视频",
        "iconPath": "assets/images/tabbar/video_normal.png",
        "selectedIconPath": "assets/images/tabbar/video_active.png"
      },
+      {
+        "pagePath": "pages/home-profile/index",
+        "text": "我的",
+        "iconPath": "assets/images/tabbar/profile_normal.png",
+        "selectedIconPath": "assets/images/tabbar/profile_active.png"
+      }
    ]
```
- 封装 api
```js
/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: 'hello hidari!',
      success: res => {
        console.log(res)
        resolve(res)
      },
      fail: reject
    })
  })
}
```
- 编写逻辑
`pages\home-profile\index.js`
```js
  /**
   * 获取用户信息
   */
  async handleGetUserInfo() {
    const res = await getUserInfo()
  }
```

#### openid 和 unionid
1. `openid` => 用户在小程序中多次登录，甚至换手机后也不变，是身份唯一标识
2. `unionid` => 作为在微信多个平台进行授权时，相同的 id

#### 获取用户手机号
1. 为什么要获取用户手机号 => 用户身份多平台共享
  - 只有企业可以获取

2. `pages\home-profile\index.js`
```js
  /**
   * 获取手机号码
   */
  async handleGetPhoneNumber(event) {
    console.log(event)
    // getPhoneNumber:fail no permission
  }
```
```html
<!-- open-type="getPhoneNumber" 表示 button 用来获取用户手机号 -->
<button open-type="getPhoneNumber" bindgetphonenumber="handleGetPhoneNumber" style="position: fixed; bottom: 0; right: 0;">获取用户手机号</button>
```