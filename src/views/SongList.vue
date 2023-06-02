<template>
  <div class="sl-title">
    <span>我的歌单</span>
  </div>
  <div class="sl-song-list" v-for="(item,i) in songList">
    <song-card :song="item"></song-card>
  </div>
</template>
  
<script setup>
import { reactive, onMounted } from "vue";
import { useStore } from "vuex";
import { getFavorite } from "@/api/user";
import SongCard from '@/components/SongCard.vue'
const store = useStore();
const songList = reactive([]);
onMounted(() => {
  const userId = store.state.userInfo.userId;
  getFavorite(userId).then((res) => {
    console.log(songList,'songlist')
      Object.assign(songList, res.data);
    })
    .catch((error) => {
      console.log("获取喜欢列表失败");
    });
});
</script>
  
  <style>
</style>