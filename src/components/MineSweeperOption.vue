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
  data () {
    return {
      optionTime: 0
    }
  },
  computed: {
    bestTime () {
      if(this.optionTime){
        return this.$options.filters.parseTime(this.optionTime)
      } else {
        return 'No record yet!'
      }
    }
  },
  methods: {
    playOption () {
      this.$emit('play')
    }
    updateTime () {
      this.optionTime = localStorage[this.option.name]
      this.$forceUpdate()
    }
  },
  mounted () {
    this.updateTime()
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
      min-width: 160px;
      text-align: left;
    }
    .play-button{
      margin-left: auto;
    }
  }
</style>
