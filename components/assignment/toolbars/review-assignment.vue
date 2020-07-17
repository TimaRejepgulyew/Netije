<template>
  <div class="toolbar">
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
        <comment-form @sendRequest="sendResult" @tooglePopup="tooglePopup" />
      </div>
    </DxPopup>
    <DxToolbar>
      <DxItem :visible="InProcess" :options="btnOptions" location="before" widget="dxButton" />
      <DxItem :visible="InProcess" :options="reworkBtnOptions" location="before" widget="dxButton" />
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
    InProcess() {
      return this.$store.getters["currentAssignment/inProcess"](
        this.assignmentId
      );
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.accept"),
        onClick: async () => {
          let response = await confirm(
            this.$t("assignment.acceptAssignmentMessage"),
            this.$t("shared.confirm")
          );
          this.setResult(ReviewResult.ReviewAssignment.Accept);
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
          this.setResult(ReviewResult.ReviewAssignment.ForRework);
          if (response) this.completeAssignment();
        }
      };
    }
  },
  methods: {
    setResult(result) {
      this.$store.commit("currentAssignment/SET_RESULT", {
        key: this.assignmentId,
        payload: result
      });
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch("currentAssignment/complete", {
          key: this.assignmentId
        }),
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