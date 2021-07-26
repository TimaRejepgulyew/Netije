<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      class="mt-1"
      ref="form"
      :read-only="readOnly"
      :show-colon-after-label="true"
      :show-validation-summary="false"
    >
        <DxSimpleItem data-field="name" :editor-options="nameOptions">
          <DxLabel location="left" :text="$t('document.fields.name')" />
          <DxRequiredRule :message="$t('document.validation.nameRequired')" />
        </DxSimpleItem>
        <DxSimpleItem
          data-field="documentKind"
          :editor-options="documentKindOptions"
          editor-type="dxSelectBox"
        >
          <DxLabel
            location="left"
            :text="$t('document.fields.documentKindId')"
          />
          <DxRequiredRule
            :message="$t('document.validation.documentKindIdRequired')"
          />
        </DxSimpleItem>

        <DxSimpleItem
          data-field="subject"
          editor-type="dxTextArea"
          template="autocomlete"
        >
          <DxLabel location="left" :text="$t('document.fields.subject')" />
          <DxRequiredRule
            :message="$t('document.validation.subjectRequired')"
          />
        </DxSimpleItem>
      <template #autocomlete>
        <AutocomleteTextArea :options="{ readOnly }" />
      </template>
    </DxForm>
  </div>
</template>
<script>
import SelectBoxOptionsBuilder from "~/infrastructure/builders/selectBoxOptionsBuilder.js";

// COMPONENTS

import DxForm, {
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";
import AutocomleteTextArea from "~/components/autocomplete-text/text-area/index.vue";
//CONSTANTS
import dataApi from "~/static/dataApi";
export default {
  components: {
    AutocomleteTextArea,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
    DxForm,
  },
  props: ["isCard", "readOnly"],

  computed: {
    documentKindOptions() {
      const builder = new SelectBoxOptionsBuilder();
      const options = builder
        .withUrl(dataApi.docFlow.DocumentKind)
        .withoutDeferRendering()
        .focusStateDisabled()
        .clearValueExpr()
        .build(this);
      return {
        ...options,
        readOnly: this.readOnly,
      };
    },

    nameOptions() {
      return {
        readOnly: this.readOnly,
      };
    },
    noteOptions() {
      return {
        readOnly: this.readOnly,
        height: 70,
        autoResizeEnabled: true,
        onValueChanged: (e) => {},
      };
    },
  },
};
</script>
<style lang="scss">
</style>
