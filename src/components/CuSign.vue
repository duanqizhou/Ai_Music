<template>
  <div>
    <canvas
      className="{styles.canvas}"
      ref="canvasDom"
      width="350"
      height="150"
    />
    <van-button type="default" @click="clickH">按钮</van-button>
    <van-button type="default" @click="clearRect">清除</van-button>
    <van-button color="red" @click="Red">Red</van-button>
    <van-button color="black" @click="Black">Black</van-button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
export default {
  setup () {
    const canvasDom = ref(null)
    let ctx = null
    let strokeStyle = 'red' // 设置路径颜色
    const lineWidth = 3 // 设置线宽
    const clickH = () => {
      const url = canvasDom.value.toDataURL('image/png')
      const a = document.createElement('a')
      // 创建一个单击事件
      a.download = '下载图片'
      a.href = url
      // 触发a的单击事件
      document.body.appendChild(a)
      a.click()
      // 移除节点
      document.body.removeChild(a)
    }

    const clearRect = () => {
      ctx.clearRect(0, 0, canvasDom.value.width, canvasDom.value.height)
    }
    const Red = () => {
      strokeStyle = 'red'
    }
    const Black = () => {
      strokeStyle = 'black'
    }
    const writing = (beginX, beginY, stopX, stopY, ctx) => {
      ctx.beginPath() // 开启一条新路径
      ctx.globalAlpha = 1 // 设置图片的透明度
      ctx.lineWidth = lineWidth
      ctx.strokeStyle = strokeStyle
      ctx.moveTo(beginX, beginY) // 从(beginX, beginY)这个坐标点开始画图
      ctx.lineTo(stopX, stopY) // 定义从(beginX, beginY)到(stopX, stopY)的线条（该方法不会创建线条）
      ctx.closePath() // 创建该条路径
      ctx.stroke() // 实际地绘制出通过 moveTo() 和 lineTo() 方法定义的路径。默认颜色是黑色。
    }
    const canvasResize = () => {
      canvasDom.value.width = document.documentElement.clientWidth
      canvasDom.value.height = document.documentElement.clientHeight - 150
      const canvas = canvasDom.value
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    onMounted(() => {
      let beginX, beginY
      const canvas = canvasDom.value
      ctx = canvas.getContext('2d')

      window.onresize = canvasResize
      canvas.addEventListener('touchstart', function (event) {
        event.preventDefault() // 阻止在canvas画布上签名的时候页面跟着滚动
        beginX = event.touches[0].clientX - this.offsetLeft
        beginY = event.touches[0].pageY - this.offsetTop
      })

      canvas.addEventListener('touchmove', (event) => {
        event.preventDefault() // 阻止在canvas画布上签名的时候页面跟着滚动
        event = event.touches[0]
        const stopX = event.clientX - canvas.offsetLeft
        const stopY = event.pageY - canvas.offsetTop
        writing(beginX, beginY, stopX, stopY, ctx)
        beginX = stopX // 这一步很关键，需要不断更新起点，否则画出来的是射线簇
        beginY = stopY
      })
      canvasResize()
    })
    return {
      canvasDom,
      clickH,
      clearRect,
      Red,
      Black
    }
  }
}
</script>

<style lang="less" scoped></style>
