<template>
  <div>
    <div class="toolbar">
      <DxToolbar>
        <DxItem
          locateInMenu="auto"
          :visible="inProcess"
          :options="btnApproveOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          locateInMenu="auto"
          :visible="inProcess"
          :options="btnReworkOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          locateInMenu="auto"
          :disabled="!addresseeId"
          :visible="inProcess && false"
          :options="btnForwardOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          locateInMenu="auto"
          :visible="inProcess && false"
          template="toolbarAddApproverBtn"
          location="before"
          widget="dxButton"
        />
        <template #toolbarAddApproverBtn>
          <toolbarAddApproverBtn :assignmentId="assignmentId" />
        </template>
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import toolbarAddApproverBtn from "~/components/assignment/form-components/add-approver-btn/btn.vue";

import approveIcon from "~/static/icons/assignment-result/success.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import { DxPopup } from "devextreme-vue/popup";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  components: {
    DxPopup,
    toolbarAddApproverBtn
  },
  computed: {
    addresseeId() {
      return this.assignment.addresseeId;
    },
    btnApproveOptions() {
      return {
        icon: approveIcon,
        text: this.$t("buttons.approve"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureFreeApprovalAssignmentConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.FreeApprovalAssignment.Approved);
              this.completeAssignment();
            }
          }
        }
      };
    },
    btnReworkOptions() {
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
              this.setResult(ReviewResult.FreeApprovalAssignment.ForRework);
              await this.completeAssignment();
              const { taskId } = this.$store.getters[
                `assignments/${this.assignmentId}/assignment`
              ];
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
                "assignment.confirmMessage.sureApprovalForwardConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(FreeApprovalAssignment.Forward);
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
