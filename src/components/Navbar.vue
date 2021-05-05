<template>
  <center>
    <div @click="goToHome()" class="title-background">
      <p class="title">Pokédex</p>
    </div>
  </center>
</template>

<script>
export default {
  methods: {
    goToHome () {
      if (this.$route.path !== '/') {
        this.$router.push(`/`);
      }
    },
  }
}
</script>

<style>
.title-background {
  background-image: url('../assets/images/title.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  width: 480px;
  height: 60px;
  margin-bottom: 20px;
  text-align: center;
  vertical-align: middle;
  align-content: center;
}

.title-background:hover {
  cursor: pointer;
}

.title {
  align-self: center;
  text-align: center;
  font-size: 35px;
  padding: 3px 0px;
  font-weight: bold;
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