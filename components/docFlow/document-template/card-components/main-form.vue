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
        <DxLabel location="top" :text="$t('document.fields.name')" />
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
      </DxSimpleItem>
      <DxSimpleItem
        :isRequired="true"
        :col-span="2"
        :editor-options="documentKindsOptions"
        editor-type="dxTagBox"
        data-field="documentKinds"
      >
        <DxLabel location="top" :text="$t('document.fields.documentKinds')" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="2"
        :editor-options="businessUnitsOptions"
        editor-type="dxTagBox"
        data-field="businessUnits"
      >
        <DxLabel location="top" :text="$t('document.fields.businessUnits')" />
      </DxSimpleItem>
      <DxSimpleItem
        :col-span="2"
        :editor-options="departmentsOptions"
        editor-type="dxTagBox"
        data-field="departments"
      >
        <DxLabel location="top" :text="$t('document.fields.departments')" />
      </DxSimpleItem>
      <DxSimpleItem
        data-field="description"
        :editor-options="descriptionOptions"
        editor-type="dxTextArea"
      >
        <DxLabel location="top" :text="$t('document.fields.description')" />
      </DxSimpleItem>
    </DxForm>
  </div>
</template>

<script>
import SelectBoxOptionsBuilder from "~/infrastructure/builders/selectBoxOptionsBuilder.js";
import Status from "~/infrastructure/constants/status";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    DxForm,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel
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
    documentTypeGuid() {
      return this.document.documentTypeGuid;
    },
    documentKinds() {
      return this.document.documentKinds;
    },
    businessUnits() {
      return this.document.businessUnits;
    },
    departments() {
      return this.document.departments;
    },
    description() {
      return this.document.description;
    },
    nameOptions() {
      return {
        value: this.document?.name,
        onValueChanged: this.setName
      };
    },
    documentTypeOptions() {
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.docFlow.DocumentType)
        .withoutDeferRendering()
        .build(this);
      return {
        ...options,
        value: this.documentTypeId,
        onValueChanged: this.setDocumentTypeId
      };
    },
    documentKindsOptions() {
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.docFlow.DocumentKind)
        .filter([
          ["status", "=", Status.Active]
          // "and",
          // ["documentTypeGuid", "=", this.documentTypeGuid]
        ])
        .withoutDeferRendering()
        .build(this);
      return {
        ...options,
        value: this.documentKinds,
        onValueChanged: this.setDocumentKinds
      };
    },
    businessUnitsOptions() {
      console.log("filter");
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.company.BusinessUnit)
        .filter(["status", "=", Status.Active])
        .build(this);
      return {
        ...options,
        value: this.businessUnits,
        onValueChanged: this.setBusinessUnits
      };
    },
    departmentsOptions() {
      let departmentByBusinessUnitFilter = [];
      this.businessUnits.map(item => {
        departmentByBusinessUnitFilter.push(["businessUnitId", "=", item]);
        departmentByBusinessUnitFilter.push("or");
      });
      let filter = [["status", "=", Status.Active], "and"];
      if (departmentByBusinessUnitFilter.length)
        filter.push(departmentByBusinessUnitFilter);
      console.log(filter, "filter");

      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.company.Department)
        .filter(filter)
        .build(this);
      return {
        ...options,
        onValueChanged: this.setDepartments,
        value: this.departments
      };
    },
    descriptionOptions() {
      return {
        height: 150,
        value: this.document?.description,
        onValueChanged: this.setDescription
      };
    }
  },
  methods: {
    setName(e) {
      this.$store.commit(`documents/${this.documentId}/SET_NAME`, e.value);
    },
    setDocumentTypeId(e) {
      this.$store.commit(
        `documents/${this.documentId}/SET_DOCUMENT_TYPE`,
        e.value
      );
    },
    setDocumentKinds(e) {
      this.$store.commit(
        `documents/${this.documentId}/SET_DOCUMENT_KINDS`,
        e.value
      );
    },
    setBusinessUnits(e) {
      if (e.event) {
        console.log(e);
        this.$store.commit(
          `documents/${this.documentId}/SET_BUSINESS_UNITS`,
          e.value
        );
        this.$store.commit(`documents/${this.documentId}/SET_DEPARTMENTS`, []);
      }
    },
    setDepartments(e) {
      if (e.event) {
        this.$store.commit(
          `documents/${this.documentId}/SET_DEPARTMENTS`,
          e.value
        );
      }
    },
    setDescription(e) {
      this.$store.commit(
        `documents/${this.documentId}/SET_DESCRIPTION`,
        e.value
      );
    }
  }
};
</script>

<style></style>
