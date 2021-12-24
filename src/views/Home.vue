<template>
  <div>
    <van-search
      v-model="searchKey"
      shape="round"
      background="#fafafa"
      placeholder="搜索你想听的歌"
      @focus="focusSearch"
    >
      <template #left>
        <van-icon size="0.44rem" @click="leftSearch" name="arrow-left" />
      </template>
    </van-search>
    <div v-if="search" class="wrap">
      <h3>搜索发现</h3>
      <div class="search-wrap">
        <template v-if="searchSuggestList && searchSuggestList.length > 0">
          <span
            v-for="(suggest, index) in searchSuggestList"
            :key="index"
            @click="chooseSuggest(suggest)"
            >{{ suggest.keyword }}</span
          >
        </template>
        <template v-else>
          <span>周杰伦</span>
          <span>陈奕迅</span>
          <span>隔壁老樊</span>
          <span>团团</span>
        </template>
      </div>

      <h3>搜索历史</h3>
      <div class="search-wrap">
        <span>半岛铁盒</span>
        <span>以父之名</span>
        <span>夜的第七章</span>
        <span>ye</span>
        <span>奔赴星空</span>
      </div>

      <h3>热搜发现</h3>
      <div class="search-wrap">
        <div class="hot-search" v-for="(item, index) in test" :key="index">
          <em class="hot-no" :class="{ top: item.no <= 3 }">{{ item.no }}</em>
          <div class="flex flex-col flex-around">
            <span class="hot-name">{{ item.title }}</span>
            <i>{{ item.content }}</i>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="wrap">
      <h3>Hi,来听首歌吧</h3>
      <van-swipe class="my-swipe" :autoplay="3000" :show-indicators="false">
        <div v-for="(banner, index) in Banners" :key="index">
          <van-swipe-item>
            <van-image fit="cover" :src="banner?.pic" width="100%" height="4rem"
          /></van-swipe-item>
        </div>
      </van-swipe>
      <van-grid :column-num="5">
        <van-grid-item
          v-for="(item, index) in grid5"
          :key="index"
          @click="toPath(item.path)"
        >
          <van-image
            :src="require('@/' + item.icon)"
            width="30px"
            height="32px"
          />
          <span class="mt8 omit">{{ item.text }}</span>
        </van-grid-item>
      </van-grid>
      <van-cell title="每日推荐" is-link value="更多" />
      <van-grid :column-num="3">
        <van-grid-item
          v-for="(daySong, index) in DaySongs"
          :key="index"
          @click="_MRTJHandle(daySong.id)"
        >
          <van-image radius="8" :src="daySong.picUrl" />
          <p class="mt8 omit">{{ daySong.name }}</p>
        </van-grid-item>
      </van-grid>
      <van-cell title="相遇房间" is-link value="更多" />
      <template v-for="(daySong, index) in DaySongs">
        <div v-if="index % 2" class="meet-wrap" :key="index">
          <van-row>
            <van-col span="16" class="span16">
              <h5>精选宝藏网络歌曲</h5>
              <p>{{ daySong.name }}</p>
              <p>{{ getRandom() }}人等你一起听</p>
            </van-col>
            <van-col span="8">
              <van-image radius="8" fit="cover" :src="daySong.picUrl" />
            </van-col>
          </van-row>
        </div>
      </template>

      <van-cell title="MV专区" is-link value="更多" />
      <div class="mv-wrap">
        <van-image
          fit="cover"
          width="100%"
          :src="require('@/' + 'assets/mv.png')"
        />
      </div>
    </div>

    <navBar></navBar>
  </div>
</template>

