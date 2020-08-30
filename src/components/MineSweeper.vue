<template>
    <div class="container">

        <div class="modal-overlay" v-if="display.modal">
            <div class="modal-content">
                {{modalContent}}
                <div v-if="success" style="font-size: 16px;">JESTEŚ GWIAZDĄ</div>
                <button class="btn" @click="generateBoard(10,10,10)">ZAGRAJ JESZCZE RAZ</button>
            </div>
        </div>
      <MineSweeperTimer :timer="timer.duration"/>
      <div class="content">
          <MineSweeperBoard v-show="display.board"
                            :height="height"
                            :width="width"
                            :bomb-num="bombNum"
                            :playing="playing"
                            @startTimer="startTimer"
                            @stopGame="stopGame"
                            key="board"/>
          <div class="menu" v-show="display.menu">
            <h1>Minesweeper</h1>
            <BaseButton @click="startGame(5, 5, 5)">Easy</BaseButton>
            <br>
            <BaseButton @click="startGame(10,10,10)">Normal</BaseButton>
            <br>
            <BaseButton @click="startGame(15,15,30)">Hard</BaseButton>
          </div>
        </div>


    </div>
</template>

<script>
import MineSweeperBoard from "@/components/MineSweeperBoard";
import BaseButton from "@/components/generic/BaseButton";
import MineSweeperTimer from "@/components/MineSweeperTimer";
// import BaseButton from "@/components/generic/BaseButton";
    export default {
        name: "MineSweeper",
        // components: {BaseButton, MineSweeperBoard},
        components: {MineSweeperTimer, BaseButton, MineSweeperBoard},
        data () {
            return {
                height: 10,
                width: 10,
                bombNum: 10,
                playing: false,
                state: 'SETUP',
                timer: {
                  interval: '',
                  duration: 0,
                  start: 0,
                  end: 0
                },
                display: {
                  board: false,
                  menu: true,
                  modal: false,
                  exit: false
                }
            }
        },
        methods: {
          startGame(height, width, bombNum) {
            this.height = height
            this.width = width
            this.bombNum = bombNum
            this.playing = true
            this.display.menu = false
            this.display.board = true
          },
          stopGame(payload) {
            this.playing = false;
            this.stopTimer()
            alert(payload.state)
          },
          startTimer() {
            this.timer.start = new Date().getTime();
            this.updateTimer(this.timer.start);
            // Update the count every 1 second
            this.timer.interval = setInterval(() => {
              this.updateTimer(this.timer.start);
            }, 1000);
          },
          updateTimer(start, end) {
            if(end) {
              this.timer.duration = end - start
            } else {
              const now = new Date().getTime();
              this.timer.duration = now - start
            }
          },
          stopTimer() {
            this.timer.end = new Date().getTime();
            this.updateTimer(this.timer.start,this.timer.end);
            clearInterval(this.timer.interval)
          }
        }
    }
</script>

<style lang="scss" scoped>
    $size: 800px;
    .container{
        width: 100%;
        height: 100%;
        min-height: calc(100vh - 60px);
        padding-top: 60px;
        display: flex;
        align-items: center;
        background-color: #293758;
        flex-flow: column nowrap;
          .content {
            width: $size;
            height: $size;
            padding: 30px;
            border-radius: 25px;
            box-sizing: border-box;
            //box-shadow:  20px 20px 40px #202b43, -20px -20px 40px #314269;
            box-shadow: 21px 21px 41px #192237, -21px -21px 41px #394c79;
            border: 1.5px solid;
            border-color: rgba(255, 255, 255, 0.03) rgba(0, 0, 0, 0.08) rgba(0, 0, 0, 0.08) rgba(255, 255, 255, 0.03);
            background: linear-gradient(135deg, #314269, #222e48);
          }
    }
    .modal-overlay {
      width: 100%;
      height: 100%;
      position: fixed;
      background-color: rgba(0, 0, 0, 0.4);
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: -60px;

      .modal-content {
        padding: 40px 60px;
        background-color: #293758;
        border-radius: 30px;
        color: white;
        font-size: 24px;
        display: flex;
        flex-flow: column nowrap;
      }
    }
</style>
