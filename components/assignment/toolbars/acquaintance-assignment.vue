<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :visible="inProcess" :options="btnOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
import assignmentResult from "~/infrastructure/constants/assignmentResult.js";
import { confirm } from "devextreme/ui/dialog";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";

export default {
  components: {
    DxToolbar,
    DxItem,
  },
  props: ["assignmentId"],
  inject: ["isValidForm"],
  computed: {
    inProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.acquaintance"),
        onClick: async () => {
          if (this.isValidForm()) {
            let response = await confirm(
              this.$t("assignment.sureAcquaintanceMessage"),
              this.$t("shared.confirm")
            );
            this.setResult(assignmentResult.Acquaintance.Acquainted);
            if (response) this.completeAssignment();
          }
        },
      };
    },
  },
  methods: {
    setResult(result) {
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
