<template>
  <form @submit.prevent="handleSubmit">
    <DxForm :read-only="false" :show-colon-after-label="true" :show-validation-summary="true">
      <DxSimpleItem
        data-field="isCustomNumber"
        :editor-options="isCustomNumberOptions"
        editor-type="dxCheckBox"
      >
        <DxLabel location="top" :text="$t('registrationPopup.isCustomNumber')" />
      </DxSimpleItem>
      <DxSimpleItem
        :helpText="isCustomNumber?'':$t('registrationPopup.preliminaryRegistrationNumberMessage')"
        data-field="registrationNumber"
        :editor-options="registrationNumberOptions"
      >
        <DxPatternRule :pattern="registrationNumberPattern" />
        <DxLabel
          location="top"
          :text="isCustomNumber?$t('registrationPopup.regNumberDocument'):$t('registrationPopup.preliminaryRegistrationNumber')"
        />
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
  DxPatternRule
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
    DxButton
  },
  data() {
    return {
      isCustomNumber: false,

      saveButtonOptions: {
        text: this.$t("buttons.register"),
        useSubmitBehavior: true,
        type: "success"
      },
      registrationNumberPattern: ""
    };
  },
  computed: {
    filter() {
      return `?documentRegisterId=${this.documentRegisterId}&documentId=${
        this.documentId
      }&registrationDate=${moment(this.registrationDate).format("L")}`;
    },
    isCustomNumberOptions() {
      const numberingType = this.$store.getters["currentDocument/document"]
        .documentKind.numberingType;
      let autoNumbering;
      if (numberingType === numberingTypes.Numerable) {
        autoNumbering = this.$store.getters["currentDocument/document"]
          .documentKind.autoNumbering;
        if (autoNumbering) {
          this.isCustomNumber = false;
          return { disabled: true };
        }
      }
      return {
        disabled: false,
        onValueChanged: e => {
          this.isCustomNumber = e.value;
          this.getDataByFilter();
        }
      };
    },
    registrationNumber() {
      return this.$store.getters["currentDocument/document"].registrationNumber;
    },
    registrationNumberOptions() {
      return {
        disabled: !this.isCustomNumber,
        value: this.registrationNumber,
        onValueChanged: e => {
          this.$store.commit(
            "currentDocument/SET_REGISTRATION_NUMBER",
            e.value
          );
          this.getDataByFilter();
        }
      };
    },
    registrationDate() {
      return this.$store.getters["currentDocument/document"].registrationDate;
    },
    registrationDateOptions() {
      return {
        value: this.registrationDate,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_REGISTRATION_DATE", e.value);
          this.getDataByFilter();
        }
      };
    },
    documentRegisterId() {
      return this.$store.getters["currentDocument/document"].documentRegisterId;
    },
    documentRegisterOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.documentRegistration.Registries + this.documentId
        }),
        value: this.documentRegisterId,
        onValueChanged: e => {
          this.$store.commit(
            "currentDocument/SET_DOCUMENT_REGISTER_ID",
            e.value
          );
          if (this.documentRegisterId && !this.registrationDate) {
            this.$store.commit(
              "currentDocument/SET_REGISTRATION_DATE",
              new Date()
            );
          }
          this.getDataByFilter();
        }
      };
    },
    documentId() {
      return this.$store.getters["currentDocument/document"].id;
    }
  },
  methods: {
    async getDataByFilter() {
      if (
        this.registrationDate &&
        this.documentRegisterId &&
        !this.isCustomNumber
      ) {
        const res = await this.$axios.get(
          dataApi.documentRegistration.PreliminaryNumber + this.filter
        );
        this.$store.commit(
          "currentDocument/SET_REGISTRATION_NUMBER",
          +res.data.preliminaryNumber
        );
        this.registrationNumberPattern = res.data.pattern;
      }
    },
    handleSubmit() {
      this.documentId = +this.documentId;

      this.$awn.asyncBlock(
        this.$store.dispatch(
          "currentDocument/registration",
          this.isCustomNumber
        ),
        res => {
          this.$emit("hidePopup");
          this.$awn.success();
        },
        err => this.$awn.alert()
      );
    }
  }
};
</script>