<template>
  <DxTagBox
    :data-source="employeeStore"
    @valueChanged="setEmployee"
    :showClearButton="true"
    :value="employees"
    valueExpr="id"
    displayExpr="name"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
    item-template="customSelectItem"
  >
    <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #customSelectItem="{data}">
      <customSelectItem :item-data="data" />
    </template>
  </DxTagBox>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import customSelectItem from "~/components/employee/custom-select-box-item.vue";
import dataApi from "~/static/dataApi";
import { DxTagBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTagBox,
    customSelectItem
  },
  props: ["employees", "messageRequired", "validatorGroup"],
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
      this.$emit("setEmployee", e.value);
    }
  }
};
</script>

<style>
</style>