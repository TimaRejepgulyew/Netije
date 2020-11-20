<template>
  <div class="toolbar">
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
          @close="tooglePopupAccessRight"
          @selected="sendRecipientAccessRight"
        />
      </div>
    </DxPopup>
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
    </DxToolbar>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  computed: {
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.accept"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureActionItemAcceptConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ActionItemSupervisor.Accept);
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
              this.$t(
                "assignment.confirmMessage.sureActionItemForReworkConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ActionItemSupervisor.ForRework);
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
