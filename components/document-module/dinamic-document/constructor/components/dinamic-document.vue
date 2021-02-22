<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :col-count="2"
      :items="items"
    >
      <template #DocumentSelectBox="{ data }">
        <DocumentBox
          @focusIn="(value) => onFocusIn(data)"
          :readOnly="readOnly"
          :dataSourceFilter="data.editorOptions.dataSourceFilter"
          :dataSourceQuery="data.editorOptions.dataSourceQuery"
          :validationGroup="documentValidatorName"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #AutocompleteBox="{ data }">
        <AutocomleteTextArea
          @focusIn="(value) => onFocusIn(data)"
          value="test"
          :options="{}"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #CounterPartSelectBox="{ data }">
        <Counter-part-select-box
          @focusIn="(value) => onFocusIn(data)"
          value-expr="id"
          :readOnly="readOnly"
          :validatorGroup="
            data.editorOptions.isRequired ? documentValidatorName : null
          "
          @valueChanged="(value) => change(data, value)"
          :value="data.editorOptions.value"
        />
      </template>
      <template #ContactSelectbox="{ data }">
        <Contact-select-box
          @focusIn="(value) => onFocusIn(data)"
          :disabled="readOnly"
          @valueChanged="(value) => change(data, value)"
          :value="data.editorOptions.value"
        />
      </template>
      <template #EmployeeSelectBox="{ data }">
        <Employee-select-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="
            data.editorOptions.isRequired ? documentValidatorName : null
          "
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #BusinessUnitSelectBox="{ data }">
        <Business-unit-select-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #DepartmentSelectBox="{ data }">
        <Department-select-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="
            data.editorOptions.isRequired ? documentValidatorName : null
          "
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #RecipientSelectBox="{ data }">
        <Recipient-select-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="
            data.editorOptions.isRequired ? documentValidatorName : null
          "
          :value="data.editorOptions.value"
          :isRequired="data.editorOptions.isRequired"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #RecipientTagBox="{ data }">
        <Recipient-tag-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="
            data.editorOptions.isRequired ? documentValidatorName : null
          "
          :recipients="data.editorOptions.value"
          :isRequired="data.editorOptions.isRequired"
          @setRecipients="(value) => change(data, value)"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
//servises
import DinamicTypeBuilder from "~/components/document-module/dinamic-document/infrastructure/services/dinamicTypeBuilder.js";
import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";
import { devExtremeFieldFactory } from "../../infrastructure/factory/devextremeField.factory";
//components
import DxForm from "devextreme-vue/form";
import RecipientSelectBox from "~/components/document/select-box/index.vue";
import RecipientTagBox from "~/components/recipient/tag-box/index.vue";
import DocumentBox from "~/components/document/select-box/index.vue";
import AutocomleteTextArea from "~/components/autocomplete-text/text-area/index.vue";
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
import EmployeeSelectBox from "~/components/employee/custom-select-box.vue";
import ContactSelectBox from "~/components/parties/contact/custom-select-box.vue";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import CounterPartSelectBox from "~/components/parties/custom-select-box.vue";
export default {
  components: {
    DxForm,
    AutocomleteTextArea,
    DocumentBox,
    DepartmentSelectBox,
    EmployeeSelectBox,
    ContactSelectBox,
    BusinessUnitSelectBox,
    CounterPartSelectBox,
    RecipientSelectBox,
    RecipientTagBox,
  },
  props: {
    documentType: {},
    documentId: {},
  },
  data() {
    return {
      builder: null,
    };
  },
  computed: {
    items() {
      const items = [
        {
          editorType: "dxTextBox",
          dataField: "NewValue",
          translationRu: "Новое поле",
          translationTk: "Taze mevdanca",
          colSpan: 2,
          id: 1,
        },
        {
          editorType: "EmployeeBox",
          dataField: "NewValue2",
          isMultiple: false,
          isRequired: true,
          translationRu: "Новое поле2",
          translationTk: "Taze mevdanca2",
          colSpan: 2,
          id: 2,
        },
      ];
     
      const generatedItems = new devExtremeFieldFactory(this, items);
      return generatedItems;
    },
  },
  methods: {
    onFocusIn(data) {
      console.log(data, "data");
      this.$emit("onFocusField", data.id);
    },
    change(value, e) {
      this.$store.dispatch("dinamicDocument/changeField", { e, value });
    },
  },
  created() {
    // DinamicTypeControler.generateStore(this, this.documentType);
  },
  beforeDestroy() {
    // DinamicTypeControler.removeStore(this, this.documentType);
  },
};
</script>

<style>
</style>