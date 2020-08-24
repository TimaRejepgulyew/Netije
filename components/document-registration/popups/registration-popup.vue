<template>
  <form @submit.prevent="handleSubmit">
    <DxForm
      :form-data.sync="regData"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxSimpleItem
        data-field="isCustomNumber"
        :editor-options="isCustomNumberOptions"
        editor-type="dxCheckBox"
      >
        <DxLabel location="top" :text="$t('doсumentRegistration.isCustomNumber')" />
      </DxSimpleItem>
      <DxSimpleItem
        :helpText="isCustomNumber?'':$t('doсumentRegistration.preliminaryRegistrationNumberMessage')"
        data-field="registrationNumber"
        :editor-options="registrationNumberOptions"
      >
        <DxPatternRule :pattern="registrationNumberPattern" />
        <DxLabel
          location="top"
          :text="isCustomNumber?$t('doсumentRegistration.regNumberDocument'):$t('doсumentRegistration.preliminaryRegistrationNumber')"
        />
        <DxRequiredRule :message="$t('doсumentRegistration.validation.regNumberDocumentRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="documentRegisterId"
        :editor-options="documentRegisterOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('doсumentRegistration.documentRegister')" />
        <DxRequiredRule :message="$t('doсumentRegistration.validation.documentRegisterRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="registrationDate"
        :editor-options="registrationDateOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="top" :text="$t('doсumentRegistration.registrationDate')" />
        <DxRequiredRule :message="$t('doсumentRegistration.validation.registrationDateRequired')" />
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
  props: ["documentId", "defauldoсumentRegistration"],
  data() {
    return {
      saveButtonOptions: {
        text: this.$t("buttons.register"),
        useSubmitBehavior: true,
        type: "success",
      },
      regData: {
        isCustomNumber: false,
        documentId: +this.documentId,
        documentTypeGuid: this.$store.getters[
          `documents/${this.documentId}/document`
        ].documentTypeGuid,
        registrationNumber: null,
        registrationDate: new Date(),
        documentRegisterId: this.defauldoсumentRegistration?.id,
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
        disabled: !this.regData.isCustomNumber,
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
    isCustomNumberOptions() {
      return {
        onValueChanged: (e) => {
          this.getDataByFilter();
        },
      };
    },
  },
  methods: {
    async getDataByFilter() {
      if (
        this.regData.registrationDate &&
        this.regData.documentRegisterId &&
        !this.isCustomNumber
      ) {
        const res = await this.$axios.get(
          dataApi.docFlow.DocumentRegister.PreliminaryNumber + this.filter
        );
        this.regData.registrationNumber = res.data.preliminaryNumber;

        this.registrationNumberPattern = res.data.pattern;
      }
    },
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