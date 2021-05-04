<template>
  <div class="card" style="width: 16rem;">
    <div class="card-img-container">
      <img :src="pokemon.detail.sprites.other.dream_world.front_default" class="card-img-top" :alt="pokemon.detail.name">
    </div>
    <div class="card-body">
      <h5 class="card-title">{{pokemon.detail.name}}</h5>
      <p class="card-text">lorem ipsum</p>
      <a href="#" class="btn btn-info">Detail Pokemon</a>
    </div>
  </div>
</template>

<script>

export default {
  props: ['pokemon'],
  data () {
    return {
    }
  },
}
</script>

<style scoped>
.card {
  background-color: #0A141E;
  border-color: #466E9A;
  color: #fff;
  border-radius: 20px;
  margin: 10px;
  transition: 100ms;
}
.card:hover {
  box-shadow: 0 0 10px 2px #B0DFF9;
  transition: 100ms;
}
.card:hover .card-img-top {
  transform: scale(1.1);
  transition: 200ms;
}

.card-img-container {
  padding-top: 20px;
  overflow: hidden;
}
.card-img-top {
  transform: scale(0.9);
  height: 200px;
  transition: 200ms;
}
</style>
