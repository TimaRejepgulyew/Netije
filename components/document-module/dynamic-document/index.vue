<template>
  <div>
    <DxForm :items="builder.elements"></DxForm>
    <button @click="showBuilder" :class="{ active: builder.isDataChanged }">
      Показать всю правду
    </button>
    <button @click="saveBuilder">Спаси и сохрони</button>
  </div>
</template>

<script>
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel,
} from "devextreme-vue/form";

import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";
export default {
  components: {
    DxForm,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel,
  },
  data() {
    return {
      builder: null,
    };
  },
  computed: {
    readOnly() {
      return false;
    },
    items() {
      return this.builder.getElements();
    },
  },
  methods: {
    showBuilder() {
      this.builder.addNewElement();
    },
    saveBuilder() {
      this.builder.saveType();
    },
  },
  created() {
    this.builder = new DynamicTypeControler(this);
  },
};
</script>

<style lang="scss">
button {
  &.active {
    background-color: red;
  }
}
</style>