<template>
  <div>
    <DxSelectBox
      ref="department"
      @opened="onOpened"
      :read-only="readOnly"
      :data-source="departmentUnitStore"
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
      field-template="customfield"
      :deferRendering="true"
    >
      <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
        <DxRequiredRule />
      </DxValidator>
      <template #customfield="{ data }">
        <custom-field
          @focusIn="focusIn"
          @openFields="openFields"
          @openCard="showPopup"
          :read-only="readOnly"
          :field-data="data || value"
        />
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { DxSelectBox } from "devextreme-vue";
import dataApi from "~/static/dataApi";
import Status from "~/infrastructure/constants/status";
import DataSource from "devextreme/data/data_source";
import customField from "~/components/company/organization-structure/business-unit/custom-field.vue";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    customField,
  },
  props: [
    "value",
    "storeApi",
    "messageRequired",
    "validatorGroup",
    "readOnly",
    "valueExpr",
    "businessUnitId",
  ],

  data() {
    return {
      dataSourceLoaded: this.valueExpr,
      isCardOpened: false,
      currentBusinessUnit: null,
    };
  },
  computed: {
    departmentUnitStore() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.storeApi || dataApi.company.Department,
        }),
        paginate: true,
        pageSize: 10,
        filter: [
          ["businessUnitId", "=", this.businessUnitId],
          "and",
          ["status", "=", Status.Active],
        ],
      });
      if (this.dataSourceLoaded) {
        return dataSource;
      }
      if (this.readOnly || this.value) {
        return [];
      }

      return dataSource;
    },
    departmentId() {
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
      this.$refs["department"].instance.open();
    },
    showPopup() {
      this.$popup.departmentCard(
        this,
        {
          departmentId: this.departmentId,
        },
        {
          height: "auto",
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" },
          ],
        }
      );
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value);
    },
  },
};
</script>

<style></style>
