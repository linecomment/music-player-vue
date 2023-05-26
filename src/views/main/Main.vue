<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
onMounted(() => {
  console.log(router)
  console.log(router.defineEmits)
  console.log(route.path)
})
</script>

<style>

</style>