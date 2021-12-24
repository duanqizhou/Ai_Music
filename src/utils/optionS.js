import { _checkMusic, _getMusicUrl, _lyricWord } from '../server/apis'
import { Toast } from 'vant'
import { ref, reactive, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
// 我他妈的真是个人才 useStore 只能在setup 中使用导出以后vue 做绑定的时候需要闭包来保存store 否则会找不到
const setup = () => {
  let store = useStore()
  let router = useRouter()
  const ss = 9478
  const _pure = async (song, flag = null) => {
    store = store || useStore()
    router = router || useRouter()
    const addSong = {
      sign: Symbol(Math.random()),
      favorited: false
    }
    if (song) {
      Object.assign(addSong, {
        pic: song?.al?.picUrl ?? '',
        name: song?.al?.name ?? '',
        artist: song?.ar && song?.ar[0]?.name
      })
      const iCanUser = await _checkMusic(song.id)
      if (iCanUser.success) {
        const getSongUrl = await _getMusicUrl(song.id)
        const getSongLyric = await _lyricWord(song.id)
        if (getSongLyric.code === 200) {
          const lyricT = getSongLyric?.lrc?.lyric
          // let allTime = lyricT.match(/\[[\d\D]+?\]/g);
          // console.log("[ lyricT ]", typeof lyricT);
          // let lyricArr = lyricT
          //   .replaceAll(/\[[\d\D]+?\]/g, "???")
          //   .split("???");
          // lyricArr = lyricArr.filter((f) => f.trim() && f);
          // console.log("[ lyricArr ]", allTime, lyricArr);
          Object.assign(addSong, { lyricT })
        } else {
          Toast.fail(getSongLyric.msg)
        }
        if (getSongUrl.code === 200) {
          const realSongArr = getSongUrl.data[0]
          const flag =
          realSongArr &&
          Object.assign(addSong, { source: realSongArr.url }) &&
          store.commit('AddSong', {
            music: [reactive(addSong)]
          })
          router.push('play')
        } else {
          Toast.fail('获取歌曲code失败')
        }
      } else {
        Toast.fail(iCanUser.message)
      }
    } else {
      if (flag === null) return
      Toast('获取歌曲失败，暂无权限')
    }
  }
  return _pure
}
const addSong = setup()
export { addSong }
