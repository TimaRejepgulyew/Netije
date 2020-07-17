<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :visible="InProcess" :options="btnOptions" location="before" widget="dxButton" />
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
  computed: {
    InProcess() {
      return this.$store.getters["currentAssignment/InProcess"];
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: async () => {
          let response = await confirm(
            this.$t("assignment.sureCompleteAcquaintanceMessage"),
            this.$t("shared.confirm")
          );
          this.setResult(ReviewResult.AcquaintanceFinish.Accept);
          if (response) this.completeAssignment();
        }
      };
    }
  },
  methods: {
    setResult(result) {
      this.$store.commit("currentAssignment/SET_RESULT", result);
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch("currentAssignment/complete"),
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