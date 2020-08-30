<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: "BaseModal"
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: -60px;
  z-index: 999;

.modal-content {
  padding: 40px 60px;
  background-color: #293758;
  border-radius: 30px;
  color: white;
  font-size: 24px;
  display: flex;
  flex-flow: column nowrap;
  box-shadow: 6px 6px 15px rgba(0,0,0,0.2);
}
}

</style>
