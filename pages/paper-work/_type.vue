<template>
  <documentGrid :documentTypeGuid="documentTypeGuid" @selectedDocument="toDetail" />
</template>
<script>
import documentGrid from "~/components/paper-work/document-grid.vue";
export default {
  components: {
    documentGrid
  },
  data() {
    return {
      documentTypeGuid: +this.$route.params.type
    };
  },
  methods: {
    toDetail({ id, documentTypeGuid }) {
      this.$store.commit("currentDocument/LOADED_FROM_URL", false);
      this.$router.push(`/paper-work/detail/${documentTypeGuid}/${id}`);
    }
  }
};
</script>

