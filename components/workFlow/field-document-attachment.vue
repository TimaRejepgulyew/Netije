<template>
  <div class="d-flex align-stretch align-items-center">
    <DxPopup
      width="90%"
      height="90%"
      :showTitle="false"
      :visible.sync="isOpenCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
    >
      <div>
        <document-card class="card" v-if="isOpenCard"  :isCard="true" />
      </div>
    </DxPopup>
    <div class="link d-flex f-grow-1" @dblclick="showAttachment">
      <documentIcon :extension="item.entity.extension" />
      <div class="max-width-5vw">{{item.entity.name}}</div>
    </div>
    <actionBtn @detach="detach" @showCard="()=>showCard(item.entity)" :attachment="item" />
  </div>
</template>

<script>
import documentCard from "~/components/paper-work/main-doc-form/index.vue";
import { DxPopup } from "devextreme-vue/popup";
import DocumentService from "~/infrastructure/services/documentService";
import actionBtn from "~/components/workFlow/attachment-action-btn.vue";
import documentIcon from "~/components/page/document-icon.vue";
export default {
  components: {
    documentIcon,
    actionBtn,
    DxPopup,
    documentCard
  },
  props: ["item"],
  data() {
    return {
      isOpenCard: false
    };
  },
  methods: {
    detach(attachmentId) {
      this.$emit("detach", attachmentId);
    },
    showCard(document) {
      this.$awn.asyncBlock(
        this.$store.dispatch("currentDocument/getDocumentById", {
          id: document.id,
          type: document.documentTypeGuid
        }),
        () => {
          this.isOpenCard = true;
        }
      );
    },
    downloadVersion() {
      DocumentService.downloadDocument(
        {
          ...this.item.entity,
          extension: this.item.entity.extension
        },
        this
      );
    },
    previewVersion() {
      DocumentService.previewDocument(this.item.entity, this);
    },
    showAttachment() {
      const canPreview =
        this.item.entity.hasVersions && this.item.entity.canBeOpenedWithPreview;
      if (canPreview) this.previewVersion();
      else if (this.item.entity.hasVersions) this.downloadVersion();
      else this.showCard(this.item.entity);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~assets/themes/generated/variables.base.scss";
@import "~assets/dx-styles.scss";
.align-stretch {
  align-content: stretch;
}

.link {
  cursor: pointer;
  color: inherit;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  text-decoration: none;
  &:hover {
    color: inherit;
    background: darken($base-bg, 5%);
    width: auto;
  }
}
.max-width-5vw {
  max-width: 20vw;
  min-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.card {
  height: 85vh;
}
</style>