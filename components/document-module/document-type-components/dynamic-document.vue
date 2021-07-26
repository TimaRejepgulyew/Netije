<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :col-count="2"
      :items="dynamicElements"
      :validation-group="documentValidatorName"
    >
      <template #DocumentSelectBox="{ data }">
        <DocumentSelectBox
          :readOnly="readOnly"
          :dataSourceQuery="data.editorOptions.dataSourceQuery"
          :validationGroup="documentValidatorName"
          :isRequired="data.editorOptions.isRequired"
          :value="value(data.dataField)"
          @valueChanged="(value) => change(value, data)"
        />
      </template>
      <template #AutoCompleteBox="{ data }">
        <Auto-complete-text-area
          :value="value(data.dataField)"
          :options="{
            isRequired: data.editorOptions.isRequired,
            validationGroup: documentValidatorName,
            readOnly: readOnly,
          }"
          @valueChanged="(value) => change(value, data)"
        />
      </template>
      <template #CounterPartSelectBox="{ data }">
        <Counter-part-select-box
          :readOnly="readOnly"
          :isRequired="data.editorOptions.isRequired"
          :validatorGroup="documentValidatorName"
          @valueChanged="(value) => change(value, data)"
          :value="value(data.dataField)"
        />
      </template>
      <template #ContactSelectBox="{ data }">
        <Contact-select-box
          :disabled="readOnly"
          @valueChanged="(value) => change(value, data)"
          :value="value(data.dataField)"
        />
      </template>
      <template #EmployeeSelectBox="{ data }">
        <Employee-select-box
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :isRequired="data.editorOptions.isRequired"
          :value="value(data.dataField)"
          @valueChanged="(value) => change(value, data)"
        />
      </template>
      <template #EmployeeTagBox="{ data }">
        <Employee-tag-box
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :isRequired="data.editorOptions.isRequired"
          :value="value(data.dataField)"
          @valueChanged="(value) => change(value, data)"
        />
      </template>
      <template #BusinessUnitSelectBox="{ data }">
        <Business-unit-select-box
          :read-only="readOnly"
          :isRequired="data.editorOptions.isRequired"
          :validatorGroup="documentValidatorName"
          :value="value(data.dataField)"
          @valueChanged="(value) => change(value, data)"
        />
      </template>
      <template #DepartmentSelectBox="{ data }">
        <Department-select-box
          :read-only="readOnly"
          :isRequired="data.editorOptions.isRequired"
          :validatorGroup="documentValidatorName"
          :value="value(data.dataField)"
          @valueChanged="(value) => change(value, data)"
        />
      </template>
      <template #RecipientSelectBox="{ data }">
        <Recipient-select-box
          @focusIn="(value) => onFocusIn(data)"
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :value="value(data.dataField)"
          :isRequired="data.editorOptions.isRequired"
          @valueChanged="(value) => change(value, data)"
        />
      </template>
      <template #RecipientTagBox="{ data }">
        <Recipient-tag-box
          :read-only="readOnly"
          :validatorGroup="documentValidatorName"
          :value="value(data.dataField, 'test')"
          :isRequired="data.editorOptions.isRequired"
          @valueChanged="(value) => change(value, data)"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
//servises
import DynamicTypeControler from "../dynamic-document/infrastructure/services/DynamicTypeControler.js";
import { devExtremeFieldFactory } from "../dynamic-document/infrastructure/factory/devextremeField.factory";
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
  created() {
    this.dynamicElements = new devExtremeFieldFactory(
      this,
      DynamicTypeControler.getElements(this, this.documentType)
    );
  },
  data() {
    return {
      dynamicElements: [],
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
  },
  methods: {
    value(dataField, test) {
      if (this.documentId) {
        return this.$store.getters[`documents/${this.documentId}/value`](
          dataField
        );
      }
    },
    onFocusIn(data) {
      this.$emit("onFocusField", data.name);
    },
    change(value, data) {
      this.$store.commit(`documents/${this.documentId}/SET_DYNAMIC_FIELD`, {
        data,
        value,
      });
    },
  },
};
</script>