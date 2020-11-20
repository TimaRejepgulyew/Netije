<template>
  <DxTagBox
    :read-only="readOnly"
    :data-source="resipientStore"
    :show-selection-controls="false"
    @valueChanged="setRecipient"
    :showClearButton="true"
    :value="recipients"
    :valueExpr="valueExpr"
    displayExpr="name"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
  >
    <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #item="{ data }">
      <div>
        <component :data="data" :is="listItemByType(data.recipientType)" />
      </div>
    </template>
  </DxTagBox>
</template>

<script>
import defaultType from "~/components/recipient/components/list-item/default.vue";
import employeeTypeComponent from "~/components/recipient/components/list-item/employee-type.vue";
import recipientType from "~/infrastructure/constants/resipientType.js";
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";

import dataApi from "~/static/dataApi";
import { DxTagBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTagBox,
    employeeTypeComponent,
    defaultType
  },
  props: [
    "recipients",
    "messageRequired",
    "validatorGroup",
    "readOnly",
    "valueExpr"
  ],
  data() {
    return {
      resipientStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.recipient.list
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
    setRecipient(e) {
      this.$emit("setRecipients", e.value);
    }
  }
};
</script>

<style></style>
