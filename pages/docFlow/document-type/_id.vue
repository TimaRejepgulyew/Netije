<template>
  <dynamicDocumentConstructor :documentType="documentType" />
</template>

<script>
import dynamicDocumentConstructor from "~/components/document-module/dynamic-document/constructor/index.vue";

export default {
  components: {
    dynamicDocumentConstructor,
  },
  data() {
    return {
      documentType: null,
    };
  },
  created() {
    this.documentType = this.$route.params.id;
  },
};
</script>

<style>
</style>