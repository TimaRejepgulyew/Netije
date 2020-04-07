<template>
  <div class="main-block">
    <div class="file-uploader-block">
      <span class="dx-form-group-caption border-b">{{$t("translations.headers.attachment")}}</span>
      <div class="list-container">
        <DxList :data-source="attachments" search-expr="name" :search-enabled="true">
          <template #item="item">
            <div>
              <div class="d-flex">
                <div class="list__content">{{item.data.name}}</div>
                <div class="list__btn-group">
                  <DxButton
                    icon="search"
                    class="list__btn"
                    v-if="!item.data.preview"
                    :onClick="()=>{openVersion(item.data.id,item.data.documentTypeGuid)}"
                  ></DxButton>
                  <DxButton
                    icon="download"
                    class="list__btn"
                    :on-click="()=>{downloadVersion(item.data.documentTypeGuid)}"
                  ></DxButton>
                </div>
              </div>
            </div>
          </template>
        </DxList>
      </div>
      <span class>{{$t("translations.headers.attachment")}}</span>
      <DxTagBox
        :data-source="dataSource"
        :value.sync="store"
        :show-selection-controls="true"
        :show-multi-tag-only="false"
        value-expr="id"
        display-expr="name"
        apply-value-mode="useButtons"
      />
      <div class="column">
        <DxButton
          icon="add"
          type="success"
          :text="$t('translations.links.add')"
          :on-click="addAttachment"
        ></DxButton>
      </div>
    </div>
  </div>
</template>
<script>
import DxList from "devextreme-vue/list";
import dataApi from "~/static/dataApi";
import { DxButton } from "devextreme-vue";
import notify from "devextreme/ui/notify";
import { saveAs } from "file-saver";
import moment from "moment";
import DxTagBox from "devextreme-vue/tag-box";
export default {
  components: {
    DxList,
    DxButton,
    DxTagBox
  },
  props: ["attachmentDetails"],
  async created() {
    const { data } = await this.$axios.get(dataApi.paperWork.AllDocument);
    this.allDocuments = data.data;
  },

  data() {
    return {
      allDocuments: [],
      store: [],
      addresImg: "",
      dataSource: this.$dxStore({
        key: "id",
        loadUrl: dataApi.paperWork.AllDocument
      })
    };
  },
  computed: {
    attachments() {
      const attachmentDetails = [...this.attachmentDetails];
      if (attachmentDetails) {
        return attachmentDetails.map(attachment => {
          return this.allDocuments.find(document => {
            return document.id == attachment.attachmentId;
          });
        });
      } else {
        return [];
      }
    }
  },
  methods: {
    openVersion(documentId, documentTypeGuid) {
      console.log(
        this.$store.getters["globalProperties/documentTypeGuid"](
          documentTypeGuid
        )
      );
      window.open(
        this.$store.getters["globalProperties/documentTypeGuid"](
          documentTypeGuid
        ) + documentId
      );
      // this.$router.push(
      //   this.$store.getters["globalProperties/documentTypeGuid"](
      //     documentTypeGuid
      //   ) + documentId
      // );
    },
    addAttachment() {
      this.$emit("addAttachment", this.store);
      this.store = null;
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
    padding: 35px 0;
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

