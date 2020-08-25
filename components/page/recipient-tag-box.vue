<template>
  <DxTagBox
    :read-only="readOnly"
    :data-source="resipientStore"
    :grouped="true"
    :show-selection-controls="true"
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
    <template #group="{ data }">
      <recipient-grouped :data="data" />
    </template>
  </DxTagBox>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import recipientGrouped from "~/components/page/recipient-grouped.vue";
import dataApi from "~/static/dataApi";
import { DxTagBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTagBox,
    recipientGrouped,
  },
  props: [
    "recipients",
    "messageRequired",
    "validatorGroup",
    "readOnly",
    "valueExpr",
  ],
  data() {
    return {
      resipientStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.recipient.list,
        }),
         group: [{ selector: "recipientType" }],
      }),
    };
  },
  methods: {
    setRecipient(e) {
      this.$emit("setRecipients", e.value);
    },
  },
};
</script>

<style>
</style>