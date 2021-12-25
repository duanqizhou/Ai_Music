<template>
  <div>
    <div class="wrap">
      <van-config-provider :theme-vars="themeVars">
        <div class="user-wrap">
          <van-skeleton
            avatar
            avatar-shape="square"
            avatar-size="55"
            :row="2"
            :loading="loading"
          >
            <van-row>
              <van-col span="6" class="flex-c-c flex-ali-b" v-if="profile">
                <van-image
                  radius="8"
                  width="55"
                  height="55"
                  :src="
                    profile.avatarUrl
                      ? profile.avatarUrl
                      : require('@/assets/' + avatar)
                  "
                />
              </van-col>
              <van-col span="12" class="span12">
                <p>
                  <span class="name">破蛋{{ createDays || '-' }}</span>
                  <van-tag color="#FF3333"
                    >LV {{ userInfo?.level || '0' }}</van-tag
                  >
                </p>
                <p>{{ profile?.nickname || '-' }}</p>
              </van-col>
              <van-col span="6">
                <van-tag color="#EAEAF0" size="large" @click="changeLogin"
                  >切换账号</van-tag
                >
              </van-col>
            </van-row>
          </van-skeleton>
          <van-skeleton title title-width="100%" :loading="loading">
            <van-row style="padding-bottom:12px;">
              <van-col span="8" class="text-center">
                <h5>132</h5>
                <span>我的关注</span>
              </van-col>
              <van-col span="8" class="text-center">
                <h5>132</h5>
                <span>我的粉丝</span></van-col
              >
              <van-col span="8" class="text-center">
                <h5>132</h5>
                <span>我的好友</span></van-col
              >
            </van-row>
          </van-skeleton>
        </div>

        <van-skeleton title title-width="100%" :loading="loading" class="mb20">
          <van-row>
            <van-col @click="dailySignin" span="11" class="bgFAE9DF bg-def">
              <div>
                <h5>签到中心</h5>
                <span>签到领鲜花</span>
              </div>
              <van-image
                width="31"
                height="33"
                :src="require('@/' + 'assets/m-mission.png')"
              />
            </van-col>
            <van-col span="11" offset="2" class="bgFBE5E8 bg-def">
              <div>
                <h5>我的账户</h5>
                <span>89背包资产</span>
              </div>
              <van-image
                width="31"
                height="33"
                :src="require('@/' + 'assets/m-flower.png')"
              />
            </van-col>
          </van-row>
        </van-skeleton>

        <van-skeleton title title-width="100%" :loading="loading" class="mb20">
          <van-row>
            <van-col span="11" class="bg-def bgF0E8F7">
              <div>
                <h5>会员中心</h5>
                <span>生活福利随心畅享</span>
              </div>
              <van-image
                width="33"
                height="31"
                :src="require('@/' + 'assets/m-diam.png')"
              />
            </van-col>
            <van-col span="11" offset="2" class="bg-def bgE7F0F7">
              <div>
                <h5>游戏中心</h5>
                <span>游戏大全应有尽有</span>
              </div>
              <van-image
                width="31"
                height="33"
                :src="require('@/' + 'assets/m-game.png')"
              />
            </van-col>
          </van-row>
        </van-skeleton>

        <van-skeleton title title-width="100%" :loading="loading" class="mb10">
          <cuRow :cuData="cuData" marginBottom="8" @emitCuRowH="emitCuRowH" />
        </van-skeleton>

        <van-skeleton title title-width="100%" :loading="loading" class="mt20">
          <van-tabs v-model="active" class="mt30">
            <van-tab title="歌单">
              <div class="container">
                <ul>
                  <li class="flex-bet">
                    <div class="flex">
                      <van-image
                        width="1.333rem"
                        height="1.333rem"
                        :src="require('@/' + 'assets/test.png')"
                      />
                      <div class="flex-around flex-col ml10">
                        <p class="fz-14">刘德华</p>
                        <p class="fz-12 c9898AC">51首</p>
                      </div>
                    </div>
                    <van-icon name="more-o" size="15" />
                  </li>
                  <li class="flex-bet">
                    <div class="flex">
                      <van-image
                        width="1.333rem"
                        height="1.333rem"
                        :src="require('@/' + 'assets/test.png')"
                      />
                      <div class="flex-around flex-col ml10">
                        <p class="fz-14">陈奕迅</p>
                        <p class="fz-12 c9898AC">99首</p>
                      </div>
                    </div>
                    <van-icon name="more-o" size="15" />
                  </li>
                </ul>
              </div>
              <div class="container">
                <ul>
                  <li class="flex-bet">
                    <div class="flex">
                      <van-image
                        width="1.333rem"
                        height="1.333rem"
                        :src="require('@/' + 'assets/test.png')"
                      />
                      <div class="flex-around flex-col ml10">
                        <p class="fz-14">刘德华</p>
                        <p class="fz-12 c9898AC">51首</p>
                      </div>
                    </div>
                    <van-icon name="more-o" size="15" />
                  </li>
                  <li class="flex-bet">
                    <div class="flex">
                      <van-image
                        width="1.333rem"
                        height="1.333rem"
                        :src="require('@/' + 'assets/test.png')"
                      />
                      <div class="flex-around flex-col ml10">
                        <p class="fz-14">陈奕迅</p>
                        <p class="fz-12 c9898AC">99首</p>
                      </div>
                    </div>
                    <van-icon name="more-o" size="15" />
                  </li>
                </ul>
              </div>
            </van-tab>
            <van-tab title="作品">内容 2</van-tab>
            <van-tab title="动态">内容 3</van-tab>
          </van-tabs>
        </van-skeleton>
      </van-config-provider>
    </div>
    <navBar></navBar>
  </div>
