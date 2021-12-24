<template>
  <div>
    <van-search
      v-model="createSerchValue"
      shape="round"
      placeholder="搜索你想要的歌"
    />
    <div class="wrap">
      <h3>Hi,一起玩音乐！</h3>
      <van-row>
        <van-col span="11" class="col-def bg6058F4">
          <span>智能原创</span>
          <van-image
            width="0.82667rem"
            height="0.82667rem"
            :src="require('@/' + 'assets/c-star.png')"
          />
        </van-col>
        <van-col span="11" offset="2" class="col-def bgF88B3A">
          <span>想唱就唱</span>
          <van-image
            width="0.82667rem"
            height="0.82667rem"
            :src="require('@/' + 'assets/c-MIC.png')"
          />
        </van-col>
      </van-row>
      <van-row>
        <van-col span="11" class="col-def bg3DB2EC">
          <span>竞技歌房</span>
          <van-image
            width="0.82667rem"
            height="0.82667rem"
            :src="require('@/' + 'assets/c-pk.png')"
          />
        </van-col>
        <van-col span="11" offset="2" class="col-def bg31BAA9">
          <span>音乐游戏</span>
          <van-image
            width="0.82667rem"
            height="0.82667rem"
            :src="require('@/' + 'assets/c-game.png')"
          />
        </van-col>
      </van-row>
      <van-config-provider :theme-vars="themeVars">
        <van-tabs v-model="active" class="mt30">
          <van-tab title="歌单">
            <div class="contaienr">
              <van-row
                type="flex"
                justify="space-between"
                class="h40px pt20b10"
              >
                <van-col span="10" class="flex-c-c flex-just-s">
                  <van-image
                    radius="100"
                    width="40"
                    height="40"
                    :src="require('@/' + 'assets/test.png')"
                  />
                  <div class="fullh flex flex-col flex-around ml10">
                    <span class="name">你的青灯</span>
                    <span class="time">昨天22：00</span>
                  </div>
                </van-col>
                <van-col span="6" class="text-right">
                  <van-tag round color="#FFB966" size="large">关注</van-tag>
                </van-col>
              </van-row>
              <p class="fz-14 mb10">才发现笑着哭最痛。</p>
              <div class="cu-mv">
                <van-image
                  width="100%"
                  height="168"
                  fit="cover"
                  :src="require('@/' + 'assets/mv.png')"
                />
                <div class="cu-mv-base">
                  <van-tag color="#FFAB3E">SSS</van-tag>
                  <van-tag color="#9898AC" class="ml10">
                    <template #default>
                      <van-image
                        width="8"
                        height="8"
                        fit="cover"
                        :src="require('@/' + 'assets/icon1.png')"
                      />
                      <em class="ml3">317</em>
                    </template>
                  </van-tag>
                  <i class="dis-block p6">知足</i>
                </div>
                <van-image
                  width="33"
                  height="33"
                  fit="contain"
                  class="play"
                  :src="require('@/' + 'assets/play.png')"
                />
              </div>
              <cuRow
                :cuData="cuData"
                :row="true"
                width="18px"
                height="18px"
              ></cuRow>
              <van-divider>我也是有底线的</van-divider>
            </div>
          </van-tab>
          <van-tab title="作品">内容 2</van-tab>
          <van-tab title="动态">内容 3</van-tab>
        </van-tabs>
      </van-config-provider>
    </div>
    <navBar></navBar>
  </div>
</template>

<script>
import { defineAsyncComponent, ref } from 'vue'
const navBar = defineAsyncComponent(() => import('@/components/NavBar'))
const cuRow = defineAsyncComponent(() => import('@/components/CuRow'))

export default {
  name: 'create',
  components: {
    navBar,
    cuRow
  },
  setup () {
    const cuData = [
      {
        icon: 'assets/c-msg.png',
        text: '49'
      },
      {
        icon: 'assets/c-gift.png',
        text: '99'
      },
      {
        icon: 'assets/c-nice.png',
        text: '199'
      },
      {
        icon: 'assets/c-share.png',
        text: ''
      }
    ]

    const createSerchValue = ref('')
    const themeVars = {
      tabsNavBackgroundColor: 'transparent',
      tabsDefaultColor: '#FF9F1A'
    }

    return {
      createSerchValue,
      themeVars,
      cuData
    }
  }
}
</script>

<style lang="less" scoped>
@import url("@/common/style/mix.less");
.wrap {
  padding: 0 12px;
  .col-def {
    height: 70px;
    .fj();
    align-items: center;
    box-sizing: border-box;
    padding: 11px;
    .borderRadius(7px);
    margin-bottom: 10px;
    span {
      .sc(20px, #fff);
    }
    &.bg6058F4 {
      background: #6058f4;
    }
    &.bgF88B3A {
      background: #f88b3a;
    }
    &.bg3DB2EC {
      background: #3db2ec;
    }
    &.bg31BAA9 {
      background: #31baa9;
    }
  }
  .contaienr {
    width: 100%;
    .boxSizing();
    padding: 10px;
    .h40px {
      height: 40px;
    }
    .name {
      .sc(14px, #333);
    }
    .time {
      .sc(11px, #9898ac);
    }
    .fz-14 {
      letter-spacing: 1px;
      line-height: 1.3;
    }
    .cu-mv {
      width: 100%;
      height: 168PX;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background: rgba(0, 0, 0, 0.234);
      }
      .play {
        position: absolute;
        right: 10px;
        bottom: 10px;
        z-index: 2;
      }
      .cu-mv-base{
        position: absolute;
        left: 10px;
        bottom: 10px;
        z-index: 2;

      }
      .p6{
        padding: 6px 0;
      }
    }
  }
}
:deep(.van-tabs__nav--line) {
  width: 75%;
}
</style>
