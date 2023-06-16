<template>
  <div class="l-genre">
    <van-image width="100%" height="12rem" :src="genre.genreUrl" ></van-image>
    <div class="genre-title"><span> {{ genre.name }} 音乐</span></div>
    <div class="genre-song-list" v-for="(item,i) in songList">
      <song-card :song="item"></song-card>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, reactive } from "vue";
import { useRouter, useRoute } from "vue-router";
import SongCard from "@/components/SongCard.vue";
import { getSongByGenre,getGenreList } from '@/api/song'
import { useStore } from "vuex";
import {showToast} from 'vant'
const route = useRoute();
const store = useStore()

const songList = reactive([])
onMounted(() => {
  // todo 获取流派歌曲列表
  getSongByGenre(route.params.id).then(res=>{
    Object.assign(songList,res.data)
  }).catch(error=>{
    showToast('获取流派歌曲列表失败')
  })
  // 如果 store 中没有 genreList 数据，则从接口中获取并保存到 store 中
  if (!store.state.genreList || !store.state.genreList.length) {
    getGenreList().then((res) => {
      store.commit('SET_GENRE_LIST',res.data)
    });
  }  
});
const genre = computed(()=>{
  const genres = store.state.genreList || [];
  return genres.find((item) => item.id === parseInt(route.params.id)) || {};
})
</script>

<style lang="less" scoped>
.l-genre {
  height: 100%;
  background-color: rgba(255, 255, 255, 0.995);
  .genre-title {
    padding-top: 1rem;
    font-size: 1rem;
    text-align: center;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 1px;
      background-color: #dd5050;
      z-index: 0;
    }
    span {
      display: inline-block;
      z-index: 1;
      margin-bottom: 0.5rem;
    }
  }
  .genre-song-list {
    margin-top: 0rem;
  }
}
</style>