<template>
  <div id="app">
    <Minesweeper :width="20" :height="20" :density="0.15"></Minesweeper>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Minesweeper } from './components/index';

export default Vue.extend({
  name: 'app',
  components: {
    Minesweeper,
  },
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
