<template>
  <DxTagBox
    searchExpr="name"
    displayExpr="name"
    item-template="customSelectItem"
    :showClearButton="true"
    :searchEnabled="true"
    :paginate="true"
    :page-size="10"
    :value="value"
    :height="height"
    :valueExpr="valueExpr"
    :readOnly="readOnly"
    :data-source="employeeStore"
    :stylingMode="stylingMode"
    :focusStateEnabled="focusStateEnabled"
    :hoverStateEnabled="hoverStateEnabled"
    :activeStateEnabled="activeStateEnabled"
    @opened="onOpened"
    @valueChanged="valueChanged"
    @focusIn="focusIn"
  >
    <DxValidator v-if="isRequired" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #customSelectItem="{ data }">
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
    customSelectItem,
  },
  props: [
    "value",
    "isRequired",
    "messageRequired",
    "validatorGroup",
    "readOnly",
    "valueExpr",
    "height",
    "stylingMode",
    "focusStateEnabled",
    "hoverStateEnabled",
    "activeStateEnabled",
    "storeApi",
  ],
  data() {
    return {
      dataSourceLoaded: this.valueExpr,
    };
  },
  computed: {
    employeeStore() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.storeApi || dataApi.company.Employee,
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
  },
  methods: {
    focusIn() {
      this.$emit("focusIn", this.value);
    },
    onOpened() {
      this.dataSourceLoaded = true;
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value);
    },
  },
};
</script>

<style>
</style>