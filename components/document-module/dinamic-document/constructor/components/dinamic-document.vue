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
          @focusIn="(value) => data.editorOptions.onFocusIn()"
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
          @focusIn="(value) => data.editorOptions.onFocusIn()"
          value="test"
          :options="{}"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #CounterPartSelectBox="{ data }">
        <Counter-part-select-box
          @focusIn="(value) => data.editorOptions.onFocusIn()"
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
          @focusIn="(value) => data.editorOptions.onFocusIn()"
          :disabled="readOnly"
          @valueChanged="(value) => change(data, value)"
          :value="data.editorOptions.value"
        />
      </template>
      <template #EmployeeSelectBox="{ data }">
        <Employee-select-box
          @focusIn="(value) => data.editorOptions.onFocusIn()"
          :read-only="readOnly"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #BusinessUnitSelectBox="{ data }">
        <Business-unit-select-box
          @focusIn="(value) => data.editorOptions.onFocusIn()"
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #DepartmentSelectBox="{ data }">
        <Department-select-box
          @focusIn="(value) => data.editorOptions.onFocusIn()"
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
//servises
import DinamicTypeBuilder from "~/components/document-module/dinamic-document/infrastructure/services/dinamicTypeBuilder.js";
import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";
//components
import DxForm from "devextreme-vue/form";
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
      let items = DinamicTypeControler.getElements(this, this.documentType);
      let generatedItems = DinamicTypeBuilder(this, items);
      return generatedItems;
    },
  },
  methods: {
    onFocusIn() {
      this.context.$emit("onFocusField", this.index);
    },
    change(value, e) {
      this.$store.dispatch("dinamicDocument/changeField", { e, value });
    },
  },
};
</script>

<style>
</style>