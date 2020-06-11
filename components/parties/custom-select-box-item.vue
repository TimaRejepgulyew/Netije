<template>
  <div class="custom-item">
    <div>{{itemData && itemData.name}}</div>
    <div class="small grey">{{itemData && $t("counterPart."+itemData.type)}}</div>
  </div>
</template>
<script>
import { DxTextBox } from "devextreme-vue";

export default {
  components: {
    DxTextBox
  },
  props: {
    itemData: {
      default: () => {}
    }
  }
};
</script>
<style lang="scss">
.small {
  font-size: 0.6em;
}
.custom-item {
  padding: 7px;
}
.grey {
  color: gray;
}
</style>