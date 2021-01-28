<template>
  <DxSelectBox
    @opened="onOpened"
    ref="recipient"
    :read-only="readOnly"
    :data-source="dataStore"
    @valueChanged="valueChanged"
    :openOnFieldClick="true"
    :showClearButton="true"
    :value="value"
    :value-expr="valueExpr"
    displayExpr="name"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
    :deferRendering="true"
  >
    <DxValidator :validation-group="validatorGroup">
      <DxRequiredRule v-if="isRequired" :message="$t(`translations.fields.${property}Required`)" />
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
      dataSourceLoaded: this.valueExpr,
      needRepaint: false
    };
  },
  computed: {
    dataStore() {
      const dataSource = new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.dataApi || dataApi.recipient.list
        }),
        paginate: true,
        pageSize: 10,
        sort: [{ selector: "recipientType", desc: false }]
      });
      if (this.dataSourceLoaded) {
        return dataSource;
      }
      if (this.readOnly || this.value ) {
        console.log("this.value", this.value);
        return [this.value];
      }

      return dataSource;
    }
  },
  methods: {
    onOpened() {
      this.dataSourceLoaded = true;
    },
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
      if (this.needRepaint) {
        this.needRepaint = false;
        this.$refs["recipient"].instance.repaint();
      }
    }
  }
};
</script>

<style></style>
