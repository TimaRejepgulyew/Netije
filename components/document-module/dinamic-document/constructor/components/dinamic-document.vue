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
      <template #autocomlete="{ data }">
        <AutocomleteTextArea
          @focusIn="(value) => data.editorOptions.onFocusIn()"
          value="test"
          :options="{}"
          @valueChanged="(value) => change(data, value)"
        />
      </template>
    </DxForm>
  </div>
</template>

<script>
import DxForm from "devextreme-vue/form";
import AutocomleteTextArea from "~/components/autocomplete-text/text-area/index.vue";
import DinamicTypeBuilder from "~/components/document-module/dinamic-document/infrastructure/services/dinamicTypeBuilder.js";
import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";

export default {
  components: {
    DxForm,
    AutocomleteTextArea
  },
  props: {
    documentType: {},
    documentId: {}
  },
  data() {
    return {
      builder: null
    };
  },
  computed: {
    items() {
      let items = DinamicTypeControler.getElements(this, this.documentType);
      let generatedItems = DinamicTypeBuilder(this, items);
      return generatedItems;
    }
  },
  methods: {
    onFocusIn() {
      this.context.$emit("onFocusField", this.index);
    },
    change(value, e) {
      this.$store.dispatch("dinamicDocument/changeField", { e, value });
    }
  },
  created() {
    DinamicTypeControler.generateStore(this, this.documentType);
  },
  beforeDestroy() {
    DinamicTypeControler.removeStore(this, this.documentType);
  }
};
</script>

<style>
</style>