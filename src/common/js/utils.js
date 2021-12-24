export const getLocal = (name) => {
  return localStorage.getItem(name)
}

export const setLocal = (name, value) => {
  localStorage.setItem(name, value)
}
export const formatW = (num) => {
  if (num >= 100000000) {
    num = Math.round(num / 10000000) / 10 + '亿'
  } else if (num >= 10000) {
    num = Math.round(num / 1000) / 10 + '万'
  }
  return num
}
