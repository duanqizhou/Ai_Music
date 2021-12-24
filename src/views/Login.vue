<template>
  <div class="wrap">
    <div class="p5436">
      <img :src="require('@/assets/logo-y.png')" alt="" />
      <p>早上好，欢迎来到智能音乐!</p>
      <div class="ps-wrap">
        <input type="text" v-model="loginInfo.account" />
      </div>
      <div
        class="ps-wrap"
        tabindex="0"
        hidefocus="true"
        :class="{ focus: isFocus }"
      >
        <input
          type="password"
          alt="psd"
          v-model="loginInfo.password"
          @focus="divFocus"
          @blur="missDivFocus"
        />
      </div>
      <div class="ps-wrap" @click="login">
        登录
      </div>
      <div class="flex-bet fz-14 cmain">
        <span>忘记密码</span>
        <span>注册</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { Toast } from 'vant'
import { useRouter } from 'vue-router'
export default {
  name: 'login',
  setup () {
    const store = useStore()
    const state = store.state
    const isFocus = ref(false)
    const router = useRouter()
    const loginInfo = reactive({
      account: null,
      password: ''
    })
    const divFocus = () => {
      isFocus.value = true
    }
    const missDivFocus = () => {
      isFocus.value = false
    }
    const login = async () => {
      if (loginInfo.account && loginInfo.password) {
        if (loginInfo.account === 'admin' && loginInfo.password === '123123') {
          router.push('home')
          store.commit('SetUserInfo', {
            userInfo: {
              name: '指上菁芜',
              level: '8',
              otherInfo: '男 22 浙江杭州',
              avatar: 'test.png'
            }
          })
        } else {
          const isSave = await store.dispatch('loginUser', loginInfo)
          if (isSave) {
            router.push('home')
          }
        }
      } else {
        Toast('账号或者密码为空')
      }
    }
    return {
      divFocus,
      missDivFocus,
      login,
      isFocus,
      loginInfo
    }
  }
}
</script>

<style lang="less" scoped>
@import url("@/common/style/mix.less");
.wrap {
  background: #fafafa;
  .p5436 {
    padding: 54px 36px 0;
    .boxSizing();
    img {
      .wh(80px, 80px);
      filter: drop-shadow(0px 12px 8px rgba(255, 171, 62, 0.18));
    }
    p {
      font-size: 16px;
      padding: 20px 0 40px;
    }
    .ps-wrap {
      width: 100%;
      height: 48px;
      background: rgb(181, 181, 194);
      border-radius: 27px;
      margin-bottom: 20px;
      outline: 0;
      display: flex;
      .boxSizing();
      padding: 0 21px;
      &:nth-of-type(2) {
        background: transparent;
        border: 1px solid rgb(181, 181, 194);
        margin-bottom: 50px;
      }
      &:nth-of-type(3) {
        .sc(18px, #fff);
        letter-spacing: 2px;
        background-image: linear-gradient(
          to right,
          rgba(250, 196, 126, 0.863),
          rgba(255, 171, 62, 1)
        );
        .flex-c-c();
        filter: drop-shadow(0px 12px 8px rgba(255, 171, 62, 0.218));
      }
      input {
        flex: 1;
        width: 100%;
        font-size: 16px;
      }
    }
  }
}
.focus {
  border: 1px solid #ffb966 !important;
}
</style>
