<template>
  <div>
    <div>
      <Header :isNew="false" :isbackButton="true" :headerTitle=" documentKind.name"></Header>
      <toolbar
        @saveChanges="handleSubmit"
        :canSave="$store.getters['permissions/allowUpdating'](this.entityType)"
      />
      <DxForm
        ref="form"
        :col-count="1"
        :form-data.sync="documentKind"
        :read-only="!$store.getters['permissions/allowUpdating'](entityType)"
        :show-colon-after-label="true"
      >
        <DxGroupItem :col-count="1">
          <DxSimpleItem data-field="code" data-type="string">
            <DxLabel location="top" :text="$t('translations.fields.code')" />
            <DxRequiredRule :message="$t('translations.fields.codeRequired')" />
            <DxPatternRule
              :ignore-empty-value="false"
              :pattern="codePattern"
              :message="$t('validation.valueMustNotContainsSpaces')"
            />
          </DxSimpleItem>

          <DxSimpleItem data-field="name">
            <DxLabel location="top" :text="$t('translations.fields.name')" />
            <DxRequiredRule :message="$t('translations.fields.nameRequired')" />
          </DxSimpleItem>

          <DxSimpleItem data-field="shortName">
            <DxLabel location="top" :text="$t('translations.fields.shortName')" />
            <DxRequiredRule :message="$t('translations.fields.shortNameRequired')" />
          </DxSimpleItem>

          <DxSimpleItem
            data-field="documentFlow"
            :editor-options="documentFlowOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.documentFlow')" />
            <DxRequiredRule :message="$t('translations.fields.documentFlowRequired')" />
          </DxSimpleItem>

          <DxSimpleItem
            :disable="true"
            data-field="numberingType"
            :editor-options="numberingTypeOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.numberingType')" />
            <DxRequiredRule :message="$t('translations.fields.numberingTypeRequired')" />
          </DxSimpleItem>

          <DxSimpleItem
            data-field="documentTypeGuid"
            :editor-options="docTypeOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('menu.documentType')" />
            <DxRequiredRule :message="$t('translations.fields.documentTypeGuidRequired')" />
          </DxSimpleItem>

          <DxSimpleItem
            :editor-options="tagboxOptions"
            editor-type="dxTagBox"
            data-field="availableActions"
          >
            <DxLabel location="top" :text="$t('translations.fields.availableActions')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="status"
            :editor-options="statusOptions"
            editor-type="dxSelectBox"
          >
            <DxLabel location="top" :text="$t('translations.fields.status')" />
          </DxSimpleItem>
          <DxSimpleItem
            data-field="generateDocumentName"
            :editor-options="generateDocumentNameOptions"
            editor-type="dxCheckBox"
          >
            <DxLabel
              location="top"
              alignment="left"
              :text="$t('translations.fields.generateDocumentName')"
            />
          </DxSimpleItem>

          <DxSimpleItem data-field="isDefault" editor-type="dxCheckBox">
            <DxLabel location="top" alignment="left" :text="$t('translations.fields.isDefault')" />
          </DxSimpleItem>

          <DxSimpleItem data-field="note" :col-span="2" editor-type="dxTextArea">
            <DxLabel location="top" :text="$t('translations.fields.note')" />
          </DxSimpleItem>
        </DxGroupItem>
      </DxForm>
    </div>
  </div>
</template>
<script>
import Toolbar from "~/components/shared/base-toolbar.vue";
import "devextreme-vue/text-area";
import Status from "~/infrastructure/constants/status";
import EntityType from "~/infrastructure/constants/entityTypes";
import NumberingType from "~/infrastructure/constants/numberingTypes";
import { DxTagBox } from "devextreme-vue/tag-box";
import Header from "~/components/page/page__header";
import DataSource from "devextreme/data/data_source";
import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxLabel,
  DxRequiredRule,
  DxCompareRule,
  DxRangeRule,
  DxStringLengthRule,
  DxPatternRule
} from "devextreme-vue/form";
import dataApi from "~/static/dataApi";

export default {
  components: {
    Header,
    DxGroupItem,
    DxSimpleItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxForm,
    Toolbar
  },
  async asyncData({ app, params }) {
    var res = await app.$axios.get(
      dataApi.docFlow.DocumentKind + "/" + params.id
    );
    return {
      documentKind: res.data
    };
  },
  data() {
    return {
      entityType: EntityType.DocumentKind,
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
    handleSubmit() {
      var res = this.$refs["form"].instance.validate();
      if (!res.isValid) return;
      const object = { ...this.documentKind };
      this.$awn.asyncBlock(
        this.$axios.put(`${dataApi.docFlow.DocumentKind}/${object.id}`, object),
        res => this.$awn.success(),
        err => this.$awn.alert()
      );
    }
  },
  computed: {
    hasDependencies() {
      return this.documentKind.hasDependencies;
    },
    statusOptions() {
      return {
        valueExpr: "id",
        displayExpr: "status",
        dataSource: this.$store.getters["status/status"](this)
      };
    },
    generateDocumentNameOptions() {
      return {
        disabled: this.documentKind.hasDocuments
      };
    },
    numberingTypeOptions() {
      return {
        dataSource: this.$store.getters["docflow/numberingType"](this),
        valueExpr: "id",
        displayExpr: "name",
        disabled: this.hasDependencies
      };
    },
    documentFlowOptions() {
      return {
        dataSource: this.$store.getters["docflow/docflow"](this),
        valueExpr: "id",
        displayExpr: "name",
        disabled: this.hasDependencies,
        onValueChanged: e => {
          this.documentKind.documentTypeGuid = null;
        }
      };
    },
    tagboxOptions() {
      return {
        dataSource: {
          store: this.$dxStore({
            key: "id",
            loadUrl: dataApi.docFlow.DocumentSendAction
          }),
          filter: ["status", "=", Status.Active]
        },
        valueExpr: "id",
        displayExpr: "name"
      };
    },
    docTypeOptions() {
      return {
        dataSource: {
          store: this.$dxStore({
            key: "documentTypeGuid",
            loadUrl: dataApi.docFlow.DocumentType
          }),
          filter: [
            ["status", "=", Status.Active],
            "and",
            ["documentFlow", "=", this.documentKind.documentFlow]
          ]
        },
        valueExpr: "documentTypeGuid",
        displayExpr: "name",
        disabled: this.hasDependencies
      };
    },
  }
};
</script>
