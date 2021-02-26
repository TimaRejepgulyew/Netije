<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :col-count="2"
      :items="formElements"
    >
      <template #DocumentSelectBox="{ data }">
        <DocumentSelectBox
          @focusIn="(value) => onFocusIn(data)"
          :readOnly="readOnly"
          :dataSourceQuery="data.editorOptions.dataSourceQuery"
          :validationGroup="documentValidatorName"
          :isRequired="data.editorOptions.isRequired"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #AutoCompleteBox="{ data }">
        <Auto-complete-text-area
          @focusIn="(value) => onFocusIn(data)"
          :value="data.editorOptions.value"
          :options="{
            isRequired: data.editorOptions.isRequired,
            validationGroup: documentValidatorName,
            readOnly: readOnly,
          }"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #CounterPartSelectBox="{ data }">
        <Counter-part-select-box
          @focusIn="(value) => onFocusIn(data)"
          value-expr="id"
          :readOnly="readOnly"
          :isRequired="data.editorOptions.isRequired"
          :validatorGroup="documentValidatorName"
          @valueChanged="(value) => change(data, value)"
          :value="data.editorOptions.value"
        />
      </template>
      <template #ContactSelectBox="{ data }">
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
          :validatorGroup="documentValidatorName"
          :isRequired="data.editorOptions.isRequired"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #EmployeeTagBox="{ data }">
        <Employee-tag-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :isRequired="data.editorOptions.isRequired"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #BusinessUnitSelectBox="{ data }">
        <Business-unit-select-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :isRequired="data.editorOptions.isRequired"
          :validatorGroup="documentValidatorName"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #DepartmentSelectBox="{ data }">
        <Department-select-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :isRequired="data.editorOptions.isRequired"
          :validatorGroup="documentValidatorName"
          :value="data.editorOptions.value"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #RecipientSelectBox="{ data }">
        <Recipient-select-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :value="data.editorOptions.value"
          :isRequired="data.editorOptions.isRequired"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
      <template #RecipientTagBox="{ data }">
        <Recipient-tag-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :value="data.editorOptions.value || []"
          :isRequired="data.editorOptions.isRequired"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
//servises
import DynamicTypeControler from "../infrastructure/services/DynamicTypeControler.js";
import { devExtremeFieldFactory } from "../infrastructure/factory/devextremeField.factory";
//components
import DxForm from "devextreme-vue/form";
import RecipientSelectBox from "~/components/recipient/select-box/index.vue";
import RecipientTagBox from "~/components/recipient/tag-box/index.vue";
import DocumentSelectBox from "~/components/document/select-box/index.vue";
import AutoCompleteTextArea from "~/components/autocomplete-text/text-area/index.vue";
import DepartmentSelectBox from "~/components/company/organization-structure/departments/custom-select-box";
import EmployeeSelectBox from "~/components/employee/custom-select-box.vue";
import EmployeeTagBox from "~/components/employee/custom-tag-box.vue";
import ContactSelectBox from "~/components/parties/contact/custom-select-box.vue";
import BusinessUnitSelectBox from "~/components/company/organization-structure/business-unit/custom-select-box";
import CounterPartSelectBox from "~/components/parties/custom-select-box.vue";
export default {
  components: {
    DxForm,
    AutoCompleteTextArea,
    DocumentSelectBox,
    DepartmentSelectBox,
    EmployeeSelectBox,
    EmployeeTagBox,
    ContactSelectBox,
    BusinessUnitSelectBox,
    CounterPartSelectBox,
    RecipientSelectBox,
    RecipientTagBox,
  },
  inject: ["documentValidatorName"],
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
    document() {
      if (this.documentId) {
        return this.$store.getters[`documents/${this.documentId}/document`];
      }
      return {};
    },

    readOnly() {
      if (this.documentId) {
        return this.$store.getters[`documents/${this.documentId}/readOnly`];
      }
      return false;
    },
    formElements() {
      let formElements = DynamicTypeControler.getElements(
        this,
        this.documentType
      );
      const generatedItems = new devExtremeFieldFactory(this, formElements);
      return generatedItems;
    },
  },
  methods: {
    onFocusIn(data) {
      this.$emit("onFocusField", data.name);
    },
    change(value, data) {
      this.$store.commit(`documents/${this.documentType}/SET_DYNAMIC_FIELD`, {
        data,
        value,
      });
    },
  },
};
</script>

<style>
</style>