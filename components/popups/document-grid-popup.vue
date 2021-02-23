<template>
  <document-grid
    :isCard="true"
    :documentQuery="options.documentQuery"
    :documentFilter="options.documentFilter"
    @selectedDocument="valueChanged"
  />
</template>

<script>

import { DocumentQuery as DocumentQueryModel } from "~/infrastructure/models/DocumentQuery.js";
export default {
  components: {
    documentGrid: () =>
      import("~/components/document-module/document-grid.vue"),
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      show: false,
    };
  },
  computed: {
    generateHeaderTitle() {
      return new DocumentQueryModel(this).getById(this.options.documentQuery)
        .text;
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", params);
      this.$emit("close");
    },
  },
  mounted() {
    this.$emit("loadStatus");
    this.$emit("showTitle", this.generateHeaderTitle);
  },
};
</script>

<style></style>
