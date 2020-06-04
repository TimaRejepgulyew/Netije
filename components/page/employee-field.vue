<template>
  <div class="custom-item">
    <div>{{$t()}}{{fieldData && fieldData.name}}</div>
    <div class="small grey">{{fieldData && fieldData.jobTitle}}</div>
  </div>
</template>
<script>
import { DxTextBox } from "devextreme-vue";

export default {
  components: {
    DxTextBox
  },
  props: {
    fieldData: {
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