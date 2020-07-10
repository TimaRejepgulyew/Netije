<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :visible="inProccess" :options="btnOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/revievResult/baseResult.js";
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

export default {
  components: {
    DxToolbar,
    DxItem
  },
  computed: {
    inProccess() {
      return this.$store.getters["currentAssignment/inProccess"];
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.acquaintance"),
        onClick: async () => {
          let response = await confirm(
            this.$t("assignment.sureAcquaintanceMessage"),
            this.$t("shared.confirm")
          );
          this.setResult(ReviewResult.Accept);
          if (response) this.completeAssignment();
        }
      };
    }
  },
  methods: {
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