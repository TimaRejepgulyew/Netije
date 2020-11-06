<template>
  <div class="d-flex align-center">
    <div v-if="icon" class="header__icon">
      <img class="icon" :src="icon" />
    </div>
    <div v-if="text" class="header__text">
      {{ text }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["icon", "text"]
};
</script>

<style scoped>
.header__icon {
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-content: center;
}
.icon {
  display: block;
  width: 20px;
}
.header__text {
  font-size: 18px;
}
</style>
