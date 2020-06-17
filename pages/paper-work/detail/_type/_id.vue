<template>
  <main-document-form />
</template>
<script>
import mainDocumentForm from "~/components/paper-work/main-doc-form/index.vue";
import { confirm } from "devextreme/ui/dialog";
import dataApi from "~/static/dataApi";
import documentChangeTracker from "~/infrastructure/services/documentChangeTracker.js";
export default {
  components: {
    mainDocumentForm
  },
  async asyncData({ app, params, router }) {
    if (
      (!app.store.getters["currentDocument/isNew"] &&
        !app.store.getters["currentDocument/isDataChanged"]) ||
      app.store.getters["currentDocument/loadedFromUrl"]
    ) {
      await app.store.dispatch("currentDocument/getDocumentById", {
        type: +params.type,
        id: +params.id
      });
    }
  },
  async beforeRouteLeave(to, from, next) {
    let result = true;
    if (!this.$store.getters["currentDocument/skipRouteHandling"]) {
      result = await documentChangeTracker.handleConfirm(this);
    }
    next(result);
  },
  async beforeRouteUpdate(to, from, next) {
    let result = true;
    if (!this.$store.getters["currentDocument/skipRouteHandling"]) {
      result = await documentChangeTracker.handleConfirm(this);
      if (result) {
        await this.$store.dispatch("currentDocument/getDocumentById", {
          type: +to.params.type,
          id: +to.params.id
        });
      }
    }
    next(result);
  }
};
</script>