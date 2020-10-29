<template>
  <div>
    <DxFileUploader
      uploadMode="instantly"
      :chunkSize="200000000000"
      class="uploadButton"
      ref="fileUploader"
      :selectButtonText="$t('buttons.downloadFile')"
      label-text=" "
      :multiple="false"
      :accept="acceptExtension"
      :allowed-file-extensions="extension"
      @valueChanged="uploadVersionFromFile"
      :showFileList="false"
      :invalid-fileextension-message="$t('document.fields.invalidExeption')"
    />
  </div>
</template>

<script>
import documentService from "~/infrastructure/services/documentVersionService.js";
import { DxPopup } from "devextreme-vue/popup";
import DxFileUploader from "devextreme-vue/file-uploader";
import dataApi from "~/static/dataApi";

export default {
  components: {
    DxFileUploader,
    DxPopup,
  },
  props: ["documentId"],
  data() {
    return {
      associatedApplication: [],
      popup: false,
    };
  },
  computed: {  
    acceptExtension() {
      return this.$store.getters["cache/acceptExtension"];
    },
    extension() {
      return this.$store.getters["cache/extension"];
    },
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
  },
  methods: {
    uploadVersionFromFile(e) {
      const file = e.value[0];
      if (!this.document.subject) {
        this.$store.dispatch(
          `documents/${this.documentId}/setSubject`,
          file.name.split(".").slice(0, -1).join(".")
        );
      }

      this.$awn.async(
        documentService.uploadVersion(this.document,file , this),
        (res) => {
          this.$store.commit(
            `documents/${this.documentId}/SET_VERSION`,
            res.data
          );
          this.$emit("uploadVersion");
        },
        () => {}
      );
    },
  },
};
</script>

<style lang="scss">
.dx-fileuploader-input-wrapper::after {
  padding: 3px 0;
}
.uploadButton {
  padding: 0;
  margin: 0;
  .dx-fileuploader-input-wrapper {
    width: auto;
    padding: 5px 0;
    margin: 0;
  }
  .dx-fileuploader-files-container {
    display: none;
  }
  .dx-fileuploader-wrapper {
    max-width: 150px;
    width: auto;
    padding: 0;
    border: none;
  }
  .file-upload-button {
    display: none;
  }
  .dx-fileuploader-input-container {
    display: none;
  }
}
</style>