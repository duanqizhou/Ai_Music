import { Toast } from 'vant'
import { _login, _refreshLogin, logout, _getUserUid } from '@/server/apis'
export default {
  async loginUser (ctx, info) {
    const data = await _login(info.account, info.password)
    if (data.code !== 200) {
      Toast.fail({
        duration: 1000,
        forbidClick: true,
        message: data.message
      })
      setTimeout(async () => {
        await _refreshLogin()
      }, 1000)
      return false
    } else {
      const { level, createDays, profile } = await _getUserUid(data.account.id)
      ctx.commit('SetUserInfo', {
        userInfo: Object.assign({}, { level, createDays }, profile, data)
      })
      return true
    }
  },
  async logoutUser (ctx) {
    const { code: isOut } = await logout()
    if (isOut !== 200) {
      Toast.fail({
        duration: 1000,
        forbidClick: true,
        message: '退出失败！请检查网络'
      })
      return false
    } else {
      ctx.commit('ClearUserInfo')
      return true
    }
  }
}
