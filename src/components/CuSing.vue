<template>
  <div class="pR" @click="emitCuSing(info)">
    <van-image
      radius="10px"
      :width="width"
      :height="height"
      :src=" img ? img : require('@/assets/test.png')"
    />
    <div
      :class="nobg ? 'nobg' : ''"
      class="mask"
      :style="{ width: width, height: height }"
    >
      <p :class="hasIcon ? '' : 'hasIcon'">
        <van-image
          width="10"
          height="10"
          :src="require('@/assets/s-play.png')"
          v-if="hasIcon"
        />
        <span class="fz-14">{{playCount}}</span>
        <span class="fz-16" v-if="!hasIcon">喜闻见乐</span>
      </p>
    </div>
    <span v-if="hasTitle" class="des" :style="{ width: width }"
      >{{title}}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: [String, Number],
      required: false,
      default: '100%'
    },
    height: {
      type: [String, Number],
      required: false,
      default: '100%'
    },
    nobg: {
      type: Boolean,
      default: true
    },
    hasIcon: {
      type: Boolean,
      default: true
    },
    hasTitle: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: '人间美好且值...'
    },
    info: {
      type: [Object, Array, String, Number],
      default: 'default'
    },
    img: {
      type: String,
      default: ''
    },
    playCount: {
      type: String,
      default: ''
    }
  },
  emits: ['emitCuSing'],
  setup (props, { emit }) {
    const emitCuSing = (info) => {
      emit('emitCuSing', info)
    }
    return {
      emitCuSing
    }
  }
}
</script>

<style lang="less" scoped>
.pR {
  display: flex;
  flex-direction: column;
  .des {
    display: inline-block;
    padding: 5px 0 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.mask {
  position: absolute;
  border-radius: 10px;
  color: white;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.243);
  &.nobg {
    background: transparent !important;
  }
  * {
    position: absolute;
  }
  .center {
    top: 50%;
    left: 50%;
    font-size: 15px;
    white-space: nowrap;
    color: white;
  }
  p {
    width: 100%;
    display: flex;
    align-items: center;
    bottom: 16px;
    left: 10px;
    &.hasIcon {
      span {
        margin-left: 3px;
        font-size: 8px;
        &:last-of-type {
          bottom: -8px;
        }
        &:first-of-type {
          bottom: 8px;
        }
      }
    }
    span {
      margin-left: 18px;
      font-size: 8px;
    }
  }
}

.fz-14{
  font-size: 13px!important;
}
</style>
