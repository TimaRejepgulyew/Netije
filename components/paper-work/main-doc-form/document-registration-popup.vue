<template>
  <form @submit="handleSubmit">
    <DxForm
      :form-data="registrationData"
      :read-only="false"
      :show-colon-after-label="true"
      :show-validation-summary="true"
    >
      <DxSimpleItem
        data-field="isCustomNumber"
        :editor-options="isCustomNumberOptions"
        editor-type="dxCheckBox"
      >
        <DxLabel location="top" :text="$t('registrationPopup.isCustomNumber')" />
      </DxSimpleItem>
      <DxSimpleItem
        :helpText="registrationData.isCustomNumber?'':$t('registrationPopup.preliminaryRegistrationNumberMessage')"
        data-field="number"
        :editor-options="numberOptions"
      >
        <DxPatternRule :pattern="numberPattern" />
        <DxLabel
          location="top"
          :text="registrationData.isCustomNumber?$t('registrationPopup.regNumberDocument'):$t('registrationPopup.preliminaryRegistrationNumber')"
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
      <DxSimpleItem data-field="date" :editor-options="dateOptions" editor-type="dxDateBox">
        <DxLabel location="top" :text="$t('registrationPopup.registrationDate')" />
        <DxRequiredRule :message="$t('registrationPopup.validation.registrationDateRequired')" />
      </DxSimpleItem>
      <DxButtonItem :button-options="saveButtonOptions" horizontal-alignment="right" />
    </DxForm>
  </form>
</template> <script>
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
      registrationData: {
        isCustomNumber: false,
        documentRegisterId: null,
        date: null,
        number: null
      },
      saveButtonOptions: {
        text: this.$t("buttons.register"),
        useSubmitBehavior: true,
        type: "success"
      },
      numberPattern: ""
    };
  },
  computed: {
    filter() {
      return `?documentRegisterId=${
        this.registrationData.documentRegisterId
      }&documentId=${this.documentId}&registrationDate=${moment(
        this.registrationData.date
      ).format("L")}`;
    },
    isCustomNumberOptions() {
      const numberingType = this.$store.getters["paper-work/documentKind"](
        "numberingType"
      );
      let autoNumbering;
      if (numberingType == 2) {
        autoNumbering = this.$store.getters["paper-work/documentKind"](
          "autoNumbering"
        );
        if (autoNumbering) {
          this.registrationData.isCustomNumber = false;
          return { disabled: true };
        }
      }
      return { disabled: false, onValueChanged: this.getDataByFilter };
    },
    numberOptions() {
      return { disabled: !this.registrationData.isCustomNumber };
    },
    dateOptions() {
      return { onValueChanged: this.getDataByFilter };
    },
    documentRegisterOptions() {
      return this.$store.getters["globalProperties/FormOptions"]({
        context: this,
        url: dataApi.documentRegistration.Registries + this.documentId,
        onValueChanged: this.getDataByFilter
      });
    },
    documentId() {
      return this.$route.params.id;
    }
  },
  methods: {
    async getDataByFilter() {
      if (
        this.registrationData.date &&
        this.registrationData.documentRegisterId
      ) {
        const res = await this.$axios.get(
          dataApi.documentRegistration.PreliminaryNumber + this.filter
        );
        this.registrationData.number = res.data.preliminaryNumber;
        this.numberPattern = res.data.pattern;
      }
    },
    handleSubmit(e) {
      this.registrationData.documentId = +this.documentId;
      this.$awn.asyncBlock(
        this.$axios.post(
          dataApi.documentRegistration.RegisterDocument,
          this.registrationData
        ),
        res => {
          this.$router.go();
          this.$awn.success();
        },
        err => this.$awn.alert()
      );
      e.preventDefault();
    }
  }
};
</script>