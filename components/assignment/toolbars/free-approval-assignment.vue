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
    <DxPopup
      :showTitle="false"
      :visible.sync="showItemExecutionTask"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="90%"
      :height="'auto'"
    >
      <div class="scrool-auto">
        <task-card
          @onClose="togglePopup"
          :taskId="actionItemExecutionTaskId"
          v-if="showItemExecutionTask"
          :isCard="true"
        />
      </div>
    </DxPopup>

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
          :visible="inProcess"
          :options="btnForwardOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          locateInMenu="auto"
          disabled=""
          :visible="inProcess"
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
import { CreateChildActionItemExecution } from "~/infrastructure/services/taskService.js";
import taskCard from "~/components/task/index.vue";
import approveIcon from "~/static/icons/assignment-result/success.svg";
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
    btnApproveOptions() {
      return {
        icon: approveIcon,
        text: this.$t("buttons.approve"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureApproveAssignmentConfirmetion"
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
                "assignment.confirmMessage.sureApprovalForwardConfirmetion"
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
  },
  methods: {
    togglePopup() {
      this.showItemExecutionTask = !this.showItemExecutionTask;
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
