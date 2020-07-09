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
        <comment-form @sendRequest="completeAssignment" @toogleCommentPopup="toogleCommentPopup" />
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
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import exploredIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import ReviewManagerAssignment from "~/infrastructure/constants/revievResult/reviewManagerResult.js";
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
      showItemExecutionTask: false
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
        text: this.$t("buttons.sendToResolution"),
        onClick: () => {
          this.setResult(ReviewManagerAssignment.AddResolution);
          this.toogleCommentPopup();
        }
      };
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.sendToAssignee"),
        onClick: () => {
          this.setResult(ReviewManagerAssignment.AddAssignment);
          this.completeAssignment();
          // this.toogleCommentPopup();
        }
      };
    },
    btnAcceptOptions() {
      return {
        icon: exploredIcon,
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          this.setResult(ReviewManagerAssignment.Explored);
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
          this.setResult(ReviewManagerAssignment.Forward);
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
    setResult(result) {
      this.$store.commit("currentAssignment/SET_RESULT", result);
    },
    closeTask(taskId) {
      this.showItemExecutionTask = false;
      if (taskId) {
        // TODO function create task resolution
      }
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