<template>
  <div>
    <div
      class="wrap"
      :class="{ trans: transF }"
      v-if="noCanSlide"
      @click="swipeGuideH"
    >
      <div class="slogan-wrap">
        <transition name="slide-slogan">
          <h4 class="slogan" v-show="showSlogan">
            人人都是音乐家
          </h4>
        </transition>
      </div>
      <img :src="require('@/assets/logo-y.png')" alt="" />
      <h4>智能音乐</h4>
    </div>
    <div class="swipeGuide" v-else>
      <van-swipe class="my-swipe" :show-indicators="false" :loop="false">
        <van-swipe-item>
          <div class="img-wrap">
            <img :src="require('@/assets/guide1.png')" alt="guide1" />
          </div>
          <h4>智能原创</h4>
          <p>选择风格一键智能生成，每天都是灵感满满！</p>
          <ul>
            <li class="active"></li>
            <li></li>
            <li></li>
          </ul>
        </van-swipe-item>
        <van-swipe-item
          ><div class="img-wrap">
            <img :src="require('@/assets/guide2.png')" alt="guide1" />
          </div>
          <h4>多样音乐</h4>
          <p>所有版权尽享其中，每个人都是一种元素。</p>
          <ul>
            <li></li>
            <li class="active"></li>
            <li></li></ul
        ></van-swipe-item>
        <van-swipe-item @click="roter.push('login')"
          ><div class="img-wrap">
            <img :src="require('@/assets/guide3.png')" alt="guide1" />
          </div>
          <h4>想唱就唱</h4>
          <p>各种录制功能清唱/视频录制/合唱一个移动的KTV</p>
          <ul>
            <li></li>
            <li></li>
            <li class="active"></li></ul
        ></van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
  name: 'guide',
  setup () {
    const roter = useRouter()
    const showSlogan = ref(false)
    const transF = ref(false)
    const noCanSlide = ref(true)
    const swipeGuideH = () => {
      noCanSlide.value = false
    }
    setTimeout(() => {
      showSlogan.value = true
      setTimeout(() => {
        transF.value = true
        setTimeout(() => {
          noCanSlide.value = false
        }, 2000)
      }, 1000)
    }, 100)
    return {
      showSlogan,
      transF,
      noCanSlide,
      swipeGuideH,
      roter
    }
  }
}
</script>

<style lang="less" scoped>
@import "~@/common/style/mix.less";
.wrap {
  .wh(100%, 100%);
  background: @primary;
  transition: all 2000ms linear;
  overflow: hidden;
  &.trans {
    background: white;
    h4 {
      color: #333;
    }
  }
  .slogan-wrap {
    .wh(100%, 250px);
    margin: 66px auto 60px;
    .flex-c-c();
  }
  h4 {
    transition: all 1800ms linear;
    .sc(18px, #fff);
    margin: 8px;
    text-align: center;
    &.slogan {
      -webkit-writing-mode: vertical-rl;
      -ms-writing-mode: bt-rl;
      writing-mode: vertical-rl;
      text-align: center;
      letter-spacing: 6px;
      font-weight: Bold;
    }
  }
  img {
    display: block;
    .wh(80px, 80px);
    margin: 0 auto;
  }
}
.swipeGuide {
  .wh();
  .my-swipe {
    .wh();
    .van-swipe-item {
      color: #333;
      .sc(18px, #333);
      text-align: center;
      background-color: #fff;
      .img-wrap {
        .wh(280px, 280px);
        margin: 150px auto 0;
        .flex-c-c();
        img {
          width: 100%;
        }
      }
      h4,
      p {
        margin: 0;
      }
      p {
        padding: 10px 46px;
        color: #9898ac;
        .boxSizing();
        line-height: 1.5;
      }
      ul {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        li {
          background: #9898ac;
          border-radius: 2px;
          .wh(30px, 4px);
          margin: 0 9px;
          &.active {
            background: #ffab3e;
          }
        }
      }
    }
  }
}
.slide-slogan-enter-active,
.slide-slogan-leave-active {
  height: 100%;
  transition: all 2800ms ease;
  backface-visibility: hidden;
}
.slide-slogan-enter-from,
.slide-slogan-leave-to {
  opacity: 0;
  color: @primary;
}
</style>
