<template>
  <div
    class="mp-music-player"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    @click="goToMusic"
    v-if="songList.length > 0"
  >
    <van-row>
      <van-col span="4">
        <img :src="songList[currentIndex].coverUrl" alt="../assets/title_logo.jpg" />
      </van-col>
      <van-col>
        <div class="content" span="12">
          <div class="title">{{ songList[currentIndex].title }}</div>
          <div class="tips">左/右滑动可以切换上/下首歌</div>
        </div>
      </van-col>
      <!-- 播放/暂停图标 -->
      <van-col offset="4" span="3">
        <div
          @click.stop="playMusic"
          :class="playIcon"
          style="font-size: 2.2rem; color: rgb(224, 96, 96)"
        ></div>
      </van-col>
      <!-- 歌单图标 -->
      <van-col span="3">
        <div
          @click.stop="goToSongList"
          class="iconfont icon-24gl-playlistMusic4"
          style="font-size: 2.2rem; color: rgb(224, 96, 96)"
        ></div>
      </van-col>
    </van-row>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { getSongList } from "@/api/song";
// const audio = ref(null);
const router = useRouter();
const store = useStore();
const currentIndex = ref(0);
const playIcon = ref("iconfont icon-24gl-playCircle");
const audioRef = computed(() => {
  return store.state.audio;
});
const audio = audioRef.value;
const songList = reactive([])
const pageParam = {
  currentIndex: 0,
  limit: 20,
  userId: store.state.userInfo.userId,
};
onMounted(() => {
  getSongListById()
  console.log(songList,'songList')
});

const getSongListById = () => {
  getSongList(pageParam)
    .then((res) => {
      console.log(res, "res");
      Object.assign(songList, res.data);
      audio.src = songList[0].songUrl;
    })
    .catch((error) => {
      console.log(error, "error");
    });
};

const playMusic = () => {
  if (audio.paused) {
    playIcon.value = "iconfont icon-24gl-pauseCircle";
    audio.play();
  } else {
    playIcon.value = "iconfont icon-24gl-playCircle";
    audio.pause();
  }
};
const goToSongList = ()=>{
  // 跳转歌单
}
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
      currentIndex.value--;
      if (currentIndex.value < 0) {
        currentIndex.value = songList.length - 1;
      }
      audio.src = songList[currentIndex.value].songUrl;

      playIcon.value = "iconfont icon-24gl-pauseCircle";
      audio.play();
    } else {
      console.log("下一首");
      currentIndex.value++;
      if (currentIndex.value >= songList.length) {
        currentIndex.value = 0;
      }
      audio.src = songList[currentIndex.value].songUrl;
      playIcon.value = "iconfont icon-24gl-pauseCircle";
      audio.play();
    }
    startX = null; // 清空起始触摸点
  }
};
const touchEnd = () => {
  startX = null; // 清空起始触摸点
};
// const id = 1;
const goToMusic = () => {
  if(songList.length === 0){
    return 
  }
  router.push('/music/'+ songList[currentIndex.value].id);

};
</script>

<style lang="less" scoped>
.mp-music-player {
  background-color: rgb(48, 47, 47);
  img {
    height: 2.6rem;
    width: 2.6rem;
    border-radius: 50% 50%;
  }
  .content {
    .title {
      color: rgb(224, 96, 96);
      font-size: 1.2rem;
      margin-top: 0;
    }
    .tips {
      color: rgb(255, 254, 254);
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