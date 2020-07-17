<template >
  <DxForm
    :visible="$store.getters['currentDocument/isRegistrable']"
    :col-count="1"
    :read-only="!canUpdate"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :col-count="1">
      <DxGroupItem :visible="numberingAndDateVisible" :caption="$t('document.groups.captions.numberAndDate')">
        <DxSimpleItem data-field="registrationNumber" :editor-options="registrationNumberOptions">
          <DxLabel
            location="left"
            :text="isRegistrable?$t('document.fields.registrationNumber'):$t('document.fields.documentNumber')"
          />
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
  DxLabel
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxForm
  },

  methods: {
    modified() {
      this.$store.commit("currentDocument/DATA_CHANGED", true);
    }
  },
  computed: {
    deliveryMethodVisible() {
      var documentTypeGuid = this.$store.getters["currentDocument/document"]
        .documentTypeGuid;
      return (
        documentTypeGuid == DocumentTypeGuid.IncomingLetter ||
        documentTypeGuid == DocumentTypeGuid.OutgoingLetter
      );
    },
    numberingAndDateVisible(){
      return this.$store.getters["currentDocument/document"].documentKind.numberingType != NumberingType.NotNumberable;
    },
    isRegistrable() {
      return (
        this.$store.getters["currentDocument/document"].documentKind
          .numberingType == NumberingType.Registrable
      );
    },
    canRegister() {
      return this.$store.getters["currentDocument/canRegister"];
    },
    caseFileRequired() {
      return Boolean(
        this.$store.getters["currentDocument/document"].placedToCaseFileDate
      );
    },
    isRegistered() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    canUpdate() {
      return this.$store.getters["currentDocument/canUpdate"];
    },
    readOnly() {
      return this.$store.getters["currentDocument/readOnly"];
    },
    placedToCaseFileDateOptions() {
      return {
        readOnly: !this.canRegister,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this
        }),
        value: this.$store.getters["currentDocument/document"]
          .placedToCaseFileDate,
        onValueChanged: e => {
          this.$store.commit(
            "currentDocument/SET_PLACE_TO_CASE_FILE_DATE_ID",
            e.value
          );
        }
      };
    },
    registrationNumberOptions() {
      return {
        disabled: true,
        value: this.$store.getters["currentDocument/document"]
          .registrationNumber
      };
    },
    registrationDateOptions() {
      return {
        disabled: true,
        value: this.$store.getters["currentDocument/document"].registrationDate
      };
    },
    deliveryMethodOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.MailDeliveryMethod
        }),
        value: this.$store.getters["currentDocument/document"].deliveryMethodId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_DELIVERY_METHOD_ID", e.value);
        }
      };
    },
    documentRegisterOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentRegister.All,
          disabled: true
        }),
        value: this.$store.getters["currentDocument/document"]
          .documentRegisterId
      };
    },
    caseFileOptions() {
      return {
        readOnly: !this.canRegister,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.documentRegistration.CaseFiles,
          filter: ["status", "=", 0],
          value: "title"
        }),
        value: this.$store.getters["currentDocument/document"].caseFileId,
        onValueChanged: e => {
          this.$store.commit("currentDocument/SET_CASE_FILE_ID", e.value);
          if (
            !this.$store.getters["currentDocument/document"]
              .placedToCaseFileDate &&
            this.$store.getters["currentDocument/document"].caseFileId
          )
            this.$store.commit(
              "currentDocument/SET_PLACE_TO_CASE_FILE_DATE_ID",
              new Date()
            );
        }
      };
    }
  }
};
</script>
