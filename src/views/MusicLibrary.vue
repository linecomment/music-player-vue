<template>
  <Swpie></Swpie>
  <div class="parent">
  <div class="title">为你推荐</div>

    <template v-for="(item, i) in genreList">
      <template v-if="i % 2 === 0">
        <div class="row">
          <song-genre :genreType="genreList[i].id" :genreUrl="genreList[i].genreUrl"></song-genre>
          <template v-if="i + 1 < genreList.length">
            <song-genre :genreType="genreList[i + 1].id" :genreUrl="genreList[i+1].genreUrl"></song-genre>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, onMounted, computed } from "vue";
import { useStore } from "vuex";
import Swpie from "@/components/Swipe.vue";
import SongGenre from "@/components/SongGenre.vue";
import { getGenreList } from "@/api/song";
const store = useStore();

const pageParam = {
  currentIndex: 0,
  limit: 10,
  // todo
  userId: 1662998854292762624n,
};


onMounted(() => {
  // 获取歌曲信息
  store.dispatch("getSongList", pageParam);
  // 获取流派信息
  store.dispatch('getGenreList')
});
// 流派列表
const genreList = store.state.genreList

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
  background-color: rgb(236, 231, 231);
}
.row {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem;
}

.song-genre {
  width: calc(50% - 8px);
  
}
</style>