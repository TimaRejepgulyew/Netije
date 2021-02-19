<template>
  <DxForm
    :scrolling-enabled="true"
    ref="form"
    :form-data="{ test: 'nnn', best: 'mmm' }"
    :show-colon-after-label="true"
    :show-validation-summary="false"
    :col-count="1"
  >
    <DxGroupItem :caption="$t('dinamicDocuments.captions.updateField')">
      <DxSimpleItem
        data-field="editorType"
        editorType="dxSelectBox"
        :editorOptions="editorTypeOptions"
      >
        <DxLabel :text="$t('dinamicDocuments.updateField.editorType')" />
      </DxSimpleItem>
      <DxGroupItem :items="fieldSetting" />
    </DxGroupItem>
  </DxForm>
</template>

<script>
// import EditorTypes from "../../infrastructure/models/EditorTypes";

import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";

import DxForm, {
  DxSimpleItem,
  DxGroupItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";
import editorTypes, {
  getDefaultEditorType
} from "../../infrastructure/factory/EditorTypes.factory";

export default {
  props: {
    fieldIndex: {
      type: Number,
      default: () => null
    }
  },
  data() {
    return {
      // fieldSetting: getDefaultEditorType(this, "constructor").dataSource,
      editorTypes: editorTypes(this, "constructor")
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxRequiredRule,
    DxLabel
  },

  computed: {
    fieldSetting() {
      // let elem = DinamicTypeControler.getElementById(
      //   this,
      //   this.storeId,
      //   this.fieldIndex
      // );
      let elem = {};
      console.log(this.storeId);
      console.log("elem", elem);
      return elem;
    },
    editorTypeOptions() {
      return {
        onSelectionChanged: e => {
          console.log(e);
        },
        valueExpr: "id",
        displayExpr: "text",
        dataSource: this.editorTypes,
        value: "DxTextBox",
        onValueChanged: this.change,
        isRequired: true
      };
    },
    currentField() {
      return {
        editorType: 0,
        colSpan: 2,
        dataField: "dwadawda",
        translationTk: "tukmentçe",
        translationRu: "Русский"
      };
      if (this.fieldIndex === null) {
        return {};
      }
      return this.$store.getters[
        `dinamic-document-constructor/getFieldByIndex`
      ](this.fieldIndex);
    }
  },
  methods: {
    changeDataFied(value) {
      this.$store.dispatch("dinamicDocument/dataField", {
        index: this.fieldIndex,
        value
      });
    },
    changeColSpan(value) {
      this.$store.dispatch("dinamicDocument/colSpan", {
        index: this.fieldIndex,
        value
      });
    },
    changeEditorType(value) {
      this.$store.dispatch("dinamicDocument/editorType", {
        index: this.fieldIndex,
        value
      });
    },
    changeTraslation(value) {
      this.$store.dispatch("dinamicDocument/translation", {
        index: this.fieldIndex,
        value
      });
    },
    changeIsRequired(value) {
      this.$store.dispatch("dinamicDocument/isRequired", {
        index: this.fieldIndex,
        value
      });
    },
    changeIsMultiple(value) {
      this.$store.dispatch("dinamicDocument/isMultiple", {
        index: this.fieldIndex,
        value
      });
    },
    change(value, e) {
      // this.$store.dispatch("dinamicDocument/changeField", { fieldName, value });
      console.log(value, e);
    }
  }
};
</script>

<style>
</style>