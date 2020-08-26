<template>
  <div id="app">
    <TheBoard/>
  </div>
</template>

<script>
import TheBoard from "@/components/TheBoard";

export default {
  name: 'App',
  components: {
    TheBoard
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,wght@0,400;1,300&display=swap');

#app {
  font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
  /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body{
    margin: 0;
  }
</style>
