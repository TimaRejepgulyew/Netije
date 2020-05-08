<template>
  <div>
    <div>
      <Header :headerTitle="$t('translations.headers.addDocumentKind')"></Header>
      <form @submit="handleSubmit">
        <DxForm
          :col-count="1"
          :form-data.sync="documentKind"
          :read-only="false"
          :show-colon-after-label="true"
        >
          <DxGroupItem :col-count="1">
            <DxSimpleItem data-field="code" data-type="string">
               <DxRequiredRule :message="$t('translations.fields.codeRequired')" />
              <DxLabel location="top" :text="$t('translations.fields.code')" />
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
              data-field="numberingType"
              :editor-options="numberingTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('translations.fields.numberingType')" />
              <DxRequiredRule :message="$t('translations.fields.numberingTypeRequired')" />
            </DxSimpleItem>

            <DxSimpleItem
              data-field="documentTypeId"
              :editor-options=" docTypeOptions"
              editor-type="dxSelectBox"
            >
              <DxLabel location="top" :text="$t('menu.documentType')" />
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
                :button-options="addButtonOptions"
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
  DxPatternRule,
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
  data() {
    return {
      documentKind: {
        status: Status.Active,
        name: "",
        documentFlow: null,
        note: "",
        shortName: "",
        numberingType: null,
        generateDocumentName: false,
        autoNumbering: false,
        isDefault: false,
        documentTypeId: null,
        code: "",
        availableActions: []
      },
      addButtonOptions: {
        width: 100,
        height: 40,
        text: this.$t("buttons.add"),
        useSubmitBehavior: true,
        type: "success"
      },
      cancelButtonOptions: {
        onClick: this.goBack,
        width: 100,
        height: 40,
        text: this.$t("buttons.cancel"),
        useSubmitBehavior: false
      },
      codePattern: this.$store.getters["globalProperties/whitespacePattern"]
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    handleSubmit(e) {
      this.$awn.asyncBlock(
        this.$axios.post(dataApi.docFlow.DocumentKind, this.documentKind),
        res => {
          this.goBack();
          this.$awn.success();
        },
        err => this.$awn.alert()
      );
      e.preventDefault();
    }
  },
  watch: {
    "store.numberingType": function(val) {
      this.isNumerable = val == NumberingType.NotNumerable;
    }
  },
  computed: {
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
        displayExpr: "name"
      };
    },
    documentFlowOptions() {
      return {
        dataSource: this.$store.getters["docflow/docflow"](this),
        valueExpr: "id",
        displayExpr: "name",
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
        displayExpr: "name"
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
<style>
</style>

