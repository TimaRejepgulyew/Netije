<template>
  <div>
    <DxTextBox
      :read-only="true"
      :value="value"
      field-template="customfield"
    >
      <template #customfield="{ data }">
        <custom-field
          :read-only="readOnly"
          :field-data="data || value"
        />
      </template>
    </DxTextBox>
  </div>
</template>

<script>
import customField from "~/components/employee/custom-employee-field";

import { DxTextBox } from "devextreme-vue";
export default {
  components: {
    DxTextBox,
    customField,
  },
  props: {
    value: {},
  },
  computed: {
    employeeId() {
      return this.valueExpr ? this.value : this.value?.id;
    },
  },
};
</script>

<style></style>
