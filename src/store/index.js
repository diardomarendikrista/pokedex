import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios/axios'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons: [],
    next: {},
    loading: false
  },
  mutations: {
    insertPokemons (state, payload) {
      state.pokemons.push(payload);
    },
    setNext (state, payload) {
      state.next = payload;
    },
  },
  actions: {
    async fetchPokemon (context, payload) {
      try {
        const { data } = await axios.get('pokemon');
        data.results.forEach(async (element) => {
          const { data } = await axios.get(element.url);
          const newData = {
            ...element,
            detail: data
          }
          context.commit('insertPokemons', newData)
          console.log(newData);
        });
        context.commit('setNext', data.next);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchMore (context, payload) {
      try {
        const { data } = await axios.get(payload);
        data.results.forEach(async (element) => {
          const { data } = await axios.get(element.url);
          const newData = {
            ...element,
            detail: data
          }
          context.commit('insertPokemons', newData)
        });
        context.commit('setNext', data.next);
      } catch (error) {
        console.log(error);
      }
    },
  },
  modules: {
  }
})
