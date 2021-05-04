<template>
  <div class="container-fluid">
    <center>
      <div class="title-background">
        <p class="title">Pokédex</p>
      </div>
    </center>
    <div class="container">
      <div class="d-flex flex-wrap  justify-content-center">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.url"
          :pokemon="pokemon"
        />
      </div>
      <div class="btn-more-container">
        <button class="btn btn-outline-primary btn-more" v-on:click="fetchMore(next)">See more</button>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    PokemonCard
  },
  methods: {
    fetchMore (next) {
      this.$store.dispatch('fetchMore', next)
    }
  },
  created () {
    this.$store.dispatch('fetchPokemon')
  },
  computed: {
    ...mapState(
      [
        'pokemons',
        'next'
      ]
    )
  }
}
</script>

<style scoped>
.btn-more-container {
  text-align: center;
}
.btn-more {
  width: 75%;
  margin: 20px;
  border-radius: 20px;
}
.title-background {
  background-image: url('../assets/images/title.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 65vh;
  height: 8vh;
  text-align: center;
  vertical-align: middle;
  align-content: center;
}
.title {
  align-self: center;
  text-align: center;
  font-size: 5vh;
}

@media only screen and (max-width: 768px) {
  .title-background {
    background-image: url('../assets/images/title2.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 50vh;
    height: 8vh;
    text-align: center;
    vertical-align: middle;
    align-content: center;
  }
  .title {
    padding-top: 4px;
    align-self: center;
    text-align: center;
    font-size: 4.5vh;
  }
}

</style>