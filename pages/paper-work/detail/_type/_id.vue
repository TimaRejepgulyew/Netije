<template>
  <main-document-form />
</template>
<script>
import mainDocumentForm from "~/components/paper-work/main-doc-form/index.vue"
import { confirm } from "devextreme/ui/dialog";
import dataApi from "~/static/dataApi";
export default {
  components: {
    mainDocumentForm
  },
  async asyncData({ app, params, router }) {
    await app.store.dispatch("currentDocument/getDocumentById", {
      type: +params.type,
      id: +params.id
    });
  },
  async beforeRouteLeave(to, from, next) {
    let res = true;
    if (this.isDataChanged) {
      res = await confirm(
        this.$t("document.fields.areYouSureCancelDocument"),
        this.$t("shared.confirm")
      );
    }

    if (res) {
      this.$store.commit("currentDocument/SET_IS_NEW", false);
      this.$store.commit("currentDocument/DATA_CHANGED", false);
    }

    next(res);
  }
};
</script>