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
      <div>
        <comment-form @sendRequest="completeAssignment" @tooglePopup="tooglePopup" />
      </div>
    </DxPopup>
    <DxButton :text="this.completeButtonText" icon="check" type="success" :on-click="tooglePopup" />
  </div>
</template>

<script>
import ReviewResult from "~/infrastructure/constants/reviewResult.js";
import commentForm from "~/components/assignment/comment-form.vue";
import AssignmentType from "~/infrastructure/constants/assignmentType.js";
import { DxPopup } from "devextreme-vue/popup";
import { DxButton } from "devextreme-vue";
export default {
  components: {
    ReviewResult,
    commentForm,
    DxButton,
    DxPopup
  },
  data() {
    return {
      showComment: false
    };
  },
  methods: {
    tooglePopup() {
      this.showComment = !this.showComment;
    },
    completeAssignment(isValid) {
      if (this.checkisValid(isValid)) {
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
    checkisValid(isValid) {
      if (
        this.$store.getters["currentAssignment/isActionItemExicutionAssignment"]
      ) {
        return isValid;
      } else {
        return true;
      }
    }
  },
  computed: {
    completeButtonText() {
      switch (this.$store.getters["currentAssignment/assignmentType"]) {
        case AssignmentType.AcquaintanceFinishAssignment:
        case AssignmentType.SimpleAssignment:
        case AssignmentType.ActionItemExecutionAssignment:
          return this.$t("buttons.completed");
        case AssignmentType.ActionItemSupervisorAssignment:
        case AssignmentType.ReviewAssignment:
          return this.$t("buttons.accept");

        case AssignmentType.AcquaintanceAssignment:
          return this.$t("buttons.acquaintance");
      }
    }
  }
};
</script>

<style>
</style>