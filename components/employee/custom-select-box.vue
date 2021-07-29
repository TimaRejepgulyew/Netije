<template>
  <div>
    <DxSelectBox
      ref="employee"
      field-template="customfield"
      displayExpr="name"
      searchExpr="name"
      item-template="customSelectItem"
      :read-only="readOnly"
      :data-source="employeeStore"
      :showClearButton="showClearButton"
      :stylingMode="stylingMode"
      :value="value"
      :openOnFieldClick="false"
      :focusStateEnabled="false"
      :valueExpr="valueExpr"
      :acceptCustomValue="true"
      :searchEnabled="true"
      :height="height"
      :paginate="true"
      :page-size="10"
      :deferRendering="true"
      @valueChanged="valueChanged"
      @opened="onOpened"
    >
      <DxValidator v-if="isRequired" :validation-group="validatorGroup">
        <DxRequiredRule />
      </DxValidator>

      <template #customSelectItem="{ data }">
        <custom-select-item :item-data="data" />
      </template>
      <template #customfield="{ data }">
        <custom-field
          @focusIn="focusIn"
          @openFields="openFields"
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
  props: {
    showClearButton: {
      type: Boolean,
      default: true,
    },
    value: {},
    isRequired: {
      default: false,
    },
    storeApi: {
      type: String,
      default: dataApi.company.Employee,
    },
    messageRequired: {},
    validatorGroup: {},
    readOnly: {},
    stylingMode: {},
    height: {},
    valueExpr: {},
  },
  data() {
    return {
      dataSourceLoaded: this.valueExpr,
      localEmployeeId: null,
    };
  },
  computed: {
    employeeStore() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.storeApi,
        }),
        paginate: true,
        pageSize: 10,
      });
      if (this.dataSourceLoaded) {
        return dataSource;
      }
      if (this.readOnly || this.value) {
        return [];
      }

      return dataSource;
    },
    employeeId() {
      return this.valueExpr ? this.value : this.value?.id;
    },
  },
  methods: {
    focusIn() {
      this.$emit("focusIn", this.value);
    },
    onOpened() {
      this.dataSourceLoaded = true;
    },
    openFields() {
      this.$refs["employee"].instance.open();
    },
    async reloadStore() {
      await this.employeeStore?.reload();
      this.$refs["employee"].instance.repaint();
    },
    showCard() {
      this.$popup.employeeCard(
        this,
        {
          employeeId: this.employeeId || this.localEmployeeId,
        },
        {
          height: "auto",
          listeners: [
            { eventName: "valueChanged", handlerName: "reloadStore" },
          ],
        }
      );
    },
    valueChanged(e) {
      this.localEmployeeId = this.employeeId;
      this.$emit("valueChanged", e.value);
    },
    updateEmployee(data) {
      if (this.valueExpr) this.$emit("valueChanged", data[this.valueExpr]);
      else this.$emit("valueChanged", data);
      this.reloadStore();
    },
  },
};
</script>

<style></style>
