<template>
  <div>
    <documentTemplateGrid :isCard="false" @selected="toDetail" />
  </div>
</template>

<script>
import documentTemplateGrid from "~/components/docFlow/document-template/document-template-grid.vue";
export default {
  components: {
    documentTemplateGrid
  },
  methods: {
    toDetail({ id }) {
      this.$router.push(`/docFlow/document-template/detail/${id}`);
    }
  }
};
</script>

<style></style>
