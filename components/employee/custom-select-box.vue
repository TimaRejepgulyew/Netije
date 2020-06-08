<template>
  <DxSelectBox
    :data-source="employeeStore"
    @valueChanged="setEmployee"
    :showClearButton="true"
    :value="employee"
    :openOnFieldClick="false"
    :focusStateEnabled="false"
    valueExpr="id"
    displayExpr="name"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
    item-template="customSelectItem"
    field-template="customfield"
  >
    <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #customSelectItem="{data}">
      <custom-select-item :item-data="data" />
    </template>
    <template #customfield="{data}">
      <custom-field :field-data="data" />
    </template>
  </DxSelectBox>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import customField from "~/components/employee/custom-employee-field";
import dataApi from "~/static/dataApi";
import { DxSelectBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    customSelectItem,
    customField
  },
  props: ["employee", "messageRequired", "validatorGroup"],
  data() {
    return {
      employeeStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.company.Employee
        })
      })
    };
  },
  methods: {
    setEmployee(e) {
      console.log(this.property);
      this.$emit("setEmployee", e.value);
    }
  }
};
</script>

<style>
</style>