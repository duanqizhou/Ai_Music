<template>
  <div>
    <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    ></van-nav-bar>
    <div class="container pR char-wrap">
      <block v-if="msgs">
        <div
          class="chatItem"
          v-for="(item, index) in msgs"
          :key="index"
          :class="{ self: item.isSelf }"
        >
          <p v-if="item.time">{{ item.time }}</p>
          <div class="cw">
            <van-image
              radius="2px"
              width="1.28rem"
              height="1.28rem"
              :src="require('@/assets/' + item.avatar)"
            />
            <div class="msg-wrap">
              {{ item.msg }}
            </div>
          </div>
        </div>
      </block>
    </div>
    <div class="send-wrap">
      <van-search
        v-model="msg"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
      >
        <template #left-icon>
          <van-image
            width="0.64rem"
            height="0.64rem"
            class="mr10"
            :src="require('@/assets/voice.png')"
            @click="leftIconH"
          />
        </template>
        <template #action>
          <div class="flex-c-c" @click="emojiH">
            <van-image
              width="0.64rem"
              height="0.64rem"
              class="ml5"
              :src="require('@/assets/emoji.png')"
            />
          </div>
        </template>
      </van-search>
    </div>
  </div>
</template>

<script>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import Moment from 'moment'
export default {
  setup () {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const state = store.state
    const msg = ref('')
    const onClickLeft = () => router.back()
    const onClickRight = () => {}
    const leftIconH = () => {
      console.log('[ leftIconH ]')
    }
    const emojiH = () => {
      console.log('[ emojiH ]')
    }
    const sign = route.params.user
    const user = store.getters.GetChatMsg(sign)
    const title = user?.Name ?? 'Ai'
    const msgs = user?.msgs ?? []

    const onSearch = (value) => {
      const popMsg = state.msgs[state.msgs.length - 1]
      let time
      const timestamp = Date.now()
      if (popMsg.timestamp) {
        const showTime = timestamp - popMsg.timestamp > 180 * 1000
        if (showTime) {
          time = Moment(timestamp).format('h:mm:ss a')
        } else {
          time = ''
        }
      } else {
        time = Moment().format('MMMM Do YYYY, h:mm:ss a')
      }
      console.log('[ state.userInfo.avatar ]', state.userInfo.avatar)
      if (value) {
        store.commit('SetMsg', {
          sign,
          _msg: {
            msg: String(value),
            avatar: state?.userInfo?.avatar,
            time: time,
            timestamp,
            isSelf: true
          }
        })
        msg.value = ''
      }
    }

    return {
      onClickLeft,
      onClickRight,
      leftIconH,
      onSearch,
      emojiH,
      title,
      state,
      msg,
      msgs
    }
  }
}
</script>

<style lang="less" scoped>
.char-wrap {
  height: calc(100vh - 1.22667rem - 65px);
}
.chatItem {
  width: 100%;
  box-sizing: border-box;
  min-height: 60px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    font-size: 13px;
    color: rgba(152, 152, 172, 0.8);
    text-align: center;
    padding: 20px 0 10px 0;
  }
  .cw {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .msg-wrap {
    max-width: calc(100% - (1.28rem * 2));
    font-size: 14px;
    margin-left: 20px;
    padding: 4px 8px;
    background: rgba(152, 152, 172, 0.5);
    border-radius: 3px;
    line-height: 1.5;
  }
  &.self {
    .cw {
      flex-direction: row-reverse;
      .msg-wrap {
        margin-left: 0px;
        margin-right: 20px;
        background: rgba(255, 171, 62, 1);
      }
    }
  }
}

.send-wrap {
  height: 60px;
  width: 100%;
}
:deep(.van-field__left-icon) {
  display: flex;
  align-items: center;
}
</style>
