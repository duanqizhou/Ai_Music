<template>
  <div>
    <van-nav-bar
      title="音乐电台"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <h3 class="wrap mt10 mb20">最近收听</h3>
    <div class="recommend mb30">
      <div class="item flex-c-c flex-col" v-for="item in 9" :key="item">
        <div class="flex-c-c pR">
          <van-image
            round
            width="1.6rem"
            height="1.6rem"
            :src="require('@/assets/test.png')"
          />

          <van-image
            class="absoluteCenter"
            width="10"
            height="10"
            :src="require('@/assets/s-play.png')"
          />
        </div>
        <span>跑步电台</span>
      </div>
    </div>
    <h3 class="wrap mt10 mb20">全部分类</h3>
    <cuTab
      :cuData="cuData"
      marginLeft="16"
      :active="titleActive"
      @clickTitle="clickTitleH"
    ></cuTab>
    <h3 class="wrap mt10 mb20">猜你喜歡</h3>
    <div class="wrap flex">
      <cuSing
        width="2.85333rem"
        height="2.85333rem"
        v-for="item in 9"
        :key="item"
        :info="item"
        @emitCuSing="emitCuSingH"
      ></cuSing>
    </div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { defineAsyncComponent, ref } from 'vue'
const cuTab = defineAsyncComponent(() => import('@/components/CuTab'))
const cuSing = defineAsyncComponent(() => import('@/components/CuSing'))

export default {
  components: {
    cuTab,
    cuSing
  },
  setup () {
    const router = useRouter()
    const titleActive = ref(0)
    const onClickLeft = () => router.back()
    const onClickRight = () => {}
    const clickTitleH = (e, item, index) => {
      // eslint-disable-next-line eqeqeq
      if (titleActive.value != index) titleActive.value = index
      console.log('[ item ]', e, item, index)
    }
    const emitCuSingH = (info) => {
      console.log('%c [ info ]', 'font-size:13px; background:pink; color:#bf2c9f;', info)
    }

    const cuData = [
      {
        title: '热门'
      },
      {
        title: '全部'
      },
      {
        title: '心情'
      },
      {
        title: '场景'
      },
      {
        title: '曲风'
      },
      {
        title: '语言'
      },
      {
        title: '人群'
      },
      {
        title: '疯狂'
      }
    ]
    return {
      onClickLeft,
      onClickRight,
      clickTitleH,
      titleActive,
      cuData,
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
  div.c3 {
    width: calc(100% / 3);
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
  &.flex {
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.imgWrap() {
  width: 107.52px;
  height: 107.52px;
}
.recommend {
  width: calc(100vw);
  box-sizing: border-box;
  padding-left: 16px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  .item {
    min-width: 1.6rem;
    margin-right: 20px;
    position: relative;
    span {
      white-space: nowrap;
      margin-top: 4px;
    }
  }
}
</style>
