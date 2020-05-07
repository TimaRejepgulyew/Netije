<template>
  <div>
    <div>
      <Header :headerTitle="$t('translations.headers.editDocumentKind')"></Header>
      <form @submit="handleSubmit">
        <DxForm
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
                :message="$t('translations.validation.valueMustNotContainsSpaces')"
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
              data-field="documentTypeId"
              :editor-options="docTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('translations.menu.documentType')" />
              <DxRequiredRule :message="$t('translations.fields.documentTypeIdRequired')" />
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
            <DxSimpleItem data-field="generateDocumentName" editor-type="dxCheckBox">
              <DxLabel
                location="left"
                alignment="left"
                :text="$t('translations.fields.generateDocumentName')"
              />
            </DxSimpleItem>

            <DxSimpleItem data-field="isDefault" editor-type="dxCheckBox">
              <DxLabel
                location="left"
                alignment="left"
                :text="$t('translations.fields.isDefault')"
              />
            </DxSimpleItem>

            <DxSimpleItem v-if="isNumerable" data-field="autoNumbering" editor-type="dxCheckBox">
              <DxLabel
                location="left"
                alignment="left"
                :text="$t('translations.fields.autoNumbering')"
              />
            </DxSimpleItem>
            <DxSimpleItem
              data-field="note"
              :col-span="1"
              :editor-options="{height: 90}"
              editor-type="dxTextArea"
            >
              <DxLabel location="top" :text="$t('translations.fields.note')" />
            </DxSimpleItem>

            <DxGroupItem :col-span="1" :col-count="12">
              <DxButtonItem
                :use-submit-behavior="true"
                :button-options="saveButtonOptions"
                horizontal-alignment="left"
                :col-span="1"
              />
              <DxButtonItem
                :col-span="11"
                :button-options="cancelButtonOptions"
                horizontal-alignment="left"
              />
            </DxGroupItem>
          </DxGroupItem>
        </DxForm>
      </form>
    </div>
  </div>
</template>
<script>
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
  DxButtonItem,
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
    DxButtonItem,
    DxLabel,
    DxRequiredRule,
    DxCompareRule,
    DxPatternRule,
    DxRangeRule,
    DxForm
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
      saveButtonOptions: {
        height: 40,
        text: this.$t("translations.links.save"),
        useSubmitBehavior: true,
        type: "success",
        disabled: !this.$store.getters["permissions/allowUpdating"](
          this.entityType
        )
      },
      cancelButtonOptions: {
        onClick: this.goBack,
        height: 40,
        text: this.$t("translations.links.cancel"),
        useSubmitBehavior: false
      },
      entityType: EntityType.DocumentKind,
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleSubmit(e) {
      const object = { ...this.documentKind };
      this.$awn.asyncBlock(
        this.$axios.put(`${dataApi.docFlow.DocumentKind}/${object.id}`, object),
        res => this.$awn.success(),
        err => this.$awn.alert()
      );
      e.preventDefault();
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
          this.documentKind.documentTypeId = null;
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
            key: "id",
            loadUrl: dataApi.docFlow.DocumentType
          }),
          filter: [
            ["status", "=", Status.Active],
            "and",
            ["documentFlow", "=", this.documentKind.documentFlow]
          ]
        },
        valueExpr: "id",
        displayExpr: "name",
        disabled: this.hasDependencies
      };
    },
    isNumerable() {
      if (this.documentKind.numberingType != NumberingType.NotNumerable) {
        return false;
      } else {
        this.documentKind.autoNumbering = false;
        return true;
      }
    }
  }
};
</script>
