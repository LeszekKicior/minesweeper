<template>
  <transition appear name="fade">
    <div :class="{visible, playing}" @click="revealField" @click.right.prevent="flagField" class="field">
      <template v-if="visible">
        <template v-if="content==='bombClicked'">
          <transition name="bomb">
            <img alt="" class="bomb-clicked" src="../assets/bomb.svg"/>
          </transition>
        </template>
        <img alt="" src="../assets/bomb.svg" v-else-if="content==='bomb'"/>
        <span :style="contentStyle" v-else>{{ content }}</span>
      </template>
      <template v-else>
        <transition duration="80" name="fade">
          <img alt="" class="icon-small" src="../assets/flag.svg" v-if="flagged">
        </transition>
      </template>
    </div>
  </transition>
</template>

<script>
export default {
  name: "MineSweeperBoardField",
  props: {
    content: {
      type: [String, Number],
      required: true
    },
    visible: {
      type: Boolean,
      default: false
    },
    flagged: {
      type: Boolean,
      default: false
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    revealField() {
      this.$emit('reveal');
    },
    flagField() {
      this.$emit('flag');
    }
  },
  computed: {
    contentStyle() {
      const opacity = this.content === '0' ? 0 : 1;
      return {opacity}
    }
  }
}
</script>

<style lang="scss" scoped>
.field {
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  user-select: none;
  //margin: 5px;
  transition: all ease 150ms;
  position: relative;
  overflow: hidden;

  &.visible {
    background-color: darken(#293758, 2.5%);
    border-color: rgba(0, 0, 0, 0.08) rgba(255, 255, 255, 0.08) rgba(255, 255, 255, 0.08) rgba(0, 0, 0, 0.08);

    &::after {
      opacity: 1;
    }

    //box-shadow: inset 3px 3px 5px #14203B, inset -0px -0px 5px #384460;
  }

  &:not(.visible) {
    //border: 2px solid;
    border-color: rgba(255, 255, 255, 0.08) rgba(0, 0, 0, 0.08) rgba(0, 0, 0, 0.08) rgba(255, 255, 255, 0.08);
    //box-shadow: 3px 3px 10px #14203B, -3px -3px 10px #384460;
    cursor: pointer;

    &::before {
      opacity: 1;
    }
  }

  &:not(.visible):active {
    background-color: #232f4b;
  }

  &::after, &::before {
    content: '';
    position: absolute;
    z-index: 9;
    width: 100%;
    height: 100%;
    opacity: 0;
    border-radius: 5px;
    transition: opacity 0.3s ease-in-out;
  }

  &::after {
    box-shadow: inset 3px 3px 5px #14203B, inset -0px -0px 5px #384460;
  }

  &::before {
    box-shadow: 3px 3px 10px #14203B, -3px -3px 10px #384460;
  }

  &:not(.playing) {
    pointer-events: none;
  }
}

img {
  width: 40px;
  height: 40px;

  &.icon-small {
    max-width: 25px;
    max-height: 25px;
  }
}
</style>
