<template>
  <div class="d-flex">
    <DxTextBox :placeholder="$t('shared.select')" :value="fieldData && fieldData.name"  class="product-name" />
    <employee-btn :employeeId="fieldData ? fieldData.id:null" />
  </div>
</template>
<script>
import employeeBtn from "~/components/employee/custom-select-box-btn.vue";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    employeeBtn
  },
  props: {
    fieldData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
