<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        locateInMenu="auto"
        :visible="tollbarItemVisible"
        :options="btnSendToReviewOptions"
        location="before"
        widget="dxButton"
      />

      <DxItem
        locateInMenu="auto"
        :visible="tollbarItemVisible"
        :options="btnSendToAssigneeOptions"
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
        :options="btnAcceptOptions"
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
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import exploredIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import { ReviewResult } from "../infrastructure.js";
import toolbarMixin from "../../../../infrastructure/mixins/toolbar.js";
export default {
  mixins: [toolbarMixin],
  computed: {
    btnForwardDisabled() {
      return !this.assignment.addressee;
    },
    tollbarItemVisible() {
      return this.assignment?.addressee ? false : this.inProcess;
    },
    isRework() {
      if (this.inProcess) return this.assignment.isRework;
      else return true;
    },
    btnSendToReviewOptions() {
      return {
        icon: resolutionIcon,
        text: this.$t("buttons.sendToReview"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewSendToResolutionConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.SendForReview);
              this.completeAssignment();
            }
          }
        },
      };
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.sendToAssignee"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewSendToAssigneeConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.AddAssignment);
              this.completeAssignment();
            }
          }
        },
      };
    },
    btnAcceptOptions() {
      return {
        icon: exploredIcon,
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewExploredConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.Explored);
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
                "assignment.confirmMessage.sureDocumentReviewForwardConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.Forward);
              this.completeAssignment();
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
