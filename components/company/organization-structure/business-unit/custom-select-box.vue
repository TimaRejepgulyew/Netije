<template>
  <div>
    <DxSelectBox
      ref="businessUnit"
      :read-only="readOnly"
      :data-source="businessUnitStore"
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
          @openFields="openFields"
          @openCard="showPopup(data)"
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
    customField
  },
  props: [
    "value",
    "storeApi",
    "messageRequired",
    "validatorGroup",
    "readOnly",
    "valueExpr"
  ],
  computed: {
    businessUnitStore() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.storeApi || dataApi.company.BusinessUnit
        }),
        paginate: true,
        pageSize: 10,
        filter: ["status", "=", Status.Active]
      });
    },
    businessUnitId() {
      return this.valueExpr ? this.value : this.value?.id;
    }
  },
  methods: {
    openFields() {
      this.$refs["businessUnit"].instance.open();
    },
    showPopup() {
      this.$popup.bussiniesUnitCard(
        this,
        {
          businessUnitId: this.businessUnitId
        },
        {
          height: "auto"
        }
      );
    },
    valueChanged(e) {
      console.log();
      this.$emit("valueChanged", e.value);
    }
  }
};
</script>

<style></style>
