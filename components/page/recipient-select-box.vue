<template>
  <DxSelectBox
    :read-only="readOnly"
    :data-source="dataStore"
    :grouped="true"
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
      <DxRequiredRule v-if="isRequired" :message="$t(`translations.fields.${property}Required`)" />
    </DxValidator>
    <template #group="{ data }">
      <recipient-grouped :data="data" />
    </template>
  </DxSelectBox>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import recipientGrouped from "~/components/page/recipient-grouped.vue";
import dataApi from "~/static/dataApi";
import { DxSelectBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    recipientGrouped,
  },
  props: [
    "valueExpr",
    "value",
    "isRequired",
    "validatorGroup",
    "readOnly",
    "dataApi",
    "property",
  ],
  created() {},
  data() {
    return {
      dataStore:
        new DataSource({
          store: this.$dxStore({
            key: "id",
            loadUrl: this.dataApi || dataApi.recipient.list,
          }),
          paginate: true,
          pageSize: 10,
          group: [{ selector: "recipientType" }],
        }),
    };
  },
  methods: {
    valueChanged(e) {
      if (this.valueExpr) this.$emit("valueChanged", e.value);
      else this.$emit("valueChanged", e.value);
    },
  },
};
</script>

<style>
</style>