<template>
  <div>
    <div class="toolbar">
      <DxToolbar>
        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnSendToReviewOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnSendToAssigneeOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :disabled="btnForwardDisabled"
          :visible="!isRework"
          :options="btnForwardOptions"
          location="before"
          widget="dxButton"
        />

        <DxItem
          locateInMenu="auto"
          :visible="tollbarItemVisible"
          :options="btnAcceptOptions"
          location="before"
          widget="dxButton"
        />
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import { confirm } from "devextreme/ui/dialog";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import forwardIcon from "~/static/icons/status/forward.svg";
import exploredIcon from "~/static/icons/status/explored.svg";
import resolutionIcon from "~/static/icons/addResolution.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

export default {
  components: {
    DxToolbar,
    DxItem,
  },
  props: ["assignmentId"],
  data() {
    return {
      result: null,
    };
  },
  computed: {
    assignment() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`];
    },
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    btnForwardDisabled() {
      return !this.assignment.addresseeId;
    },
    tollbarItemVisible() {
      return this.assignment.addresseeId ? false : this.inProcess;
    },
    isRework() {
      if (this.inProcess) return this.assignment.isRework;
      else return true;
    },
    btnSendToReviewOptions() {
      return {
        icon: resolutionIcon,
        text: this.$t("buttons.sendToReview"),
        onClick: async () => {
          const response = await confirm(
            this.$t("assignment.confirmMessage.sureDocumentReviewSendToResolutionConfirmetion"),
            this.$t("shared.confirm")
          );
          if (response) {
            this.sendResult(ReviewResult.PrepareDraftResolution.SendForReview);
            this.completeAssignment();
          }
        },
      };
    },
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.sendToAssignee"),
        onClick: async () => {
          const response = await confirm(
            this.$t("assignment.confirmMessage.sureDocumentReviewSendToAssigneeConfirmetion"),
            this.$t("shared.confirm")
          );
          if (response) {
            this.sendResult(ReviewResult.PrepareDraftResolution.AddAssignment);
            this.completeAssignment();
          }
        },
      };
    },
    btnAcceptOptions() {
      return {
        icon: exploredIcon,
        text: this.$t("buttons.takeInto"),
        onClick: async () => {
          const response = await confirm(
            this.$t("assignment.confirmMessage.sureDocumentReviewExploredConfirmetion"),
            this.$t("shared.confirm")
          );
          if (response) {
            this.completeAssignment();
            this.sendResult(ReviewResult.PrepareDraftResolution.Explored);
          }
        },
      };
    },
    btnForwardOptions() {
      return {
        icon: forwardIcon,
        text: this.$t("buttons.readdress"),
        onClick: async () => {
          const response = await confirm(
            this.$t("assignment.confirmMessage.sureDocumentReviewForwardConfirmetion"),
            this.$t("shared.confirm")
          );
          if (response) {
            this.sendResult(ReviewResult.PrepareDraftResolution.Forward);
            this.completeAssignment();
          }
        },
      };
    },
  },
  methods: {
    sendResult(result) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_RESULT`, result);
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch(`assignments/${this.assignmentId}/complete`),
        (e) => {
          this.$router.go(-1);
          this.$awn.success();
        },
        (e) => this.$awn.alert()
      );
    },
  },
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
