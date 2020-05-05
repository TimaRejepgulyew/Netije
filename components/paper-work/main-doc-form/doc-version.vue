<template>
  <div class="main-block">
    <div class="file-uploader-block">
      <span class="dx-form-group-caption border-b">{{$t("translations.headers.versions")}}</span>
      <div class="list-container">
        <DxList :data-source="versions" search-expr="name" :search-enabled="true">
          <template #item="item">
            <div>
              <div class="d-flex">
                <document-icon :extension="item.data.extension"></document-icon>
                <div class="list__content">{{ item.data.note}}</div>
                <div class="list__btn-group">
                  <DxButton
                    icon="search"
                    class="list__btn"
                    v-if="item.data.preview"
                    :onClick="()=>{openVersion(item.data)}"
                  ></DxButton>
                  <DxButton
                    icon="download"
                    class="list__btn"
                    :on-click="()=>{downloadVersion(item.data)}"
                  ></DxButton>
                </div>
              </div>
            </div>
          </template>
        </DxList>
      </div>
      <DxFileUploader
        uploadMode="useButtons"
        ref="fileUploader"
        :multiple="false"
        :accept="acceptExtension"
        :allowed-file-extensions="extension"
        @progress="addVersion"
        @value-changed="e => files = e.value"
        :showFileList="true"
        :invalid-fileextension-message="$t('translations.fields.invalidExeption')"
      />
    </div>
  </div>
</template>
<script>
import DocumentIcon from "~/components/page/document-icon";
import DxFileUploader from "devextreme-vue/file-uploader";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
import { saveAs } from "file-saver";
import { DxPopup } from "devextreme-vue/popup";
export default {
  components: { DocumentIcon, DxFileUploader, DxList, DxButton, DxPopup },
  async created() {
    this.associatedApplication = await this.getData(
      dataApi.docFlow.AssociatedApplication
    );
    if (this.$route.params.id != "add") {
      this.versions = await this.getVersions();
    }
  },
  data() {
    return {
      versions: [],
      associatedApplication: [],
      addresImg: "",
      popupVersion: false
    };
  },
  computed: {
    acceptExtension() {
      return this.extension.join(",");
    },
    extension() {
      return this.associatedApplication.map(el => {
        return el.extension;
      });
    },
    name() {
      return this.$store.getters["paper-work/name"];
    }
  },
  methods: {
    async getVersions() {
      const data = await this.$axios.get(
        dataApi.paperWork.Version + this.$route.params.id
      );
      return data.data.map(version => {
        const associatedApplicationId =
          version.binaryDataAssociatedApplicationId;
        const associatedApplication = this.getThisAssociatedApp(
          associatedApplicationId
        );
        version.extension = associatedApplication.extension;
        version.preview = associatedApplication.canBeOpenedWithPreview;
        return version;
      });
    },
    getThisAssociatedApp(associatedApplicationId) {
      return this.associatedApplication.find(associatedApp => {
        if (associatedApplicationId == associatedApp.id) {
          return associatedApp;
        }
      });
    },
    async getData(address) {
      const associatedApplication = await this.$axios.get(address);
      return associatedApplication.data.data;
    },
    openVersion(version) {
      this.$axios
        .get(dataApi.paperWork.PreviewVersion + version.id, {
          responseType: "blob"
        })
        .then(response => {
          var x = screen.width * 0.25;
          var offset = screen.height * 0.2;
          let params = `height=${screen.height - offset},width=${screen.width *
            0.5},left=${x},top=${50}`;
          window.open(URL.createObjectURL(response.data), "Preview", params);
        });
    },

    downloadVersion(version) {
      this.$axios
        .get(dataApi.paperWork.DownloadVersion + version.id, {
          responseType: "blob"
        })
        .then(response => {
          var blob = new Blob([response.data], {
            type: `data:${response.data.type}`
          });

          saveAs(blob, `${this.name}.${version.extension}`);
        });
    },
    deleteVersion() {
      // this.editVersionPopup = true;
    },
    notify(msgTxt, msgType) {
      notify(
        {
          message: msgTxt,
          position: {
            my: "center top",
            at: "center top"
          }
        },
        msgType,
        3000
      );
    },
    addVersion(e) {
      let formData = new FormData();
      formData.append("File", e.file);
      formData.append("documentId", parseInt(this.$route.params.id));
      this.$axios
        .post(dataApi.paperWork.DocumentVersion, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(version => {
          this.notify(this.$t("translations.fields.uploadSuccess"), "success");
          const associatedApplication = this.getThisAssociatedApp(
            version.data.binaryDataAssociatedApplicationId
          );
          version.data.extension = associatedApplication.extension.slice(1);
          version.data.preview = associatedApplication.canBeOpenedWithPreview;
          this.versions.unshift(version.data);
          this.$refs["fileUploader"].instance.reset();
        })
        .catch(() => {
          this.notify(this.$t("translations.fields.uploadError"), "error");
        });
    }
  }
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/themes/generated/variables.base.scss";
.file-uploader-block {
  display: block;
  padding: 0;
  margin: 0;
  .border-b {
    display: block;
    width: 100%;
    padding-bottom: 7px;
    border-bottom: 1px solid darken($base-bg, 15);
  }

  .list-container {
    border: 0.1px solid darken($base-bg, 15);
    padding: 35px 0;
    height: 50vh;
    overflow: auto;
    width: 100%;
    i {
      display: inline;
    }
    .list__btn-group {
      margin-left: auto;
    }
  }
}

.popup__img {
  object-fit: contain;
  display: block;
  position: relative;
  width: 80%;
  height: 100%;
}
</style>

