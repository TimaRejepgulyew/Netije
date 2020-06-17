<template>
  <div>
    <DxFileUploader
      class="uploadButton"
      ref="fileUploader"
      :selectButtonText="$t('buttons.downloadFile')"
      label-text=" "
      :multiple="false"
      :accept="acceptExtension"
      :allowed-file-extensions="extension"
      @progress="uploadVersionFromFile"
      :showFileList="false"
      :invalid-fileextension-message="$t('translations.fields.invalidExeption')"
    />
  </div>
</template>

<script>
import documentService from "~/infrastructure/services/documentService.js";
import { DxPopup } from "devextreme-vue/popup";
import DxFileUploader from "devextreme-vue/file-uploader";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxFileUploader,
    DxButton,
    DxPopup
  },
  data() {
    return {
      associatedApplication: [],
      popup: false
    };
  },
  computed: {
    acceptExtension() {
      return this.$store.getters["cache/acceptExtension"];
    },
    extension() {
      return this.$store.getters["cache/extension"];
    }
  },
  methods: {
    uploadVersionFromFile(e) {
      const document = this.$store.getters["currentDocument/document"];
      if (!this.$store.getters["currentDocument/document"].subject) {
        this.$store.dispatch(
          "currentDocument/setSubject",
          e.file.name
            .split(".")
            .slice(0, -1)
            .join(".")
        );
      }
      this.$awn.async(
        documentService.uploadVersion(document, e.file, this),
        () => {
          this.$store.commit("currentDocument/SET_HAS_VERSIONS");
          this.$awn.success();
        },
        () => {
          this.$awn.alert();
        }
      );
    }
  }
};
</script>

<style lang="scss">
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