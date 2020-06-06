<template>
  <div class="d-flex">
    <DxTextBox :value="fieldData && fieldData.name"  class="product-name" />
    <employee-btn :employeeId="fieldData ? fieldData.id:null" />
  </div>
</template>
<script>
import employeeBtn from "~/components/page/employee-btn.vue";
import { DxButton } from "devextreme-vue";
import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    DxButton,
    employeeBtn
  },
  created() {
    console.log(this.fieldData);
  },

  props: {
    fieldData: {
      type: Object,
      default: () => {}
    }
  }
};
</script>
