const GetChatMsg = 'GetChatMsg'

export default {
  [GetChatMsg]: (state) => (sign) => {
    return state.chatUser.find(user => user.Sign === sign)
  }
}
