<template>
  <div>
    <DxForm :items="builder.elements"></DxForm>
    <button @click="showBuilder">Показать всю правду</button>
  </div>
</template>

<script>
import DxForm, {
  DxTabbedItem,
  DxTab,
  DxGroupItem,
  DxSimpleItem,
  DxRequiredRule,
  DxLabel
} from "devextreme-vue/form";

import DinamicTypeControler from "~/components/document-module/dinamic-document/infrastructure/services/DinamicTypeControler.js";
export default {
  components: {
    DxForm,
    DxTabbedItem,
    DxTab,
    DxGroupItem,
    DxSimpleItem,
    DxRequiredRule,
    DxLabel
  },
  data() {
    return {
      builder: null
    };
  },
  computed: {
    items() {
      return this.builder.getElements();
    }
  },
  methods: {
    showBuilder() {
      this.builder.addNewElement();
      // console.log(this.builder);
    }
  },
  created() {
    this.builder = new DinamicTypeControler(this);
  }
};
</script>

<style lang="scss">
</style>