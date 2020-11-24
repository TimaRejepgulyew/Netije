<template>
  <div>
    <DxDropDownButton
      :use-select-mode="false"
      :split-button="false"
      :text="$t('buttons.send')"
      :hint="$t('buttons.createTaskByDocument')"
      :drop-down-options="{ width: 330 }"
      :items="items"
      :icon="sendIcon"
      display-expr="text"
      @item-click="createTask"
    />
  </div>
</template>
<script>
import TaskType from "~/infrastructure/constants/taskType.js";
import sendIcon from "~/static/icons/send.svg";
import DocumentSendAction from "~/infrastructure/models/DocumentSendAction.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  props: ["documentId"],
  data() {
    return {
      sendIcon
    };
  },

  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    items() {
      const availableActions = [
        ...this.document.documentKind?.availableActions,
        TaskType.SimpleTask
      ] || [TaskType.SimpleTask];
      const items = Object.values(
        new DocumentSendAction(this).init().filtering(availableActions)
      );
      return items;
    }
  },
  methods: {
    createTask(e) {
      e.itemData.create(this, {
        documentId: +this.documentId,
        documentTypeGuid: this.document.documentTypeGuid
      });
    }
  }
};
</script>

<style></style>
