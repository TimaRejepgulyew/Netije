<template>
  <DxButton
    :hint="$t('buttons.createFromFile')"
    icon="plus"
    @click="showDocxDialog"
  />
</template>

<script>
import documentVersionService from "~/infrastructure/services/documentVersionService.js";
import { DxButton } from "devextreme-vue";

import dataApi from "~/static/dataApi";

export default {
  components: {
    DxButton
  },
  props: ["documentId"],

  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    }
  },
  methods: {
    showDocxDialog() {
      this.$popup.documentEditor(
        this,
        {},
        {
          showLoadingPanel: false,
          listeners: [
            { eventName: "valueChanged", handlerName: "uploadVersionFromFile" }
          ]
        }
      );
    },
    uploadVersionFromFile({ file }) {
      this.$awn.async(
        documentVersionService.uploadVersion(
          this.document,
          file,
          this,
          "newFile1.docx"
        ),
        res => {
          this.$store.commit(
            `documents/${this.documentId}/SET_VERSION`,
            res.data
          );
          this.$emit("uploadVersion");
        },
        () => {}
      );
    }
  }
};
</script>

<style lang="scss"></style>
