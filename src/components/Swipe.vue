<template>
  <van-swipe class="my-swipe" :autoplay="3000" >
    <van-swipe-item v-for="image in imageList" :key="image">
      <van-image height="100%" width="100%" :src="image"></van-image>
    </van-swipe-item>
  </van-swipe>
</template>

<script setup>
import {reactive} from 'vue'
const imageList = reactive([
  '/music/1.png','/music/2.png','/music/3.png','/music/4.png'
])
</script>

<style lang="less" scoped>
.my-swipe {
  height: 30%;
  .van-swipe-item {
    width:100%;
    height: 12rem;
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
 
}
</style>