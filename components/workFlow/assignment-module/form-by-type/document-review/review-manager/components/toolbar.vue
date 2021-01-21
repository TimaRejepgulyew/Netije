<template>
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
        :visible="!isRework"
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
import createChildActionItemBtn from "../../../../form-components/toolbar-components/create-children-action-item-btn.vue";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import exploredIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import { ReviewResult } from "../infrastructure.js";
import toolbarMixin from "../../../../infrastructure/mixins/toolbar.js";
export default {
  mixins: [toolbarMixin],
  components: {
    createChildActionItemBtn,
  },
  computed: {
    btnForwardDisabled() {
      return !this.assignment.addressee;
    },
    toolbarItemVisible() {
      return this.assignment.addressee ? false : this.inProcess;
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
              this.setResult(ReviewResult.AddResolution);
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
