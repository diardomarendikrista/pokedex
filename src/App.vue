<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import Home from '@/views/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style>
body {
  background: #00072E;
  font-family: 'Roboto', sans-serif;
}
</style>
