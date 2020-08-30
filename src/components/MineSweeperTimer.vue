<template>
  <div class="timer">
    {{displayTime}}
  </div>
</template>

<script>
export default {
  name: "MineSweeperTimer",
  props: {
    timer: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    calcTime: function(dist){
      // Time calculations for days, hours, minutes and seconds
      return {
        minutes: Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((dist % (1000 * 60)) / 1000)
      }
    }
  },
  computed: {
    displayTime () {
      const time = this.calcTime(this.timer)
      const minutes = time.minutes<10 ? `0${time.minutes}` : time.minutes
      const seconds = time.seconds<10 ? `0${time.seconds}` : time.seconds
      return `${minutes}:${seconds}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .timer{
    font-size: 36px;
    margin-bottom: 30px;
  }
</style>
