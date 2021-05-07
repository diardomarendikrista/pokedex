import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/axios/axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pokemons: [],
    pokemon: {},
    searchOptions: [
      { label: 'label1', value: 'value1' },
      { label: 'label2', value: 'value2' }
    ],
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
    setSearchOptions (state, payload) {
      state.searchOptions = payload;
    },
  },
  actions: {
    async fetchPokemon (context, payload) {
      try {
        context.commit('setLoading', true);
        context.commit('setPokemons', []);
        const { data } = await axios.get();

        // I made custom object for fetching list to get pokemon picture (original API only send name & url detail)
        data.results.forEach(async (element) => {
          const { data } = await axios.get(element.url);
          const newData = {
            ...element,
            detail: data
          }
          // console.log(newData);
          context.commit('insertPokemons', newData)
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

        // Same as fetching data, but it fetch the next page / pokemon.
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
        context.commit('setPokemon', {});
        // Fetcing detail pokemon
        const { data } = await axios.get(payload);
        // console.log(data.species.url);

        // Get evolution chain link (it should hit 2 different API to get the evolution chain)
        let species = await axios.get(data.species.url);
        // console.log(species.data.evolution_chain.url);
        let evolution = await axios.get(species.data.evolution_chain.url);
        // console.log(species.data.evolution_chain.url);

        // Check how much evolution (1,2 or 3), I check manually due to didn't get the logic pattern yet.
        let evolution_chain = [];
        if (evolution.data.chain.evolves_to.length === 0) {
          // no evolution (this is usually legendary pokemon)
          const image1 = await axios.get('' + evolution.data.chain.species.name);
          evolution_chain = [
            { name: evolution.data.chain.species.name, image: image1.data.sprites.other.dream_world.front_default },
          ]
        } else if (evolution.data.chain.evolves_to[0].evolves_to.length === 0) {
          // has 1 evolution
          const image1 = await axios.get('' + evolution.data.chain.species.name);
          const image2 = await axios.get('' + evolution.data.chain.evolves_to[0].species.name);
          evolution_chain = [
            { name: evolution.data.chain.species.name, image: image1.data.sprites.other.dream_world.front_default },
            { name: evolution.data.chain.evolves_to[0].species.name, image: image2.data.sprites.other.dream_world.front_default },
          ]
        } else {
          // has 2 evolution
          const image1 = await axios.get('' + evolution.data.chain.species.name);
          const image2 = await axios.get('' + evolution.data.chain.evolves_to[0].species.name);
          const image3 = await axios.get('' + evolution.data.chain.evolves_to[0].evolves_to[0].species.name);
          evolution_chain = [
            { name: evolution.data.chain.species.name, image: image1.data.sprites.other.dream_world.front_default },
            { name: evolution.data.chain.evolves_to[0].species.name, image: image2.data.sprites.other.dream_world.front_default },
            { name: evolution.data.chain.evolves_to[0].evolves_to[0].species.name, image: image3.data.sprites.other.dream_world.front_default }
          ]
        }

        // adding new object key (evolution chain array) to data
        data.evolution_chain = evolution_chain;
        // set pokemon name as title document
        document.title = `${data.name.charAt(0).toUpperCase() + data.name.slice(1)} - Pokedex`;

        // commiting data
        context.commit('setPokemon', data);
        context.commit('setLoading', false);
      } catch (error) {
        console.log(error);
        context.commit('setLoading', false);
      }
    },
    async fetchSearchOptions (context, payload) {
      try {
        context.commit('setLoading', true);
        const { data } = await axios.get('?offset=0&limit=2000');
        let searchOptions = []
        data.results.forEach(element => {
          searchOptions.push(element.name);
        })
        // console.log(searchOptions);

        context.commit('setSearchOptions', searchOptions)
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
