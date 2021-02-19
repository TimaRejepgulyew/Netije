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
        <DxButtonItem
          horizontalAlignment="left"
          :buttonOptions="saveButtonOptions"
        />
        <DxSimpleItem
          dataField="editorType"
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
import DxForm, {
  DxSimpleItem,
  DxGroupItem,
  DxRequiredRule,
  DxButtonItem,
  DxLabel,
} from "devextreme-vue/form";
import editorTypes, {
  getDefaultEditorType,
  getFieldSettingByEditorType,
} from "../../infrastructure/factory/EditorTypes.factory";

export default {
  props: {
    fieldIndex: {
      type: Number,
      default: () => null,
    },
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
      currentField: {
        dateType: "Date",
        editorType: "EmployeeBox",
        colSpan: 2,
        dataField: "Сотрудник",
        translationTk: "tukmentçe",
        translationRu: "Русский",
      },
    };
  },
  components: {
    DxForm,
    DxSimpleItem,
    DxGroupItem,
    DxRequiredRule,
    DxLabel,
    DxButtonItem,
  },

  computed: {
    saveButtonOptions() {
      return {
        useSubmitBehavior: true,
        icon: "save",
        text: this.$t("dinamicDocuments.buttons.saveAndRender"),
      };
    },
    editorTypeOptions() {
      return {
        onSelectionChanged: (e) => {
          // if (e.selectedItem?.dataSource !== this.fieldSetting)
          this.isUpdating = true;
          this.fieldSetting = e.selectedItem?.dataSource;
          this.isUpdating = false;
        },
        showClearButton: true,
        valueExpr: "id",
        displayExpr: "text",
        dataSource: this.editorTypes,
        isRequired: true,
      };
    },
  },
  methods: {
    saveAndRender() {
      // save
    },
  },
};
</script>

<style>
</style>