<template>
  <form @submit.prevent="saveAndRender">
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :form-data="currentField"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :col-count="1"
    >
      <DxGroupItem :caption="$t('dinamicDocuments.captions.updateField')">
        <DxButtonItem horizontalAlignment="left" :buttonOptions="saveButtonOptions" />
        <DxSimpleItem
          data-field="editorType"
          editorType="dxSelectBox"
          :editorOptions="editorTypeOptions"
          :isRequired="true"
        >
          <DxLabel :text="$t('dinamicDocuments.updateField.editorType')" />
        </DxSimpleItem>
        <DxGroupItem v-if="!isUpdating" :items="fieldSetting" />
      </DxGroupItem>
    </DxForm>
  </form>
</template>

<script>
// import EditorTypes from "../../infrastructure/models/EditorTypes";

import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";

import DxForm, {
  DxSimpleItem,
  DxGroupItem,
  DxRequiredRule,
  DxButtonItem,
  DxLabel
} from "devextreme-vue/form";
import editorTypes, {
  getDefaultEditorType,
  getFieldSettingByEditorType
} from "../../infrastructure/factory/EditorTypes.factory";

export default {
  props: {
    fieldIndex: {},
    documentType: {}
  },
  watch: {
    fieldIndex: {
      handler: function(value) {
        if (value) {
          this.currentField = {
            ...DinamicTypeControler.getElementById(
              this,
              this.documentType,
              value
            )
          };
        }
      },
      immediate: true
    }
  },
  data() {
    return {
      isUpdating: false,
      fieldSetting: getFieldSettingByEditorType(
        this,
        "constructor",
        "DxDateBox"
      ),
      editorTypes: editorTypes(this, "constructor"),
      currentField: {}
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxRequiredRule,
    DxLabel,
    DxButtonItem
  },

  computed: {
    saveButtonOptions() {
      return {
        useSubmitBehavior: true,
        icon: "save",
        text: this.$t("dinamicDocuments.buttons.saveAndRender")
      };
    },
    editorTypeOptions() {
      return {
        onSelectionChanged: e => {
          this.isUpdating = true;
          this.fieldSetting = e.selectedItem?.dataSource;
          this.isUpdating = false;
          // const currentFieldArray = Object.entries(this.currentField);
          // const fieldSett = [...this.fieldSetting];
          // let res = currentFieldArray.filter(el => {
          //   if (el[0] === "id") {
          //     return true;
          //   }
          //   return fieldSett.some(element => {
          //     return element.dataField === el[0];
          //   });
          // });
          // res = Object.fromEntries(res);
          // console.log(res);
          // for (let key in this.currentField) {
          //   delete this.currentField[key];
          // }
          // for (let key in res) {
          //   this.$set(this.currentField, key, res[ley]);
          // }
        },
        valueExpr: "id",
        displayExpr: "text",
        dataSource: this.editorTypes,
        isRequired: true
      };
    }
  },
  methods: {
    saveAndRender() {
      DinamicTypeControler.changeElement(
        this,
        this.documentType,
        this.currentField
      );
    }
  }
};
</script>

<style>
</style>