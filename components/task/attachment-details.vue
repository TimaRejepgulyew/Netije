<template>
  <div class="main-block">
    <div class="file-uploader-block">
      <span class="dx-form-group-caption border-b">{{$t("translations.headers.attachment")}}</span>
      <div class="list-container">
        <DxList :data-source="attachments" :search-enabled="false">
          <!-- <template #group="{ data: item }">
            <div>Вложение: {{ item.document.name }}</div>
          </template>-->
          <template #item="item">
            <div>
              <div
                class="d-flex"
                @dblclick="()=>{openVersion(item.data.document.id,item.data.document.documentTypeGuid)}"
              >
                <document-icon
                  v-if="item.data.document"
                  :extension="item.data.document.extension?item.data.document.extension:null"
                ></document-icon>
                <div class="list__content">
                  {{item.data.document.name}}
                  <div class="text-sm">
                    <i class="dx-icon dx-icon-user"></i>
                    {{item.data.attachedBy}}
                  </div>
                </div>

                <div class="list__btn-group">
                  <attachment-action-btn
                    @detach="detachAttachment($event)"
                    :attachment="item.data"
                  />
                </div>
              </div>
            </div>
          </template>
        </DxList>
      </div>
      <template v-if="!readOnly">
        <span class>{{$t("translations.headers.attachment")}}</span>
        <DxSelectBox
          v-model="selectedDocument"
          :dataSource="documents"
          display-expr="name"
          searchExpr="name"
          :show-clear-button="true"
          :searchEnabled="true"
          :paginate="true"
          :page-size="10"
        ></DxSelectBox>
        <div class="column">
          <DxButton
            :allow-clearing="true"
            :disabled="!selectedDocument"
            icon="add"
            type="success"
            :text="$t('buttons.add')"
            :on-click="addAttachment"
          ></DxButton>
        </div>
      </template>
    </div>
  </div>
</template>
<script>

import DocumentIcon from "~/components/page/document-icon";
import attachmentActionBtn from "~/components/workFlow/attachment-action-btn";
import DataSource from "devextreme/data/data_source";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import moment from "moment";
import DxSelectBox from "devextreme-vue/select-box";
import DxTagBox from "devextreme-vue/tag-box";
export default {
  components: {
    DocumentIcon,
    attachmentActionBtn,
    DxSelectBox,
    DxList,
    DxButton,
    DxTagBox
  },
  props: ["url", "readOnly"],
  created() {
    if (this.isCreated) {
      this.attachments = [];
    }
  },
  data() {
    return {
      attachments: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.url + this.$route.params.id
        })
      }),
      documents: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.paperWork.AllDocument
        })
      }),
      selectedDocument: null
    };
  },
  methods: {
    openVersion(documentId, documentTypeGuid) {
      this.$router.push(`/paper-work/detail/${documentTypeGuid}/${documentId}`);
    },
    compareAttachments() {
      if (this.selectedDocument) {
        return this.attachments.some(el => {
          return el.document.id === this.selectedDocument.id;
        });
      }
    },
    sendAttachments(attachments) {
      if (this.isCreated) {
        this.$emit("updateAttachments", attachments);
        this.selectedDocument = null;
      }
    },
    formatDocument() {
      return {
        id: null,
        document: this.selectedDocument,
        canDetach: true,
        attachedBy: this.$t("translations.fields.me")
      };
    },
    addAttachment() {
      let attachments = this.attachments;
      if (!this.compareAttachments()) {
        const attachment = this.formatDocument();
        attachments.push(attachment);
        this.sendAttachments(attachments);
      }
    },
    detachAttachment(id) {
      this.attachments = this.attachments.filter(attach => {
        return attach.document.id != id;
      });
      this.sendAttachments(this.attachments);
    }
  },
  computed: {
    isCreated() {
      return !this.$route.params.id;
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
    padding-bottom: 6px;
    border-bottom: 1px solid darken($base-bg, 15);
  }
  .text-sm {
    font-size: 12px;
  }
  .list-container {
    padding: 35px 10px;
    height: auto;
    max-height: 60vh;
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
.column {
  padding: 20px 0;
}
</style>

