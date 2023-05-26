<template>
  <div class="title">最多人听</div>
  <div class="card-list">
    <song-card></song-card>
    
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>
    <song-card></song-card>

  </div>
</template>
  
  <script setup>
import SongCard from "@/components/SongCard.vue";
</script>
  
  <style lang="less" scoped>
  .title{
    display: flex;
    height: 2rem;
    align-items: center;
    padding-left: 1rem;
    font-size: 1.5rem;
  }
  .card-list {
    align-items: center;
  }
  
</style>