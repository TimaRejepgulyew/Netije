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



import ReviewResolution from "~/infrastructure/constants/revievResult/reviewResolution.js";

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
  data() {
    return {
      showItemExecutionTask: false
    };
  },
  computed: {
    toolbarItemVisible() {
      return  this.$store.getters["currentAssignment/inProccess"];
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.sendToAssignee"),
        onClick: () => {
          this.setResult(ReviewResolution.AddAssignment);
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