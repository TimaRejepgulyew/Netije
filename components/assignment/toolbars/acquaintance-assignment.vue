<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :visible="completeButtonsVisible" location="before" template="completeButton" />
      <template #completeButton>
        <complete-btn v-if="completeButtonsVisible" />
      </template>

      <DxItem :visible="reworkButtonVisible" location="before" template="reworkButton" />
      <template #reworkButton>
        <rework-btn v-if="reworkButtonVisible" />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import reworkBtn from "~/components/assignment/rework-btn.vue";
import completeBtn from "~/components/assignment/complete-btn.vue";
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
export default {
  components: {
    reworkBtn,
    completeBtn,
    DxToolbar,
    DxItem
  },
  computed: {
    completeButtonsVisible() {
      return (
        this.getOptions().completeButtonsVisible &&
        !this.$store.getters["currentAssignment/isCompleted"]
      );
    },
    reworkButtonVisible() {
      return (
        this.getOptions().reworkButtonVisible &&
        !this.$store.getters["currentAssignment/isCompleted"]
      );
    }
  },
  methods: {
    getOptions() {
      switch (this.$store.getters["currentAssignment/assignmentType"]) {
        case AssignmentType.AcquaintanceFinishAssignment:
        case AssignmentType.SimpleAssignment:
        case AssignmentType.ActionItemExecutionAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: false
          };
        case AssignmentType.ActionItemSupervisorAssignment:
        case AssignmentType.ReviewAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: true
          };

        case AssignmentType.AcquaintanceAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: false
          };
        default:
          return { completeButtonsVisible: false, reworkButtonVisible: false };
      }
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>