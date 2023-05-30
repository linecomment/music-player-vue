<template>
  <Swpie></Swpie>
  <div class="title">为你推荐</div>
  <div class="parent" v-for="(item, i) in genreList">
    <song-genre :genreType=item.id></song-genre>
  </div>
</template>

<script setup>
import Swpie from "@/components/Swipe.vue";
import SongGenre from "@/components/SongGenre.vue";
import { ref, reactive,defineProps } from "vue";
const props = defineProps({
  genreType:{
    type:String,
    required:true
  },
});

const type = ref(0);
// 流派列表
const genreList = [
  { id: 0, genre: "流行" },
  { id: 1, genre: "说唱" },
  { id: 2, genre: "国风" },
  { id: 4, genre: "爵士" },
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

.song-genre {
  width: 50%;
}
</style>