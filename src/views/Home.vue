<template>
  <div class="container-fluid">
    <div class="container">
      <form>
        <div class="form-search">
          <input class="form-control" type="text" placeholder="search" />
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
      <div class="d-flex flex-wrap justify-content-center">
        <PokemonCard
          v-for="pokemon in pokemons"
          :key="pokemon.url"
          :pokemon="pokemon"
        />
      </div>
      <div v-if="loading" class="text-center mt-5">
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
      </div>
      <div class="btn-more-container">
        <button v-if="!loading" class="btn btn-outline-primary btn-more" v-on:click="fetchMore(next)">See more pokemons</button>
      </div>
    </div>
  </div>
</template>

<script>
import PokemonCard from '@/components/PokemonCard.vue'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components: {
    PokemonCard,
    PulseLoader
  },
  data () {
    return {
      showDetail: false,
      pokemonUrl: '',
      showDetail: false,
      color: '#B4EBFF',
      size: '14px',
    } 
  },
  methods: {
    fetchMore (next) {
      this.$store.dispatch('fetchMore', next)
    },
  },
  created () {
    this.$store.dispatch('fetchPokemon')
  },
  computed: {
    ...mapState(
      [
        'pokemons',
        'next',
        'loading',
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

.form-search {
  display: flex;
  justify-content: center;
  width: 96%;
  margin: auto;
  margin-bottom: 5px;
}

</style>