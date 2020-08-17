<template>
  <DxDropDownButton
    :use-select-mode="false"
    :split-button="false"
    :text="$t('buttons.send')"
    :hint="$t('buttons.createTaskByDocument')"
    :drop-down-options="{ width: 330 }"
    :items="items"
    :icon="sendIcon"
    display-expr="name"
    @item-click="createTask"
  />
</template>
<script>
import { createTaskRequest } from "~/infrastructure/constants/creatingItems.js";
import TaskType from "~/infrastructure/constants/taskType.js";
import sendIcon from "~/static/icons/send.svg";
import ActionGuid from "~/infrastructure/constants/actionGuid.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton,
  },
  props: ["documentId"],
  data() {
    return {
      sendIcon,
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    items() {
      const allActionGuid = ActionGuid(this);
      const availableActions =
        this.document.documentKind?.availableActions || [];
      return allActionGuid.filter((el) => {
        let isSimilar = false;
        for (let id in availableActions) {
          if (availableActions[id] === el.id) isSimilar = true;
        }
        return isSimilar;
      });
    },
  },
  methods: {
    createTask(e) {
      const documentTypeGuid = this.documentId
      this.$awn.asyncBlock(
        e.itemData.create({ documentId: this.documentId, documentTypeGuid }),
        () => {},
        () => {}
      );
    },
  },
};
</script>

<style>
</style>