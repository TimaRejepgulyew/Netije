<template>
  <div class="d-flex">
    <DxTextBox
      :placeholder="$t('shared.select')"
      :value="fieldData && fieldData.name"
      class="product-name"
    />
    <employee-btn
      v-if="$store.getters['permissions/allowReading'](EntityType.Employee)"
      @valueChanged="valueChanged"
      :employeeId="fieldData ? fieldData.id:null"
    />
  </div>
</template>
<script>
import EntityType from "~/infrastructure/constants/entityTypes";
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
  },
  
  data() {
    return {
      EntityType
    };
  },
  methods: {
    valueChanged(data) {
      this.$emit("valueChanged", data);
    }
  }
};
</script>
