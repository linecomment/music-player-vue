<template>
  <router-view></router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter,useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
onMounted(() => {

})
</script>

<style>

</style>