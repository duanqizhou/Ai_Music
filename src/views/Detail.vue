<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
    ></van-nav-bar>
    <div class="bg">
      {{ title }}
    </div>

    <div class="wrap">
      <template v-if="list.length > 0">
        <div
          class="item flex-c-c flex-bet fullw"
          v-for="(song, index) in list"
          :key="index"
          @click="addSong(song)"
        >
          <div class="flex-c-c">
            <em class="fz26" :class="{ red: index <= 2 }">0{{ index + 1 }}</em>
            <div class="flex-col-around ml10">
              <p class="fz23">{{ song.name }}</p>
              <span>{{ song.ar[0].name }}</span>
            </div>
          </div>
          <span>{{ song.mst }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { ref, reactive, onActivated, inject } from 'vue'
import { Toast } from 'vant'
import {
  _checkMusic,
  _getMusicUrl,
  _lyricWord,
  _getDaySongS,
  _songComment,
  _playlistDetail
} from '../server/apis'
// import { addSong } from '@/utils/optionS'
export default {
  props: ['id'],

  // setup中 不能使用 async setup(){}
  setup (props, context) {
    const router = useRouter()
    const route = useRoute()
    const title = ref('热歌榜')
    const store = useStore()
    const _ = inject('_')
    const list = ref([])
    const onClickLeft = () => router.back()
    const formatNo = (index) => ('0' + index).slice(-2)
    const addSong = async (song) => {
      const addSong = {
        sign: Symbol(Date.now()),
        favorited: false
      }
      if (song) {
        Object.assign(addSong, {
          pic: song.al.picUrl,
          name: song.al.name,
          artist: song.ar[0].name,
          id: song.id
        })
        const iCanUser = await _checkMusic(song.id)
        if (iCanUser.success) {
          const getSongUrl = await _getMusicUrl(song.id)
          const getSongLyric = await _lyricWord(song.id)
          const getComment = await _songComment(song.id)
          let commentList = []
          if (getComment.code === 200) {
            if (getComment?.comments?.length > 0) {
              commentList = getComment.comments
            }
          }
          Object.assign(addSong, { commentList })
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
            router.push('/play')
          } else {
            Toast.fail('获取歌曲code失败')
          }
        } else {
          Toast.fail(iCanUser.message)
        }
      } else {
        Toast('获取歌曲失败，暂无权限')
      }
    }
    // 漂亮的hook
    let _id = null
    onActivated(async () => {
      const { id } = props
      if (_id === id) return
      list.value = []
      try {
        if (id === 'define') {
          const { data, code, msg } = await _getDaySongS()
          if (code === 200) {
            list.value = data.dailySongs
            if (data.recommendReasons.length > 0) {
              title.value = data.recommendReasons[0].reason
            }
          } else {
            Toast.fail(msg)
          }
        } else {
          if (_.isNaN(id) || _.isEmpty(id)) {
            throw new Error('ID is NaN or Empty')
          } else {
            const res = await _playlistDetail(id)
            if (res.code === 200) {
              const { playlist } = res
              title.value = `${playlist.name}  (${playlist.ToplistType})`
              list.value = playlist.tracks
            } else {
              Toast('状态码返回错误')
            }
          }
        }
        _id = id
      } catch (error) {
        Toast.fail('接口返回错误')
      }
    })

    return {
      onClickLeft,
      formatNo,
      title,
      list,
      addSong
    }
  }
}
</script>

<style lang="less" scope>
.bg {
  font-size: 32px;
  color: white;
  font-weight: 600;
  letter-spacing: 2px;
  text-align: center;
  width: 100vw;
  line-height: 180px;
  background-image: linear-gradient(#f0ff00, #58cffb);
}
.ml10 {
  margin-left: 14px;
}
.wrap {
  width: 100vw;
  padding: 2px 16px;
  box-sizing: border-box;

  .item {
    margin: 18px 0;
    border-bottom: 0.5px solid #eee;
  }
  .fz23 {
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 8px;
  }
  .fz26 {
    font-size: 26px;
  }
}
</style>
