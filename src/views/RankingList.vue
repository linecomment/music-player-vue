<template>
  <div class="title">
    <van-tabs v-model:active="active" @click-tab="onClickTab">
      <van-tab title="最多人听"></van-tab>
      <van-tab title="最多人喜欢"></van-tab>
      <van-tab title="最新歌曲"></van-tab>
    </van-tabs>
  </div>
  <div class="rank-card-list" v-for="(item, i) in songList">
    <song-card :song="item"></song-card>
  </div>
</template>
  
  <script setup>
import SongCard from "@/components/SongCard.vue";
import { onMounted, computed, defineProps, ref, reactive } from "vue";
import { getRankSongList } from "@/api/song";
import { showToast } from "vant";
const song = {};
const active = ref(0);
const songList = reactive([]);
onMounted(() => {
  getRankSongList(active.value)
    .then((res) => {
      Object.assign(songList, res.data);
    })
    .catch((error) => {
      showToast("获取排行列表失败");
    });
});

const onClickTab = () => {
  getRankSongList(active.value)
    .then((res) => {
      Object.assign(songList, res.data);
    })
    .catch((error) => {
      showToast("获取排行列表失败");
    });
};
</script>
  
  <style lang="less" scoped>
.title {
  margin-bottom: 1rem;
}
.rank-card-list {
  align-items: center;
  .song-card {
    height: 2.5rem;
  }
}
</style>