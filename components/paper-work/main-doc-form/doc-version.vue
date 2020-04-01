<template>
  <div class="main-block">
    <div class="file-uploader-block">
      <DxFileUploader
        :multiple="true"
        :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png']"
        @progress="onUploadProgress($event)"
        upload-mode="useButtons"
        :uploaded-message="message"
      />
      <div class="note">
        Allowed file extensions:
        <span>.jpg, .jpeg, .gif, .png</span>.
      </div>
    </div>
  </div>
</template>
<script>
import DxFileUploader from "devextreme-vue/file-uploader";
import dataApi from "~/static/dataApi";
export default {
  components: {
    DxFileUploader
  },
  data() {
    return {
      chunks: [],
      message: "succses"
    };
  },
  methods: {
    onUploadProgress(e) {
      let test = { documentId: this.$route.params.id, file: e.file };
      console.log(e);
      this.$axios
        .post(
          dataApi.paperWork.DocumentVersion,
          { documentId: parseInt(this.$route.params.id), file: e.file },
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(function() {
          console.log("SUCCESS!!");
          this.message = "error";
        })
        .catch(function() {
          console.log("FAILURE!!");
          this.message = "error";
        });
    }
    // test(e) {
    // //   console.log(e);
    // //   e.onError();
    // }
  }
};
</script>
<style>
.file-uploader-block {
  display: block;
  padding: 0;
  margin: 0;
  width: 400px;
}

.note {
  font-size: 10pt;
  color: #484848;
  margin-left: 9px;
}

.note > span {
  font-weight: 700;
}
</style>

