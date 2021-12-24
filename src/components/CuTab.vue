<template>
  <div :style="{ marginLeft: props.marginLeft + 'px' }">
    <ul class="flex title">
      <template v-for="(item, index) in cuData" :key="index">
        <li
          :class="index == props.active ? 'active' : ''"
          @click="clickTitle($event,item, index)"
        >
          {{ item.title }}
        </li>
      </template>
    </ul>

    <ul class="flex main">
      <li v-for="item in 8" :key="item">
        <van-image
          round
          width="1.6rem"
          height="1.6rem"
          :src="require('@/assets/test.png')"
        />
        <span>热门唱曲</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    cuData: {
      type: Array,
      required: true,
      default: () => [],
    },
    marginLeft: {
      type: [String, Number],
      default: 0,
    },
    active: {
      type: [String, Number],
      default: 0,
    },
  },
  emits: ["clickTitle"],
  setup(props,{emit}) {
    const clickTitle = (e,item,index) => {
      emit("clickTitle",e,item,index)
    };
    return {
      props,
      clickTitle,
    };
  },
};
</script>

<style lang="less" scoped>
.title {
  overflow-x: auto;
  overflow-y: hidden;
  li {
    white-space: nowrap;
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
    color: #9898ac;
    &.active {
      font-size: 16px;
      color: #333;
    }
  }
}
.main {
  overflow-x: auto;
  overflow-y: hidden;
  margin-top: 15px;
  li {
    margin-right: 13px;
    padding: 0 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span {
      white-space: nowrap;
      margin-top: 12px;
    }
  }
}
</style>
