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
import { createTaskRequest } from "~/infrastructure/constants/creatingItems.js";
import { confirm } from "devextreme/ui/dialog";
import taskCard from "~/components/task/index.vue";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import actionItemExecutionIcon from "~/static/icons/actionItemExecution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import { DxPopup } from "devextreme-vue/popup";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
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
      showItemExecutionTask: false
    };
  },
  computed: {
    toolbarItemVisible() {
      return this.$store.getters["currentAssignment/inProcess"](
        this.assignmentId
      );
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.complete"),
        onClick: () => {
          this.setResult(ReviewResult.ReviewResolution.AddAssignment);
          this.completeAssignment();

          // this.toogleCommentPopup();
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
                "currentAssignment/assignment"
              ](this.assignmentId).id
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
      this.$store.commit("currentAssignment/SET_RESULT", {
        key: this.assignmentId,
        payload: result
      });
    },
    closeTask(taskId) {
      this.showItemExecutionTask = false;
      if (taskId) {
        // TODO function create task resolution
      }
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch("currentAssignment/complete", {
          key: this.assignmentId
        }),
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