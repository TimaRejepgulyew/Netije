<template>
  <form @submit.prevent="handleSubmit">
    <DxForm
      :form-data.sync="regData"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxSimpleItem data-field="registrationNumber" :editor-options="registrationNumberOptions">
        <DxPatternRule :pattern="registrationNumberPattern" />
        <DxLabel location="top" />
        <DxRequiredRule :message="$t('registrationPopup.validation.regNumberDocumentRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="documentRegisterId"
        :editor-options="documentRegisterOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('registrationPopup.documentRegister')" />
        <DxRequiredRule :message="$t('registrationPopup.validation.documentRegisterRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="registrationDate"
        :editor-options="registrationDateOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="top" :text="$t('registrationPopup.registrationDate')" />
        <DxRequiredRule :message="$t('registrationPopup.validation.registrationDateRequired')" />
      </DxSimpleItem>
      <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="right" />
    </DxForm>
  </form>
</template> 
<script>
import numberingTypes from "~/infrastructure/constants/numberingTypes.js";
import moment from "moment";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxButtonItem,
  DxLabel,
  DxRequiredRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule,
} from "devextreme-vue/form";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxPatternRule,
    DxRangeRule,
    DxStringLengthRule,
    DxForm,
    DxButton,
  },
  props: ["documentId"],
  data() {
    return {
      saveButtonOptions: {
        text: this.$t("buttons.register"),
        useSubmitBehavior: true,
        type: "success",
      },
      regData: {
        documentId: this.documentId,
        documentTypeGuid: this.$store.getters[
          `documents/${this.documentId}/document`
        ].documentTypeGuid,
        registrationNumber: null,
        registrationDate: new Date(),
        documentRegisterId: null,
      },
      registrationNumberPattern: "",
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    isRegistered() {
      return this.$store.getters[`docuemnts/${this.documentId}/isRegistered`];
    },
    filter() {
      return `?documentRegisterId=${
        this.regData.documentRegisterId
      }&documentId=${this.regData.documentId}&registrationDate=${moment(
        this.regData.registrationDate
      ).format("L")}`;
    },
    registrationNumberOptions() {
      return {
        onValueChanged: (e) => {
          this.getDataByFilter();
        },
      };
    },
    registrationDateOptions() {
      return {
        onValueChanged: (e) => {
          this.getDataByFilter();
        },
      };
    },
    documentRegisterOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url:
            dataApi.docFlow.DocumentRegister.RegistrableDocumentRegisteres +
            this.regData.documentId,
        }),
        onValueChanged: (e) => {
          if (!this.regData.registrationDate)
            this.regData.registrationDate = new Date();
          else this.getDataByFilter();
        },
      };
    },
  },
  methods: {
    // async getDataByFilter() {
    //   if (this.regData.registrationDate && this.regData.documentRegisterId) {
    //     const res = await this.$axios.get(
    //       dataApi.DocumentRegister.PreliminaryNumber + this.filter
    //     );
    //     this.regData.registrationNumber = res.data.preliminaryNumber;

    //     this.registrationNumberPattern = res.data.pattern;
    //   }
    // },
    handleSubmit() {
      this.$awn.asyncBlock(
        this.$store.dispatch(
          `documents/${this.documentId}/registration`,
          this.regData
        ),
        (res) => {
          this.$emit("hidePopup");
          this.$awn.success();
        },
        (err) => this.$awn.alert()
      );
    },
  },
};
</script>