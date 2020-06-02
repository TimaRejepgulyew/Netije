<template>
  <DxTagBox
    :data-source="resipientStore"
    :grouped="true"
    :show-selection-controls="true"
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
    <DxValidator validation-group="taskValidationgroup">
      <DxRequiredRule
        v-if="isRequired"
        :message="$t('translations.fields.acquaintMembersRequired')"
      />
    </DxValidator>
    <template #group="{ data }">
      <recipient-list :data="data" />
    </template>
  </DxTagBox>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import recipientList from "~/components/page/recipient-list.vue";
import dataApi from "~/static/dataApi";
import { DxTagBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxTagBox,
    recipientList
  },
  props: ["recipients", "property", "isRequired"],
  created() {
    console.log(this.recipients);
  },
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