<template>
  <router-link :to="'/chat/' + props.path">
    <div class="cuMsg" @click="emitCuMsg($event, cuData)">
      <div
        class="flex-c-c avatar"
        :style="{ marginRight: props.marginRight + 'px' }"
      >
        <van-image
          :src="require('@/' + cuData.Avatar)"
          :width="width"
          :height="height"
          round
        />
      </div>

      <div class="cuMsg-item" :class="{ row: row }" :style="{ height: height }">
        <p class="name">
          <span>{{ cuData.Name }}</span>
          <span>{{ cuData.Time }}</span>
        </p>
        <p class="msg">{{ typeof cuData.Msg == 'function' ? cuData.Msg() :cuData.Msg }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    cuData: {
      type: Object,
      required: true,
      default: () => {},
    },
    marginRight: {
      type: [String, Number],
      default: 0,
    },
    row: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: "1.28rem",
    },
    height: {
      type: [String, Number],
      default: "1.28rem",
    },
    path: {
      type: String,
      default: "",
    },
  },
  emits: ["emitCuMsgH"],
  setup(props, { emit }) {
    const emitCuMsg = (e, data) => {
      emit("emitCuMsgH", e, data);
    };
    return {
      props,
      emitCuMsg,
    };
  },
};
</script>

<style lang="less" scoped>
@import url("@/common/style/mix.less");

.cuMsg {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: @mainBg;
  padding-bottom: 15px;
  .avatar {
    width: calc(100% / 5);
  }
  .cuMsg-item {
    flex: 1;
    font-size: 13px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .name {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: 14px;
        &:last-of-type {
          font-size: 10px;
          color: #9898ac;
        }
      }
    }
    .msg {
      color: #9898ac;
    }
  }
}
</style>
