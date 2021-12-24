<template>
  <div>
    <van-nav-bar
      title="直播"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
      class="mb40"
    ></van-nav-bar>
    <cuRow :cuData="cuData" marginBottom="10" @emitCuRowH="emitCuRowH"></cuRow>
    <h3 class="wrap mt10 mt20 mb20">专属推荐</h3>
    <div class="exclusive">
      <cuSing
        class="mr10"
        width="2.77333rem"
        height="3.46667rem"
        :hasIcon="false"
        :hasTitle="false"
        v-for="item in 8"
        :key="item"
      ></cuSing>
    </div>

<div class="wrap">
    <ul class="fullw flex mt30 l-row mb20">
      <li class="active">热门</li>
      <li>附近</li>
      <li>配对</li>
      <li>萌新</li>
      <li>点唱</li>
    </ul>

    <div class="fullw flex-wrap flex-bet">
        <cuSing
        class="mb10"
        width="4.44rem"
        height="4.44rem"
        :hasIcon="false"
        :hasTitle="false"
        v-for="item in 8"
        :key="item"
      ></cuSing>
    </div>

</div>

  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { defineAsyncComponent, onMounted } from 'vue'
const cuRow = defineAsyncComponent(() => import('@/components/CuRow'))
const cuSing = defineAsyncComponent(() => import('@/components/CuSing'))

export default {
  components: {
    cuRow,
    cuSing
  },
  setup () {
    const router = useRouter()
    const onClickLeft = () => router.back()
    const onClickRight = () => {}
    const emitCuRowH = (data, index) => {
      console.log(
        '%c [ data ]',
        'font-size:13px; background:pink; color:#bf2c9f;',
        data,
        index
      )
    }

    const cuData = [
      {
        icon: 'assets/l-tj.png',
        text: '听见'
      },
      {
        icon: 'assets/l-kj.png',
        text: '看见'
      },
      {
        icon: 'assets/l-jy.png',
        text: '交友'
      },
      {
        icon: 'assets/l-bd.png',
        text: '榜单'
      },
      {
        icon: 'assets/l-gz.png',
        text: '关注'
      }
    ]

    return { onClickLeft, onClickRight, cuData, emitCuRowH }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  padding: 0 16px;
  box-sizing: border-box;
  width: 100vw;
}
.exclusive {
  width: 100vw;
  box-sizing: border-box;
  padding-left: 16px;
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
}
ul.l-row {
  justify-content: space-between;
  li {
    font-size: 14px;
    padding: 4px 12px;
    color: #9898AC;
    &.active {
      background: #e3e3e4;
      color: #333;
      border-radius: 50px;
    }
  }
}
</style>
