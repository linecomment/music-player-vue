<template>
  <Header></Header>
  <!-- <p>{{ route.params.id }}</p> -->
  <div class="container">
    <div class="music-info">
      <van-image :src="songList[currentIndex].coverUrl"></van-image>
    </div>
    <div class="singer-info">
      <div class="song-name">{{ songList[currentIndex].musicName }}</div>
      <div class="artist-name">{{ songList[currentIndex].author }}</div>
    </div>
    <div class="player">
      <div class="slider">
        <div class="time-info">
          {{ state.currentTime }}
        </div>
        <van-slider
          v-model="state.progress"
          max="100"
          @change="seekTo"
          active-color="#ee0a24"
          button-szie="2px"
        >
          <template #button>
            <van-button round block size="mini"></van-button>
          </template>
        </van-slider>
        <div class="time-info">
          {{ state.duration }}
        </div>
      </div>
      <van-row justify="center" gutter="40">
        <van-col>
          <div
            @click="previousSong"
            class="iconfont icon-shangyishoushangyige"
            style="font-size: 2.2rem"
          ></div>
        </van-col>
        <van-col>
          <div
            @click="togglePlay"
            :class="playIcon"
            style="font-size: 2.2rem"
          >
        </div>
        </van-col>
        <van-col>
          <div
            @click="nextSong"
            class="iconfont icon-xiayigexiayishou"
            style="font-size: 2.2rem"
          ></div>
        </van-col>
        <!-- <van-col span="8">
          <div class="time-info" style="font-size:small; color:rgba(21, 22, 22, 0.466)">
            {{ state.currentTime }} / {{ state.duration }}
          </div>
        </van-col> -->
      </van-row>
    </div>
  </div>
</template>
  
<script setup>
import { ref, reactive, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import Header from "@/views/header/Header.vue";
const route = useRoute();
const playIcon = ref("iconfont icon-24gl-playCircle");
const currentIndex = ref(0);

// 歌曲列表
const songList = [
  {
    musicId: "122",
    musicName: "忘情水",
    coverUrl: "/music/cover/ldh_忘情水.jpg",
    author: "刘德华",
    audioUrl: "/music/李翔宇-起风了.mp3",
  },
  {
    musicId: "122",
    musicName: "忘情水",
    coverUrl: "/music/cover/ldh_忘情水.jpg",
    author: "刘德华2",
    audioUrl: "/music/李翔宇-起风了.mp3",
  },
];
let audio = new Audio();
audio.src = songList[0].audioUrl;

const state = reactive({
  progress: 0,
  currentTime: "00:00",
  duration: "00:00",
});

audio.addEventListener("canplay", () => {
  state.duration = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  state.progress = (audio.currentTime / audio.duration) * 100;
  state.currentTime = formatTime(audio.currentTime);
});

const togglePlay = () => {
  if (audio.paused) {
    playIcon.value = "iconfont icon-24gl-pauseCircle";
    audio.play();
  } else {
    playIcon.value = "iconfont icon-24gl-playCircle";
    audio.pause();
  }
};
const previousSong = () => {
  //
  currentIndex.value--;
  if (currentIndex.value < 0) {
    currentIndex.value = songList.length - 1;
  }
  audio.src = songList[currentIndex.value].audioUrl;
  state.progress = 0;
  playIcon.value = "iconfont icon-24gl-pauseCircle";
  audio.play();
};
const nextSong = () => {
  currentIndex.value++;
  if (currentIndex.value >= songList.length) {
    currentIndex.value = 0;
  }
  audio.src = songList[currentIndex.value].audioUrl;
  state.progress = 0;
  playIcon.value = "iconfont icon-24gl-pauseCircle";
  audio.play();
};

const formatTime = (time) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  return `${minutes}:${seconds}`;
};

const seekTo = () => {
  audio.currentTime = (state.progress / 100) * audio.duration;
};

setInterval(() => {
  state.currentTime = formatTime(audio.currentTime);
}, 1000);

onUnmounted(() => {
  // 清除定时器
  clearInterval();
});
</script>
  
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
}

.music-info {
  width: 100%;
  height: 100%;
}

.singer-info {
  text-align: left !important;
  margin-top: 1rem;

  .song-name {
    font-size: 20px;
    font-weight: bold;
  }

  .artist-name {
    font-size: 16px;
    color: grey;
  }
}

.player {
  position: fixed;
  bottom: 0;
  height: 10%;
  width: 100%;
  background-color: #fff;
  padding: 3rem;
  .slider {
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    .time-info {
      font-size: small;
      color: #0f0e0e7c;
      padding: 0.5rem;
    }
  }
}
</style>