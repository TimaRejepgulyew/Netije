<template>
  <div>
    <DxSelectBox
      ref="employee"
      :read-only="readOnly"
      :data-source="employeeStore"
      @valueChanged="valueChanged"
      :showClearButton="showClearButton"
      :value="value"
      :openOnFieldClick="false"
      :focusStateEnabled="false"
      :valueExpr="valueExpr"
      displayExpr="name"
      :searchEnabled="true"
      searchExpr="name"
      :paginate="true"
      :page-size="10"
      item-template="customSelectItem"
      field-template="customfield"
      :deferRendering="true"
    >
      <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
        <DxRequiredRule />
      </DxValidator>

      <template #customSelectItem="{ data }">
        <custom-select-item :item-data="data" />
      </template>
      <template #customfield="{ data }">
        <custom-field
          @showCard="showCard"
          :read-only="readOnly"
          @valueChanged="updateEmployee"
          :field-data="data || value"
        />
      </template>
    </DxSelectBox>
  </div>
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
    customField,
  },
  props: [
    "showClearButton",
    "value",
    "storeApi",
    "messageRequired",
    "validatorGroup",
    "readOnly",
    "valueExpr",
  ],
  computed: {
    employeeStore() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.storeApi || dataApi.company.Employee,
        }),
        paginate: true,
        pageSize: 10,
      });
    },
    employeeId() {
      return this.valueExpr ? this.value : this.value?.id;
    },
  },
  methods: {
    showCard() {
      this.$popup.employeeCard(
        this,
        {
          employeeId: this.employeeId,
        },
        {
          height:"auto"
          // listeners: [
          //   { eventName: "valueChanged", handlerName: "updateEmployee" },
          // ],
        }
      );
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value);
    },
    updateEmployee(data) {
      if (this.valueExpr) this.$emit("valueChanged", data[this.valueExpr]);
      else this.$emit("valueChanged", data);
      this.employeeStore.reload();
    },
  },
};
</script>

<style></style>
