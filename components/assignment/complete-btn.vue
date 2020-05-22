<template>
  <div>
    <DxPopup
      :showTitle="false"
      :visible.sync="showComment"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      :width="500"
      :height="'auto'"
    >
      <comment-form :request="completeAssignment" />
    </DxPopup>
    <DxButton :text="this.completeButtonText" icon="check" type="success" :on-click="complete" />
  </div>
</template>

<script>
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    DxButton,
    DxPopup
  },
  data() {
    return {
      showComment: false
    };
  },
  methods: {
    completeAssignment() {
      if (this.checkisValid()) {
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
    },
    checkisValid() {
      if (
        this.$store.getters["currentAssignment/isActionItemExicutionAssignment"]
      ) {
        var res = this.$refs["textArea"].instance.validate();
        return res.isValid;
      } else {
        return true;
      }
    }
  },
  computed: {
    getOptions() {
      switch (this.$store.getters["currentAssignment/assignmentType"]) {
        case AssignmentType.AcquaintanceFinishAssignment:
        case AssignmentType.SimpleAssignment:
        case AssignmentType.ActionItemExecutionAssignment:
          return {
            completeButtonText: this.$t("buttons.completed")
          };
        case AssignmentType.ActionItemSupervisorAssignment:
        case AssignmentType.ReviewAssignment:
          return {
            completeButtonText: this.$t("buttons.accept")
          };

        case AssignmentType.AcquaintanceAssignment:
          return {
            completeButtonText: this.$t("buttons.acquaintance")
          };
      }
    }
  }
};
</script>

<style>
</style>