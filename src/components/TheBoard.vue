<template>
    <div class="container">

        <div class="modal" v-if="success || !playing">
            <div class="content">
                {{modalContent}}
                <div v-if="success" style="font-size: 16px;">JESTEŚ GWIAZDĄ</div>
                <button class="btn" @click="generateBoard(10,10,10)">ZAGRAJ JESZCZE RAZ</button>
            </div>
        </div>

        <div class="board" :class="{lost: !playing}">
            <div class="row" v-for="(row, i) in board" :key="i">
                <BoardField v-for="(field,j) in row" :key="j" :content="field.content" :flagged="field.flagged" :visible="field.visible" @reveal="revealField(i, j)" @flag="flagField(i,j)"/>
            </div>
        </div>

        <button class="btn" @click="debugSuccess">WYGRANKO</button>

    </div>
</template>

<script>
    import BoardField from "@/components/BoardField";
    export default {
        name: "TheBoard",
        components: {BoardField},
        data () {
            return {
                board: [[]],
                height: 0,
                width: 0,
                playing: false
            }
        },
        methods: {
            generateBoard (height, width, bombNum) {
                this.height = height;
                this.width = width;
                let board = [];
                for (let i = 0; i < height; i++){
                    let row = [];
                    for (let j = 0; j < width; j++){
                        row.push(this.createField('empty')) //Empty field
                    }
                    board.push(row);
                }
                for(let b = 0; b < bombNum; b++) {
                    let x = Math.floor(Math.random() * 10);
                    let y = Math.floor(Math.random() * 10);
                    if(board[x][y].content === 'empty') {
                        board[x][y].content = 'bomb'
                    } else {
                        bombNum++
                    }
                }
                for (let y = 0; y < height; y++) {
                    for (let x = 0; x < width; x++) {

                        let bombCount = 0;

                        for (let offsetX = -1; offsetX<=1; offsetX++) {
                            for (let offsetY = -1; offsetY <=1; offsetY++) {
                                if(y + offsetY >= 0 && y + offsetY <= height-1 && x + offsetX >= 0 && x + offsetX <= width-1) {
                                    if (board[y + offsetY][x + offsetX].content === 'bomb') {
                                        bombCount += 1
                                    }
                                }
                            }
                        }
                        if(board[y][x].content === 'empty'){
                            board[y][x].content = bombCount.toString()
                        }
                    }
                }
                this.board = board;
                this.playing = true;
            },
            createField (content) {
                return {
                    content: content,
                    visible: false,
                    flagged: false
                };
            },
            flagField (row, col) {
               this.board[row][col].flagged = !this.board[row][col].flagged;
            },
            revealField (row, col) {
                console.log(`ROW: ${row}, COL: ${col}`);
                if(this.playing && !this.board[row][col].visible){
                    this.board[row][col].visible = true;
                    if(this.board[row][col].content==='bomb') {
                        this.playing = false;
                    }
                    if(this.board[row][col].content === '0'){
                        for (let offsetX = -1; offsetX<=1; offsetX++) {
                            for (let offsetY = -1; offsetY <=1; offsetY++) {
                                if(row + offsetY >= 0 && row + offsetY <= this.height-1 && col + offsetX >= 0 && col + offsetX <= this.width-1) {
                                    // this.board[row + offsetY][col + offsetX].visible = true
                                    this.revealField(row+offsetY, col+offsetX)
                                }
                            }
                        }

                    }
                }
            },
            debugSuccess () {
                this.board.flat(2).filter(field => field.content!=='bomb').forEach(field => field.visible = true)
            }
        },
        mounted () {
            this.generateBoard(10,10, 10)
        },
        computed: {
            success () {
                return this.board.flat(2).filter(field => !field.visible).every(field => field.content==='bomb')
            },
            modalContent () {
                return this.success ? "WYGRANKO" : "PRZEGRANKO"
            }
        }
    }
</script>

<style scoped>
    .row{
        display: flex;
        flex-flow: row nowrap;
    }
    .board{
        width: fit-content;
        padding: 30px;
        border-radius: 25px;
        box-shadow:  20px 20px 60px #232f4b, -20px -20px 60px #2f3f65;
    }
    .board.lost{
        pointer-events: none;
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
    }
    .btn:hover{
        background-color: #213856;
    }
    .btn:active{
        background-color: #203653;
    }

    .modal {
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: rgba(0,0,0,0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: -60px;
    }
    .modal .content {
        padding: 40px 60px;
        background-color: #293758;
        border-radius: 30px;
        color: white;
        font-size: 24px;
        display: flex;
        flex-flow: column nowrap;
    }
</style>
