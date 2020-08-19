<template>
  <documentGrid :documentQuery="documentQuery" @selectedDocument="showDocumentDetails" />
</template>
<script>
import documentGrid from "~/components/document-module/document-grid.vue";
export default {
  components: {
    documentGrid
  },
  data() {
    return {
      documentQuery: +this.$route.params.type
    };
  },
  methods: {
    showDocumentDetails({ id, documentTypeGuid }) {
      this.$store.commit("currentDocument/LOADED_FROM_URL", false);
      this.$router.push(`/paper-work/detail/${documentTypeGuid}/${id}`);
    }
  }
};
</script>

