<template>
  <document-template-card :documentId="+$route.params.id" :isCard="false" />
</template>

<script>
import DocumentType from "~/infrastructure/constants/documentType.js";
import { load } from "~/infrastructure/services/documentService.js";
import { confirm } from "devextreme/ui/dialog";
import documentChangeTracker from "~/infrastructure/services/documentChangeTracker.js";
import documentTemplateCard from "~/components/docFlow/document-template/card.vue";
export default {
  components: {
    documentTemplateCard
  },
  async asyncData({ app, params, router, $axios }) {
    await loadDocumentTemplate(
      { $store: app.store, $axios },
      {
        documentTypeGuid: DocumentType.DocumentTemplate,
        documentId: +params.id
      }
    );
  },
  async beforeRouteLeave(to, from, next) {
    let result = true;
    if (
      !this.$store.getters[
        `documents/${+this.$route.params.id}/skipRouteHandling`
      ]
    ) {
      result = await documentChangeTracker.handleConfirm(
        this,
        +this.$route.params.id
      );
    }
    next(result);
  },
  async beforeRouteUpdate(to, from, next) {
    let result = true;
    if (
      !this.$store.getters[
        `documents/${this.$route.params.id}/skipRouteHandling`
      ]
    ) {
      result = await documentChangeTracker.handleConfirm(
        this,
        +this.$route.params.id
      );
      if (result) {
        await loadDocumentTemplate(this, {
          documentTypeGuid: 18,
          documentId: +this.$route.params.id
        });
      }
    }
    next(result);
  },
  methods: {
    onClose() {
      this.$router.push(`/docFlow/document-template/`);
    }
  }
};
</script>

<style></style>
