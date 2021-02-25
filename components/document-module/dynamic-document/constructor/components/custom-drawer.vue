
<template>
  <div class="custom-drawer">
    <div class="closeButton" @click="close">
      <div class="custom-button--close">
        <i class="dx-icon dx-icon-close"></i>
        close
      </div>
    </div>
    <div class="custom-drawer-content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.custom-drawer {
  box-sizing: border-box;
  padding: 8px;
  border: 1px solid $base-border-color;
  background: $base-bg;
  position: relative;
  .closeButton {
    cursor: pointer;
    z-index: 2;
    position: absolute;
    top: 30px;
    left: -97px;
    width: 100px;
    overflow: hidden;
  }
  .custom-drawer-content {
    box-sizing: border-box;
    padding: 25px;
    border: 1px solid $base-accent;
    border-radius: $base-border-radius;
    min-height: 94vh;
    width: 550px;
    top: 0;
    left: 0;
    overflow: hidden;
    position: absolute;
    z-index: 5;
  }
  .custom-button--close {
    text-align: center;
    color: $base-bg;
    width: 100px;
    padding: 5px;
    font-size: 16px;
    border: 1px solid $base-border-color;
    background: $base-accent;
    border-radius: $base-border-radius;
    &:focus {
      background: lighten($base-accent, 5);
      color: $base-bg;
      border: 1px solid lighten($base-accent, 5);
    }
    &:focused {
      background: lighten($base-accent, 5);
      color: $base-bg;
      border: 1px solid lighten($base-accent, 5);
    }
    &:hover {
      background: lighten($base-accent, 5);
      color: $base-bg;
      border: 1px solid lighten($base-accent, 5);
    }
  }
}
</style>