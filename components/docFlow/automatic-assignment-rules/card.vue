<template>
  <div>
    <Header :headerTitle="headerTitle" :isbackButton="!isCard" :isNew="isNew" />
    <toolbar @trySave="saveAccessRightRule" :isCard="isCard" />
    <form>
      <DxForm
        :form-data="accessRightRule"
        ref="form"
        col-count="2"
        :scrolling-enabled="true"
        :show-colon-after-label="true"
        :show-validation-summary="false"
        validation-group="accessRightRule"
      >
        <DxGroupItem :caption="$t('docFlow.automaticAssignmentRules.groups.main')">
          <DxSimpleItem data-field="name">
            <DxRequiredRule
              :message="$t('docFlow.automaticAssignmentRules.validation.requireName')"
            />
            <DxLabel location="top" :text="$t('docFlow.automaticAssignmentRules.name')" />
          </DxSimpleItem>

          <DxSimpleItem
            :editor-options="documentKindsOptions"
            editor-type="dxTagBox"
            data-field="documentKinds"
          >
            <DxRequiredRule
              :message="$t('docFlow.automaticAssignmentRules.validation.requireDocumentKinds')"
            />
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

        <DxGroupItem :caption="$t('docFlow.automaticAssignmentRules.groups.members')">
          <DxSimpleItem template="params-form"></DxSimpleItem>
        </DxGroupItem>

        <template #params-form>
          <membersForm
            :currentMembers="accessRightRule.members"
            @updateMembers="updateMembers"
            :isCard="isCard"
          ></membersForm>
        </template>
      </DxForm>
    </form>
  </div>
</template>

<script>
import SelectBoxOptionsBuilder from "~/infrastructure/builders/selectBoxOptionsBuilder.js";
import membersForm from "./card-components/members-form.vue";
import Status from "~/infrastructure/constants/status";
import Header from "~/components/page/page__header";
import toolbar from "./card-components/toolbar.vue";
import dataApi from "~/static/dataApi";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";
export default {
  components: {
    Header,
    toolbar,
    DxForm,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    membersForm
  },
  props: {
    isCard: {
      type: Boolean
    },
    currentRule: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      id: Number(this.$route.params.id)
    };
  },
  computed: {
    accessRightRule() {
      return {
        name: "",
        note: "",
        grantRightsOnLeadingDocument: true,
        grantRightsOnExistingDocuments: true,
        documentKinds: [],
        businessUnits: [],
        departments: [],
        members: [],
        ...this.currentRule
      };
    },
    isNew() {
      if (this.id) {
        this.accessRightRule.id = this.id;
      }
      return this.id ? false : true;
    },
    headerTitle() {
      return this.isNew
        ? this.$t(
            "docFlow.automaticAssignmentRules.automaticAssignmentRulesTitle"
          )
        : this.accessRightRule.name;
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
    updateRule() {
      this.$awn.asyncBlock(
        this.$axios.put(
          dataApi.accessRights.UpdateRecipient + this.id,
          this.accessRightRule
        ),
        e => {
          this.$awn.success();
          this.$emit("close");
        },
        e => {
          this.$awn.alert();
        }
      );
    },

    createRule() {
      this.$awn.asyncBlock(
        this.$axios.post(
          dataApi.accessRights.AddRecipient,
          this.accessRightRule
        ),
        e => {
          this.$awn.success();
          this.$emit("close");
        },
        e => {
          this.$awn.alert();
        }
      );
    },
    saveAccessRightRule() {
      if (this.$refs["form"].instance.validate().isValid) {
        if (this.isNew) {
          this.createRule();
        } else {
          this.updateRule();
        }
      }
    }
  }
};
</script>

<style></style>
