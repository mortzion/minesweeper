<template>
  <div class="field">
    <div v-for="rowIndex in height" class="row" :key="rowIndex">
      <Square
        v-for="columnIndex in width"
        :key="columnIndex"
        :square="getSquare(columnIndex-1, rowIndex-1)"
        :game-finished="gameFinished"
        @click="openSquare(columnIndex-1, rowIndex-1)"
        @rightClick="toggleFlag(columnIndex-1, rowIndex-1)"
      ></Square>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Minesweeper } from '../core/Minesweeper';
import Square from './Square.vue';

export default Vue.extend({
  components: {
    Square,
  },
  props: {
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    density: { type: Number, required: true },
  },

  data() {
    return {
      minesweeper: new Minesweeper(this.width, this.height, this.density),
      gameFinished: false,
    };
  },

  watch: {
    height() {
      this.minesweeper = this.initializeNewGame(
        this.width,
        this.height,
        this.density,
      );
    },

    width() {
      this.minesweeper = this.initializeNewGame(
        this.width,
        this.height,
        this.density,
      );
    },

    density() {
      this.minesweeper = this.initializeNewGame(
        this.width,
        this.height,
        this.density,
      );
    },
  },

  methods: {
    initializeNewGame(
      width: number,
      height: number,
      density: number,
    ): Minesweeper {
      this.gameFinished = false;
      return new Minesweeper(this.width, this.height, this.density);
    },

    getSquare(x: number, y: number) {
      return this.minesweeper.getSquare(x, y);
    },

    openSquare(x: number, y: number) {
      this.gameFinished = this.minesweeper.openSquare(x, y);
    },

    toggleFlag(x: number, y: number) {
      this.minesweeper.toggleFlag(x, y);
    },
  },
});
</script>
<style>
.field {
  border-color: black;
  border-width: 5px;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-direction: row;
}
</style>