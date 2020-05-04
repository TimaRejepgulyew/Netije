<template>
  <div class="main-block">
    <div class="file-uploader-block">
      <slot name="attachment__header"></slot>
      <div class="list-container">
        <DxList :data-source="attachments" :search-enabled="true">
          <template #item="item">
            <div>
              <div
                class="d-flex"
                @dblclick="()=>{openVersion(item.data.id,item.data.documentTypeGuid)}"
              >
                <div class="list__content">{{item.data.name}}</div>
                <div class="list__btn-group">
                  <attachmentActionBtn />
                  <DxDropDownButton
                    :items="data.downloads"
                    :drop-down-options="{ width: 230 }"
                    text="Download Trial"
                    icon="save"
                    @item-click="onItemClick"
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
            :text="$t('translations.links.add')"
            :on-click="addAttachment"
          ></DxButton>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import DataSource from "devextreme/data/data_source";
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
import { saveAs } from "file-saver";
import moment from "moment";
import DxSelectBox from "devextreme-vue/select-box";
import DxTagBox from "devextreme-vue/tag-box";
export default {
  components: {
    DxSelectBox,
    DxList,
    DxButton,
    DxTagBox
  },
  props: [, "readOnly"],
  async created() {
    if (!this.isCreated) {
      const { data } = await this.$axios(
        dataApi.attachment.AttachmentByTask + this.$route.params.id
      );
      console.log(data);
      this.attachments = data;
    }
  },
  data() {
    return {
      attachments: [],
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
      window.open(
        this.$store.getters["globalProperties/documentTypeGuid"](
          documentTypeGuid
        ) + documentId
      );
    },
    addAttachment() {
      if (this.selectedDocument) {
        const hasDocument = this.attachments.some(el => {
          return el.id === this.selectedDocument.id;
        });
        let attachments = this.attachments;
        if (!hasDocument) {
          attachments.push(this.selectedDocument);
        } else {
        }
        if (this.isCreated) {
          this.$emit("updateAttachments", attachments);
          this.selectedDocument = null;
        }
      }
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

