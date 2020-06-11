<template>
  <DxSelectBox
    :data-source="resipientStore"
    :grouped="true"
    @valueChanged="setRecipient"
    :showClearButton="true"
    :value="recipients"
    valueExpr="id"
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
    recipientGrouped
  },
  props: ["recipients", "property", "isRequired", "validatorGroup"],
  created() {},
  data() {
    return {
      resipientStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.recipient.list
        }),
        group: [{ selector: "recipientType" }]
      })
    };
  },
  methods: {
    setRecipient(e) {
      this.$emit("setRecipients", [this.property, e.value]);
    }
  }
};
</script>

<style>
</style>