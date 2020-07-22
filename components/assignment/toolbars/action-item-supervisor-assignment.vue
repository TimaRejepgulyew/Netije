<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :visible="inProcess" :options="btnOptions" location="before" widget="dxButton" />
      <DxItem :visible="inProcess" :options="reworkBtnOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
export default {
  components: {
    DxToolbar,
    DxItem
  },
  props: ["assignmentId"],
  computed: {
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.accept"),
        onClick: async () => {
          let response = await confirm(
            this.$t("assignment.sureCompleteSupervisor"),
            this.$t("shared.confirm")
          );
          this.setResult(ReviewResult.ActionItemSupervisor.Accept);
          if (response) this.completeAssignment();
        }
      };
    },
    reworkBtnOptions() {
      return {
        icon: "undo",
        text: this.$t("buttons.rework"),
        onClick: async () => {
          let response = await confirm(
            this.$t("assignment.sureReworkMessage"),
            this.$t("shared.confirm")
          );
          console.log("supervisor", response);
          this.setResult(ReviewResult.ActionItemSupervisor.ForRework);
          if (response) this.completeAssignment();
        }
      };
    }
  },
  methods: {
    setResult(result) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_RESULT`, result);
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch(`assignments/${this.assignmentId}/complete`),
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