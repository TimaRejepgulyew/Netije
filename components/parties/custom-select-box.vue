<template>
  <DxSelectBox
    ref="counterPart"
    :read-only="readOnly"
    :data-source="counterPartStore"
    @valueChanged="valueChanged"
    @selectionChanged="selectionChanged"
    :showClearButton="true"
    :value="value"
    :openOnFieldClick="false"
    :focusStateEnabled="false"
    valueExpr="id"
    displayExpr="name"
    :disabled="disabled"
    :searchEnabled="true"
    searchExpr="name"
    :paginate="true"
    :page-size="10"
    item-template="customSelectItem"
    field-template="customfield"
  >
    <DxValidator v-if="isRequired" :validation-group="validatorGroup">
      <DxRequiredRule :message="$t(messageRequired)" />
    </DxValidator>
    <template #customSelectItem="{ data }">
      <custom-select-item :item-data="data" />
    </template>
    <template #customfield="{ data }">
      <custom-field
        @focusIn="focusIn"
        :read-only="readOnly"
        :notPerson="notPerson"
        :isPerson="isPerson"
        :field-data="data"
        @openFields="openFields"
        @openGridPopup="openGridPopup(data)"
        @openCounterPartPopup="openCounterPartPopup(data)"
        @openCreateCounterPartPopup="openCreateCounterPartPopup"
      />
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
    customField,
  },
  props: [
    "isRequired",
    "validatorGroup",
    "messageRequired",
    "value",
    "notPerson",
    "isPerson",
    "disabled",
    "readOnly",
  ],
  data() {
    return {
      counterPartStore: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.contragents.CounterPart,
        }),
        paginate: true,
        pageSize: 10,
        filter: this.notPerson
          ? ["type", "<>", "Person"]
          : this.isPerson
          ? ["type", "=", "Person"]
          : null,
      }),
    };
  },
  methods: {
    focusIn() {
      this.$emit("focusIn", this.value);
    },
    openFields() {
      this.$refs["counterPart"].instance.open();
    },
    openGridPopup(data) {
      this.$popup.counterPartGrid(
        this,
        {
          isPerson: this.isPerson,
          notPerson: this.notPerson,
        },
        {
          showLoadingPanel: false,
          listeners: [
            { eventName: "valueChanged", handlerName: "setCounterPart" },
          ],
        }
      );
    },
    openCounterPartPopup(data) {
      this.$popup.counterPartCard(
        this,
        {
          counterpartId: data.id,
          type: data.type.toLowerCase(),
          isCard: true,
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "setCounterPart" },
          ],
        }
      );
    },
    openCreateCounterPartPopup(data) {
      this.$popup.counterPartCard(
        this,
        {
          type: data,
          isCard: true,
        },
        {
          showLoadingPanel: false,
          listeners: [
            { eventName: "valueChanged", handlerName: "setCounterPart" },
          ],
        }
      );
    },
    reloadStore() {
      this.$refs["counterPart"].instance.repaint();
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value);
    },
    selectionChanged(e) {
      this.$emit("selectionChanged", e.selectedItem);
    },
    setCounterPart(data) {
      this.$emit("valueChanged", data.id);
      this.reloadStore();
    },
  },
};
</script>

<style></style>
