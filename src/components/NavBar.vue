<template>
  <div>
    <div class="heel"></div>
    <div class="nav-bar van-hairline--top">
      <ul class="nav-list">
        <router-link tag="li" class="nav-list-item active" to="home">
          <van-image
            class="link-icon-hidden"
            :src="require('@/assets/nav1.png')"
            width="25px"
            height="25px"
          />
          <van-image
            class="link-icon-show"
            :src="require('@/assets/nav1-h.png')"
            width="25px"
            height="25px"
          />

          <span>乐馆</span>
        </router-link>
        <router-link tag="li" class="nav-list-item" to="create">
          <van-image
            class="link-icon-hidden"
            :src="require('@/assets/nav2.png')"
            width="25px"
            height="25px"
          />
          <van-image
            class="link-icon-show"
            :src="require('@/assets/nav2-h.png')"
            width="25px"
            height="25px"
          />

          <span>创作家</span>
        </router-link>
        <router-link tag="li" class="nav-list-item" to="message">
          <van-image
            class="link-icon-hidden"
            :src="require('@/assets/nav3.png')"
            width="25px"
            height="25px"
          />
          <van-image
            class="link-icon-show"
            :src="require('@/assets/nav3-h.png')"
            width="25px"
            height="25px"
          />

          <span>消息</span>
        </router-link>
        <router-link tag="li" class="nav-list-item" to="my">
          <van-image
            class="link-icon-hidden"
            :src="require('@/assets/nav4.png')"
            width="25px"
            height="25px"
          />
          <van-image
            class="link-icon-show"
            :src="require('@/assets/nav4-h.png')"
            width="25px"
            height="25px"
          />
          <span>我的</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
export default {
  setup() {
    onMounted(() => {});

    return {};
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mix";
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 50px;
  padding: 5px 0;
  z-index: 1000;
  overflow: hidden;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  .nav-list {
    width: 100%;
    .fj();
    flex-direction: row;
    padding: 0;
    .nav-list-item {
      display: flex;
      flex: 1;
      flex-direction: column;
      text-align: center;
      color: #666;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-sizing: border-box;
      &.router-link-active {
        color: @primary;
        .link-icon-hidden {
          display: none!important;
        }
        .link-icon-show {
          display: inline-block!important;
        }
      }
      .van-image {
        padding: 4px 0;
      }
      span {
        font-size: 12px;
      }
      .van-icon-shopping-cart-o {
        margin: 0 auto;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
