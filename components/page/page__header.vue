<template>
  <header class="grid__header">
    <DxButton
      icon="back"
      styling-mode="text"
      :visible="isbackButton"
      :on-click="goBack"
    />
    <h3 class="grid__title">
      {{ headerTitle }} {{ isNew ? $t("shared.newRecord") : "" }}
    </h3>
    <slot name="indicator"></slot>
    <div class="header--toolbar">
      <slot name="toolbar"></slot>
    </div>
  </header>
</template>
<script>
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
  },
  props: {
    headerTitle: {},
    isNew: {},
    isbackButton: {
      default: true,
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.grid__header {
  display: flex;

  .grid__title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-weight: 400;
    font-size: 20px;
    margin: 1vh 0;
  }
  .header--toolbar {
    display: block;
    position: relative;
    margin-left: auto;
  }
}
</style>
