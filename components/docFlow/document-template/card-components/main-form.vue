<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :validation-group="documentValidatorName"
    >
      <DxSimpleItem data-field="name" :editor-options="nameOptions">
        <DxLabel location="left" :text="$t('document.fields.name')" />
        <DxRequiredRule :message="$t('document.validation.nameRequired')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="documentTypeId"
        :editor-options="documentTypeOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel
          location="left"
          :text="$t('document.fields.documentTypeGuid')"
        />
        <DxRequiredRule
          :message="$t('document.validation.documentTypeRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="documentKindId"
        :editor-options="documentKindOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.documentKindId')" />
        <DxRequiredRule
          :message="$t('document.validation.documentKindIdRequired')"
        />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="businessUnitId"
        template="businessUnitSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.businessUnitId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="departmentId"
        :editor-options="departmentOptions"
        editor-type="dxSelectBox"
      >
        <DxLabel location="left" :text="$t('document.fields.departmentId')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="note"
        :editor-options="noteOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="left" :text="$t('document.fields.note')" />
      </DxSimpleItem>
      <template #businessUnitSelectBox>
      <business-unit-select-box
        valueExpr="id"
        :read-only="!canUpdate"
        :value="businessUnitId"
        @valueChanged=" (data) => {
                        setBusinessUnitId(data); 
                    } "
      />
    </template>
    </DxForm>
  </div>
</template>

<script>
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    BusinessUnitSelectBox
  },
  props: ["documentId", "isCard"],
  inject: ["documentValidatorName"],
  computed: {
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    businessUnitId() {
      return this.document.businessUnitId;
    },
    nameOptions() {
      return {
        readOnly: !this.canUpdate,
        value: this.document?.name,
        onValueChanged: (e) => {
          this.setName(e.value)
        },
      };
    },
    documentTypeOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentType,
        }),
        valueExpr: "documentTypeGuid",
        value: this.document?.documentType,
        onValueChanged: (e) => {
          this.setDocumentType(e.value)
          this.setDocumentKindId(null)
        },
      };
    },
    documentKindOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.docFlow.DocumentKind,
          filter: [["documentTypeGuid", "=", this.document.documentType],"and",["status", "=", 0]],
        }),
        value: this.document?.documentKindId,
        onValueChanged: (e) => {
          this.setDocumentKindId(e.value)
          // this.$store.commit(
          //   `documents/${this.documentId}/SET_DOCUMENT_TYPE`,
          //   null
          // );
        },
      };
    },
    departmentOptions() {
      return {
        readOnly: !this.canUpdate,
        ...this.$store.getters["globalProperties/FormOptions"]({
          context: this,
          url: dataApi.company.Department,
        }),
        value: this.document?.departmentId,
        onValueChanged: (e) => {
          this.setDepartmentId(e.value)
        },
      };
    },
    noteOptions() {
      return {
        height: 150,
        value: this.document?.body,
        onValueChanged: (e) => {
          this.setNote(e.value)
        },
      };
    },
  },
  methods:{
    setName(data) {
      this.$store.commit(`documents/${this.documentId}/SET_NAME`, data);
    },
    setDocumentType(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DOCUMENT_TYPE`,data);
    },
    setDocumentKindId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DOCUMENT_KIND_ID`,data);
    },
    setDepartmentId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENT_ID`, data);
    },
    setNote(data) {
      this.$store.commit(`documents/${this.documentId}/SET_NOTE`, data);
    },
    setBusinessUnitId(data) {
      this.$store.commit(`documents/${this.documentId}/SET_BUSINESS_UNIT_ID`,data);
    },
  }
};
</script>

<style>
</style>