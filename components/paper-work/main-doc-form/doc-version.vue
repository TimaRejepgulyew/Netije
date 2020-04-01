<template>
  <div class="main-block">
    <div class="file-uploader-block">
      <span class="dx-form-group-caption bor">Версии</span>
      <DxFileUploader
        :multiple="true"
        :allowed-file-extensions="['.jpg', '.jpeg', '.gif', '.png']"
        :uploadFile="onUploadProgress"
        :showFileList="false"
      />
      <div class="note">
        Allowed file extensions:
        <span>.jpg, .jpeg, .gif, .png</span>.
      </div>
    </div>
    <div class="list-container">
      <DxList :data-source="versions" :height="400" search-expr="note" :search-enabled="true">
        <template #item="item">
          <div>
            <div class="d-flex">
              <div class="list__content">{{ item.data.note}} {{item.data.id}}</div>
              <div class="list__btn-group">
                <DxButton icon="edit" class="list__btn"></DxButton>
                <DxButton icon="edit" class="list__btn"></DxButton>
              </div>
            </div>
          </div>
        </template>
      </DxList>
    </div>
  </div>
</template>
<script>
import DxFileUploader from "devextreme-vue/file-uploader";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
export default {
  components: {
    DxFileUploader,
    DxList,
    DxButton
  },
  async created() {
    if (this.$route.params.id != "add") {
      let data = await this.$axios.get(
        dataApi.paperWork.Version + this.$route.params.id
      );
      this.versions = data.data;
      console.log(this.versions);
    }
  },
  data() {
    return {
      versions: [],
      chunks: [],
      message: "succses"
    };
  },
  methods: {
    onUploadProgress(e) {
      let formData = new FormData();
      formData.append("File", e.value);
      formData.append("documentId", parseInt(this.$route.params.id));
      console.log(formData);
      this.$axios
        .post(dataApi.paperWork.DocumentVersion, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
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
.list-container {
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

