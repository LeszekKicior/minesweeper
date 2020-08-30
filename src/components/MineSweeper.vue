<template>
    <div class="container">

      <BaseModal v-if="display.lostModal">
        :(
        <div style="font-size: 16px;">Not this time!</div>
        <BaseButton @click="returnToMenu" style="margin-top: 15px;">Return to menu</BaseButton>
      </BaseModal>

      <BaseModal v-if="display.wonModal">
        Yay!
        <div style="font-size: 16px;">You're a star!</div>
        <BaseButton @click="returnToMenu" style="margin-top: 15px;">Return to menu</BaseButton>
      </BaseModal>

      <MineSweeperTimer :timer="timer.duration" :style="{opacity: playing?1:0}"/>
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
            <MineSweeperOption
                class="option"
                :option="option"
                @play="startGame(option)"
                v-for="option in options"
                :ref="'option-'+option.name"
                :key="option.name"/>
          </div>
        </div>
    </div>
</template>

<script>
import MineSweeperBoard from "@/components/MineSweeperBoard";
import BaseButton from "@/components/generic/BaseButton";
import MineSweeperTimer from "@/components/MineSweeperTimer";
import BaseModal from "@/components/generic/BaseModal";
import MineSweeperOption from "@/components/MineSweeperOption";
// import BaseButton from "@/components/generic/BaseButton";
    export default {
        name: "MineSweeper",
        // components: {BaseButton, MineSweeperBoard},
        components: {MineSweeperOption, BaseModal, MineSweeperTimer, BaseButton, MineSweeperBoard},
        data () {
            return {
                height: 0,
                width: 0,
                bombNum: 0,
                playing: false,
                timer: {
                  interval: '',
                  duration: 0,
                  start: 0,
                  end: 0
                },
                display: {
                  board: false,
                  menu: true,
                  wonModal: false,
                  lostModal: false,
                  exit: false
                },
                options: [
                  {name: 'Easy',
                  size: 5,
                  bombNum: 2},
                  {name: 'Medium',
                  size: 10,
                  bombNum: 15},
                  {name: 'Hard',
                  size: 15,
                  bombNum: 30},
                ],
                optionPlayed: ''
            }
        },
        methods: {
          startGame(option) {
            this.height = option.size
            this.width = option.size
            this.bombNum = option.bombNum
            this.optionPlayed = option.name
            this.playing = true
            this.display.menu = false
            this.display.board = true
          },

          dropConfetti(time) {
            this.$confetti.start();
            setTimeout(()=>this.$confetti.stop(), time)
          },

          stopGame(payload) {
            this.playing = false;
            this.stopTimer()
            if(payload.state === 'won') {
              this.dropConfetti(2500);
              this.updateHighScore(this.optionPlayed, this.timer.duration)
              setTimeout(()=>this.display.wonModal = true, 2500)
            } else {
              setTimeout(()=>this.display.lostModal = true, 1000)
            }
          },

          updateHighScore(option, timer) {
            const currentHighScore = parseInt(localStorage[option])
            if(!currentHighScore || currentHighScore > timer){
              localStorage[option] = timer
              this.$refs['option-'+option][0].updateTime()
            }
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
          },

          resetTimer() {
            this.stopTimer()
            this.timer = {
                interval: '',
                duration: 0,
                start: 0,
                end: 0
            }
          },

          returnToMenu() {
            this.resetTimer()
            this.playing = false;
            this.display = {
              board: false,
              menu: true,
              lostModal: false,
              wonModal: false,
              exit: false
            }
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
</style>
