<template>
  <DxForm
    :scrolling-enabled="true"
    ref="form"
    :form-data="{ test: 'nnn', best: 'mmm' }"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :col-count="1"
    :items="fieldSetting"
  >
  </DxForm>
</template>

<script>
import EditorTypes from "../../infrastructure/models/EditorTypes";
import DxForm, {
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
import editorType from "../../infrastructure/constants/editorTypes";

export default {
  props: {
    fieldIndex: {
      type: Number,
      default: () => null,
    },
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
  },

  computed: {
    editorTypes() {
      return new EditorTypes(context).getAll();
    },
    fieldSetting() {
      return [
        {
          itemType: "group",
          caption: this.$t("dinamicDocuments.captions.updateField"),
          items: [
            {
              dataField: "dataField",
              label: {
                text: this.$t("dinamicDocuments.updateField.dataField"),
              },
              editorOptions: {
                value: this.currentField?.dataField,
                onValueChanged: this.changeDataFied,
              },
              isRequired: true,
            },
            {
              dataField: "translationTk",
              label: {
                text: this.$t("dinamicDocuments.updateField.tranlationTk"),
              },
              editorOptions: {
                value: this.currentField?.translationTk,
                onValueChanged: this.changeDataFied,
              },
              isRequired: true,
            },
            {
              dataField: "translationRu",
              label: {
                text: this.$t("dinamicDocuments.updateField.tranlationRu"),
              },
              editorOptions: {
                value: this.currentField?.translationRu,
                onValueChanged: this.changeDataFied,
              },
              isRequired: true,
            },
            {
              dataField: "colSpan",
              editorOptions: {
                value: this.currentField?.colSpan,
                onValueChanged: this.changeColSpan,
              },
              label: { text: this.$t("dinamicDocuments.updateField.colSpan") },
              editorType: "dxNumberBox",
            },
            {
              dataField: "isRequired",
              editorOptions: {
                value: this.currentField?.isRequired,
                onValueChanged: this.change,
              },
              label: {
                text: this.$t("dinamicDocuments.updateField.isRequired"),
              },
              editorType: "dxSwitch",
            },
            {
              dataField: "isMultiple",
              editorOptions: {
                value: this.currentField?.isMultiple,
                onValueChanged: this.change,
              },
              label: {
                text: this.$t("dinamicDocuments.updateField.isMultiple"),
              },
              editorType: "dxSwitch",
            },
            {
              dataField: "editorType",
              editorOptions: {
                valueExpr: "id",
                displayExpr: "name",
                dataSource: this.editorTypes,
                value: this.currentField?.editorType,
                onValueChanged: this.change,
                isRequired: true,
              },
              label: {
                text: this.$t("dinamicDocuments.updateField.editorType"),
              },
              editorType: "dxSelectBox",
            },
          ],
        },
      ];
    },
    currentField() {
      return {
        colSpan: 2,
        dataField: "dwadawda",
        translationTk: "tukmentçe",
        translationRu: "Русский",
      };
      if (this.fieldIndex === null) {
        return {};
      }
      return this.$store.getters[
        `dinamic-document-constructor/getFieldByIndex`
      ](this.fieldIndex);
    },
  },
  methods: {
    changeDataFied(value) {
      this.$store.dispatch("dinamicDocument/dataField", {
        index: this.fieldIndex,
        value,
      });
    },
    changeColSpan(value) {
      this.$store.dispatch("dinamicDocument/colSpan", {
        index: this.fieldIndex,
        value,
      });
    },
    changeEditorType(value) {
      this.$store.dispatch("dinamicDocument/editorType", {
        index: this.fieldIndex,
        value,
      });
    },
    changeTraslation(value) {
      this.$store.dispatch("dinamicDocument/translation", {
        index: this.fieldIndex,
        value,
      });
    },
    changeIsRequired(value) {
      this.$store.dispatch("dinamicDocument/isRequired", {
        index: this.fieldIndex,
        value,
      });
    },
    changeIsMultiple(value) {
      this.$store.dispatch("dinamicDocument/isMultiple", {
        index: this.fieldIndex,
        value,
      });
    },
    change(value, e) {
      // this.$store.dispatch("dinamicDocument/changeField", { fieldName, value });
      console.log(value, e);
    },
  },
};
</script>

<style>
</style>