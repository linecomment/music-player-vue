<template>
  <div class="image-grid">
    <van-image src="/music/cover/ldh_忘情水.jpg" width="100%" height="100%" @click="goToSong"></van-image>
  </div>
</template>

<script setup>
import { computed } from "vue";
import {useRouter} from 'vue-router'
const id = 1;
const router = useRouter()
const musicUrl = computed(() => {
  return `/music/${id}`;
});

const goToSong = ()=>{
  router.push(musicUrl.value)
}
</script>

<style lang="less" scoped>
.image-grid{
  width: 50%;
  height: 50%;

}
</style>