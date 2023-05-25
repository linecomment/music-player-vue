<template>
  <div
    class="line-player"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    @click="goToMusic"
  >
    <van-row>
      <van-col span="4">
        <img src="../assets/title_logo.jpg" alt="" />
      </van-col>
      <van-col>
        <div class="content" span="12">
          <div class="title">忘情水</div>
          <div class="tips">左/右滑动可以切换上/下首歌</div>
        </div>
      </van-col>
      <van-col offset="4" span="3">
        <div
          @click="playMusic"
          :class="playIcon"
          style="font-size: 2.2rem"
        ></div>
      </van-col>
      <van-col span="3">
        <div
          @click="songList"
          class="iconfont icon-24gl-playlistMusic4"
          style="font-size: 2.2rem"
        ></div>
      </van-col>
    </van-row>
    <audio
      ref="audio"
      controls="controls"
      :src="url"
      :style="{ display: 'none' }"
    ></audio>
    <!-- <audio controls>
      <source :src="url"/>
    </audio> -->
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from 'vue-router';
const audio = ref(null);
const router = useRouter()
const playIcon = ref("iconfont icon-24gl-playCircle");
const url = "/music/李翔宇-起风了.mp3";
const playMusic = () => {
  if (audio.value.paused) {
    playIcon.value = "iconfont icon-24gl-pauseCircle";
    audio.value.play();
  } else {
    playIcon.value = "iconfont icon-24gl-playCircle";
    audio.value.pause();
  }
  console.log("playMusic");
};
const songList = () => {};

let startX = null; // 记录起始触摸点
const touchStart = (e) => {
  startX = e.touches[0].pageX;
};
const touchMove = (e) => {
  if (!startX) return;
  const moveX = e.touches[0].pageX - startX;
  if (Math.abs(moveX) > 50) {
    // 切换歌曲操作
    if (moveX > 0) {
      console.log("上一首");
    } else {
      console.log("下一首");
    }
    startX = null; // 清空起始触摸点
  }
};
const touchEnd = () => {
  startX = null; // 清空起始触摸点
};
const id = 1
const goToMusic = ()=>{
  router.push(`/music/${id}`)
}
</script>

<style lang="less" scope>
.line-player {
  img {
    height: 2.6rem;
    width: 2.6rem;
    border-radius: 50% 50%;
  }
  .content {
    .title {
      font-size: 1.2rem;
      margin-top: 0;
    }
    .tips {
      color: grey;
      padding-bottom: 0;
      margin-bottom: 0.1rem;
    }
    font-size: 0.2rem;
  }
  i {
    height: 2.6rem;
    width: 2.6rem;
  }
}
</style>