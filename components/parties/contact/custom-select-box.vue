<template>
  <DxSelectBox
    ref="contact"
    :data-source="contactStore"
    @valueChanged="valueChanged"
    :showClearButton="true"
    :value="value"
    :openOnFieldClick="false"
    :focusStateEnabled="false"
    :disabled="disabled"
    valueExpr="id"
    displayExpr="name"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
    item-template="customSelectItem"
    field-template="customfield"
  >
    <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #customSelectItem="{data}">
      <custom-select-item :item-data="data" />
    </template>
    <template #customfield="{data}">
      <custom-field
        @valueChanged="setContact"
        :correspondentId="correspondentId"
        :field-data="data"
      />
    </template>
  </DxSelectBox>
</template>
<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import customSelectItem from "~/components/parties/contact/custom-select-box-item.vue";
import customField from "~/components/parties/contact/custom-select-box-field";
import dataApi from "~/static/dataApi";
import { DxSelectBox } from "devextreme-vue";
import DataSource from "devextreme/data/data_source";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    customSelectItem,
    customField
  },
  props: [
    "validatorGroup",
    "messageRequired",
    "value",
    "filter",
    "correspondentId",
    "disabled"
  ],
  data() {
    return {};
  },
  computed: {
    contactStore() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.Contact
        }),
        filter: ["companyId", "=", this.correspondentId]
      });
    }
  },
  methods: {
    valueChanged(e) {
      if (e.event) {
        this.$emit(
          "valueChanged",
          this.$refs["contact"].instance.option("selectedItem")
        );
      }
    },
    setContact(data) {
      this.$emit("valueChanged", data);
      this.$refs["contact"].instance.repaint();
    }
  }
};
</script>

<style>
</style>