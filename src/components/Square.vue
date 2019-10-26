<template>
  <div :class="squareClass" @click="$emit('click')" @contextmenu.prevent="$emit('rightClick')">
    <span v-if="open">
      <template v-if="isBomb">BE</template>
      <template v-else-if="neighborCount>0">{{neighborCount}}</template>
    </span>
    <span v-else-if="gameFinished">
      <template v-if="isBomb &&!hasFlag">B</template>
      <template v-if="isBomb && hasFlag">F</template>
      <template v-if="!isBomb && hasFlag">FE</template>
    </span>
    <span v-else-if="hasFlag">F</span>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
import { Square } from '../core/Square';

export default Vue.extend({
  props: {
    square: { type: Square, required: true },
    gameFinished: { type: Boolean, default: false },
  },

  computed: {
    squareClass() {
      const squareClass = ['square'];
      squareClass.push(this.open ? 'open' : 'closed');
      if (this.isBomb && this.open) {
        squareClass.push('bomb');
      }
      return squareClass;
    },

    open() {
      return this.square.isOpen();
    },

    neighborCount() {
      return this.square.getNeighborBombs();
    },

    isBomb() {
      return this.square.isBomb();
    },

    hasFlag() {
      return this.square.hasFlag();
    },
  },
});
</script>
<style scoped>
.square {
  width: 20px;
  height: 20px;
  border: gray 1px solid;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.square.closed {
  background-color: rgb(220, 220, 220);
  -webkit-box-shadow: inset -1px -1px 1px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: inset -1px -1px 1px 2px rgba(0, 0, 0, 0.75);
  box-shadow: inset -1px -1px 1px 2px rgba(0, 0, 0, 0.75);
}

.square.open {
  background-color: lightgray;
}

.square.closed:hover {
  background-color: lightblue;
}
</style>