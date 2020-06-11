<template>
  <DxSelectBox
    ref="counterPart"
    :data-source="counterPartStore"
    @valueChanged="valueChanged"
    :showClearButton="true"
    :value="value"
    :openOnFieldClick="false"
    :focusStateEnabled="false"
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
      <custom-field @setCounterPart="setCounterPart" :notPerson="notPerson" :field-data="data" />
    </template>
  </DxSelectBox>
</template>
<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import customSelectItem from "~/components/parties/custom-select-box-item.vue";
import customField from "~/components/parties/custom-select-box-field";
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
  props: ["validatorGroup", "messageRequired", "value", "notPerson"],
  data() {
    return {
      counterPartStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart
        }),
        filter: this.notPerson ? ["type", "<>", "Person"] : null
      })
    };
  },
  methods: {
    valueChanged(e) {
      if(e.event)
      {
        this.$emit("setСounterPart",this.$refs["counterPart"].instance.option("selectedItem"));
      }
    },
    setCounterPart(data) {
      this.$emit("setСounterPart", data.selectedItem);
      this.$refs["counterPart"].instance.repaint();
    }
  }
};
</script>

<style>
</style>