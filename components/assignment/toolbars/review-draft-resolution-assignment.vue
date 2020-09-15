<template>
  <div>
    <div class="toolbar">
      <DxToolbar>
        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnForExecutionOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :disabled="btnForwardDisabled"
          :visible="!isRework"
          :options="btnForwardOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnInformedOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnAddResolutionOptions"
          location="before"
          widget="dxButton"
        />
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import returnManagersAssistantIcon from "~/static/icons/status/forrework.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import informedIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
export default {
  data() {
    return {
      actionItemExecutionTaskId: null,
      showItemExecutionTask: false,
    };
  },
  computed: {
    btnForwardDisabled() {
      return !this.assignment.addresseeId;
    },
    tollbarItemVisible() {
      return this.assignment.addresseeId ? false : this.inProcess;
    },
    isRework() {
      if (this.inProcess) return this.assignment.isRework;
      else return true;
    },
    btnForExecutionOptions() {
      return {
        icon: resolutionIcon,
        text: this.$t("buttons.approveResolution"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewApproveRosolutionConfirmetion"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.sendResult(ReviewResult.ReviewDraftResolution.ForExecution);
              this.completeAssignment();
            }
          }
        },
      };
    },
    btnInformedOptions() {
      return {
        icon: informedIcon,
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewAcceptConfirmetion"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.sendResult(ReviewResult.ReviewDraftResolution.Informed);
              this.completeAssignment();
            }
          }
        },
      };
    },
    btnAddResolutionOptions() {
      return {
        icon: returnManagersAssistantIcon,
        text: this.$t("buttons.returnManagersAssistant"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewReworkConfirmetion"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.sendResult(ReviewResult.ReviewDraftResolution.ForRework);
              this.completeAssignment();
            }
          }
        },
      };
    },
    btnForwardOptions() {
      return {
        icon: forwardIcon,
        text: this.$t("buttons.readdress"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewForwardConfirmetion"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.sendResult(ReviewResult.ReviewDraftResolution.Forward);
              this.completeAssignment();
            }
          }
        },
      };
    },
    btnAddExecutionOptions() {
      return {
        icon: actionItemExecutionIcon,
        text: this.$t("buttons.createExecution"),
        onClick: async () => {
          const { taskId } = await createActionItemExicutionTask(
            this,
            this.assignmentId
          );
          this.actionItemExecutionTaskId = taskId;
          this.showItemExecutionTask = true;
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
