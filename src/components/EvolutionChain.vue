<template>
  <div @click="goToDetail(evolution.name)" class="evolution-container text-center">
    <div class="evolution-img-container">
      <img class="evolution-img" :src="evolution.image" alt="pokemon">
    </div>
    <p class="evolution-name">{{evolution.name}}</p>
  </div>
</template>

<script>
export default {
  props: ['evolution'],
  methods: {
    goToDetail (name) {
      if (this.$route.params.name !== name) {
        this.$router.push(`/${name}`);
        this.$emit('fetchDetail');
      }
    },
  }
}
</script>

<style scoped>
p {
  margin: 0px;
  padding: 5px;
}
.evolution-container {
  background-color: #E9D736;
  color: #000;
  margin-right: 10px;
  padding-bottom: 0px;
  border-radius: 10px;
  text-transform: capitalize;
  font-weight: bold;
}
.evolution-container:hover {
  cursor: pointer;
}
.evolution-container:hover .evolution-img, .evolution-container:hover .evolution-name {
  transform: scale(0.9);
  transition: 400ms;
}
.evolution-container:hover .evolution-name {
  transform: scale(1);
  transition: 400ms;
}
.evolution-img-container {
  background-color: #F0E68C;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 10px;
  transition: 400ms;
}
.evolution-img {
  background-color: #F0E68C;
  padding: 10px;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  transition: 400ms;
}
.evolution-name {
  transform: scale(0.9);
  transition: 400ms;
}
</style>