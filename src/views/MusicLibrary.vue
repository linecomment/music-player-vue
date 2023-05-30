<template>
  <Swpie></Swpie>
  <div class="title">为你推荐</div>
  <div class="parent">
    <template v-for="(item, i) in genreList">
      <template v-if="i % 2 === 0">
        <div class="row">
          <song-genre :genreType="genreList[i].id"></song-genre>
          <template v-if="(i + 1) < genreList.length">
            <song-genre :genreType="genreList[i + 1].id"></song-genre>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive,defineProps,onMounted } from "vue";
import { useStore } from 'vuex'
import Swpie from "@/components/Swipe.vue";
import SongGenre from "@/components/SongGenre.vue";
const store = useStore()
const props = defineProps({
  genreType:{
    type:String,
    required:true
  },
});

let songList = []
onMounted(()=>{
  //todo 获取歌曲信息
  songList = store.state.songList
})

const type = ref(0);
// 流派列表
const genreList = [
  { id: 0, genre: "流行" },
  { id: 1, genre: "说唱" },
  { id: 2, genre: "国风" },
  { id: 3, genre: "爵士" },
];
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

.row {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding:0.5rem;
}
.song-genre {
  width: calc(50% - 8px);
}
</style>