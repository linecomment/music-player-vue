<template>
  <van-grid clickable :column-num="2">
    <van-grid-item :to="musicUrl">
      <van-image src="/music/cover/ldh_忘情水.jpg" width="100%" height="100%"></van-image>
    </van-grid-item>
    <van-grid-item icon="home-o" text="路由跳转" :to="musicUrl">
      <van-image src="/music/cover/ldh_忘情水.jpg"></van-image>
    </van-grid-item>
  </van-grid>
</template>

<script setup>
import { computed } from "vue";
const id = 1;
const musicUrl = computed(() => {
  return `/music/${id}`;
});
</script>

<style>
</style>