<template>
  <div id="app">
    <Minesweeper :width="15" :height="20" :density="0.1333"></Minesweeper>
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 60px;
}
</style>
