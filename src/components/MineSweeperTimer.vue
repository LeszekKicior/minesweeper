<template>
  <div class="timer">
    {{ timer|parseTime }}
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
  }
}
</script>

<style lang="scss" scoped>
.timer {
  font-size: 36px;
  margin-bottom: 30px;
  transition: 150ms ease opacity;
}
</style>
