<template>
  <div>
    <Header :headerTitle="$t('docFlow.automaticAssignmentRules.header')" :isbackButton="!isCard"></Header>
    <toolbar :isCard="isCard"></toolbar>
    <DxForm
      :scrolling-enabled="true"
      :form-data="accessRightRule"
      ref="form"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      validation-group="accessRightRule"
      col-count="2"
    >
      <DxGroupItem>
        <DxSimpleItem data-field="name">
          <DxLabel location="top" :text="$t('docFlow.automaticAssignmentRules.name')" />
        </DxSimpleItem>

        <DxSimpleItem
          :editor-options="documentKindsOptions"
          editor-type="dxTagBox"
          data-field="documentKinds"
        >
          <DxLabel location="top" :text="$t('docFlow.automaticAssignmentRules.documentKinds')" />
        </DxSimpleItem>
        <DxSimpleItem
          :editor-options="businessUnitsOptions"
          editor-type="dxTagBox"
          data-field="businessUnits"
        >
          <DxLabel location="top" :text="$t('docFlow.automaticAssignmentRules.businessUnits')" />
        </DxSimpleItem>
        <DxSimpleItem
          :col-span="2"
          :editor-options="departmentsOptions"
          editor-type="dxTagBox"
          data-field="departments"
        >
          <DxLabel location="top" :text="$t('docFlow.automaticAssignmentRules.departments')" />
        </DxSimpleItem>
        <DxSimpleItem data-field="grantRightsOnLeadingDocument" editor-type="dxCheckBox">
          <DxLabel
            location="left"
            :text="$t('docFlow.automaticAssignmentRules.grantRightsOnLeadingDocument')"
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="grantRightsOnExistingDocuments" editor-type="dxCheckBox">
          <DxLabel
            location="left"
            :text="$t('docFlow.automaticAssignmentRules.grantRightsOnExistingDocuments')"
          />
        </DxSimpleItem>
        <DxSimpleItem data-field="note" editor-type="dxTextArea">
          <DxLabel location="top" :text="$t('docFlow.automaticAssignmentRules.note')" />
        </DxSimpleItem>
      </DxGroupItem>
      <DxGroupItem>
        <DxSimpleItem :col-count="1" template="params-form"></DxSimpleItem>
      </DxGroupItem>
      <template #params-form>
        <paramsForm @updateMembers="updateMembers" :isCard="isCard"></paramsForm>
      </template>
    </DxForm>
  </div>
</template>

<script>
import SelectBoxOptionsBuilder from "~/infrastructure/builders/selectBoxOptionsBuilder.js";
import paramsForm from "./card-components/params-form.vue";
import Status from "~/infrastructure/constants/status";
import dataApi from "~/static/dataApi";
import Header from "~/components/page/page__header";
import toolbar from "./card-components/toolbar.vue";
import DxForm, {
  DxTabbedItem,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
  DxButtonItem
} from "devextreme-vue/form";
export default {
  components: {
    Header,
    toolbar,
    DxForm,
    DxTabbedItem,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxButtonItem,
    DxLabel,
    paramsForm
  },
  props: {
    isCard: {
      type: Boolean
    }
  },
  data() {
    return {
      accessRightRule: {
        id: 0,
        name: "",
        grantRightsOnLeadingDocument: true,
        grantRightsOnExistingDocuments: true,
        note: "",
        documentKinds: [],
        businessUnits: [],
        departments: [],
        members: [
          {
            id: 0,
            rightType: 0
          }
        ]
      }
    };
  },
  computed: {
    saveBtnOptions() {
      return {
        text: "Сохранить",
        onClick: this.saveAccessRightRule
      };
    },
    documentTypeOptions() {
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.docFlow.DocumentType)
        .withoutDeferRendering()
        .setValueExpr("documentTypeGuid")
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
        .filter([["status", "=", Status.Active]])
        .clearValueExpr()
        .withoutDeferRendering()
        .build(this);
      return {
        ...options
      };
    },
    businessUnitsOptions() {
      console.log("filter");
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.company.BusinessUnit)
        .clearValueExpr()
        .filter(["status", "=", Status.Active])
        .build(this);
      return {
        ...options
      };
    },
    departmentsOptions() {
      let filter = [["status", "=", Status.Active]];
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.company.Department)
        .clearValueExpr()
        .filter(filter)
        .build(this);
      return {
        ...options
      };
    }
  },
  methods: {
    updateMembers(members) {
      this.accessRightRule.members = members;
    },
    saveAccessRightRule() {
      console.log(this.accessRightRule);
    }
  }
};
</script>

<style></style>
