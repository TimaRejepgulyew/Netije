<template>
  <DxSelectBox
    :read-only="readOnly"
    :data-source="dataStore"
    @valueChanged="valueChanged"
    :showClearButton="true"
    :value="value"
    :value-expr="valueExpr"
    displayExpr="name"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
  >
    <DxValidator :validation-group="validatorGroup">
      <DxRequiredRule
        v-if="isRequired"
        :message="$t(`translations.fields.${property}Required`)"
      />
    </DxValidator>
    <template #item="{ data }">
      <div>
        <component :data="data" :is="listItemByType(data.recipientType)" />
      </div>
    </template>
  </DxSelectBox>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import defaultType from "~/components/recipient/components/list-item/default.vue";
import employeeTypeComponent from "~/components/recipient/components/list-item/employee-type.vue";
import recipientType from "~/infrastructure/constants/resipientType.js";
import dataApi from "~/static/dataApi";
import { DxSelectBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    employeeTypeComponent,
    defaultType
  },
  props: [
    "valueExpr",
    "value",
    "isRequired",
    "validatorGroup",
    "readOnly",
    "dataApi",
    "property"
  ],
  created() {},
  data() {
    return {
      dataStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.dataApi || dataApi.recipient.list
        }),
        paginate: true,
        pageSize: 10,
        sort: [{ selector: "recipientType", desc: false }]
      })
    };
  },
  methods: {
    listItemByType(type) {
      switch (type) {
        case recipientType.Employee:
          return "employeeTypeComponent";
        default:
          return "defaultType";
      }
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value);
    }
  }
};
</script>

<style></style>
