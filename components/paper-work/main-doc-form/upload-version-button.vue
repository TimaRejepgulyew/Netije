<template>
  <div>
    <DxButton icon="download" :text="$t('buttons.add')" :on-click="openPopup" />

    <DxFileUploader
      :visible="false"
      ref="fileUploader"
      :width="170"
      height="auto"
      selectButtonText="Загрузить"
      icon="plus"
      label-text
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
import { DxPopup } from "devextreme-vue/popup";
import DxFileUploader from "devextreme-vue/file-uploader";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
export default {
  async created() {
    this.associatedApplication = (
      await this.$axios.get(dataApi.docFlow.AssociatedApplication)
    ).data.data;
  },
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
    extension() {
      return this.associatedApplication.map(el => {
        return el.extension;
      });
    },
    acceptExtension() {
      return this.extension.join(",");
    }
  },
  methods: {
    openPopup() {
      this.$refs["fileUploader"].click();
    },
    uploadVersionFromFile(e) {
      let formData = new FormData();
      formData.append("file", e.file);
      formData.append(
        "documentId",
        +this.$store.getters["currentDocument/document"].id
      );
      this.$awn.async(
        this.$axios.post(
          dataApi.paperWork.CreateVersionFromFile +
            this.$store.getters["currentDocument/document"].documentTypeGuid,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
      );
    }
  }
};
</script>

<style>
</style>