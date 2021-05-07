<template>
  <form @submit.prevent="searchPokemon()">
    <div class="form-search">
      <b-form-input list="my-list-id" v-model="search" placeholder="search" autocomplete="off" />
      <b-icon @click="searchPokemon()" class="search-icon" icon="search" />

      <datalist v-if="search" id="my-list-id" class="data-list">
        <option @click="searchPokemon(option)" v-for="(option, index) in searchOptions" :key="option + index">{{ option }}</option>
      </datalist>
    </div>
  </form>
</template>

<script>
import { BFormInput } from 'bootstrap-vue'
import { mapState } from 'vuex'

export default {
  components: {
    BFormInput
  },
  data () {
    return {
      search: '',
      options: [],
    } 
  },
  methods: {
    searchPokemon () {
      if (this.search) {
        this.$router.push(`/${this.search}`)
      }
    }
  },
  created () {
    this.$store.dispatch('fetchSearchOptions', this.baseURL);
  },
  computed: {
    ...mapState(
      [
        'searchOptions',
      ]
    )
  },
}
</script>


<style scoped>
.form-search {
  position: relative;
  width: 94%;
  margin: auto;
  margin-bottom: 5px;
  font-size: 14px;
  color: #000;
}
.search-icon {
  background-color: #fff;
  position: absolute;
  font-size: 24px;
  right: 10px;
  top: 5px;
  transition: 100ms;
}
.search-icon:hover {
  cursor: pointer;
  transform: scale(1.2);
  transition: 100ms;
}
.search-icon:active {
  transform: scale(1);
  transition: 100ms;
}

</style>