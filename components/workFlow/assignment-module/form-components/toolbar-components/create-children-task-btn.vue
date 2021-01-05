<template>
  <DxButton
    :disabled="disabled"
    :visible="visible"
    :on-click="createChildActionItem"
    :icon="createChildTaskIcon"
    :text="$t('buttons.createChildTask')"
    :useSubmitBehavior="false"
  ></DxButton>
</template>

<script>
import { createSubtaskByAssignment } from "../../../infrastructure/services/taskService.js";
import createChildTaskIcon from "~/static/icons/create-child-task-btn-icon.svg";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton
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
      createChildTaskIcon
    };
  },
  methods: {
    createChildActionItem() {
      this.$popup.taskCard(
        this,
        {
          params: this.parentAssignmentId,
          handler: createSubtaskByAssignment
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "valueChanged" }
          ]
        }
      );
    },
    valueChanged({ taskId, taskType }) {
      this.$emit("valueChanged", { taskId, taskType });
    }
  }
};
</script>

<style></style>
