<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        locateInMenu="auto"
        :disabled="addresseeId"
        :visible="inProcess"
        :options="btnApproveOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        locateInMenu="auto"
        :disabled="addresseeId"
        :visible="inProcess"
        :options="btnReworkOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        locateInMenu="auto"
        :disabled="addresseeId"
        :visible="inProcess"
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
import toolbarAddApproverBtn from "../../../../form-components/add-approver-btn/btn.vue";
import approveIcon from "~/static/icons/assignment-result/success.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import { ReviewResult } from "../infrastructure.js";
import toolbarMixin from "../../../../infrastructure/mixins/toolbar.js";
export default {
  components: {
    toolbarAddApproverBtn,
  },
  mixins: [toolbarMixin],
  computed: {
    addresseeId() {
     
      console.log( this.$store.getters[`assignments/${this.assignmentId}/assignment`]);
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
              this.setResult(ReviewResult.Approved);
              this.completeAssignment();
            }
          }
        },
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
              this.setResult(ReviewResult.ForRework);
              await this.completeAssignment();
              const { taskId } = this.$store.getters[
                `assignments/${this.assignmentId}/assignment`
              ];
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
                "assignment.confirmMessage.sureApprovalForwardConfirmation"
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
