<template>
  <DxButtonGroup
    :selected-item-keys="[value]"
    :items="dataSource"
    key-expr="id"
    styling-mode="text"
    @item-click="valueChanged"
  />
</template>

<script>
import { DxButtonGroup } from "devextreme-vue";
import { dataSourceChanged } from "@syncfusion/ej2-vue-spreadsheet";
import SearchingTypesModel from "../infrastructure/model/searchingTypes.js";
export default {
  components: {
    DxButtonGroup
  },
  props: {
    value: {
    }
  },
  computed: {
    dataSource() {
      return Object.values(new SearchingTypesModel(this).getAll());
    }
  },
  methods: {
    valueChanged(e) {
      if (e.itemIndex !== null)
        this.$emit("valueChanged", { searchingType: e.itemIndex });
    }
  }
};
</script>

<style></style>
