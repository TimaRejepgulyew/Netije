<template>
  <div>
    <DxForm
      :scrolling-enabled="true"
      ref="form"
      :show-colon-after-label="true"
      :show-validation-summary="false"
      :col-count="2"
      :items="testa"
    >
      <template #autocomlete="{ data }">
        <AutocomleteTextArea
          :visible="data.ed"
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
import dinamicTypeBuilder from "~/components/document-module/dinamic-document/infrastructure/services/dinamicTypeBuilder.js";

export default {
  components: {
    DxForm,
    AutocomleteTextArea
  },
  props: {
    items: {
      type: Array,
      default: []
    }
  },
  computed: {
    testa() {
      let it = dinamicTypeBuilder(this, this.items);
      return it;
    }
  },
  methods: {
    onFocusIn() {
      this.context.$emit("onFocusField", this.index);
    },
    change(value, e) {
      this.$store.dispatch("dinamicDocument/changeField", { e, value });
      console.log(value, e);
    }
  }
};
</script>

<style>
</style>