<template>
  <div>
    <DxPopup
      :showTitle="false"
      :visible.sync="showItemExecutionTask"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      width="90%"
      :height="'auto'"
    >
      <div class="scrool-auto">
        <task-card
          @onClose="tooglePopup"
          :taskId="taskId"
          v-if="showItemExecutionTask"
          :isCard="true"
        />
      </div>
    </DxPopup>
    <div v-if="false">
      <label class="pr-2">{{ $t("assignment.readdressToEmployee") }}</label>
      <div class="f-grow-1">
        <employee-select-box
          valueExpr="id"
          :read-only="!canUpdate"
          :value="addresseeId"
          @valueChanged="valueChanged"
        />
      </div>
    </div>
    <ul>
      <li v-for="item in projectResolutions.entities" :key="item.attachmentId">
        <resolutionTask :key="item.attachmentId" :task="item" />
      </li>
    </ul>
  </div>
</template>

<script>
import taskCard from "~/components/task/index.vue";
import { DxPopup } from "devextreme-vue/popup";
import { load } from "~/infrastructure/services/taskService.js";
import AttachmentGroup from "~/infrastructure/constants/attachmentGroup.js";
import resolutionTask from "~/components/workFlow/attachment/resolution-task-list.vue";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    employeeSelectBox,
    resolutionTask,
    taskCard,
    DxPopup
  },
  props: ["assignmentId"],
  data() {
    return {
      showItemExecutionTask: false,
      taskId: null
    };
  },
  methods: {
    openTaskCard({ taskId, taskType }) {
      this.$awn.asyncBlock(load(this, { taskId, taskType }), () => {
        this.taskId = taskId;
        this.tooglePopup();
      });
    },
    tooglePopup() {
      this.showItemExecutionTask = !this.showItemExecutionTask;
    },
    valueChanged(id) {
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_ADDRESSEE_ID`,
        id
      );
    }
  },
  computed: {
    addresseeId() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .addresseeId;
    },
    canUpdate() {
      return this.$store.getters[`assignments/${this.assignmentId}/canUpdate`];
    },
    projectResolutions() {
      const attachments = this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].attachmentGroups;
      return attachments.find(attachment => {
        return attachment.groupId === AttachmentGroup.Resolution;
      });
    }
  }
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>
