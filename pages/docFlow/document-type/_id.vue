<template>
  <dynamicDocumentConstructor :documentType="documentType" />
</template>

<script>
import dynamicDocumentConstructor from "~/components/document-module/dynamic-document/constructor/index.vue";
import DynamicTypeControler from "~/components/document-module/dynamic-document/infrastructure/services/DynamicTypeControler.js";

export default {
  components: {
    dynamicDocumentConstructor
  },
  data() {
    return {
      documentType: null
    };
  },
  // async asyncData({ $axios, params }) {
  //   DynamicTypeControler.generateStore(this, this.documentType);

  // },
  created() {
    this.documentType = this.$route.params.id;
  }
};
</script>

<style>
</style>