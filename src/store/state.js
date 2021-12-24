import { sessionData } from '../utils/util.js'
export default {
  userInfo: sessionData('get', 'userInfo'),
  msgs: [
    {
      msg: '我昨天原创了一首快来感受下吧！',
      avatar: 'test.png',
      time: '',
      timestamp: '',
      isSelf: false
    },
    {
      msg: '我昨天原创了一首快来感受下吧！',
      avatar: 'test.png',
      time: '',
      timestamp: '',
      isSelf: true
    }
  ],
  chatUser: [
    {
      Avatar: 'assets/comment-icon.png',
      actName: '周段琦',
      Sign: Symbol(Math.random * 100),
      Time: '今天10：00',
      msgs: [
        {
          msg: '我昨天原创了一首快来感受下吧！',
          avatar: 'test.png',
          time: '',
          timestamp: '',
          isSelf: false
        },
        {
          msg: '我昨天原创了一首快来感受下吧！',
          avatar: 'test.png',
          time: '',
          timestamp: '',
          isSelf: true
        }
      ],
      Msg: function () {
        return this.msgs[this.msgs.length - 1]?.msg
      }
    },
    {
      Avatar: 'assets/friend.png',
      actName: '付永雪',
      Sign: Symbol(Math.random * 100),
      Time: '今天09：00',
      msgs: [
        {
          msg: '这几天吴亦凡翻车了',
          avatar: 'test.png',
          time: '',
          timestamp: '',
          isSelf: false
        }
      ],
      Msg: function () {
        return this.msgs[this.msgs.length - 1]?.msg
      }
    },
    {
      Avatar: 'assets/test.png',
      actName: '周段琦001',
      Sign: Symbol(Math.random * 100),
      Time: '今天08：00',
      msgs: [],
      Msg: function () {
        return this.msgs[this.msgs.length - 1]?.msg
      }
    }
  ],
  music: [
    {
      sign: Symbol(Math.random()),
      name: '我的天空',
      artist: '电影《青春派》主题曲',
      source: 'http://96.ierge.cn/10/151/303606.mp3',
      favorited: false
    }
  ]
}
