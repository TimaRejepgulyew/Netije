<template >
  <DxForm
    :visible="$store.getters['currentDocument/isRegistrable']"
    :col-count="1"
    :read-only="readOnly"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    validation-group="OfficialDocument"
  >
    <DxGroupItem :col-count="1">
      <DxGroupItem
        :visible="isRegistrationInfoVisible"
        :caption="$t('translations.fields.registration')"
      >
        <DxSimpleItem data-field="registrationNumber" :editor-options="registrationNumberOptions">
          <DxLabel location="top" :text="$t('translations.fields.regNumberDocument')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="documentRegisterId"
          :editor-options="documentRegisterOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.documentRegisterId')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="registrationDate"
          :editor-options="registrationDateOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.registrationDate')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem :caption="$t('translations.fields.storing')">
        <DxSimpleItem
          data-field="caseFileId"
          :editor-options="caseFileOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.caseFileId')" />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="placedToCaseFileDate"
          :editor-options="placedToCaseFileDateOptions"
          editor-type="dxDateBox"
        >
          <DxLabel location="top" :text="$t('translations.fields.placedToCaseFileDate')" />
        </DxSimpleItem>
      </DxGroupItem>
    </DxGroupItem>
  </DxForm>
</template>
<script>
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
    isRegistrationInfoVisible() {
      return this.$store.getters["currentDocument/isRegistered"];
    },
    readOnly() {
      return this.$store.getters["currentDocument/readOnly"];
    },
    placedToCaseFileDateOptions() {
      return {
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
    documentRegisterOptions() {
      return {
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentRegistry,
          disabled: true
        }),
        value: this.$store.getters["currentDocument/document"]
          .documentRegisterId
      };
    },
    caseFileOptions() {
      return {
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
