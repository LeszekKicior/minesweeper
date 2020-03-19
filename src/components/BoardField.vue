<template>
    <div class="field" :class="{visible: visible}" @click="revealField" @contextmenu.prevent="flagField">
        <template v-if="visible">
            <img v-if="content==='bomb'" src="../assets/bomb.svg"/>
            <span v-else>{{displayContent}}</span>
        </template>
        <img class="icon-small" v-else-if="flagged" src="../assets/flag.svg">
    </div>
</template>

<script>
    export default {
        name: "BoardField",
        props: {
            content: {
                type: String,
                required: true
            },
            visible: {
                type: Boolean,
                default: false
            },
            flagged: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            revealField () {
                this.$emit('reveal');
            },
            flagField () {
                this.$emit('flag');
            }
        },
        computed: {
            displayContent () {
                return this.content === '0' ? '' : this.content;
            }
        }
    }
</script>

<style scoped>
    .field{
        width: 50px;
        height: 50px;
        border: 2px solid rgba(255,255,255,0.1);
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        user-select: none;
    }
    .field.visible{
        background-color: #1f324e;
        border-color: rgba(0,0,0,0.2) rgba(255,255,255,0.2) rgba(255,255,255,0.2) rgba(0,0,0,0.2)
    }
    .field:not(.visible){
        border: 2px solid;
        border-color: rgba(255,255,255,0.2) rgba(0,0,0,0.2) rgba(0,0,0,0.2) rgba(255,255,255,0.2)
    }
    .field:not(.visible):active{
        background-color: #203653
    }
    img{
        width: 40px;
        height:40px;
    }
    img.icon-small{
        width: 25px;
        height: 25px;
    }
</style>
