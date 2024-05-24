<script setup lang="ts">
  import HButton from './components/HButton/HButton.vue'
// import { onMounted, getCurrentInstance } from 'vue';

// onMounted(() => {
//   getCurrentInstance()?.appContext.config.globalProperties.$echo()
// })
</script>

<template>
  <h1>Ppsp-UI</h1>
  <h-button type="primary">点击</h-button>
  <h-button type="default">点击</h-button>
  <h-button type="success">点击</h-button>
  <h-button type="info">点击</h-button>
  <h-button type="warning">点击</h-button>
  <h-button type="danger">点击</h-button>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
