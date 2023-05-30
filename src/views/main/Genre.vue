<template>
  <div class="l-genre">
    <van-image
      width="100%"
      height="12rem"
      src="/music/cover/ldh_忘情水.jpg"
    />
    <div class="genre-title">
        流行风
    </div>
    <van-divider></van-divider>

    <div class="genre-song-list">
        <song-card></song-card>
    </div>
  </div>
  {{ genreId }}
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import SongCard from '@/components/SongCard.vue'
const route = useRoute();
const genreId = computed(() => {
  return `${route.params.id}`;
});

onMounted(() => {
  // todo 获取专辑歌曲列表
});
</script>

<style lang="less" scoped>
.l-genre{
    background-color: red;
    height: 100%;
    .genre-title{
        font-size: 1rem;
        text-align: center;
        margin-bottom: 1rem;
    }
    .genre-song-list{
        margin-top: 2rem;
    }
}
</style>