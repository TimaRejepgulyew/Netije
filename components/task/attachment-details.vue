<template>
  <div class="main-block">
    <div class="attachment-block">
      <span class="dx-form-group-caption border-b">{{$t("translations.headers.attachment")}}</span>
      <div class="list-container">
        <DxList  :search-enabled="false">
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
      <template>
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
  props: ["url"],
  data() {
    return {
      documents: new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: dataApi.paperWork.AllDocument
        })
      }),
      selectedDocument: null
    };
  },
  computed: {
    attachments() {
      return new DataSource({
        store: this.$dxStore({
          key: "id",
          loadUrl: this.url + this.$route.params.id
        })
      });
    }
  },
  methods: {
    openVersion(documentId, documentTypeGuid) {
      this.$router.push(`/paper-work/detail/${documentTypeGuid}/${documentId}`);
    },
    async addAttachment() {
      try {
        await this.$axios.put(
          dataApi.task.AddAttachment,
          this.selectedDocument
        );
        await this.documents.reload();
      } catch (e) {}
    },
    async detachAttachment(id) {
      try {
        await this.$axios.delete(`${dataApi.Task.DetachAttacment}`);
        await this.documents.reload();
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
<style lang="scss">
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/themes/generated/variables.base.scss";
.attachment-block {
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