<script>
import { ref, defineAsyncComponent, onMounted, computed, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import { Toast } from 'vant'
import { debounce } from '@/utils/util'
import { searchLib } from '@/composition/addSearchResultLib'
import {
  _getBanner,
  _getDaySong,
  _searchSuggest,
  _searchKeywords,
  _playlistDetail,
  _playlistDetailDynamic
} from '@/server/apis'
const navBar = defineAsyncComponent(() => import('@/components/NavBar'))
export default {
  name: 'home',
  components: {
    navBar
  },
  setup () {
    const searchKey = ref('')
    const search = ref(false)
    const router = useRouter()
    const searchSuggestList = ref([])
    const _ = inject('_')

    const { clearResetLib, setSK } = searchLib()
    const grid5 = [
      {
        icon: 'assets/singer.png',
        text: '歌手',
        path: 'singer'
      },
      {
        icon: 'assets/Rank.png',
        text: '排行',
        path: 'rank'
      },
      {
        icon: 'assets/classify.png',
        text: '分类歌单',
        path: 'classify'
      },
      {
        icon: 'assets/love.png',
        text: '音乐电台',
        path: 'anchor'
      },
      {
        icon: 'assets/live.png',
        text: '直播',
        path: 'live'
      }
    ]
    const test = [
      {
        no: 1,
        title: '不该用情',
        content: '伤感还要数粤语强'
      },
      {
        no: 2,
        title: '不该用情',
        content: '伤感还要数粤语强'
      },
      {
        no: 3,
        title: '不该用情',
        content: '伤感还要数粤语强'
      },
      {
        no: 4,
        title: '不该用情',
        content: '伤感还要数粤语强'
      },
      {
        no: 5,
        title: '不该用情',
        content: '伤感还要数粤语强'
      },
      {
        no: 6,
        title: '不该用情',
        content: '伤感还要数粤语强'
      },
      {
        no: 7,
        title: '不该用情',
        content: '伤感还要数粤语强'
      }
    ]
    const focusSearch = () => {
      search.value = true
    }
    const leftSearch = () => {
      if (search.value) search.value = false
      else Toast('无法再返回啦~')
    }
    const toPath = (path) => {
      if (path) {
        router.push(path)
      }
    }

    const getRandom = () => {
      return (Math.random() * 100).toFixed(1)
    }

    const chooseSuggest = async (suggest) => {
      if (suggest) {
        const {
          code,
          result: { songs }
        } = await _searchKeywords(suggest.keyword)
        if (code === 200 && songs.length > 0) {
          clearResetLib(songs, 'searchDetail')
          setSK(suggest.keyword)
        }
      }
    }
    function fillSong (t) {
      t.artists = t.ar
      t.duration = t.dt
      return t
    }
    const _MRTJHandle = async (id) => {
      const { playlist } = await _playlistDetail(id)
      if (playlist) {
        clearResetLib(
          _.map(playlist.tracks, fillSong),
          'searchDetail'
        )
        setSK(playlist.name)
      } else {
        Toast('歌单错误~')
      }
    }
    const Banners = ref([])
    const DaySongs = ref([])
    onMounted(async () => {
      const bannersR = await _getBanner()
      if (bannersR.code === 200) {
        Banners.value = bannersR.banners
      }
      const daySongR = await _getDaySong()
      if (daySongR.code === 200) {
        DaySongs.value = daySongR.recommend
      }
    })

    watch(searchKey, function (nv, ov) {
      debounce(async () => {
        if (nv) {
          const { code, result } = await _searchSuggest(nv)
          if (code === 200) {
            searchSuggestList.value = result?.allMatch ?? []
          }
        }
      }, 1000)
    })

    return {
      searchKey,
      grid5,
      search,
      focusSearch,
      leftSearch,
      test,
      toPath,
      Banners,
      DaySongs,
      getRandom,
      searchSuggestList,
      chooseSuggest,
      _MRTJHandle
    }
  }
}
</script>

<style lang="less" scoped>
@import url("@/common/style/mix.less");
.mt8 {
  margin-top: 8px;
  font-size: 12px;
  color: rgba(51, 51, 51, 1);
}
.wrap {
  padding: 0 12px;
  overflow: hidden;
  background: #fafafa;
  .search-wrap {
    display: flex;
    flex-wrap: wrap;
    margin-top: 6px;
    width: 100vw;
    span:not([class^="hot-"]) {
      padding: 5px 10px;
      background: #e7e8eb;
      border-radius: 10px;
      margin-bottom: 12px;
      margin-right: 14px;
    }
    .hot-search {
      display: flex;
      width: calc(100% / 2);
      height: 60px;
      line-height: 60px;
      margin-bottom: 30px;
      .flex {
        line-height: 1;
      }
      .hot-no {
        margin-right: 16px;
        font-size: 20px !important;
        &.top {
          color: #ff4d4d;
        }
      }
    }
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    text-align: center;
    background-color: #fafafa;
    border-radius: 10px;
  }
  .meet-wrap {
    width: 100%;
    height: 116px;
    border-radius: 10px;
    background: #fff;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;
    .span16 {
      .flex-col-bet(space-around);
      h5 {
        font-size: 15px;
      }
      p {
        .sc(13px, #9898ac);
      }
    }
  }
  .mv-wrap {
    width: 100%;
    height: 193px;
    background: @white;
    border-radius: 10px;
    margin-bottom: 20px;
  }
}
:deep(.van-grid-item) {
  div[class*="van-hairline"]::after {
    content: "";
    border: 0px solid #fafafa !important;
  }
  .van-grid-item__content {
    background: #fafafa;
  }
}
</style>
