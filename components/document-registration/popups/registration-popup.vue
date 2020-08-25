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
        <DxLabel location="top" :text="$t('documentRegistration.isCustomNumber')" />
      </DxSimpleItem>
      <DxSimpleItem
        :helpText="preliminaryRegistrationNumberMessage"
        data-field="registrationNumber"
        :editor-options="registrationNumberOptions"
      >
        <DxPatternRule :pattern="registrationNumberPattern" />
        <DxLabel location="top" :text="preliminaryRegistrationNumber" />
        <DxRequiredRule :message="$t('documentRegistration.validation.regNumberDocumentRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="documentRegisterId"
        :editor-options="documentRegisterOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="top" :text="$t('documentRegistration.documentRegister')" />
        <DxRequiredRule :message="$t('documentRegistration.validation.documentRegisterRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="registrationDate"
        :editor-options="registrationDateOptions"
        editor-type="dxDateBox"
      >
        <DxLabel location="top" :text="$t('documentRegistration.registrationDate')" />
        <DxRequiredRule :message="$t('documentRegistration.validation.registrationDateRequired')" />
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
  props: ["documentId", "defaultDocumentRegistration"],
  async created() {
    this.getPreliminaryRegistrationNumber();
  },
  data() {
    return {
      saveButtonOptions: {
        text: this.$t("documentRegistration.buttons.register"),
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
        documentRegisterId: this.defaultDocumentRegistration?.id,
      },
      registrationNumberPattern: "",
    };
  },
  computed: {
    preliminaryRegistrationNumberMessage() {
      return this.regData.isCustomNumber
        ? ""
        : this.$t("documentRegistration.preliminaryRegistrationNumberMessage");
    },
    preliminaryRegistrationNumber() {
      return this.regData.isCustomNumber
        ? this.$t("documentRegistration.regNumberDocument")
        : this.$t("documentRegistration.preliminaryRegistrationNumber");
    },
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
          this.getPreliminaryRegistrationNumber();
        },
      };
    },

    registrationDateOptions() {
      return {
        onValueChanged: (e) => {
          this.getPreliminaryRegistrationNumber();
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
          else this.getPreliminaryRegistrationNumber();
        },
      };
    },
    isCustomNumberOptions() {
      return {
        onValueChanged: (e) => {
          this.getPreliminaryRegistrationNumber();
        },
      };
    },
  },
  methods: {
    async getPreliminaryRegistrationNumber() {
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