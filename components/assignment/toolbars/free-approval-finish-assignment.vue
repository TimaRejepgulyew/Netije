<template>
  <div>
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
          locateInMenu="auto"
          template="createChildTask"
          location="before"
        />

        <template #createChildTask>
          <createChildTaskBtn :parentAssignmentId="assignmentId" />
        </template>
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  computed: {
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureFreeApprovalFinishAssignment"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(
                ReviewResult.FreeApprovalFinishAssignment.Completed
              );
              this.completeAssignment();
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
