<template>
  <div class="image-grid" >
    <van-image  :src=genreUrl width="100%" height="100%" @click="goToGenre"></van-image>
  </div>

</template>

<script setup>
import { computed,onMounted } from "vue";
import {useRouter} from 'vue-router'
import { useStore } from 'vuex'
 const store = useStore()
 onMounted(()=>{
  // 获取类别
 })
const props = defineProps({
  genreType:{
    Type:String,
    require:true
  },
  genreUrl:{
    Type:String,
    require:true
  }
})

const router = useRouter()
const musicUrl = computed(() => {
  return `/genre/${props.genreType}`;
});

const goToGenre = ()=>{
  router.push(musicUrl.value)
}
</script>

<style lang="less" scoped>
.image-grid{
  width: 50%;
  height: 50%;
}
</style>