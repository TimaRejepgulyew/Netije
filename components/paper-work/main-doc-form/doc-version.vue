<template>
  <div class="main-block">
    <div class="file-uploader-block">
      <span class="dx-form-group-caption border-b">{{$t("translations.headers.versions")}}</span>
      <div class="list-container">
        <DxList :data-source="versions" search-expr="note" :search-enabled="true">
          <template #item="item">
            <div>
              <div class="d-flex">
                <document-icon :extension="item.data.extension"></document-icon>
                <div class="list__content">
                  {{ item.data.note}}
                  <div>
                    <i class="dx-icon dx-icon-clock"></i>
                    <small>{{item.data.created|formatDate}}</small>
                  </div>
                  <div>
                    <i class="dx-icon dx-icon-user"></i>
                    <small>{{item.data.author}}</small>
                  </div>
                </div>
                <div class="list__btn-group">
                  <attachment-action-btn :version="item.data" />
                </div>
              </div>
            </div>
          </template>
        </DxList>
      </div>
      <div class="file-uploader" v-if="canUpdate">
        <DxFileUploader
          uploadMode="useButtons"
          ref="fileUploader"
          :multiple="false"
          :accept="acceptExtension"
          :allowed-file-extensions="extension"
          @progress="uploadVersionFromFile"
          @value-changed="e => files = e.value"
          :showFileList="true"
          :invalid-fileextension-message="$t('translations.fields.invalidExeption')"
        />
      </div>
    </div>
  </div>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import DocumentIcon from "~/components/page/document-icon";
import DxFileUploader from "devextreme-vue/file-uploader";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
import DocumentService from "~/infrastructure/services/documentService";
import { DxPopup } from "devextreme-vue/popup";
import AttachmentActionBtn from "~/components/paper-work/main-doc-form/attachment-action-btn";
import moment from "moment";
export default {
  components: {
    AttachmentActionBtn,
    DocumentIcon,
    DxFileUploader,
    DxList,
    DxButton,
    DxPopup
  },
  async created() {
    this.associatedApplication = (
      await this.$axios.get(dataApi.docFlow.AssociatedApplication)
    ).data.data;
  },
  data() {
    return {
      versions: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.paperWork.Version + this.$route.params.id
        }),
        sort: [{ selector: "number", desc: true }]
      }),
      associatedApplication: []
    };
  },
  computed: {
    canUpdate() {
      return this.$store.getters["currentDocument/canUpdate"];
    },
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
    uploadVersionFromFile(e) {
      let formData = new FormData();
      formData.append("file", e.file);
      formData.append("documentId", +this.$route.params.id);
      this.$awn.async(
        this.$axios.post(dataApi.paperWork.CreateVersionFromFile, formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }),
        version => {
          this.$refs["fileUploader"].instance.reset();
          this.$awn.success();
          this.versions.reload();
        },
        e => this.$awn.alert()
      );
    }
  },
  filters: {
    formatDate(value) {
      return moment(value).format("MM.DD.YYYY HH:mm");
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
  }

  .list-container {
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
.file-uploader {
  margin-top: 20px;
  padding: 10px 0;
  border: 0.5px solid $base-border-color;
  border-radius: 5px;
}
.popup__img {
  object-fit: contain;
  display: block;
  position: relative;
  width: 80%;
  height: 100%;
}
</style>

