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
      <DxGroupItem :caption="$t('dynamicDocuments.captions.updateField')">
        <DxButtonItem horizontalAlignment="left" :buttonOptions="saveButtonOptions" />
        <DxSimpleItem
          data-field="editorType"
          editorType="dxSelectBox"
          :editorOptions="editorTypeOptions"
          :isRequired="true"
        >
          <DxLabel :text="$t('dynamicDocuments.updateField.editorType')" />
        </DxSimpleItem>
        <DxGroupItem v-if="!isUpdating" :items="fieldSetting" />
      </DxGroupItem>
    </DxForm>
  </form>
</template>

<script>
import DxForm, {
  DxSimpleItem,
  DxGroupItem,
  DxRequiredRule,
  DxButtonItem,
  DxLabel
} from "devextreme-vue/form";
import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";
import { FieldGenerator } from "../../infrastructure/services/dynamicFieldDatagenerator";
import editorTypes, {
  getDefaultEditorType,
  getFieldSettingByEditorType
} from "../../infrastructure/factory/EditorTypes.factory";
import { alert } from "devextreme/ui/dialog";

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
            ...DynamicTypeControler.getElementById(
              this,
              this.documentType,
              value
            )
          };
          this.fieldSetting = getFieldSettingByEditorType(
            this,
            this.documentType,
            this.currentField.editorType
          );
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
        this.documentType,
        "dxDateBox"
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
        text: this.$t("dynamicDocuments.buttons.saveAndRender")
      };
    },
    editorTypeOptions() {
      return {
        onValueChanged: e => {
          this.currentField = FieldGenerator.generatorData({
            editorType: e.value,
            fieldData: this.currentField
          });
        },
        onSelectionChanged: e => {
          this.isUpdating = true;
          this.fieldSetting = e.selectedItem?.dataSource;
          this.isUpdating = false;
        },
        showClearButton: true,
        valueExpr: "id",
        displayExpr: "text",
        dataSource: this.editorTypes,
        isRequired: true
      };
    }
  },
  methods: {
    async saveAndRender() {
      try {
        await DynamicTypeControler.changeElement(
          this,
          this.documentType,
          this.currentField
        );
      } catch (error) {
        alert(
          this.$t(`dynamicDocuments.updateField.dataFieldNameError`),
          this.$t(`scanner.alert.error`)
        );
        console.log("error", error);
      }
    }
  }
};
</script>

<style>
</style>