</template>

<script>
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { Dialog, Toast } from 'vant'
import { cuData } from '@/utils/constant'
import { _likeList, _dailySignin } from '@/server/apis'
const navBar = defineAsyncComponent(() => import('@/components/NavBar'))
const cuRow = defineAsyncComponent(() => import('@/components/CuRow'))

export default {
  name: 'my',
  components: {
    navBar,
    cuRow
  },
  setup () {
    const store = useStore()
    const state = store.state
    const router = useRouter()
    const userInfo = state.userInfo || {}
    const { profile, createDays } = userInfo
    const themeVars = {
      tabsNavBackgroundColor: 'transparent',
      tabsDefaultColor: '#FF9F1A'
    }

    const active = ref(2)
    const loading = ref(false)

    const emitCuRowH = (data) => {
      console.log(
        '%c [ FFFdata ]',
        'font-size:13px; background:pink; color:#bf2c9f;', +data
      )
    }
    const dailySignin = async () => {
      const sign = await _dailySignin()
      if (sign.code === 200) {
        Toast('今日签到成功~')
      }
    }

    const changeLogin = async () => {
      if (!userInfo.token) {
        router.push('login')
      }
      if (userInfo.token) {
        Dialog.confirm({
          message: '是否确定退出登录？'
        })
          .then(() => {
            store.dispatch('logoutUser')
          })
          .catch()
      }
    }

    const reload = () => {
      router.go(0)
    }

    onMounted(async () => {})

    return {
      emitCuRowH,
      changeLogin,
      cuData,
      loading,
      active,
      themeVars,
      userInfo,
      profile,
      createDays,
      dailySignin
    }
  }
}
</script>

<style lang="less" scoped>
@import url('@/common/style/mix.less');
h5 {
  font-size: 18px;
}
h5 + span {
  color: #9898ac;
}
.bg-def {
  height: 62px;
  .fj();
  align-items: center;
  box-sizing: border-box;
  padding: 11px;
  .borderRadius(7px);
  margin-bottom: 10px;
  div {
    height: 100%;
    .flex-col-bet();
    h5 {
      font-size: 14px;
    }
    span {
      font-size: 12px;
    }
  }
}
.bgFAE9DF {
  background: #fae9df;
}
.bgFBE5E8 {
  background: #fbe5e8;
}
.bgF0E8F7 {
  background: #f0e8f7;
}
.bgE7F0F7 {
  background: #e7f0f7;
}
.wrap {
  .boxSizing();
  padding: 16px;
  .user-wrap {
    .wh(100%, 140px);
    background: @white;
    .flex-col-bet();
    margin-bottom: 20px;
    .span12 {
      p {
        &:first-of-type {
          span.name {
            margin-right: 12px;
          }
        }
        &:last-of-type {
          .sc(14px, #9898ac);
          margin-top: 10px;
        }
      }
    }
  }
  .container {
    width: 100%;
    background: white;
    margin-bottom: 10px;
    .borderRadius(8px);
    .boxSizing();
    padding: 15px;
    ul {
      li {
        .wh(100%, 50px);
        padding-bottom: 10px;
      }
    }
  }
}
:deep(.van-tabs__nav--line) {
  width: 75%;
}
</style>
