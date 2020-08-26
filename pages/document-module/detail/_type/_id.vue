<template>
  <main-document-form :isCard="false" :documentId="$route.params.id" />
</template>
<script>
import { load } from "~/infrastructure/services/documentService.js";
import mainDocumentForm from "~/components/document-module/main-doc-form/index.vue";
import { confirm } from "devextreme/ui/dialog";
import dataApi from "~/static/dataApi";
import documentChangeTracker from "~/infrastructure/services/documentChangeTracker.js";
export default {
  components: {
    mainDocumentForm,
  },
  async asyncData({ app, params, router, $axios }) {
    await load(
      { $store: app.store, $axios },
      {
        documentTypeGuid: +params.type,
        documentId: +params.id,
      }
    );
  },
  async beforeRouteLeave(to, from, next) {
    let result = true;
    if (
      !this.$store.getters[
        `document/${+this.$route.params.id}/skipRouteHandling`
      ]
    ) {
      result = await documentChangeTracker.handleConfirm(
        this,
        this.$route.params.id
      );
    }
    next(result);
  },
  async beforeRouteUpdate(to, from, next) {
    let result = true;
    if (
      !this.$store.getters[
        `document/${this.$route.params.id}/skipRouteHandling`
      ]
    ) {
      result = await documentChangeTracker.handleConfirm(
        this,
        +this.$route.params.id
      );
      if (result) {
        await load(this, {
          documentTypeGuid: +this.$route.params.type,
          documentId: +this.$route.params.id,
        });
      }
    }
    next(result);
  },
};
</script>