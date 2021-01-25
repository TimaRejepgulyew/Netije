<template>
  <div>
    <div v-if="showReaddressee">
      <label class="pr-2">{{ $t("assignment.readdressToEmployee") }}</label>
      <div class="f-grow-1">
        <employee-select-box
          :read-only="!inProcess"
          :value="addressee"
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
import { load } from "../../../../../infrastructure/services/taskService.js";
import AttachmentGroup from "../../../../../infrastructure/constants/attachmentGroup.js";
import resolutionTask from "../../../../../attachment/resolution-task-list.vue";
import ReaddresseMixin from "../../../../infrastructure/mixins/assignmentReaddressee.js";
export default {
  mixins: [ReaddresseMixin],
  components: {
    resolutionTask,
  },
  props: ["assignmentId"],
  methods: {
    openTaskCard({ taskId, taskType }) {
      this.$popup.taskCard(this, {
        params: { taskId, taskType },
        handler: load,
      });
    },
  },
  computed: {
    projectResolutions() {
      const attachments = this.$store.getters[
        `assignments/${this.assignmentId}/assignment`
      ].attachmentGroups;
      return attachments.find((attachment) => {
        return attachment.groupId === AttachmentGroup.Resolution;
      });
    },
  },
};
</script>

<style>
.pr-2 {
  padding-right: 20px;
}
</style>