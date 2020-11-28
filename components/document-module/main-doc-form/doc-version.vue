<template>
  <div>
    <div class="file-uploader-block">
      <span class="dx-form-group-caption border-b">{{
        $t("document.groups.captions.versions")
      }}</span>
      <div class="d-flex">
        <DxButton
          :hint="$t('buttons.refresh')"
          class="refresh-btn"
          icon="refresh"
          :onClick="refresh"
        ></DxButton>
        <btn-version-from-scanner
          v-if="uploadVersionVisible"
          @uploadVersion="refresh"
          :documentId="documentId"
        />
        <btn-upload-version
          v-if="uploadVersionVisible"
          @uploadVersion="refresh"
          :documentId="documentId"
        />
      </div>
      <div class="list-container">
        <DxList
          :data-source="versions"
          :activeStateEnabled="false"
          :focusStateEnabled="false"
        >
          <template #item="item">
            <div>
              <div class="d-flex">
                <document-icon :extension="item.data.extension"></document-icon>
                <div class="list__content">
                  {{ item.data.note }}
                  <div>
                    <i class="dx-icon dx-icon-clock"></i>
                    <small>{{ item.data.created | formatDate }}</small>
                  </div>
                  <div>
                    <i class="dx-icon dx-icon-user"></i>
                    <small>{{ item.data.author }}</small>
                  </div>
                </div>
                <div class="list__btn-group">
                  <attachment-action-btn
                    @updateVersions="refresh"
                    :documentId="documentId"
                    :version="item.data"
                  />
                </div>
              </div>
            </div>
          </template>
        </DxList>
      </div>
    </div>
  </div>
</template>
<script>
import btnUploadVersion from "~/components/document-module/main-doc-form/toolbar/upload-version-button.vue";
import btnVersionFromScanner from "~/components/scanner-dialog/upload-version-from-scanner";
import DataSource from "devextreme/data/data_source";
import DocumentIcon from "~/components/page/document-icon";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import documentService from "~/infrastructure/services/documentVersionService.js";
import AttachmentActionBtn from "~/components/document-module/main-doc-form/attachment-action-btn";
import moment from "moment";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    AttachmentActionBtn,
    DocumentIcon,
    DxList,
    DxButton,
    btnUploadVersion,
    btnVersionFromScanner
  },
  props: ["documentId"],
  data() {
    return {
      versions: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: `${dataApi.documentModule.Version}${this.documentId}`
        }),
        paginate: true,
        pageSize: 7,
        sort: [{ selector: "number", desc: true }]
      })
    };
  },
  computed: {
    uploadVersionVisible() {
      return this.canUpdate;
    },

    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    isNew() {
      return this.$store.getters[`documents/${this.documentId}/isNew`];
    },
    canUpdate() {
      return this.$store.getters[`documents/${this.documentId}/canUpdate`];
    }
  },
  methods: {
    refresh() {
      this.versions.reload();
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

.uploadButton {
  padding: 0;
  margin: 0;
  .dx-fileuploader-input-wrapper::before {
    padding: 3px 0;
  }
  .dx-fileuploader-input-wrapper {
    width: auto;
    padding: 6px 0;
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
    margin: 0;
    min-height: 65vh;
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
.refresh-btn {
  margin-bottom: 10px;
}
</style>
