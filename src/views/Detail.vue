<template>
  <div class="container">
    <div v-if="loading" class="text-center mt-5">
      <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
    <div v-if="pokemon.name && !loading" class="detail">
      <div class="detail-img-container">
        <img class="detail-img" :src="pokemon.sprites.other.dream_world.front_default" alt="">
      </div>
      <div class="text-center">
        <h3>{{pokemon.name.toUpperCase()}}</h3>
      </div>
      <div class="properties">
        <div class="right">{{pokemon.base_experience}}</div>
        <div class="left">Base Experience</div>
      </div>
      <div class="properties">
        <div class="right">{{pokemon.height}}</div>
        <div class="left">Height</div>
      </div>
      <div class="properties">
        <div class="right">{{pokemon.weight}}</div>
        <div class="left">Weight</div>
      </div>
      <div class="spacing"></div>
      <div>
        <h4>Pokemon Type</h4>
        <div class="types">
          <div
            class="type"
            v-for="(value, index) in pokemon.types"
            :key="'value'+index"
          >
            {{value.type.name}}
          </div>
        </div>
      </div>
      <div>
        <h4>Abilities</h4>
        <div class="abilities">
          <div
            class="ability"
            v-for="(value, index) in pokemon.abilities"
            :key="'value'+index"
          >
            {{value.ability.name}}
          </div>
        </div>
      </div>
      <div>
        <h4>Evolution Chain</h4>
        <div class="d-flex flex-wrap">
          <EvolutionChain
            v-for="(evolution, index) in pokemon.evolution_chain"
            :evolution="evolution"
            :key="'evolution'+index"
            @fetchDetail="fetchDetail"
          />
        </div>
      </div>
    </div>
    <h2 class="text-center" v-if="!pokemon.name && !loading">Pokemon Not Found</h2>
    <div v-if="!loading" class="text-center">
      <button @click="goToHome()" class="btn btn-outline-light btn-home">Back to home</button>
    </div>
  </div>
</template>

<script>
import EvolutionChain from '@/components/EvolutionChain'
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'
import { mapState } from 'vuex'

export default {
  components: {
    EvolutionChain,
    PulseLoader
  },
  data () {
    return {
      title: '',
      image_URL: '',
      checked: false,
      color: '#B4EBFF',
      size: '14px',
    }
  },
  methods: {
    goToHome () {
      this.$router.push(`/`)
    },
    fetchDetail() {
      const name = this.$route.params.name;
      const detailURL = this.baseURL + name;
      const url = {
        baseURL: this.baseURL,
        detailURL: detailURL
      }
      this.$store.dispatch('fetchDetail', url)
    },
  },
  created () {
    this.fetchDetail()
  },
  computed: {
    ...mapState(
      [
        'baseURL',
        'pokemon',
        'loading',
      ]
    )
  }
}
</script>

<style scoped>
h4 {
  margin-top: 5px;
  border-bottom: dotted 1px #fff;
}
.btn-home {
  width: 80%;
  border-radius: 100px;
}
.container {
  margin-top: 100px;
  background-color: #00072E;
  box-shadow: 0 0 10px 2px #156F99;
  color: #fff;
  border-radius: 20px;
  padding: 20px;
  margin-bottom: 40px;
}
.detail {
  margin-bottom: 30px;
}
.detail-img-container {
  position: relative;
  margin: auto;
  text-align: center;
  background-color: #fff;
  box-shadow: 0 0 10px 2px #156F99;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  top: -110px;
  margin-bottom: -100px;
}
.detail-img {
  margin-top: 30px;
  width: 150px;
  height: 150px;
}
.properties {
  border-bottom: dotted 1px #fff;
}
.left {
  left: 0px;
}
.right {
  float: right;
  right: 0px;
}
.spacing {
  margin-bottom: 20px;
}
.types, .abilities {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.type, .ability {
  margin: 0px 10px 10px 0px;
  padding: 5px 10px;
  border-radius: 20px;
  letter-spacing: 2px;
  background-color: #0A2E50;
  text-transform: capitalize;
  font-size: 16px;
}
.ability {
  background-color: #C73015;
}



@media only screen and (max-width: 768px) {
  .btn-home {
    width: 100%;
    border-radius: 100px;
  }
}
</style>