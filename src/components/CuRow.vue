<template>
  <div id="cuRow">
    <div
      v-for="(item, index) in pureData"
      :key="index"
      class="cuRow-item"
      :class="{'row':row}"
      @click="emitCuRow(item,index)"
    >
      <van-image
        :src="require('@/' + item.icon)"
        :width="width"
        :height="height"
        :style="{ marginBottom: props.marginBottom + 'px' }"
      />
      <span>{{ item.text }}</span>
    </div>
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
    marginBottom: {
      type: [String, Number],
      default: 0,
    },
    row: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: "27px",
    },
    height: {
      type: [String, Number],
      default: "27px",
    },
  },
  emits: ['emitCuRow'],
  setup(props,{emit}) {
    const pureData = [...props.cuData];
    const emitCuRow = (data,index) => {
        emit("emitCuRowH",data,index)
    };
    return {
      pureData,
      props,
      emitCuRow
    };
  },
};
</script>

<style lang="less" scoped>
@import url("@/common/style/mix.less");
#cuRow {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: @mainBg;
  .cuRow-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.row{
      flex-direction: row !important;
      padding: 20px 0;
      span{
        font-size: 12px;
        margin-left: 3px;
        color: #9898AC;
      }
    }
  }
  
}
</style>
