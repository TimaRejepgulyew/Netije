<template>
  <div>
    <DxPopup
      :show-title="false"
      :visible.sync="isCardOpened"
      ref="popup"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <card :data="currentBusinessUnit" />
      </div>
    </DxPopup>
    <DxSelectBox
      ref="businessUnit"
      :read-only="readOnly"
      :data-source="businessUnitStore"
      @valueChanged="valueChanged"
      :showClearButton="true"
      :value="value"
      :openOnFieldClick="false"
      :focusStateEnabled="false"
      :valueExpr="valueExpr"
      displayExpr="name"
      :searchEnabled="true"
      searchExpr="name"
      :paginate="true"
      :page-size="10"
      field-template="customfield"
      :deferRendering="true"
    >
      <DxValidator v-if="validatorGroup" :validation-group="validatorGroup">
        <DxRequiredRule />
      </DxValidator>
      <template #customfield="{ data }">
        <custom-field
          @openCard="showPopup"
          :read-only="readOnly"
          :field-data="data || value"
        />
      </template>
    </DxSelectBox>
  </div>
</template>

<script>
import { DxValidator, DxRequiredRule } from "devextreme-vue/validator";
import { DxSelectBox } from "devextreme-vue";
import { DxPopup } from "devextreme-vue/popup";
import dataApi from "~/static/dataApi";
import Status from "~/infrastructure/constants/status";
import DataSource from "devextreme/data/data_source";
import customField from "~/components/company/organization-structure/custom-field.vue";
import Card from "~/components/company/organization-structure/card.vue";
export default {
  components: {
    DxValidator,
    DxRequiredRule,
    DxSelectBox,
    customField,
    Card,
    DxPopup,
  },
  props: [
    "value",
    "storeApi",
    "messageRequired",
    "validatorGroup",
    "readOnly",
    "valueExpr",
  ],

  data() {
    return {
      isCardOpened: false,
      currentBusinessUnit: null,
    };
  },
  computed: {
    businessUnitStore() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.storeApi || dataApi.company.BusinessUnit,
        }),
        paginate: true,
        pageSize: 10,
        filter: ["status", "=", Status.Active],
      });
    },
    businessUnitId() {
      return this.valueExpr ? this.value : this.value?.id;
    },
  },
  methods: {
    async showPopup() {
      const { data } = await this.$axios.get(
        `${dataApi.company.BusinessUnit}/${this.businessUnitId}`
      );
      this.currentBusinessUnit = data;
      this.isCardOpened = !this.isCardOpened;
    },
    valueChanged(e) {
      this.$emit("valueChanged", e.value);
    },
  },
};
</script>

<style></style>
