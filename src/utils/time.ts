//封装一个函数获取一个结果：当前早上|上午|下午|晚上
export const getTime = () => {
  let message = ''
  const time = new Date().getHours()
  if (time <= 9) {
    message = '早上'
  } else if (time <= 12) {
    message = '上午'
  } else if (time <= 17) {
    message = '下午'
  } else {
    message = '晚上'
  }
  return message
}
