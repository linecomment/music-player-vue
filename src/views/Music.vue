﻿<template>
  <Header></Header>
  <div class="container">
    <div class="music-info">
      <van-image
        round
        class="ablum-image"
        :src="songList[currentIndex].coverUrl"
        :class="{ 'album-cover': !audio.paused, paused: audio.paused }"
      ></van-image>
    </div>
    <div class="singer-info">
      <van-row justify="space-between">
        <van-col offset="2">
          <div class="song-name">
            {{ songList[currentIndex].title }}
          </div></van-col
        >
        <!-- 喜欢图标 -->
        <van-col class="like">
          <div
            @click="toggleLike"
            :style="{
              fontSize: '2rem',
              color: likeStyleColor,
              fontWeight: '500',
            }"
            class="iconfont icon-xihuan"
          ></div
        ></van-col>
      </van-row>
    </div>
    <!-- 底部播放 -->
    <div class="player">
      <!-- 进度条 -->
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
          ></div>
        </van-col>
        <van-col>
          <div
            @click="nextSong"
            class="iconfont icon-xiayigexiayishou"
            style="font-size: 2.2rem"
          ></div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>
  
<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { showToast } from "vant";
import { getSongList, modifySongLike } from "@/api/song";
import Header from "@/views/header/Header.vue";
const playIcon = ref("iconfont icon-24gl-playCircle");
// const likeStyleColor = ref("black");
const store = useStore();
const route = useRoute();
const currentIndex = ref(0);

const songList = reactive([
  {
    // id: "1",
    // artist: "音阙诗听",
    // songGenre: 1,
    // albumId: "1",
    // coverUrl: "http://localhost:8888/music/img/1.png",
    // duration: "00:02:53",
    // title: "红昭愿",
    // lyrics: "http://localhost:8888/music/lyrics/1.lrc",
    // releaseTime: "2023-05-31T05:11:09.000+00:00",
    // playTimes: "0",
    // songUrl: "http://localhost:8888/music/songs/红昭愿.mp3",
    // uploader: null,
    // like: 1,
  },
]);
const pageParam = {
  currentIndex: 0,
  limit: 20,
  userId: store.state.userInfo.userId,
};
const audioRef = computed(() => {
  return store.state.audio;
});

const likeStatus = computed(() => {
  return songList[currentIndex.value].like || 0;
});
const likeStyleColor = computed(() => {
  return likeStatus.value ? "red" : "black";
});

const audio = audioRef.value;
onMounted(() => {
  getSongListById();
});
const getSongListById = () => {
  getSongList(pageParam)
    .then((res) => {
      Object.assign(songList, res.data);
      currentIndex.value = songList.findIndex(
        (item) => item.id === route.params.id
      );
      audio.src = songList[currentIndex.value].songUrl;
      console.log(likeStatus)
    })
    .catch((error) => {
      console.log(error, "error");
    });
};
watch(
  () => currentIndex,
  (val) => {
    audio.src = songList[newVal].songUrl;
    store.dispatch("setAudio", audio);
  }
);

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

const toggleLike = () => {
  if (likeStatus.value === 0) {
    showToast("收藏成功~");
  } else {
    showToast("取消成功~");
  }
  modifySongLike(store.state.userInfo.userId, songList[currentIndex.value].id)
    .then((res) => {})
    .catch((error) => {
      showToast("更新喜欢状态失败");
    });
};
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
  audio.src = songList[currentIndex.value].songUrl;
  state.progress = 0;
  playIcon.value = "iconfont icon-24gl-pauseCircle";
  audio.play();
};
const nextSong = () => {
  currentIndex.value++;
  if (currentIndex.value >= songList.length) {
    currentIndex.value = 0;
  }
  audio.src = songList[currentIndex.value].songUrl;
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

let timer = setInterval(() => {
  state.currentTime = formatTime(audio.currentTime);
  store.dispatch("setAudio", audio);
}, 1000);

onUnmounted(() => {
  // 清除定时器
  clearInterval(timer);
});
</script>
  
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;

  .music-info {
    width: 100%;
    height: 100%;
    text-align: center;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.064);
    background-color: rgb(252, 117, 117);

    .ablum-image {
      width: 20rem;
      height: 20rem;
      object-fit: cover;
      border-radius: 50%;
      padding-top: 1rem;
      padding-bottom: 1rem;
    }
    .album-cover {
      animation: rotate 5s linear infinite;
    }

    @keyframes rotate {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
    @keyframes rotate-paused {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(calc(360deg * (var(--pause-rotation) / 100)));
      }
    }
    .album-cover {
      --pause-rotation: 0;
      animation: rotate var(--rotate-duration, 5s) linear infinite;
      animation-play-state: var(--rotate-play-state, running);
    }

    .album-cover.paused {
      animation-play-state: paused;
      animation-name: rotate-paused;
      --pause-rotation: var(--current-rotation);
    }
  }

  .singer-info {
    width: 100%;
    margin-top: 2rem;
    margin-right: 1rem;
    .song-name {
      font-family: cursive;
      font-size: 2rem;
      align-items: end;
    }
    .van-row {
      align-items: center;
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
}
</style>