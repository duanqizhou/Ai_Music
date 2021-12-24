<template>
  <div>
    <van-nav-bar
      title="排行榜"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="18" />
      </template>
    </van-nav-bar>

    <h3 class="wrap mt10 mb20">推荐</h3>
    <div class="recommend mb30">
      <div class="item flex-c-c" v-for="item in 4" :key="item">
        <router-link :to="item == 1 ? '/detail/define': ''">
          <van-image
            radius="10px"
            width="2.8672rem"
            height="2.8672rem"
            :src="require('@/assets/test.png')"
          />
          <div class="mask">
            <span class="center">{{
              item == 1 ? "新歌上架" : "本地热歌榜"
            }}</span>
            <p>
              <van-image
                width="10"
                height="10"
                :src="require('@/assets/s-play.png')"
              />
              <span>50.9万</span>
            </p>
          </div>
        </router-link>
      </div>
    </div>
    <template v-if="toplist && toplist.length > 0">
      <router-link v-for="item in toplist" :key="item.id" :to="'/detail/' + item.id">
        <h3 class="wrap mt10 mb20">{{item.name}}  <span v-if="item.ToplistType">({{item.ToplistType}})</span></h3>
        <div class="wrap">
          <div class="peakedness flex-bet">
            <div class="pR">
              <van-image
                radius="10px"
                width="2.8672rem"
                height="2.8672rem"
                :src="item.coverImgUrl ? item.coverImgUrl : require('@/assets/test.png')"
                class="mr10"
              />
              <div class="mask" v-if="false">
                <p>
                  <van-image
                    width="10"
                    height="10"
                    :src="require('@/assets/s-play.png')"
                  />
                  <span>2103.4万</span>
                </p>
              </div>
            </div>
            <div class="flex1 flex-bet flex-col">
              <h5>{{item.updateFrequency}}</h5>

              <p v-for="(track,index) in item.tracks" :key="index">{{index + 1}}.{{track.first}}<span class="author">-{{track.second}}</span></p>
            </div>
          </div>
        </div>
      </router-link>
    </template>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { inject, onMounted, ref, watch } from 'vue'
import { _toplist, _toplistDetail } from '@/server/apis'
import { Toast } from 'vant'
export default {
  setup () {
    const router = useRouter()
    const onClickLeft = () => router.go(-1)
    const onClickRight = () => {}
    const _ = inject('_')
    const toplist = ref([])
    onMounted(async () => {
      const res = await _toplistDetail()
      if (res.code === 200 && res.list.length > 0) {
        toplist.value = _.filter(res.list, (m) => m.tracks.length > 0)
      } else {
        Toast('获取排行榜失败！！！')
      }
    })
    return {
      onClickLeft,
      onClickRight,
      escape,
      toplist
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  padding: 0 16px;
  box-sizing: border-box;
}
.imgWrap() {
  width: 107.52px;
  height: 107.52px;
}
.recommend {
  width: calc(100vw);
  box-sizing: border-box;
  padding-left: 16px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  .item {
    .imgWrap();
    margin-right: 10px;
    position: relative;
  }
}

.peakedness {
  border-radius: 10px;
  background: white;
  width: 100%;
  margin-bottom: 8px;
  div.flex1 {
    box-sizing: border-box;
    padding: 12px 0;
    h5 {
      font-size: 14px;
    }
    p {
      font-size: 12px;
    }
    .author {
      color: #9898ac;
      font-size: 12px;
    }
  }
}
.mask {
  position: absolute;
  border-radius: 10px;
  color: white;
  top: 0;
  left: 0;
  .imgWrap();
  background: rgba(0, 0, 0, 0.243);
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
    span {
      margin-left: 18px;
      font-size: 8px;
    }
  }
}
</style>
