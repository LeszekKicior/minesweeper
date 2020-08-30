<template>
  <div class="board">
    <div :style="boardStyle" class="board-content">
      <MineSweeperBoardField :content="field.content"
                             :flagged="field.flagged"
                             :key="n"
                             :playing="playing"
                             :visible="field.visible"
                             @flag="flagField(n)"
                             @reveal="revealField(...repack(n), true)"
                             v-for="(field, n) in unpackedFields"/>
    </div>
  </div>
</template>

<script>
import MineSweeperBoardField from "@/components/MineSweeperBoardField";

export default {
  name: "MineSweeperBoard",
  components: {MineSweeperBoardField},
  data() {
    return {
      board: [],
      loaded: false,
      timerStarted: false
    }
  },
  props: {
    height: {
      type: Number, String,
      required: true
    },
    width: {
      type: Number, String,
      required: true
    },
    bombNum: {
      type: Number, String,
      required: true
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    unpackedFields() {
      return this.board.flat(2);
    },
    boardStyle() {
      return {
        gridTemplateColumns: `repeat(${this.width}, 1fr)`,
        gridTemplateRows: `repeat(${this.height}, 1fr)`
      }
    }
  },
  methods: {
    generateBoard() {
      this.timerStarted = false

      let board = [];
      for (let i = 0; i < this.height; i++) {
        let row = [];
        for (let j = 0; j < this.width; j++) {
          row.push(this.createField('empty')) //Empty field
        }
        board.push(row);
      }

      let bombs = this.bombNum
      for (let b = 0; b < bombs; b++) {
        let x = Math.floor(Math.random() * this.height);
        let y = Math.floor(Math.random() * this.width);
        if (board[x][y].content === 'empty') {
          board[x][y].content = 'bomb'
        } else {
          bombs++ // try again
        }
      }
      //Add numbers to fields
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {

          let bombCount = 0;

          for (let offsetX = -1; offsetX <= 1; offsetX++) {
            for (let offsetY = -1; offsetY <= 1; offsetY++) {
              if (y + offsetY >= 0 && y + offsetY <= this.height - 1 && x + offsetX >= 0 && x + offsetX <= this.width - 1) {
                if (board[y + offsetY][x + offsetX].content === 'bomb') {
                  bombCount += 1
                }
              }
            }
          }
          if (board[y][x].content === 'empty') {
            board[y][x].content = bombCount.toString()
          }
        }
      }
      this.board = board;
    },
    createField(content) { // A GOOD PLACE FOR SOME DEBUGGING
      return {
        content: content,
        // visible: true,
        visible: false,
        flagged: false
      };
    },
    repack(n) {
      return [Math.floor(n / this.width), n % this.width]
    },
    flagField(n) {
      const [row, col] = [...this.repack(n)]
      this.board[row][col].flagged = !this.board[row][col].flagged;
    },
    revealField(row, col, propagate = true, automatic = false) {
      if (!this.timerStarted) {
        this.$emit('startTimer')
        this.timerStarted = true
      }

      if (this.playing && this.board[row][col].flagged) {
        return
      }

      if (this.playing && !this.board[row][col].visible) {
        this.board[row][col].visible = true;
        if (this.board[row][col].content === 'bomb' && !automatic) {
          this.activateBomb(row, col)
        }
        if (this.board[row][col].content === '0' && propagate) {

          for (let offsetX = -1; offsetX <= 1; offsetX++) {
            // setTimeout( () => {
            for (let offsetY = -1; offsetY <= 1; offsetY++) {
              if (this.checkFieldCorrectness(row + offsetY, col + offsetX)) {
                // this.board[row + offsetY][col + offsetX].visible = true
                this.revealField(row + offsetY, col + offsetX, propagate, true)
              }
            }
            // }, 0)
          }
        }
      }
      if (this.unpackedFields.filter(field => !field.visible).every(field => field.content === 'bomb')) {
        this.$emit('stopGame', {state: 'won'})
      }
    },
    activateBomb(row, col) {
      const field = this.board[row][col]
      if (field.content === 'bomb') {
        field.content = 'bombClicked'
      }
      this.$emit('stopGame', {state: 'lost'})
    },
    checkFieldCorrectness(row, col) {
      return (row >= 0 && row <= this.height - 1 && col >= 0 && col <= this.width - 1)
    }
  },
  watch: {
    playing(newVal) {
      if (newVal) {
        this.generateBoard()
        this.loaded = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>


.board {
  height: 100%;
  width: 100%;
  //border: 1px dashed rgba(255,255,255,0.3);
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  &.lost {
    pointer-events: none;
  }

  .row {
    display: flex;
    flex-flow: row nowrap;
  }

  .board-content {
    $gap: 8px;
    width: 100%;
    height: 100%;
    display: grid;
    row-gap: $gap;
    column-gap: $gap;

  }
}

</style>
