<template>
  <div>
    <div class="wrap">
      <header class="flex-bet">
        <span class="iconfont icon-shezhi opa5"></span>
        <span class="iconfont icon-Plus opa5"></span>
      </header>
      <cuRow
        :cuData="cuData"
        marginBottom="8"
        width="1.28rem"
        height="1.28rem"
      />
      <van-divider />

      <div class="msg-container">
        <van-pull-refresh v-model="state.refreshing" @refresh="onRefresh">
          <van-list
            :loading="state.loading"
            :finished="state.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <div class="msg-item">
              <cuMsg
                v-for="(item, index) in state.list"
                :cuData="item"
                @emitCuMsgH="emitCuMsgH"
                :key="index"
                :path="item.Sign"
              ></cuMsg>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <navBar></navBar>
  </div>
</template>

<script>
import { defineAsyncComponent, inject, reactive, markRaw } from 'vue'
import { useStore } from 'vuex'
import { _getEventMsg } from '@/server/apis'
import { msgFactory } from '@/utils/util'
const navBar = defineAsyncComponent(() => import('@/components/NavBar'))
const cuRow = defineAsyncComponent(() => import('@/components/CuRow'))
const cuMsg = defineAsyncComponent(() => import('@/components/CuMsg'))

export default {
  name: 'message',
  components: {
    navBar,
    cuRow,
    cuMsg
  },
  setup () {
    const cuData = [
      {
        icon: 'assets/comment-icon.png',
        text: '评论'
      },
      {
        icon: 'assets/gift-icon.png',
        text: '礼物'
      },
      {
        icon: 'assets/lately-listen.png',
        text: '最近听众'
      },
      {
        icon: 'assets/friend.png',
        text: '好友'
      },
      {
        icon: 'assets/family.png',
        text: '家族'
      }
    ]
    const state = reactive({
      list: [],
      loading: false,
      finished: false,
      refreshing: false
    })
    const store = useStore()
    const _ = inject('_')
    const chatUser = markRaw(...store.state.chatUser)
    const onLoad = async () => {
      const list = await _getEventMsg()
      if (state.refreshing) {
        state.list = []
        state.refreshing = false
      }

      if (list.code === 200) {
        state.list.push(...msgFactory(_.concat(state.list, chatUser, list.event)))
      }
      state.loading = false

      if (state.list.length >= 8) {
        state.finished = true
      }
    }
    const onRefresh = () => {
      // 清空列表数据
      state.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      state.loading = true
      onLoad()
    }
    const emitCuMsgH = (e, data) => {
    }

    return {
      cuData,
      state,
      onLoad,
      onRefresh,
      chatUser,
      emitCuMsgH
    }
  }
}
</script>

<style lang="less" scoped>
@import url("@/common/style/mix.less");
.wrap {
  padding: 0 12px;
  .boxSizing();
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
  header {
    padding: 10px 0 30px 0;
  }
  .msg-container {
    .boxSizing();
    flex: 1;
    padding-bottom: 60px;
    .van-pull-refresh {
      height: 100%;
    }
  }
}
</style>
