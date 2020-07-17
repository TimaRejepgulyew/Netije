<template>
  <form @submit="handleSubmit">
    <DxForm
      :form-data="currentNumberData"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxSimpleItem data-field="value" :editor-options="numberBoxOptions" editor-type="dxNumberBox">
        <DxLabel location="top" :visible="false" />
        <DxRequiredRule :message="$t('translations.fields.currentNumberRequired')" />
      </DxSimpleItem>
      <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="right" />
    </DxForm>
  </form>
</template>
<script>
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";

import DxForm, {
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule
} from "devextreme-vue/form";
export default {
  components: {
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxForm,
    DxButton
  },
  async created() {
    var res = await this.$axios.get(
      `${dataApi.docFlow.DocumentRegister.All}/CurrentNumber?documentRegisterId=${this.documentRegisterId}`
    );
    this.currentNumberData.value = res.data;
  },
  props: ["documentRegisterId"],
  data() {
    return {
      currentNumberData: {
        id: this.documentRegisterId,
        value: null
      },
      saveButtonOptions: {
        height: 40,
        text: this.$t("buttons.save"),
        useSubmitBehavior: true,
        type: "normal"
      },
      numberBoxOptions: {
        placeholder: this.$t("translations.fields.currentNumberRequired"),
        min: 1
      }
    };
  },
  methods: {
    handleSubmit(e) {
      this.$awn.asyncBlock(
        this.$axios.put(
          `${dataApi.docFlow.DocumentRegister.All}/CurrentNumber/${this.documentRegisterId}`,
          this.currentNumberData
        ),
        res => {
          this.$emit("hidePopup");
          this.$awn.success();
        },
        err => this.$awn.alert()
      );
      e.preventDefault();
    }
  }
};
</script>