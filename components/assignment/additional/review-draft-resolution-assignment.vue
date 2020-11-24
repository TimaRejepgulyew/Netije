<template>
  <div>
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
import { load } from "~/infrastructure/services/taskService.js";
import AttachmentGroup from "~/infrastructure/constants/attachmentGroup.js";
import resolutionTask from "~/components/workFlow/attachment/resolution-task-list.vue";
import employeeSelectBox from "~/components/employee/custom-select-box.vue";
export default {
  components: {
    employeeSelectBox,
    resolutionTask
  },
  props: ["assignmentId"],
  methods: {
    openTaskCard({ taskId, taskType }) {
      this.$popup.taskCard(this, {
        params: { taskId, taskType },
        handler: load
      });
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
