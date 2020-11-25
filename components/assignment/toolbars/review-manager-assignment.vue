<template>
  <div>
    <div class="toolbar">
      <DxToolbar>
        <DxItem
          locateInMenu="auto"
          :visible="toolbarItemVisible"
          :options="btnSendToResolutionOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="toolbarItemVisible"
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
          :visible="toolbarItemVisible"
          :options="btnAcceptOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          :visible="inProcess"
          locateInMenu="auto"
          template="createChildActionItemBtn"
          location="before"
        />
        <template #createChildActionItemBtn>
          <createChildActionItemBtn :parentAssignmentId="assignmentId" />
        </template>
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
import createChildActionItemBtn from "~/components/assignment/components/create-children-action-item-btn.vue";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import exploredIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  components: {
    createChildActionItemBtn
  },
  computed: {
    btnForwardDisabled() {
      return !this.assignment.addresseeId;
    },
    toolbarItemVisible() {
      return this.assignment.addresseeId ? false : this.inProcess;
    },
    isRework() {
      if (this.inProcess) return this.assignment.isRework;
      else return true;
    },
    btnSendToResolutionOptions() {
      return {
        icon: resolutionIcon,
        text: this.$t("buttons.addResolution"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewAddresolutionConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ReviewManager.AddResolution);
              this.completeAssignment();
            }
          }
        }
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
              this.setResult(ReviewResult.ReviewManager.AddAssignment);
              this.completeAssignment();
            }
          }
        }
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
              this.setResult(ReviewResult.ReviewManager.Explored);
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
              this.setResult(ReviewResult.ReviewManager.Forward);
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
