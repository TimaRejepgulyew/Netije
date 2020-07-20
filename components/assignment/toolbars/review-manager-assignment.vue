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
          :taskId="actionItemExecutionTaskId"
          @closeTask="closeTask"
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
          :disabled="btnReaddressDisabled"
          :visible="!isRework"
          :options="btnReaddressOptions"
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
          locateInMenu="auto"
          :visible="toolbarItemVisible"
          :options="btnAddExecutionOptions"
          location="after"
          widget="dxButton"
        />
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import { createTaskRequest } from "~/infrastructure/constants/creatingItems.js";
import { confirm } from "devextreme/ui/dialog";
import taskCard from "~/components/task/index.vue";
import employeeList from "~/components/employee/employee-list.vue";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import exploredIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import { DxPopup } from "devextreme-vue/popup";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import TaskType from "~/infrastructure/constants/TaskType.js";
export default {
  components: {
    DxToolbar,
    DxItem,
    DxPopup,
    employeeList,
    taskCard
  },
  props: ["assignmentId"],
  data() {
    return {
      actionItemExecutionTaskId: null,
      showComment: false,
      showItemExecutionTask: false
    };
  },
  computed: {
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    btnReaddressDisabled() {
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
        onClick: () => {
          this.setResult(ReviewResult.ReviewManager.AddResolution);
          this.completeAssignment();
        }
      };
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.sendToAssignee"),
        onClick: () => {
          this.setResult(ReviewResult.ReviewManager.AddAssignment);
          this.completeAssignment();
        }
      };
    },
    btnAcceptOptions() {
      return {
        icon: exploredIcon,
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          let response = await confirm(
            this.$t("assignment.takeIntoMessage"),
            this.$t("shared.confirm")
          );
          this.setResult(ReviewResult.ReviewManager.Explored);
          if (response) this.completeAssignment();
        }
      };
    },
    btnReaddressOptions() {
      return {
        icon: forwardIcon,
        text: this.$t("buttons.readdress"),
        onClick: () => {
          this.setResult(ReviewResult.ReviewManager.Forward);
          this.completeAssignment();
        }
      };
    },
    btnAddExecutionOptions() {
      return {
        icon: actionItemExecutionIcon,
        text: this.$t("buttons.createExecution"),
        onClick: async () => {
          const { taskId } = await createTaskRequest(
            this,
            {
              taskType: TaskType.ActionItemExecutionTask,
              parentAssignment: this.$store.getters[
                `assignments/${this.assignmentId}/inProcess`
              ].id
            },
            false
          );
          this.actionItemExecutionTaskId = taskId;
          this.showItemExecutionTask = true;
        }
      };
    }
  },
  methods: {
    setResult(result) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_RESULT`, result);
    },
    closeTask(taskId) {
      this.showItemExecutionTask = false;
      if (taskId) {
        // TODO function create task resolution
      }
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch(`assignments/${this.assignmentId}/complete`),
        e => {
          this.$router.go(-1);
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>