<template>
  <div>
    <DxPopup
      :showTitle="false"
      :visible.sync="isOpenCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="90%"
      :height="'auto'"
    >
      <div class="scrool-auto">
        <task-card
          @onClosed="emitData"
          @onClose="togglePopup"
          :taskId="currentTaskId"
          v-if="isOpenCard"
          :isCard="true"
        />
      </div>
    </DxPopup>
    <DxButton
      :disabled="disabled"
      :visible="visible"
      :on-click="createChildActionItem"
      :icon="actionItemExecutionIcon"
      :text="$t('buttons.createExecution')"
      :useSubmitBehavior="false"
    ></DxButton>
  </div>
</template>

<script>
import { DxPopup } from "devextreme-vue/popup";
import { CreateChildActionItemExecution } from "~/infrastructure/services/taskService.js";
import taskCard from "~/components/task/index.vue";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    taskCard,
    DxButton,
    DxPopup
  },
  props: {
    parentAssignmentId: {
      type: Number
    },
    visible: {
      type: Boolean,
      default: true
    },
    disabled: { type: Boolean, default: false }
  },
  data() {
    return {
      actionItemExecutionIcon,
      currentTaskId: null,
      isOpenCard: false
    };
  },
  methods: {
    createChildActionItem() {
      this.$awn.asyncBlock(
        CreateChildActionItemExecution(this, this.parentAssignmentId),
        ({ taskId }) => {
          this.currentTaskId = taskId;
          this.togglePopup();
        }
      );
    },
    emitData({ taskId, taskType }) {
      this.$emit("onClosed", { taskId, taskType });
    },
    togglePopup() {
      this.isOpenCard = !this.isOpenCard;
    }
  }
};
</script>

<style></style>
