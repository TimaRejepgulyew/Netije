<template>
  <div class="expander_container" :class="{ 'expander--active': swiched }">
    <img class="expander__icon" :src="expanderIcon" alt="Открыть" />
  </div>
</template>

<script>
import expanderIcon from "~/static/icons/accordion/expand-button.svg";
export default {
  props: {
    expanderIcon: {
      default: expanderIcon
    },
    swiched: {
      type: Boolean
    }
  }
};
</script>

<style scoped lang="scss">
.expander_container {
  padding: 8px;
  box-sizing: border-box;
  display: flex;
  align-content: center;
  align-content: center;
  transition: 0.3s;
  transform: rotateZ(-90deg);
}
.expander--active {
  transform: rotateZ(0deg);
}
.expander__icon {
  align-self: center;
  display: block;
  width: 12px;
}
</style>
