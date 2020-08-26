<template>
    <div class="field" :class="{visible: visible}" @click="revealField" @contextmenu.prevent="flagField">
        <template v-if="visible">
            <img v-if="content==='bomb'" src="../assets/bomb.svg" alt=""/>
            <span v-else>{{displayContent}}</span>
        </template>
        <img class="icon-small" v-else-if="flagged" src="../assets/flag.svg" alt="">
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

<style lang="scss" scoped>
    .field {
      width: 50px;
      height: 50px;
      border: 2px solid rgba(255, 255, 255, 0.1);
      border-radius: 4px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 24px;
      user-select: none;
      margin: 5px;
      transition: all ease 150ms;
      &.visible {
        background-color: darken(#293758,2.5%);
        border-color: rgba(0, 0, 0, 0.08) rgba(255, 255, 255, 0.08) rgba(255, 255, 255, 0.08) rgba(0, 0, 0, 0.08);
        box-shadow: inset 3px 3px 5px #14203B, inset -0px -0px 5px #384460;
      }

      &:not(.visible) {
        /*border: 2px solid;*/
        border-color: rgba(255, 255, 255, 0.08) rgba(0, 0, 0, 0.08) rgba(0, 0, 0, 0.08) rgba(255, 255, 255, 0.08);
        box-shadow: 3px 3px 10px #14203B, -3px -3px 10px #384460;


      }

      &:not(.visible):active {
        background-color: #232f4b;
      }
    }
    img {
      width: 40px;
      height: 40px;

      &.icon-small {
        width: 25px;
        height: 25px;
      }
    }
</style>
