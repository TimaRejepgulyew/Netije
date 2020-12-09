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
          :visible="tollbarItemVisible"
          :options="btnForReworOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          locateInMenu="auto"
          :disabled="btnForwardDisabled"
          :visible2="!isRework"
          :visible="false"
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
          :visible="inProcess"
          locateInMenu="auto"
          template="createChildTask"
          location="before"
        />

        <template #createChildTask>
          <createChildTaskBtn :parentAssignmentId="assignmentId" />
        </template>
        <DxItem location="after" template="importanceIndicator" />
        <template #importanceIndicator>
          <slot name="importanceIndicator" />
        </template>
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
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  data() {
    return {
      actionItemExecutionTaskId: null,
      showItemExecutionTask: false
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
                "assignment.confirmMessage.sureDocumentReviewApproveRosolutionConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ReviewDraftResolution.ForExecution);
              this.completeAssignment();
            }
          }
        }
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
                "assignment.confirmMessage.sureDocumentReviewAcceptConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ReviewDraftResolution.Informed);
              this.completeAssignment();
            }
          }
        }
      };
    },
    btnForReworOptions() {
      return {
        icon: returnManagersAssistantIcon,
        text: this.$t("buttons.returnManagersAssistant"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewReworkConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ReviewDraftResolution.ForRework);
              this.completeAssignment();
            }
          }
        }
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
                "assignment.confirmMessage.sureDocumentReviewForwardConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ReviewDraftResolution.Forward);
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
