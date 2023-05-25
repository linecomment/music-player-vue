<template>
  <div class="line-header">
    <van-nav-bar
      title="Music Player"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-image
          width="2rem"
          height="2rem"
          round
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
        />
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push('/profile')
}
</script>

<style>
</style>