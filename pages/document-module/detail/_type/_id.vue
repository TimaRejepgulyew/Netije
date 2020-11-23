<template>
  <main-document-form
    :isCard="false"
    @onClose="onClose"
    :documentId="+$route.params.id"
  />
</template>
<script>
import { load } from "~/infrastructure/services/documentService.js";
import mainDocumentForm from "~/components/document-module/main-doc-form/index.vue";
import { confirm } from "devextreme/ui/dialog";
import documentChangeTracker from "~/infrastructure/services/documentChangeTracker.js";
export default {
  components: {
    mainDocumentForm
  },
  async asyncData({ app, params, router, $axios }) {
    await load(
      { $store: app.store, $axios },
      {
        documentTypeGuid: +params.type,
        documentId: +params.id
      }
    );
    console.log(app.store.getters[`documents/${+params.id}/document`]);
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
        await load(this, {
          documentTypeGuid: +this.$route.params.type,
          documentId: +this.$route.params.id
        });
      }
    }
    next(result);
  },
  methods: {
    onClose() {
      this.$router.push(`/document-module/${this.$route.params.type}`);
    }
  }
};
</script>
