<template>
  <documentCard
    :isCard="true"
    @onClose="close"
    @onClosed="valueChanged"
    v-if="documentId"
    :documentId="documentId"
  />
</template>

<script>
import dataApi from "~/static/dataApi";
import DocumentTypeModel from "~/infrastructure/models/DocumentType.js";
export default {
  components: {
    documentCard: () =>
      import("~/components/document-module/main-doc-form/index.vue")
  },
  name: "document-popup",
  props: {
    options: {
      type: Object
    }
  },
  data() {
    return {
      documentId: null
    };
  },
  async created() {
    const documentTypeModel = new DocumentTypeModel(this);
    try {
      const { documentId, documentTypeGuid } = await this.options.handler(
        this,
        this.options.params
      );
      this.documentId = documentId;
      this.$emit("loadStatus");
      this.$emit("showTitle", documentTypeModel.getById(documentTypeGuid).text);
    } catch (e) {
      this.$emit("accessDenied", e);
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    valueChanged(params) {
      this.$emit("valueChanged", params);
    }
  }
};
</script>

<style></style>
