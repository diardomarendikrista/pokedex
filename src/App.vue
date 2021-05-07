<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import Home from '@/views/Home.vue'
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Home,
    Navbar
  },
  created () {
    document.title = "Pokedex";
  }
}
</script>

<style>
body {
  background: radial-gradient(#156F99, #00072E);
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
}
</style>