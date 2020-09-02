<template>
  <div>
    <DxPopup
      :show-title="false"
      :visible.sync="isCardOpened"
      ref="popup"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <updateCard
          v-if="isCardOpened"
          @valueChanged="valueChanged"
          :isCard="true"
          :employeeId="employeeId"
        />
      </div>
    </DxPopup>
    <DxSelectBox
      ref="employee"
      :read-only="readOnly"
      :data-source="employeeStore"
      @valueChanged="valueChanged"
      :showClearButton="true"
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
        <DxRequiredRule :message="$t(messageRequired)" />
      </DxValidator>
      <template #customSelectItem="{data}">
        <custom-select-item :item-data="data" />
      </template>
      <template #customfield="{data}">
        <custom-field
          @openCard="showPopup"
          :read-only="readOnly"
          @valueChanged="updateEmployee"
          :field-data="data"
        />
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import updateCard from "~/components/employee/employee-card.vue";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
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
    updateCard,
    DxPopup,
    DxButton,
  },
  props: [
    "value",
    "storeApi",
    "messageRequired",
    "validatorGroup",
    "readOnly",
    "valueExpr",
  ],

  data() {
    return {
      employeeStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.storeApi || dataApi.company.Employee,
        }),
      }),
      isCardOpened: false,
      employeeId: null,
    };
  },
  methods: {
    showPopup() {
      this.employeeId = this.$refs["employee"].instance.option("selectedItem").id;
      this.$refs["popup"].instance.toggle();
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

<style>
</style>
