<template>
  <div class="sc-container" @click="goToMusic">
    <div class="sc-song-info">
      <div class="sc-image">
        <van-image width="2.5rem" height="2.5rem" :src="song.coverUrl" />
      </div>
      <div class="sc-song-detail">
        <div class="sc-song-name">{{ song.title }}</div>
        <div class="sc-author-name">{{ song.artist }}</div>
      </div>
      <div class="sc-buttons">
        <div
          class="sc-player"
          @click="playMusic"
          :class="playIcon"
          style="font-size: 2.2rem"
        ></div>
        <div
          @click.stop="toggleLike"
          :style="{
            fontSize: '2rem',
            color: likeStyleColor,
            fontWeight: '500',
          }"
          class="iconfont icon-xihuan like-btn"
        ></div>
      </div>
    </div>

    <van-divider></van-divider>
    <audio
      ref="audio"
      controls="controls"
      :src="song.songUrl"
      :style="{ display: 'none' }"
    ></audio>
  </div>
</template>
  <script setup>
import { ref, defineProps, onMounted } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  song: {
    Type: Object,
    require: true,
  },
});
onMounted(() => {
  console.log(props.song, "props song");
});
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
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  .van-divider {
    margin-top: 0rem;
  }

  .sc-song-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    .sc-song-detail {
      display: flex;
      .sc-song-name {
        font-size: 1.2rem;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
      .sc-author-name {
        font-size: 1rem;
        color: #999999;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .sc-buttons {
    display: flex;
    .like-btn {
      font-size: 1.8rem;
      transition: all 0.3s ease-in-out;
      cursor: pointer;
    }

    .like-btn:hover {
      transform: scale(1.2);
    }
  }
}
</style>