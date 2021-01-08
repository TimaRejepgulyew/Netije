<template>
  <DxButton
    :disabled="disabled"
    :visible="visible"
    :on-click="createChildActionItem"
    :icon="actionItemExecutionIcon"
    :text="$t('buttons.createChiltActionItemExecution')"
    :useSubmitBehavior="false"
  ></DxButton>
</template>
<script>
import { CreateChildActionItemExecution } from "../../../infrastructure/services/taskService.js";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
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
      actionItemExecutionIcon
    };
  },
  methods: {
    createChildActionItem() {
      this.$popup.taskCard(
        this,
        {
          params: this.parentAssignmentId,
          handler: CreateChildActionItemExecution
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
