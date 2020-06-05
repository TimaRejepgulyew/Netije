<template>
  <DxSelectBox
    :data-source="employeeStore"
    @valueChanged="setEmployee"
    :showClearButton="true"
    :value="employee"
    valueExpr="id"
    displayExpr="name"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
    item-template="field"
  >
    <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #field="{data}">
      <field :field-data="data" />
    </template>
  </DxSelectBox>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import field from "~/components/page/employee-field.vue";
import dataApi from "~/static/dataApi";
import { DxSelectBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    field
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