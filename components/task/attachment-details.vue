<template>
  <div class="main-block">
    <div class="file-uploader-block">
      <slot name="attachment__header"></slot>
      <div class="list-container">
        <DxList :data-source="attachmentDetails" :search-enabled="true">
          <template #item="item">
            <div>
              <div
                class="d-flex"
                @dblclick="()=>{openVersion(item.data.id,item.data.documentTypeGuid)}"
              >
                <div class="list__content">{{item.data.name}}</div>
                <div class="list__btn-group">
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
      <DxSelectBox
        v-model="store"
        :items="allDocuments"
        display-expr="name"
        searchExpr="name"
        :searchEnabled="true"
        :paginate="true"
        :page-size="10"
      ></DxSelectBox>
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
import DxSelectBox from "devextreme-vue/select-box";
import DxTagBox from "devextreme-vue/tag-box";
export default {
  components: {
    DxSelectBox,
    DxList,
    DxButton,
    DxTagBox
  },
  props: ["attachmentDetails"],
  async created() {
    const { data } = await this.$axios.get(dataApi.paperWork.AllDocument);
    this.allDocuments = data.data;
    console.log(this.attachmentDetails);
  },

  data() {
    return {
      allDocuments: [],
      store: []
    };
  },
  computed: {},
  methods: {
    openVersion(documentId, documentTypeGuid) {
      window.open(
        this.$store.getters["globalProperties/documentTypeGuid"](
          documentTypeGuid
        ) + documentId
      );
    },
    addAttachment() {
      this.$emit("addAttachment", this.store);
      this.store = null;
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

