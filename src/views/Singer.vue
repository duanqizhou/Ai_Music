<template>
  <div>
    <van-config-provider :theme-vars="singerThemeVars">
      <van-nav-bar
        title="歌手"
        right-text="按钮"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      >
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
      <van-tabs :active="activeName1" @change="onClickTab1" class="mb10">
        <template v-for="(ar, index) in activeArea" >
          <van-tab :title="ar.title" :name="ar.name" :key="index"></van-tab>
        </template>
      </van-tabs>

      <van-tabs :active="activeName2" @change="onClickTab2" class="mb10">
        <template v-for="(as, index) in activeSex" >
          <van-tab :title="as.title" :name="as.name" :key="index"></van-tab>
        </template>
      </van-tabs>

      <van-tabs :active="activeName3" @change="onClickTab3" class="mb10">
        <template v-for="(an, index) in activeName">
          <van-tab :title="an" :name="an" :key="index"></van-tab>
        </template>
      </van-tabs>

      <div class="wrap">
        <h3>热门歌手</h3>
        <van-row
          type="flex"
          justify="space-between"
          class="h40px pt20b10"
          v-for="(artist, index) in artistList"
          :key="index"
        >
          <van-col span="10" class="flex-c-c flex-just-s">
            <van-image
              radius="100"
              width="1.28rem"
              height="1.28rem"
              :src="artist.img1v1Url"
            />
            <div class="fullh flex flex-col flex-around ml10">
              <span class="fz-14 c333">{{ artist.name }}</span>
              <span class="fz-12 c9898AC">{{
                formatNumber(artist.fansCount)
              }}</span>
            </div>
          </van-col>
          <van-col span="6" class="text-right">
            <van-tag round color="#c5c5c9" size="medium">关注</van-tag>
          </van-col>
        </van-row>
      </div>
    </van-config-provider>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { singerThemeVars } from '@/common/js/theme.js'
import { ref, watch, reactive } from 'vue'
import { _artistList } from '@/server/apis'
import { formatNumber } from '@/utils/util'
import { activeArea, activeSex, activeName } from '@/utils/constant'
export default {
  setup () {
    const router = useRouter()
    const onClickLeft = () => router.back()
    const onClickRight = () => {}
    const activeName1 = ref(0)
    const activeName2 = ref(0)
    const activeName3 = ref(0)
    const tabsInfo = reactive({
      area: -1,
      type: -1,
      initial: 'a'
    })
    const onClickTab1 = (res) => {
      tabsInfo.area = res
    }
    const onClickTab2 = (res) => {
      tabsInfo.type = res
    }
    const onClickTab3 = (res) => {
      tabsInfo.initial = res
    }
    const artistList = ref([])
    watch(tabsInfo, async (newV, oldV) => {
      const data = await _artistList(newV.area, newV.type, newV.initial)
      if (data.code === 200) {
        artistList.value = data.artists
      }
    })

    return {
      onClickLeft,
      onClickRight,
      onClickTab1,
      onClickTab2,
      onClickTab3,
      singerThemeVars,
      activeName2,
      activeName1,
      activeName3,
      artistList,
      formatNumber,
      activeArea,
      activeSex,
      activeName
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.van-tab) {
  margin-right: 10px;
  margin-top: 10px;
  background: white;
  border-radius: 33px;
  flex: none;
  min-width: 58px;
}
:deep(.van-tabs__nav--line) {
  padding-right: var(--van-padding-xs);
  padding-left: var(--van-padding-xs);
  .van-tab__text {
    font-size: 12px;
  }
}
.wrap {
  padding: 0 16px;
}
</style>
