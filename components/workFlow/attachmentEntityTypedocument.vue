<template>
  <div class="d-flex align-stretch align-items-center">
    <div class="link d-flex" @dblclick="showAttachment">
      <documentIcon :extension="item.entity.extension" />
      <div>{{item.entity.name}}</div>
    </div>
    <actionBtn :attachment="item" @detachLink="detachLink" />
  </div>
</template>

<script>
import DocumentService from "~/infrastructure/services/documentService";
import actionBtn from "~/components/workFlow/attachment-action-btn.vue";
import documentIcon from "~/components/page/document-icon.vue";
export default {
  components: {
    documentIcon,
    actionBtn
  },
  props: ["item"],
  computed: {},
  methods: {
    showAttachment() {
      const canPreview =
        this.item.entity.hasVersions && this.item.entity.canBeOpenedWithPreview;
      if (canPreview) DocumentService.previewDocument(this.item.entity, this);
      else if (this.item.entity.hasVersions)
        DocumentService.downloadDocument(
          {
            ...this.item.entity,
            extension: this.item.entity.extension
          },
          this
        );
      else
        this.$router.push(
          `/paper-work/detail/${this.item.entity.documentTypeGuid}/${this.item.entity.id}`
        );
    },
    detachLink(options) {
      this.$emit("detachLink", options);
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
</style>