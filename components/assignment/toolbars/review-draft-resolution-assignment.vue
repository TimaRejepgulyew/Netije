<template>
  <div>
    <DxPopup
      :title="$t('shared.confirm')"
      :visible.sync="isPopupAccesRight"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      width="auto"
      :height="'auto'"
    >
      <div>
        <attachment-access-right-dialog
          :maxOperation="maxOperation"
          @close="hideAccessRightDialog"
          @selected="sendRecipientAccessRight"
        />
      </div>
    </DxPopup>
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
  </div>
</template>
<script>
import createChildActionItemBtn from "~/components/assignment/components/create-children-action-item-btn.vue";
import returnManagersAssistantIcon from "~/static/icons/status/forrework.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import informedIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  components: {
    createChildActionItemBtn
  },
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
    btnAddResolutionOptions() {
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
