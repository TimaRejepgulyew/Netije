<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :options="backButtonOptions" location="before" widget="dxButton" />
      <DxItem
        :options="completeButtonOptions"
        :visible="completeButtonsVisible"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :options="reworkButtonOptions"
        :visible="reworkButtonVisible"
        location="before"
        widget="dxButton"
      />
    </DxToolbar>
  </div>
</template>
<script>
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
import { DxButton } from "devextreme-vue";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import ReviewResult from "~/infrastructure/constants/reviewResult.js";
export default {
  components: {
    DxButton,
    DxToolbar,
    DxItem
  },
  data() {
    return {
      backButtonOptions: {
        type: "normal",
        icon: "back",
        text: this.$t("buttons.back"),
        onClick: () => {
          this.$router.go(-1);
        }
      }
    };
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
    },
    reworkButtonOptions() {
      return {
        type: "danger",
        text: this.$t("buttons.rework"),
        icon: "undo",
        onClick: async () => {
          this.$awn.asyncBlock(
            this.$store.dispatch(
              "currentAssignment/complete",
              ReviewResult.ForRework
            ),
            e => {
              this.$router.go(-1);
              this.$awn.success();
            },
            e => this.$awn.alert()
          );
        }
      };
    },

    completeButtonOptions() {
      return {
        text: this.getOptions().completeButtonText,
        icon: "check",
        type: "success",
        onClick: async () => {
          this.$awn.asyncBlock(
            this.$store.dispatch(
              "currentAssignment/complete",
              ReviewResult.Accept
            ),
            e => {
              this.$router.go(-1);
              this.$awn.success();
            },
            e => this.$awn.alert()
          );
        }
      };
    }
  },
  methods: {
    getOptions() {
      switch (this.$store.getters["currentAssignment/assignmentType"]) {
        case AssignmentType.AcquaintanceFinishAssignment:
        case AssignmentType.SimpleAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: false,
            completeButtonText: this.$t("buttons.completed")
          };
        case AssignmentType.ReviewAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: true,
            completeButtonText: this.$t("buttons.accept")
          };

        case AssignmentType.AcquintanceAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: false,
            completeButtonText: this.$t("buttons.acquintance")
          };
        // case AssignmentType.ActionItemExecutionAssignment:
        //   return {
        //     completeButtonsVisible: true,
        //     reworkButtonVisible: false,
        //     completeButtonText: this.$t("links.complete")
        //   };
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
