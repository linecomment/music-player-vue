<template>
  <div class="sc-container" @click="goToMusic">
    <div class="sc-song-info">
      <div class="sc-image">
        <van-image width="2.5rem" height="2.5rem" :src="song.coverUrl" />
      </div>
      <div class="sc-song-detail">
        <div class="sc-song-name">{{ song.title }}</div>
        <div class="sc-author-name">{{ song.artist }}</div>
      </div>
    </div>
    <van-divider></van-divider>
  </div>
</template>
  <script setup>
import { ref, defineProps, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
const props = defineProps({
  song: {
    Type: Object,
    require: true,
  },
});
const store = useStore();
const userId = computed(() => {
  return store.state.userInfo.userId;
});
onMounted(() => {
  console.log(props.song)
});
const router = useRouter();

const id = 1;
const goToMusic = () => {
  router.push(`/music/${id}`);
};
</script>
  
  <style lang="less" scope>
.sc-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  background-color: rgb(227, 222, 222);
  .van-divider {
    margin-top: 0rem;
  }

  .sc-song-info {
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    .sc-song-detail {
      display: flex;
      align-items: end;
      width: 10rem;
      padding-left: 8rem;
      .sc-song-name {
        font-size: 1.2rem;
        font-family: STXingkai;
      }
      .sc-author-name {
        padding-left: 0.2rem;
        font-size: 0.5rem;
        font-family: YouYuan;
        color: #999999;
      }
    }
  }

  .sc-buttons {
    display: flex;
  }
}
</style>