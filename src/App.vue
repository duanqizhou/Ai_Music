<template>
  <div id="app">
    <!-- 这里采用的分段写的 这样能解决 keep-alive 问题 但是副作用就是不同transition  需要同层才能有过度效果 需要再router 的mete里设置keep-alive-->
    <router-view class="router-view" v-slot="{ Component }">
      <transition v-if="!route.meta.keepAlive" :name="transitionName">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
      <transition v-if="route.meta.keepAlive" :name="transitionName">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
// import { getCurrentInstance } from "vue";
import { reactive, toRefs } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  setup () {
    const router = useRouter()
    const route = useRoute()
    const state = reactive({
      transitionName: 'slide-left'
    })
    router.beforeEach((to, from) => {
      if (to.meta.index > from.meta.index) {
        state.transitionName = 'slide-left' // 向左滑动
      } else if (to.meta.index < from.meta.index) {
        // 由次级到主级
        state.transitionName = 'slide-right'
      } else {
        state.transitionName = 'slide-eq' // 同级无过渡效果
      }
    })

    return {
      ...toRefs(state),
      route
    }
  }
}
</script>

<style></style>
<style lang="less">
@import "~@/common/style/mix.less";
html,
body {
  height: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
}
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  width: 100vw;
  overflow-x: hidden;
}

.router-view {
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
  background: @mainBg;
}
.slide-eq-enter-active,
.slide-eq-leave-active {
  height: 100%;
  transition: all 200ms;
  position: absolute;
  backface-visibility: hidden;
}
.slide-eq-enter-from,
.slide-eq-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  backface-visibility: hidden;
}

.slide-right-enter-from,
.slide-right-leave-to,
.slide-left-enter-from,
.slide-left-leave-to {
  opacity: 0;
}

.slide-right-enter {
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  transform: translate3d(-100%, 0, 0);
}

.van-badge--fixed {
  z-index: 1000;
}
</style>
