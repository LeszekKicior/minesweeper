<template>
  <div class="option">
    <div class="name">{{option.name}} - {{option.size}}x{{option.size}}</div>
    Best time: {{bestTime}}
    <BaseButton class="play-button" @click="playOption">Play</BaseButton>
  </div>
</template>

<script>
import BaseButton from "@/components/generic/BaseButton";
export default {
  name: "MineSweeperOption",
  components: {BaseButton},
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    bestTime () {
      return localStorage[this.option.name] || '00:00'
    }
  },
  methods: {
    playOption () {
      this.$emit('play')
    }
  }
}
</script>

<style lang="scss" scoped>
  $border-dark: #202b43;
  $border-light: #394c79;
  .option{
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    height: 80px;
    margin: 0 30px;
    border-top: 1px solid $border-dark;
    //border-bottom: 1px solid #202b43;
    //border-top: 1px solid #394c79;
    position: relative;

    &::before{
      position: absolute;
      content: '';
      width: 100%;
      background-color: $border-light;
      height: 1px;
      top: 0.5px;
    }
    &:last-of-type{
      border-bottom: 1.5px solid $border-dark;
      &::after{
        position: absolute;
        content: '';
        width: 100%;
        background-color: $border-light;
        height: 1px;
        bottom: -3px;
      }
    }
    .name{
      font-weight: bold;
      margin-right: 30px;
      width: 160px;
      text-align: left;
    }
    .play-button{
      margin-left: auto;
    }
  }
</style>
