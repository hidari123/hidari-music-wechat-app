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

    // 获取时间
    const timeResult = timeRegExp.exec(lineString)
    // 如果没有获取到时间 continue 跳过本次循环 执行下一次
    if (!timeResult) continue;
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