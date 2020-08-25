<template >
  <DxForm
    :visible="isRegistrable"
    :col-count="1"
    :read-only="!canUpdate"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :validation-group="documentValidatorName"
  >
    <DxGroupItem :col-count="1">
      <DxGroupItem
        :visible="numberingAndDateVisible"
        :caption="$t('document.groups.captions.numberAndDate')"
      >
        <DxSimpleItem data-field="registrationNumber" :editor-options="registrationNumberOptions">
          <DxLabel location="left" :text="registrationNumberHelptext" />
        </DxSimpleItem>

        <DxSimpleItem
          :visible="isRegistrable"
          data-field="documentRegisterId"
          :editor-options="documentRegisterOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="left" :text="$t('document.fields.documentRegisterId')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="registrationDate"
          :editor-options="registrationDateOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="left" :text="$t('document.fields.registrationDate')" />
        </DxSimpleItem>
        <DxSimpleItem
          :visible="deliveryMethodVisible"
          data-field="deliveryMethodId"
          :editor-options="deliveryMethodOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="left" :text="$t('document.fields.deliveryMethodId')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :caption="$t('document.groups.captions.storing')">
        <DxSimpleItem
          :isRequired="caseFileRequired"
          data-field="caseFileId"
          :editor-options="caseFileOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="left" :text="$t('document.fields.caseFileId')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="placedToCaseFileDate"
          :editor-options="placedToCaseFileDateOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="left" :text="$t('document.fields.placedToCaseFileDate')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
  </DxForm>
</template>
<script>
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import NumberingType from "~/infrastructure/constants/numberingTypes.js";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm,
  },
  props: ["documentId"],
  inject: ["documentValidatorName"],
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    isRegistrable() {
      return this.$store.getters[`documents/${this.documentId}/isRegistrable`];
    },
    registrationNumberHelptext() {
      return this.isRegistrable
        ? this.$t("documentRegistration.registrationNumber")
        : this.$t("documentRegistration.documentNumber");
    },
    deliveryMethodVisible() {
      const documentTypeGuid = this.document.documentTypeGuid;
      return (
        documentTypeGuid == DocumentTypeGuid.IncomingLetter ||
        documentTypeGuid == DocumentTypeGuid.OutgoingLetter
      );
    },
    numberingAndDateVisible() {
      return (
        this.document.documentKind.numberingType != NumberingType.NotNumberable
      );
    },
    canRegister() {
      return this.$store.getters[`documents/${this.documentId}/canRegister`];
    },
    caseFileRequired() {
      return Boolean(this.document.placedToCaseFileDate);
    },
    isRegistered() {
      return this.$store.getters[`documents/${this.documentId}/isRegistered`];
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    readOnly() {
      return this.$store.getters[`documents/${this.documentId}/readOnly`];
    },
    placedToCaseFileDateOptions() {
      return {
        readOnly: !this.canRegister,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
        }),
        value: this.document.placedToCaseFileDate,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_PLACE_TO_CASE_FILE_DATE_ID`,
            e.value
          );
        },
      };
    },
    registrationNumberOptions() {
      return {
        disabled: true,
        value: this.document.registrationNumber,
      };
    },
    registrationDateOptions() {
      return {
        disabled: true,
        value: this.document.registrationDate,
      };
    },
    deliveryMethodOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DeliveryMethod,
        }),
        value: this.document.deliveryMethodId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_DELIVERY_METHOD_ID`,
            e.value
          );
        },
      };
    },
    documentRegisterOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentRegister.All,
          disabled: true,
        }),
        value: this.document.documentRegisterId,
      };
    },
    caseFileOptions() {
      return {
        readOnly: !this.canRegister,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.CaseFile.AvailableForUse,
          filter: ["status", "=", 0],
          value: "title",
        }),
        value: this.document.caseFileId,
        onValueChanged: (e) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_CASE_FILE_ID`,
            e.value
          );
          if (!this.document.placedToCaseFileDate && this.document.caseFileId)
            this.$store.commit(
              `documents/${this.documentId}/SET_PLACE_TO_CASE_FILE_DATE_ID`,
              new Date()
            );
        },
      };
    },
  },
};
</script>
