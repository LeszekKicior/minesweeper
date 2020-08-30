<template>
  <button @click="$emit('click', $event.target.value)" class="button">
    <slot>
      Button
    </slot>
  </button>
</template>

<script>
export default {
  name: "BaseButton"
}
</script>

<style lang="scss" scoped>
.button {
  padding: 15px 30px;
  //margin-top: 30px;
  color: white;
  background-color: #293758;
  border-radius: 25px;
  box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2), -4px -4px 10px rgba(120, 140, 255, 0.15);
  cursor: pointer;
  outline: none;
  border: none;
  transition: 100ms box-shadow ease;

  &:hover {
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.2), -2px -2px 6px rgba(120, 140, 255, 0.25);
  }

  &:active {
    box-shadow: inset 2px 2px 6px rgba(0, 0, 0, 0.25), inset -2px -2px 6px rgba(120, 140, 255, 0.3);
  }

}
</style>
