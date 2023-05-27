<template>
  <div class="sc-container" @click="goToMusic">
    <van-row>
      <!-- 歌曲图片
      <van-col span="4" class="song-image">
        <img src="../assets/title_logo.jpg" alt="" />
      </van-col> -->

      <!-- 歌曲名 -->
      <van-col class="song-name">
        <div>忘情水</div>
      </van-col>
      <van-col class="song-author" style="align-items:center;">
        刘德华.忘情水
      </van-col>
      <!-- 歌曲播放按钮 -->
      <van-col offset="10">
        <div
          @click="playMusic"
          :class="playIcon"
          style="font-size: 2.2rem"
        ></div>
      </van-col>
      <!-- 歌曲喜欢状态 -->
      <van-col offset="1" class="like">
        <div
          @click.stop="toggleLike"
          :style="{
            fontSize: '2rem',
            color: likeStyleColor,
            fontWeight: '500',
          }"
          class="iconfont icon-xihuan"
        ></div
      ></van-col>
    </van-row>
    <van-divider></van-divider>
    <audio
      ref="audio"
      controls="controls"
      :src="url"
      :style="{ display: 'none' }"
    ></audio>
  </div>
</template>
  <script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const audio = ref(null);
const router = useRouter();
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
const likeStyleColor = ref("black");
const toggleLike = () => {
  if (likeStyleColor.value === "black") {
    likeStyleColor.value = "red";
    //todo 添加收藏/喜欢
  } else {
    likeStyleColor.value = "black";
    //todo 移除收藏/喜欢
  }
};
const id = 1;
const goToMusic = () => {
  router.push(`/music/${id}`);
};
</script>
  
  <style lang="less" scope>
.sc-container {
  
  height: 100%;



  .song-image {
    width: 2.6rem;
    height: 2.6rem;
  }
  img {
    width: 3rem;
    height: 3rem;
    border-radius: 75% 75%;
  }

  .song-name {
    height: 100%;
    font-size: 1.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .song-author {
    height: 100%;
    text-align: center;
    color: red;
  }
  .van-divider {
    align-items: end;
    text-align: end;
    margin-top: 0rem;
  }
}
</style>