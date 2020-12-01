<template>
  <input
    type="file"
    :accept="acceptExtension"
    id="versionFileUploader"
    @change="uploadVersionFromFile"
  />
</template>

<script>
import documentVersionService from "~/infrastructure/services/documentVersionService.js";
import dataApi from "~/static/dataApi";
export default {
  props: ["documentId"],
  data() {
    return {
      associatedApplication: [],
    };
  },
  computed: {
    acceptExtension() {
      return this.$store.getters["cache/acceptExtension"];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
  },
  methods: {
    uploadVersionFromFile(e) {
      const file = e.target.files[0];
      if (!this.document.subject) {
        this.$store.dispatch(
          `documents/${this.documentId}/setSubject`,
          file.name.split(".").slice(0, -1).join(".")
        );
      }
      this.$awn.async(
        documentVersionService.createVersionFromFile(this.document, file, this),
        (res) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_VERSION`,
            res.data
          );
          this.$emit("uploadVersion");
        },
        () => {},
       
        
      );
      e.target.value = "";
    },
  },
};
</script>

 <style lang="scss">
#versionFileUploader {
  opacity: 0;
  width: 1px;
  height: 1px;
  position: absolute;
  z-index: -1;
}
</style>
