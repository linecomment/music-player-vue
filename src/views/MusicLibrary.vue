<template>
  <Swpie></Swpie>
  <div class="title">为你推荐</div>
  <div class="parent">
    <song-genre ></song-genre>
    <song-genre ></song-genre>
    <song-genre ></song-genre>
    <song-genre ></song-genre>
    <song-genre ></song-genre>
  </div>
</template>

<script setup>
import Swpie from "@/components/Swipe.vue";
import SongGenre from "@/components/SongGenre.vue";
</script>

<style lang="less" scoped>
.title {
  height: 3rem;
  font-size: 1.6rem;
  font-family: cursive;
  font-weight: bold;
}

.parent {
    display: flex;
    flex-wrap: wrap;
  }

  .song-genre {
    width: 50%;
  }
</style>