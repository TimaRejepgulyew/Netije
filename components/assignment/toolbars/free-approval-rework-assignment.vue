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
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import toolbarAddApproverBtn from "~/components/assignment/form-components/add-approver-btn/btn.vue";
import { CreateChildActionItemExecution } from "~/infrastructure/services/taskService.js";
import taskCard from "~/components/task/index.vue";
import reworkedAndStartIcon from "~/static/icons/start.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import { DxPopup } from "devextreme-vue/popup";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  components: {
    DxPopup,
    taskCard,
    toolbarAddApproverBtn
  },
  data() {
    return {
      actionItemExecutionTaskId: null,
      showItemExecutionTask: false
    };
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
                "assignment.confirmMessage.sureApprovalReworkAssignmentConfirmetion"
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
        icon: "undo",
        text: this.$t("buttons.rework"),
        onClick: async () => {
          const response = await this.confirm(
            this.$t("assignment.confirmMessage.sureRework"),
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
