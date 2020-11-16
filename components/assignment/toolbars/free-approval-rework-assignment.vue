<template>
  <div>
    <DxPopup
      :title="$t('shared.confirm')"
      :visible.sync="isPopupAccesRight"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
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

    <div class="toolbar">
      <DxToolbar>
        <DxItem
          locateInMenu="auto"
          :visible="inProcess"
          :options="btnReworkedOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          locateInMenu="auto"
          :visible="inProcess"
          :options="btnAbortOptions"
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
import abortIcon from "~/static/icons/stop.svg";
import reworkedAndStartIcon from "~/static/icons/start.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import { DxPopup } from "devextreme-vue/popup";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  components: {
    DxPopup
  },
  computed: {
    btnReworkedOptions() {
      return {
        icon: reworkedAndStartIcon,
        text: this.$t("buttons.reworked"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureApprovalReworkAssignmentConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(
                ReviewResult.FreeApprovalReworkAssignment.Reworked
              );
              this.completeAssignment();
            }
          }
        }
      };
    },
    btnAbortOptions() {
      return {
        icon: abortIcon,
        text: this.$t("buttons.abort"),
        onClick: async () => {
          const response = await this.confirm(
            this.$t("assignment.confirmMessage.sureAbortConfirmation"),
            this.$t("shared.confirm")
          );
          if (response) {
            // TODO add request abort task
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
