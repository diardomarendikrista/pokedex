import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseURL: 'https://pokeapi.co/api/v2/pokemon/',
    pokemons: [],
    pokemon: {},
    next: {},
    loading: false,
    error: false,
    notFound: false,
  },
  mutations: {
    setPokemons (state, payload) {
      state.pokemons = payload;
    },
    insertPokemons (state, payload) {
      state.pokemons.push(payload);
    },
    setPokemon (state, payload) {
      state.pokemon = payload;
    },
    setNext (state, payload) {
      state.next = payload;
    },
    setLoading (state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async fetchPokemon (context, payload) {
      try {
        context.commit('setLoading', true);
        context.commit('setPokemons', []);
        const { data } = await axios.get('pokemon');
        data.results.forEach(async (element) => {
          const { data } = await axios.get(element.url);
          const newData = {
            ...element,
            detail: data
          }
          context.commit('insertPokemons', newData)
          // console.log(newData);
        });
        context.commit('setNext', data.next);
        context.commit('setLoading', false);
      } catch (error) {
        console.log(error);
        context.commit('setLoading', false);
      }
    },
    async fetchMore (context, payload) {
      try {
        context.commit('setLoading', true);
        const { data } = await axios.get(payload);
        data.results.forEach(async (element) => {
          const { data } = await axios.get(element.url);
          const newData = {
            ...element,
            detail: data
          }
          context.commit('insertPokemons', newData)
          context.commit('setLoading', false);
        });
        context.commit('setNext', data.next);
      } catch (error) {
        console.log(error);
        context.commit('setLoading', false);
      }
    },
    async fetchDetail (context, payload) {
      try {
        context.commit('setLoading', true);
        // Fetcing detail pokemon
        const { data } = await axios.get(payload.detailURL);
        // console.log(data.species.url);

        // Get evolution chain link (should be 2x hit API)
        let species = await axios.get(data.species.url);
        // console.log(species.data.evolution_chain.url);
        let evolution = await axios.get(species.data.evolution_chain.url);
        // console.log(species.data.evolution_chain.url);

        // Check how much evolution
        let evolution_chain = [];
        if (evolution.data.chain.evolves_to.length === 0) {
          // no evolution
          const image1 = await axios.get(payload.baseURL + evolution.data.chain.species.name);
          evolution_chain = [
            { name: evolution.data.chain.species.name, image: image1.data.sprites.other.dream_world.front_default },
          ]
        } else if (evolution.data.chain.evolves_to[0].evolves_to.length === 0) {
          // has 1 evolution
          const image1 = await axios.get(payload.baseURL + evolution.data.chain.species.name);
          const image2 = await axios.get(payload.baseURL + evolution.data.chain.evolves_to[0].species.name);
          evolution_chain = [
            { name: evolution.data.chain.species.name, image: image1.data.sprites.other.dream_world.front_default },
            { name: evolution.data.chain.evolves_to[0].species.name, image: image2.data.sprites.other.dream_world.front_default },
          ]
        } else {
          // has 2 evolution
          const image1 = await axios.get(payload.baseURL + evolution.data.chain.species.name);
          const image2 = await axios.get(payload.baseURL + evolution.data.chain.evolves_to[0].species.name);
          const image3 = await axios.get(payload.baseURL + evolution.data.chain.evolves_to[0].evolves_to[0].species.name);
          evolution_chain = [
            { name: evolution.data.chain.species.name, image: image1.data.sprites.other.dream_world.front_default },
            { name: evolution.data.chain.evolves_to[0].species.name, image: image2.data.sprites.other.dream_world.front_default },
            { name: evolution.data.chain.evolves_to[0].evolves_to[0].species.name, image: image3.data.sprites.other.dream_world.front_default }
          ]
        }

        let newData = data;
        newData.evolution_chain = evolution_chain;

        context.commit('setPokemon', newData);
        context.commit('setLoading', false);
      } catch (error) {
        console.log(error);
        context.commit('setLoading', false);
      }
    },
  },
  modules: {
  }
})
