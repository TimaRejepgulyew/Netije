<template>
  <div class="d-flex align-stretch align-items-center">
    <div class="attachment--link d-flex f-grow-1" @dblclick="showAttachment">
      <documentIcon :extension="item.entity.extension" />
      <div class="max-width-5vw">{{ item.entity.name }}</div>
    </div>
    <actionBtn
      @detach="detach"
      @showCard="() => showCard(item.entity)"
      :attachment="item"
    />
  </div>
</template>

<script>
import DocumentService from "~/infrastructure/services/documentVersionService";
import actionBtn from "~/components/workFlow/attachment/attachment-document-action-btn.vue";
import documentIcon from "~/components/page/document-icon.vue";
export default {
  components: {
    documentIcon,
    actionBtn
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
      this.$emit("showCard", document);
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
      
      DocumentService.loadLastVersionDocumentEditor(this.item.entity, this);
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

.attachment--link {
  cursor: pointer;

  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 3px;
  text-decoration: none;
  &:hover {
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
</style>
