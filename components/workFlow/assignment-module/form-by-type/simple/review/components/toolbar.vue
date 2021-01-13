<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        :visible="inProcess"
        :options="btnOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="inProcess"
        :options="reworkBtnOptions"
        location="before"
        widget="dxButton"
      />

      <DxItem
        locateInMenu="auto"
        template="createChildTask"
        location="before"
      />

      <template #createChildTask>
        <slot name="createChildTask" />
      </template>
      <DxItem location="after" template="importanceIndicator" />
      <template #importanceIndicator>
        <slot name="importanceIndicator" />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import { load } from "../../../../../infrastructure/services/taskService";
import TaskType from "../../../../../infrastructure/constants/taskType.js";
import { ReviewResult } from "../infrastructure.js";
import toolbarMixin from "../../../../infrastructure/mixins/toolbar.js";
export default {
  mixins: [toolbarMixin],
  computed: {
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.accept"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t("assignment.confirmMessage.sureAccept"),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.Accept);
              this.completeAssignment();
            }
          }
        },
      };
    },
    reworkBtnOptions() {
      return {
        icon: "undo",
        text: this.$t("buttons.rework"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t("assignment.confirmMessage.sureRework"),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ForRework);
              await this.completeAssignment();
              const { taskId } = this.$store.getters[
                `assignments/${this.assignmentId}/assignment`
              ];
              if (!this.isCard) {
                this.$router.push(
                  `/task/detail/${TaskType.SimpleTask}/${taskId}`
                );
              } else {
                this.$popup.taskCard(this, {
                  params: { taskId, taskType:TaskType.SimpleTask },
                  handler: load,
                });
              }
            }
          }
        },
      };
    },
  },
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
