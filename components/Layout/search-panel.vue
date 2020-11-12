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
      displayValue="name"
      value-expr="name"
      :onItemClick="openDocument"
      :placeholder="$t('shared.search')"
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
          loadUrl: dataApi.documentModule.AllDocument
        }),
        paginate: true,
        pageSize: 10
      })
    };
  },
  methods: {
    openDocument(e) {
      if (e.itemData !== null && typeof e.itemData !== "string") {
        this.$router.push(
          `/document-module/detail/${e.itemData.documentTypeGuid}/${e.itemData.id}`
        );
        this.name = null;
      }
    }
  }
};
</script>

<style></style>
