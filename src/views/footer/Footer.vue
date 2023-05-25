<template>
  <div class="line-footer">
    <music-player v-show="route.path !== '/profile'"></music-player>
    <van-tabbar v-model="active" active-color="#ee0a24">
      <van-tabbar-item
        @click="toMusicLib(1)"
        name="music"
        icon="music-o"
        >曲库</van-tabbar-item
      >
      <van-tabbar-item
        @click="toRankingList(2)"
        name="bar-chart"
        icon="bar-chart-o"
        >排行榜</van-tabbar-item
      >
      <van-tabbar-item @click="toSongList(3)" name="bars" icon="bars"
        >歌单</van-tabbar-item
      >
      <van-tabbar-item @click="toProfile(4)" name="user" icon="user-circle-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>
<script setup>
import { useRouter,useRoute } from "vue-router";
import MusicPlayer from "@/components/MusicPlayer.vue";
const router = useRouter();
const route = useRoute();
const toMusicLib = (i) => {
  console.log(i);
  router.push("/");
};

const toRankingList = () => {
  router.push("/rank");
};
const toSongList = () => {
  router.push("/song");
};
const toProfile = () => {
  router.push("/profile");
};
</script>

<style lang="less" scoped>
.line-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

.music-player {
  position: relative;
  z-index: 1;
}

.van-tabbar {
  position: relative;
  z-index: 0;
}
.van-tabbar-item--active .van-tabbar-item__icon {
  color: #ee0a24;
}
</style>