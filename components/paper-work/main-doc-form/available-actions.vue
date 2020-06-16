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
import { createTask } from "~/infrastructure/services/create.js";
import TaskType from "~/infrastructure/constants/taskType.js";
import sendIcon from "~/static/icons/send.svg";
import ActionGuid from "~/infrastructure/constants/actionGuid.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  data() {
    return {
      sendIcon
    };
  },
  computed: {
    items() {
      const allActionGuid = ActionGuid(this);
      const availableActions = this.$store.getters["currentDocument/document"]
        .documentKind.availableActions;
      return allActionGuid.filter(el => {
        let isSimilar = false;
        for (let id in availableActions) {
          if (availableActions[id] === el.id) isSimilar = true;
        }
        return isSimilar;
      });
    }
  },
  methods: {
    async createTask(e) {
      const documentId = this.$store.getters["currentDocument/document"].id;
      await e.itemData.create(documentId);
    },
    async createSimpleTask() {
      const documentId = this.$store.getters["currentDocument/document"].id;
      await createTask(this, {
        taskType: TaskType.SimpleTask,
        leadingDocumentId: documentId
      });
      this.$router.push(`/task/detail/${TaskType.SimpleTask}`);
    }
  }
};
</script>

<style>
</style>