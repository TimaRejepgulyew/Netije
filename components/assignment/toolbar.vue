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
import { confirm } from "devextreme/ui/dialog";
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
    checkisValid() {
      if (
        this.$store.getters["currentAssignment/isActionItemExicutionAssignment"]
      ) {
        var res = this.$parent.$refs["textArea"].instance.validate();
        if (!res.isValid) return;
      }
    },
    completeButtonOptions() {
      return {
        text: this.getOptions().completeButtonText,
        icon: "check",
        type: "success",
        onClick: () => {
          this.checkisValid;
          let result = confirm(
            this.$t("shared.areYouSure"),
            this.$t("shared.confirm")
          );
          result.then(dialogResult => {
            if (dialogResult)
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
          });
        }
      };
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
            reworkButtonVisible: false,
            completeButtonText: this.$t("buttons.completed")
          };
        case AssignmentType.ActionItemSupervisorAssignment:
        case AssignmentType.ReviewAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: true,
            completeButtonText: this.$t("buttons.accept")
          };

        case AssignmentType.AcquaintanceAssignment:
          return {
            completeButtonsVisible: true,
            reworkButtonVisible: false,
            completeButtonText: this.$t("buttons.acquaintance")
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
