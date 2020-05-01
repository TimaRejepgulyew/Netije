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
                <div class="list__btn-group"></div>
              </div>
            </div>
          </template>
        </DxList>
      </div>
      <template v-if="!readOnly">
        <span class>{{$t("translations.headers.attachment")}}</span>
        <DxSelectBox
          v-model="store"
          :items="allDocuments"
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
            :disabled="!store"
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
  props: ["attachmentDetails", "readOnly"],
  async created() {
    const { data } = await this.$axios.get(dataApi.paperWork.AllDocument);
    this.allDocuments = data.data;
  },

  data() {
    return {
      allDocuments: [],
      store: null
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
      if (this.store) {
        this.$emit("addAttachment", this.store);
        this.store = null;
      }
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

