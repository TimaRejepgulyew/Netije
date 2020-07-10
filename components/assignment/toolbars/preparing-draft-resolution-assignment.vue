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
        <task-card @closeTask="closeTask" v-if="showItemExecutionTask" :isCard="true" />
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
          :disabled="!$store.getters['currentAssignment/assignment']
        .addresseeId"
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
import { confirm } from "devextreme/ui/dialog";
import taskCard from "~/components/task/index.vue";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import exploredIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import PrepareDraftResolutionResult from "~/infrastructure/constants/revievResult/prepareDraftResolutionResult.js";
import commentForm from "~/components/assignment/comment-form.vue";
import { DxPopup } from "devextreme-vue/popup";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import TaskType from "~/infrastructure/constants/TaskType.js";
export default {
  components: {
    DxToolbar,
    DxItem,
    DxPopup,
    commentForm,
    taskCard
  },
  data() {
    return {
      showComment: false,
      showItemExecutionTask: false,
      result: null
    };
  },
  computed: {
    tollbarItemVisible() {
      const addresseeId = this.$store.getters["currentAssignment/assignment"]
        .addresseeId;

      return addresseeId
        ? false
        : this.$store.getters["currentAssignment/inProccess"];
    },
    isRework() {
      if (this.$store.getters["currentAssignment/inProccess"])
        return this.$store.getters["currentAssignment/assignment"].isRework;
      else return true;
    },
    btnSendToReviewOptions() {
      return {
        icon: resolutionIcon,
        text: this.$t("buttons.sendToReview"),
        onClick: () => {
          this.sendResult(PrepareDraftResolutionResult.SendForReview);
          this.completeAssignment();
        }
      };
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.sendToAssignee"),
        onClick: () => {
          this.sendResult(PrepareDraftResolutionResult.AddAssignment);
          this.completeAssignment();
        }
      };
    },
    btnAcceptOptions() {
      return {
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          this.sendResult(PrepareDraftResolutionResult.Explored);
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
          this.sendResult(PrepareDraftResolutionResult.Forward);
          this.completeAssignment();
        }
      };
    },
    btnAddExecutionOptions() {
      return {
        icon: actionItemExecutionIcon,
        text: this.$t("buttons.createExecution"),
        onClick: async () => {
          await this.$store.dispatch("currentTask/initTask", {
            taskType: TaskType.ActionItemExecutionTask,
            parentAssignment: this.$store.getters[
              "currentAssignment/assignment"
            ].id
          });
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
      this.$store.commit("currentAssignment/SET_RESULT", result);
    },
    toogleCommentPopup() {
      this.showComment = !this.showComment;
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch("currentAssignment/complete"),
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