<template>
  <div>
    <DxPopup
      :showTitle="false"
      :visible.sync="showItemExecutionTask"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="90%"
      :height="'auto'"
    >
      <div>
      
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
          :visible="toolbarItemVisible"
          :options="btnSendToAssigneeOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          locateInMenu="auto"
          :visible="toolbarItemVisible"
          :options="btnAddExecutionOptions"
          location="before"
          widget="dxButton"
        />
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import { CreateChildActionItemExecution } from "~/infrastructure/services/taskService.js";
import { confirm } from "devextreme/ui/dialog";
import taskCard from "~/components/task/index.vue";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import { DxPopup } from "devextreme-vue/popup";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
export default {
  components: {
    DxToolbar,
    DxItem,
    DxPopup,
    taskCard,
  },
  props: ["assignmentId"],
  data() {
    return {
      actionItemExecutionTaskId: null,
      showItemExecutionTask: false,
    };
  },
  computed: {
    toolbarItemVisible() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.complete"),
        onClick: async () => {
          const response = await confirm(
            this.$t("assignment.confirmMessage.sureDocumentReviewSendToAssigneeConfirmetion"),
            this.$t("shared.confirm")
          );
          if (response) {
            this.setResult(ReviewResult.ReviewResolution.AddAssignment);
            this.completeAssignment();
          }
        },
      };
    },
    btnAddExecutionOptions() {
      return {
        icon: actionItemExecutionIcon,
        text: this.$t("buttons.createExecution"),
        onClick: () => {
          this.$awn.asyncBlock(
            CreateChildActionItemExecution(this, this.assignmentId),
            ({ taskId }) => {
              this.actionItemExecutionTaskId = taskId;
              this.togglePopup();
              console.log(this.showItemExecutionTask,"showed");
            }
          );
        },
      };
    },
  },
  methods: {
    setResult(result) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_RESULT`, result);
    },
    togglePopup() {
      this.showItemExecutionTask = !this.showItemExecutionTask;
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch(`assignments/${this.assignmentId}/complete`),
        (e) => {
          this.$router.go(-1);
          this.$awn.success();
        },
        (e) => this.$awn.alert()
      );
    },
  },
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
