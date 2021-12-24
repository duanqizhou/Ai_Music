<template>
  <div>
    <van-nav-bar
      title="分类歌单"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>
    <div class="wrap">
      <div class="fullw flex-wrap">
        <cuSing
          class="mb10 mr5"
          width="2.85333rem"
          height="2.85333rem"
          v-for="item in lists"
          :key="item.createTime"
          :img="item.coverImgUrl"
          :title="item.name"
          :playCount="formatW(item.playCount)"
          :info="item"
          @emitCuSing="emitCuSingH"
        ></cuSing>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { defineAsyncComponent, inject, onMounted, ref } from 'vue'
import { _playlistCatlist, _playlistDetail } from '@/server/apis'
import { formatW } from '@/common/js/utils'
import { Toast } from 'vant'
import { searchLib } from '@/composition/addSearchResultLib'

const cuSing = defineAsyncComponent(() => import('@/components/CuSing'))
export default {
  components: {
    cuSing
  },
  setup () {
    const router = useRouter()
    const onClickLeft = () => router.back()
    const onClickRight = () => {}
    const lists = ref([])
    const { clearResetLib, setSK } = searchLib()
    const _ = inject('_')
    function fillSong (t) {
      t.artists = t.ar
      t.duration = t.dt
      return t
    }
    const emitCuSingH = async (info) => {
      if (info) {
        const { playlist } = await _playlistDetail(info.id)
        clearResetLib(
          _.map(playlist.tracks, fillSong),
          'searchDetail'
        )
        setSK(playlist.name)
      } else {
        Toast('歌单错误~')
      }
    }
    onMounted(async () => {
      const playlistCatlist = await _playlistCatlist()
      if (playlistCatlist.code === 200) {
        if (Array.isArray(playlistCatlist.playlists)) {
          lists.value = playlistCatlist.playlists
        }
      }
    })
    return {
      onClickLeft,
      onClickRight,
      lists,
      formatW,
      emitCuSingH
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  padding: 0 16px;
  box-sizing: border-box;
  width: 100vw;
}
ul.c-row {
  justify-content: space-between;
  li {
    font-size: 14px;
    padding: 4px 12px;
    color: #9898ac;
    &.active {
      background: #e3e3e4;
      color: #333;
      border-radius: 50px;
    }
  }
}
</style>
