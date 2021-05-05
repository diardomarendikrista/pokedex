<template>
  <div @click="goToDetail(pokemon.detail.name)" class="card">
    <div class="card-img-container">
      <img :src="pokemon.detail.sprites.other.dream_world.front_default" class="card-img-top" :alt="pokemon.detail.name">
    </div>
    <div class="card-body">
      <p class="card-title">{{pokemon.detail.name.toUpperCase()}}</p>
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
  methods: {
    goToDetail (name) {
      this.$router.push(`/${name}`)
    },
  }
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
  width: 16rem;
}

.card:hover {
  box-shadow: 0 0 10px 2px #B0DFF9;
  cursor: pointer;
  transition: 100ms;
}

.card:hover .card-img-top {
  transform: scale(1.0);
  transition: 400ms;
}

.card:hover .card-title {
  padding-left: 25px;
  transition: 400ms;
}

.card-body {
  padding: 10px;
  padding-left: 20px;
}

.card-img-container {
  padding-top: 20px;
  overflow: hidden;
}

.card-img-top {
  transform: scale(0.8);
  height: 200px;
  transition: 400ms;
}

.card-title {
  font-size: 24px;
  font-weight: bold;
  transition: 400ms;
  padding-left: 10px;
  margin: 0px;
  letter-spacing: 1px;
}

@media only screen and (max-width: 768px) {
  .card {
    width: 9rem;
    margin: 3px;
  }
  .card:hover .card-title {
    padding-left: 15px;
  }
  .card-title {
    font-size: 14px;
    padding-left: 5px;
  }
  .card-img-top {
    height: 100px;
  }
}
</style>
