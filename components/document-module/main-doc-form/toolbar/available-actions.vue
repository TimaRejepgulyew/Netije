<template>
  <div>
    <DxPopup
      :visible.sync="isOpenPopup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="90%"
      maxHeight="95%"
      height="auto"
    >
      <div class="scrool-auto">
        <task-card @onStart="tooglePopup" :taskId="taskId" v-if="isOpenPopup" :isCard="true" />
      </div>
    </DxPopup>

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
import taskCard from "~/components/task/index.vue";
import { DxPopup } from "devextreme-vue/popup";
import TaskType from "~/infrastructure/constants/taskType.js";
import sendIcon from "~/static/icons/send.svg";
import AvailableActions from "~/infrastructure/models/AvailableActions.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton,
    taskCard,
    DxPopup,
  },
  props: ["documentId"],
  data() {
    return {
      isOpenPopup: false,
      taskId: false,
      sendIcon,
    };
  },

  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    items() {
      const availableActions =
        this.document.documentKind?.availableActions || [];
      const items = Object.values(
        new AvailableActions(this).init().filtering(availableActions)
      );
      console.log(items);
      return items;
    },
  },
  methods: {
    showRelationDocument(taskId) {
      this.taskId = taskId;
      this.tooglePopup();
    },
    tooglePopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
    createTask(e) {
      this.$awn.asyncBlock(
        e.itemData.create(this, {
          documentId: +this.documentId,
          documentTypeGuid: this.document.documentTypeGuid,
        }),
        ({ taskType, taskId }) => {
          this.showRelationDocument(taskId);
        },
        () => {}
      );
    },
  },
};
</script>

<style>
</style>