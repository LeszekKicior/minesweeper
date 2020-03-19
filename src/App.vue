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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
  body{
    margin: 0;
  }
</style>
