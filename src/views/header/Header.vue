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
          :src=avatar
        />
      </template>
    </van-nav-bar>
  </div>
</template>

<script setup>
import { useStore} from 'vuex'
import {computed,onMounted} from 'vue'
import { useRouter } from 'vue-router';
const store = useStore()
const avatar = computed(()=>{
  return store.state.userInfo.avatarUrl
})
onMounted(()=>{
  console.log(store.state.userInfo.avatarUrl)

})
const router = useRouter()
const onClickLeft = () => history.back();
const onClickRight = () => {
  router.push('/profile')
}
</script>

<style lang="less" scoped>
.line-header{
  background-color: red;
  van-nav-bar{
  background-color: red;
  }
  img{
    width: 2rem;
    height: 2rem;
  }
}
</style>