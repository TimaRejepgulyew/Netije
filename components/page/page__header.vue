<template>
  <header class="grid__header d-flex">
    <DxButton icon="back" styling-mode="text" :visible="isbackButton" :on-click="goBack" />
    <h3 class="grid__title">{{headerTitle}} {{isNew?$t("shared.newRecord"):""}}</h3>
    <div class="header--toolbar" slot="toolbar"></div>
  </header>
</template>
<script>
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton
  },
  props: {
    headerTitle: {},
    isNew: {},
    isbackButton: {
      default: true
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" >
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";

.grid__title {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 400;
  font-size: 20px;
  margin: 1vh 0;
}
</style>
