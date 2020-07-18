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

    <DxPopup
      :showTitle="false"
      :visible.sync="showComment"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      :height="'auto'"
    >
      <div>
        <comment-form @sendRequest="sendResult" @toogleCommentPopup="toogleCommentPopup" />
      </div>
    </DxPopup>
    <div class="toolbar">
      <DxToolbar>
        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnSendToReviewOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
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
          :visible="tollbarItemVisible"
          :options="btnAcceptOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
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
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import exploredIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import { DxPopup } from "devextreme-vue/popup";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import TaskType from "~/infrastructure/constants/TaskType.js";
export default {
  components: {
    DxToolbar,
    DxItem,
    DxPopup,
    taskCard
  },
  props: ["assignmentId"],
  data() {
    return {
      actionItemExecutionTaskId: null,
      showComment: false,
      showItemExecutionTask: false,
      result: null
    };
  },
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    btnReaddressDisabled() {
      return !this.assignment.addresseeId;
    },
    tollbarItemVisible() {
      return this.assignment.addresseeId ? false : this.inProcess;
    },
    isRework() {
      if (this.inProcess) return this.assignment.isRework;
      else return true;
    },
    btnSendToReviewOptions() {
      return {
        icon: resolutionIcon,
        text: this.$t("buttons.sendToReview"),
        onClick: () => {
          this.sendResult(ReviewResult.PrepareDraftResolution.SendForReview);
          this.completeAssignment();
        }
      };
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.sendToAssignee"),
        onClick: () => {
          this.sendResult(ReviewResult.PrepareDraftResolution.AddAssignment);
          this.completeAssignment();
        }
      };
    },
    btnAcceptOptions() {
      return {
        icon: exploredIcon,
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          this.sendResult(ReviewResult.PrepareDraftResolution.Explored);
          let response = await confirm(
            this.$t("assignment.takeIntoMessage"),
            this.$t("shared.confirm")
          );
          if (response) this.completeAssignment();
        }
      };
    },
    btnReaddressOptions() {
      return {
        icon: forwardIcon,
        text: this.$t("buttons.readdress"),
        onClick: () => {
          this.sendResult(ReviewResult.PrepareDraftResolution.Forward);
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
              parentAssignment: this.assignmentId
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
    closeTask(taskId) {
      this.showItemExecutionTask = false;
      if (taskId) {
        // TODO function create task resolution
      }
    },
    sendResult(result) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_RESULT`,
        payload
      );
    },
    toogleCommentPopup() {
      this.showComment = !this.showComment;
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