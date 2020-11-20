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
        :visible="inProcess"
        location="before"
        template="createChildActionItem"
      />
      <template #createChildActionItem>
        <create-child-action-item-btn :parentAssignmentId="assignmentId" />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import TaskType from "~/infrastructure/constants/taskType.js";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
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
              this.setResult(ReviewResult.ReviewAssignment.Accept);
              this.completeAssignment();
            }
          }
        }
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
              this.setResult(ReviewResult.ReviewAssignment.ForRework);
              await this.completeAssignment();
              const { taskId } = this.$store.getters[
                `assignments/${this.assignmentId}/assignment`
              ];
              this.$router.push(
                `/task/detail/${TaskType.SimpleTask}/${taskId}`
              );
            }
          }
        }
      };
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
