import Moment from 'moment'
import _, { isEmpty } from 'lodash'

const localData = function (method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:localStorage的名称
   * obj:存入的内容，可以是任意类型
   * localStorage.getItem(key):获取指定key本地存储的值
   * localStorage.setItem(key,value)：将value存储到key字段
   * localStorage.removeItem(key):删除指定key本地存储的值
   * */

  switch (method) {
    case 'get':
      if (localStorage.getItem(name + '_obj')) {
        return JSON.parse(localStorage.getItem(name + '_obj'))
      } else if (localStorage.getItem(name + '_str')) {
        return localStorage.getItem(name + '_str')
      } else {
        return null
      }
    case 'set':
      localData('clean', name)
      if (typeof obj === 'object') {
        localStorage.setItem(name + '_obj', JSON.stringify(obj))
      } else {
        localStorage.setItem(name + '_str', obj)
      }
      return true
    case 'clean':
      localStorage.removeItem(name + '_obj')
      localStorage.removeItem(name + '_str')
      return true
  }
}

// session操作
const sessionData = function (method, name, obj) {
  /*
   * 参数说明：
   * method：get获取，set存入或覆盖，clean清除
   * name:session的名称
   * obj:存入的内容，可以是任意类型
   * */
  switch (method) {
    case 'get':
      if (sessionStorage.getItem(name + '_obj')) {
        return JSON.parse(sessionStorage.getItem(name + '_obj'))
      } else if (sessionStorage.getItem(name + '_str')) {
        return sessionStorage.getItem(name + '_str')
      } else {
        return null
      }
    case 'set':
      sessionData('clean', name)
      if (typeof obj === 'object') {
        sessionStorage.setItem(name + '_obj', JSON.stringify(obj))
      } else {
        sessionStorage.setItem(name + '_str', obj)
      }
      return true
    case 'clean':
      sessionStorage.removeItem(name + '_obj')
      sessionStorage.removeItem(name + '_str')
      return true
  }
}

const formatNumber = function (num) {
  num = Number(num)
  if (num === 0) {
    return num + ''
  } else if (num > 1 && num < 10000) {
    return num + ''
  } else {
    return (num / 10000).toFixed(2) + '万'
  }
}

const formatTime = function (num) {
  num = Number(num)
  if (num === 0) return '--:--'
  return Moment(num).format('mm:ss')
}

const debounce = (function () {
  let timeId = null
  return function (fn, time) {
    if (timeId) {
      clearInterval(timeId)
    }
    timeId = setTimeout(() => fn(), time)
  }
})()

const msgFactory = function (msgLists) {
  const newmsg = _.map(msgLists, function (_m) {
    if (!_m.Avatar) {
      if (_m?.user?.avatarUrl) {
        _m.Avatar = _m?.user?.avatarUrl
      }
    }
    if (!_m.Sign) {
      if (_m?.id) {
        _m.Sign = Symbol(_m?.id)
      }
    }
    if (!_m.Time) {
      if (_m?.showTime || _m?.eventTime) {
        _m.Time = _m?.showTime ?? _m?.eventTime
      }
    }
    if (_m.json) {
      const _msg = JSON.parse(_m.json)
      if (!_m.msgs) _m.msgs = []
      if (!_.isEmpty(_msg)) {
        if (_.isArray(_msg)) {
          _m.msgs = _.concat(_m.msgs, _msg)
        } else if (_.isObject(_msg)) {
          _m.msgs.push(_msg)
        }
      }
    }
    return _m
  })
  console.log('%c msgLists', 'font-size:13px; background:pink; color:#bf2c9f;', newmsg)
}
export { localData, sessionData, formatNumber, debounce, formatTime, msgFactory }
