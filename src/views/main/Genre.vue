<template>
  <div class="l-genre">
    <van-image width="100%" height="12rem" src="/music/cover/ldh_忘情水.jpg" />
    <div class="genre-title"><span>流行风</span></div>
    <div class="genre-song-list">
      <song-card></song-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import SongCard from "@/components/SongCard.vue";
const route = useRoute();
const genreId = computed(() => {
  return `${route.params.id}`;
});

onMounted(() => {
  // todo 获取专辑歌曲列表
});
</script>

<style lang="less" scoped>
.l-genre {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.995);
  .genre-title {
    padding-top: 1rem;
    font-size: 1rem;
    text-align: center;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #dd5050;
      z-index: 0;
    }
    span {
      display: inline-block;
      z-index: 1;
      margin-bottom: 0.5rem;
    }
  }
  .genre-song-list {
    margin-top: 2rem;
  }
}
</style>