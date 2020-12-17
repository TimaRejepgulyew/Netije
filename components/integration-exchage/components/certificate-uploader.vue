<template>
  <div class="fileuploader-container">
    <DxFileUploader
      :select-button-text="$t('exchange.uploadCertificate')"
      label-text=""
      upload-mode="useForm"
      @value-changed="valueChanged"
    />
  </div>
</template>

<script>
import { DxFileUploader } from "devextreme-vue/file-uploader";
export default {
  components: {
    DxFileUploader,
  },
  methods: {
    valueChanged({ value }) {
      this.$emit("valueChanged", value[0]);
    },
  },
};
</script>

<style >
.fileuploader-container {
  border: 1px solid #d3d3d3;
}
</style>