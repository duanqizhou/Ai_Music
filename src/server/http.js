// 封装 axios
import { Toast } from 'vant'
import axios from 'axios'
const config = Symbol('config')
const isCompleteURL = Symbol('isCompleteURL')

export class Http {
  [config] = {
    baseURL: process.env.VUE_APP_BASE_API,
    headers: {
      'content-type': 'application/json'
    },
    method: 'GET',
    dataType: 'json'
  };

  constructor (options = {}) {
    for (const key in this[config]) {
      if (Object.hasOwnProperty.call(this[config], key)) {
        if (
          Object.prototype.toString.call(this[config][key]) ===
          '[object String]'
        ) {
          options[key] && (this[config][key] = options[key])
        } else if (
          Object.prototype.toString.call(this[config][key]) ===
          '[object Object]'
        ) {
          options[key] && Object.assign(this[config][key], options[key])
        }
      }
    }

    // Object.assign(this[config].headers, headers);
  }

  static [isCompleteURL] (url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  interceptors (instance) {
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading..
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
          duration: 0
        })
        return config
      },
      (error) => {
        Toast.fail(error)
        return Promise.reject(error)
      }
    )

    instance.interceptors.response.use(
      (res) => {
        Toast.clear()
        if (res.data) {
          return res.data
        }
        return res
      },
      (error) => {
        Toast.fail(error.toString())
        return Promise.reject(error)
      }
    )
  }

  request (options) {
    const instance = axios.create()
    options = Object.assign({}, this[config], options)
    this.interceptors(instance)
    return instance(options)
  }

  post (url, data) {
    return this.request({
      baseURL: this[config].baseURL + (url || ''),
      method: 'post',
      data: JSON.stringify(data)
    })
  }

  get (url) {
    return this.request({
      baseURL: this[config].baseURL + (url || ''),
      method: 'GET'
    })
  }
}
