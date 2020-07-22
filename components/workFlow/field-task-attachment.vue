<template>
  <div class="d-flex align-stretch align-items-center">
    <div class="link d-flex f-grow-1" @dblclick="showAttachment">
      <taskTypeIcon class="icon" :taskTypeGuid="item.entity.type" />
      <div>{{item.entity.name}}</div>
    </div>
    <actionBtn :attachment="item" />
  </div>
</template>

<script>
import taskTypeIcon from "~/components/page/task-icon.vue";
import DocumentService from "~/infrastructure/services/documentVersionService";
import actionBtn from "~/components/workFlow/attachment-action-btn.vue";

export default {
  components: {
    actionBtn,
    taskTypeIcon
  },
  props: ["item"],
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
.icon {
  margin: 0;
  margin-right: 5px;
}
</style>