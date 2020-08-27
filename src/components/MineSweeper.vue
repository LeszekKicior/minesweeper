<template>
    <div class="container">

<!--        <div class="modal-overlay" v-if="success || !playing">-->
<!--            <div class="modal-content">-->
<!--                {{modalContent}}-->
<!--                <div v-if="success" style="font-size: 16px;">JESTEŚ GWIAZDĄ</div>-->
<!--                <button class="btn" @click="generateBoard(10,10,10)">ZAGRAJ JESZCZE RAZ</button>-->
<!--            </div>-->
<!--        </div>-->

      <div class="board" :class="{lost: !playing}">
            <div class="row" v-for="(row, i) in board" :key="i">
                <BoardField v-for="(field,j) in row" :key="j" :content="field.content" :flagged="field.flagged" :visible="field.visible" @reveal="revealField(i, j)" @flag="flagField(i,j)"/>
            </div>
        </div>

        <button class="btn" @click="debugSuccess">DEBUG</button>

    </div>
</template>

<script>
    import BoardField from "@/components/BoardField";
    export default {
        name: "TheBoard",
        components: {BoardField},
        data () {
            return {
                height: 10,
                width: 10,
                bombNum: 10,
                playing: false,
                state: 'SETUP',
                timer: 0
            }
        },
        // props: {
        //   color: {
        //     type: String,
        //     required: false,
        //     default: ''
        //   }
        // },
        methods: {
          startGame(height, width, bombNum) {
            this.height = height
            this.width = width
            this.bombNum = bombNum
            this.playing = true
          }

            // debugSuccess () {
                // this.board.flat(2).filter(field => field.content!=='bomb').forEach(field => field.visible = true)
            // },
            // revealBomb (row, col) {
            //
            }
        // },
        // mounted () {
            // this.generateBoard(10,10, 0)
            // this.generateBoard(10,10, 10)
        // },
        // computed: {
        //     success () {
        //         // Check if all remaining unrevealed fields contain bombs
        //         return this.board.flat(2).filter(field => !field.visible).every(field => field.content==='bomb')
        //         // return false
        //     },
        //     modalContent () {
        //         return this.success ? "WYGRAŁEŚ" : "PRZEGRAŁEŚ"
        //     }
        // }
    }
</script>

<style lang="scss" scoped>
    .row{
        display: flex;
        flex-flow: row nowrap;
    }
    .board{
      //width: fit-content;
      padding: 30px;
      border-radius: 25px;
      box-sizing: border-box;
      //box-shadow:  20px 20px 40px #202b43, -20px -20px 40px #314269;
      box-shadow: 21px 21px 41px #192237, -21px -21px 41px #394c79;
      border: 1.5px solid;
      //border-color: rgba(255,255,255,0.03) rgba(0,0,0,0.08) rgba(0,0,0,0.08) rgba(255, 255, 255, 0.03);
      background: linear-gradient(135deg, #314269, #222e48);
        &.lost {
          pointer-events: none;
        }
    }
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
    .btn{
        padding: 15px 30px;
        margin-top: 30px;
        color: white;
        background-color: #293758;
        border-radius: 25px;
        box-shadow:  10px 10px 30px #232f4b, -10px -10px 30px #2f3f65;
        cursor: pointer;
        outline: none;
        border: 1px solid rgba(255,255,255,0.2);
        transition: 150ms all ease;
      &:hover {
        background-color: #213856;
      }
      &:active {
        background-color: #203653;
      }
    }

    .modal {
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
