<template>
  <div>
    <div class="file-uploader-block">
      <span class="dx-form-group-caption border-b">{{$t("translations.headers.versions")}}</span>
       <DxButton :hint="$t('buttons.refresh')" class="refresh-btn" icon="refresh" :onClick="refresh"></DxButton>
      <div class="list-container">
        <DxList :data-source="versions" :activeStateEnabled="false" :focusStateEnabled="false">
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
import documentService from "~/infrastructure/services/documentService.js";
import AttachmentActionBtn from "~/components/paper-work/main-doc-form/attachment-action-btn";
import moment from "moment";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    AttachmentActionBtn,
    DocumentIcon,
    DxFileUploader,
    DxList,
    DxButton
  },

  data() {
    return {
      versions: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl:
            dataApi.paperWork.Version +
            `${this.$store.getters["currentDocument/document"].documentTypeGuid}/${this.$store.getters["currentDocument/document"].id}`
        }),
        sort: [{ selector: "number", desc: true }]
      })
    };
  },
  computed: {
    canUpdate() {
      return this.$store.getters["currentDocument/canUpdate"];
    },
    acceptExtension() {
      return this.$store.getters["cache/acceptExtension"];
    },
    extension() {
      return this.$store.getters["cache/extension"];
    }
  },
  methods: {
    refresh() {
      this.versions.reload();
    },
    uploadVersionFromFile(e) {
      const document = this.$store.getters["currentDocument/document"];
      this.$awn.async(
        documentService.uploadVersion(document, e.file, this),
        version => {
          this.$refs["fileUploader"].instance.reset();
          this.$store.commit("currentDocument/SET_VERSION", version.data);
          this.refresh();
        },
        e => {}
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
  background: $base-bg;
  display: block;
  padding: 20px;
  margin: 0;
  border: 0.5px solid $base-border-color;
  border-radius: 5px;
  width: 350px;
  min-height: 100%;
  .border-b {
    display: block;
    width: 100%;
    padding-bottom: 7px;
  }

  .list-container {
    min-height: 50vh;
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
.refresh-btn{
  margin-bottom: 10px;
}
</style>

