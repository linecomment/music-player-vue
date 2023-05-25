<template>
  <div>
    <van-sticky :offset-top="0">
      <Header></Header>
    </van-sticky>
    <Main></Main>
      <music-player></music-player>
    <van-sticky :offset-bottom="50" position="bottom">
      <Footer></Footer>
    </van-sticky>
  </div>
</template>
<script setup>
import Header from "@/views/header/Header.vue";
import Main from "@/views/main/Main.vue";
import Footer from "@/views/footer/Footer.vue";
import MusicPlayer from "@/components/MusicPlayer.vue";
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<style lang="less" scoped>
.music-player{
  position: relative;
  margin-bottom: 50rem;
}
</style>