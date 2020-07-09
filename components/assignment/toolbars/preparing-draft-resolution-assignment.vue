<template>
  <div>
    <DxPopup
      :showTitle="false"
      :visible.sync="showEmployeeList"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      position="top"
      width="90%"
      :height="'auto'"
    >
      <div>
        <employee-list @selected="readdress" :isCard="true" />
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
          :options="btnSendToResolutionOptions"
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
import employeeList from "~/components/employee/employee-list.vue";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import resolutionIcon from "~/static/icons/resolution.svg";
import PrepareDraftResolutionResult from "~/infrastructure/constants/PrepareDraftResolutionResult.js";
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
    employeeList,
    taskCard
  },
  data() {
    return {
      showComment: false,
      showEmployeeList: false,
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
    btnSendToResolutionOptions() {
      return {
        icon: resolutionIcon,
        text: this.$t("buttons.sendToReview"),
        onClick: () => {
          this.result = PrepareDraftResolutionResult.SendForReview;
          this.toogleCommentPopup();
        }
      };
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.sendToAssignee"),
        onClick: () => {
          this.result = PrepareDraftResolutionResult.AddAssignment;
          this.toogleCommentPopup();
        }
      };
    },
    btnAcceptOptions() {
      return {
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          this.result = PrepareDraftResolutionResult.Explored;
          let response = await confirm(
            this.$t("assignment.takeIntoMessage"),
            this.$t("shared.confirm")
          );
          if (response) this.sendResult();
        }
      };
    },
    btnReaddressOptions() {
      return {
        text: this.$t("buttons.readdress"),
        onClick: () => {
          this.showEmployeeList = true;
          this.result = PrepareDraftResolutionResult.Forward;
          this.readdress();
        }
      };
    },
    btnAddExecutionOptions() {
      return {
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
    readdress() {
      this.showEmployeeList = false;
      this.$awn.asyncBlock(
        this.$store.dispatch("currentAssignment/readdress", {
          result: this.result
        }),
        e => {
          this.$router.go(-1);
          this.$awn.success();
        },
        e => this.$awn.alert()
      );
    },
    toogleCommentPopup() {
      this.showComment = !this.showComment;
    },
    sendResult() {
      this.$awn.asyncBlock(
        this.$store.dispatch("currentAssignment/complete", this.result),
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