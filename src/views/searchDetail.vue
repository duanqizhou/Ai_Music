<template>
  <div class="searchDetailContainer">
    <p class="text-center wf600 NANE">A SEVEN ALBUM</p>
    <p class="mt30  text-center wf600 fz-24 bg-black white keyword">{{getSK() || '_SK'}}</p>

    <div class="fullw flex-bet result-wrap">
      <div class="item" v-for="(item,index) in lib" :key="index" @click="addSong(item)">
        <p>{{formatTime(item.duration)}}</p>
        <p>{{item.name}}</p>
        <p>{{item.artists[0].name || '_SP'}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { searchLib } from '@/composition/addSearchResultLib'
import { ref, onActivated, onMounted, reactive } from 'vue'
import { formatTime } from '@/utils/util'
import { _checkMusic, _getMusicUrl, _lyricWord, _getDaySongS } from '../server/apis'
import { useRoute, useRouter } from 'vue-router'
import { Toast } from 'vant'
import { useStore } from 'vuex'

// import { addSong } from '@/utils/optionS'

export default {
  name: 'searchDetail',
  setup () {
    const lib = ref([])
    const router = useRouter()
    const route = useRoute()
    const store = useStore()
    const { getLib, getSK } = searchLib()
    const addSong = async (song) => {
      const addSong = {
        sign: Symbol(Math.random()),
        favorited: false
      }
      if (song) {
        Object.assign(addSong, {
          pic: song.artists[0].img1v1Url,
          name: song.name,
          artist: song.artists[0].name
        })
        const iCanUser = await _checkMusic(song.id)
        if (iCanUser.success) {
          const getSongUrl = await _getMusicUrl(song.id)
          const getSongLyric = await _lyricWord(song.id)
          if (getSongLyric.code === 200) {
            const lyricT = getSongLyric?.lrc?.lyric
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
            router.replace('play')
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

    onMounted(() => {
      lib.value = getLib()
    })
    onActivated(() => {
      lib.value = getLib()
    })
    return {
      lib,
      formatTime,
      addSong,
      getSK
    }
  }
}
</script>

<style lang="less" scope="this api replaced by slot-scope in 2.5.0+">
.searchDetailContainer {
  box-sizing: border-box;
  padding: 30px;
  .NANE {
    padding: 7px;
    border: 2px solid white;
    border-image: linear-gradient(
        rgba(255, 255, 255, 0.95),
        rgba(0, 0, 0, 0.32)
      )
      30;
  }
  .keyword {
    padding: 6px 0;
    letter-spacing: 2px;
    margin-bottom: 40px;
  }
  .result-wrap {
    flex-wrap: wrap;
    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      flex-basis: 50%;
      margin-bottom: 50px;
      p {
        width: 80%;
        text-align: center;
        &:nth-of-type(1) {
          border-bottom: 4px solid black;
          margin-bottom: 10px;
        }
        &:nth-of-type(2) {
          font-size: 16px;
          font-weight: 600;
        }
        &:nth-of-type(3) {
          font-size: 14px;
          margin-top: 6px;
        }
      }
    }
  }
}
</style>
