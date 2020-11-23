<template>
  <document-grid
    :isCard="true"
    :documentQuery="options.documentQuery"
    :documentFilter="options.documentFilter"
    @selectedDocument="valueChanged"
  />
</template>

<script>
import dataApi from "~/static/dataApi";
import { generateNameByDocQuery } from "~/infrastructure/constants/query/documentQuery.js";
export default {
  components: {
    documentGrid: () => import("~/components/document-module/document-grid.vue")
  },
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      data: null
    };
  },
  computed: {
    generateHeaderTitle() {
      return generateNameByDocQuery(this.options.documentQuery, this);
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", params);
      this.$emit("close");
    }
  },
  async created() {
    this.$emit("loadStatus");
    this.$emit("showTitle", this.generateHeaderTitle);
  }
};
</script>

<style></style>
