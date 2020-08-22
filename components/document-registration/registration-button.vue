<template>
  <component
    :is="registrationButtonComponent"
    :documentId="documentId"
  />
</template>

<script>
import NumberingType from "~/infrastructure/constants/numberingTypes.js";

import RegisterDocumentBtn from "~/components/document-registration/buttons/register-document.vue";
import NumerateDocumentBtn from "~/components/document-registration/buttons/numerate-document.vue";

export default {
  components: {
    RegisterDocumentBtn,
    NumerateDocumentBtn,
  },
  props: ["documentId"],
  computed: {
    registrationButtonComponent() {
      const documentKind = this.$store.getters[
        `documents/${this.documentId}/document`
      ].documentKind;
      switch (documentKind?.numberingType) {
        case NumberingType.Registrable:
          return "register-document-btn";
        case NumberingType.Numerable:
          return "numerate-document-btn";
        default:
          return null;
      }
    },
  },
};
</script>

<style>
</style>