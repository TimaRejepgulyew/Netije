<template>
  <label for="search-panel">
    <DxAutocomplete
      width="20vw"
      id="search-panel"
      :data-source="documents"
      :value.sync="name"
      :show-clear-button="true"
      :min-search-length="2"
      :search-timeout="300"
      value-expr="name"
      :placeholder="$t('shared.search')"
      @selectionChanged="openDocument"
    ></DxAutocomplete>
  </label>
</template>

<script>
import routegenerator from "~/infrastructure/routing/routeGenerator.js";
import { DxAutocomplete } from "devextreme-vue/autocomplete";
import DataSource from "devextreme/data/data_source";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxAutocomplete
  },
  data() {
    return {
      name: null,
      documents: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.paperWork.AllDocument
        })
      })
    };
  },
  methods: {
    openDocument(e) {
      if (e.selectedItem !== null && typeof e.selectedItem !== "string") {
        this.$router.push(
          `/document-module/detail/${e.selectedItem.documentTypeGuid}/${e.selectedItem.id}`
        );
      }
    }
  }
};
</script>

<style>
</style>