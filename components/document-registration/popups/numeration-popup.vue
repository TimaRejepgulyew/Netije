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
        :helpText="isCustomNumber?'':$t('documentRegistration.preliminaryRegistrationNumberMessage')"
        data-field="registrationNumber"
        :editor-options="registrationNumberOptions"
      >
        <DxPatternRule :pattern="registrationNumberPattern" />
        <DxLabel
          location="top"
          :text="isCustomNumber?$t('documentRegistration.regNumberDocument'):$t('documentRegistration.preliminaryRegistrationNumber')"
        />
        <DxRequiredRule :message="$t('documentRegistration.validation.regNumberDocumentRequired')" />
      </DxSimpleItem>
      <DxSimpleItem :editor-options="documentRegisterOptions" editor-type="dxTextBox">
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
  data() {
    return {
      saveButtonOptions: {
        text: this.$t("buttons.register"),
        useSubmitBehavior: true,
        type: "success",
      },
      regData: {
        documentId: +this.documentId,
        documentTypeGuid: this.$store.getters[
          `documents/${this.documentId}/document`
        ].documentTypeGuid,
        isCustomNumber: false,
        documentRegisterId: this.defaultDocumentRegistration?.id,
        registrationNumber: null,
        registrationDate: new Date(),
      },
      registrationNumberPattern: "",
    };
  },
  created() {
    this.getDataByFilter();
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
    isCustomNumberOptions() {
      //TODO: netije 2 version this functionality

      // const numberingType = this.document.documentKind.numberingType;
      // let autoNumbering;
      // if (numberingType === numberingTypes.Numerable) {
      //   autoNumbering = this.document.documentKind.autoNumbering;
      //   if (autoNumbering) {
      //     this.regData.isCustomNumber = false;
      //     return { disabled: true };
      //   }
      // }
      return {
        disabled: false,
        // onValueChanged: (e) => {
        //   this.getDataByFilter();
        // },
      };
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
      console.log(this.defaultDocumentRegistration);
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.defaultDocumentRegistration?.name,
        disabled: true,
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
      console.log("get");
      if (
        this.regData.registrationDate &&
        this.regData.documentRegisterId &&
        !this.regData.isCustomNumber
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