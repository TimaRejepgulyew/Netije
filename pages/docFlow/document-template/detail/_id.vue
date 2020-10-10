<template>
  <document-template-card
    :documentId="+this.$router.params.id"
    :isCard="false"
  />
</template>

<script>
import { load } from "~/infrastructure/services/documentService.js";
import { confirm } from "devextreme/ui/dialog";
import documentChangeTracker from "~/infrastructure/services/documentChangeTracker.js";
import documentTemplateCard from "~/components/docFlow/document-template/card.vue";
export default {
  components: {
    documentTemplateCard,
  },
  async asyncData() {
      
  },
};
</script>

<style>
</style>