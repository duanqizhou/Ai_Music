import { sessionData } from '../utils/util'
import { Toast } from 'vant'

const SetUserInfo = 'SetUserInfo'
const ClearUserInfo = 'ClearUserInfo'
const SetMsg = 'SetMsg'
const AddSong = 'AddSong'

export default {
  [SetUserInfo] (state, payload) {
    state.userInfo = payload.userInfo
    sessionData('set', 'userInfo', payload.userInfo)
    return true
  },
  [ClearUserInfo] (state) {
    state.userInfo = {}
    sessionData('clean', 'userInfo')
    Toast.success('退出成功')
    return true
  },
  [SetMsg] (state, payload) {
    if (payload.sign) {
      const user = state.chatUser.find(user => user.Sign === payload.sign)
      user.msgs.push(payload._msg)
    }
  },

  [AddSong] (state, payload) {
    if (!Array.isArray(payload.music)) {
      Toast.fail('提交音乐格式错误,接受Array')
      return
    }
    if (payload.reset) {
      state.music = payload.music
      return true
    } else {
      state.music = payload.music.concat(state.music)
      console.log('[ state.music ]', state.music)
      return true
    }
  }

}
