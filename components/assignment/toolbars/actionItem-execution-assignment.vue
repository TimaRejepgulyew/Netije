<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :visible="InProcess" :options="btnOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import DxToolbar, { DxItem } from "devextreme-vue/toolbar";
export default {
  components: {
    DxToolbar,
    DxItem
  },
  props: ["assignmentId"],
  computed: {
    InProcess() {
      return this.$store.getters[`assignments/${this.assignmentId}/inProcess`];
    },
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: async () => {
          let response = await confirm(
            this.$t("assignment.sureCompleteMessage"),
            this.$t("shared.confirm")
          );
          this.setResult(ReviewResult.ActionItemSupervisor.Complete);
          if (response) this.completeAssignment();
        }
      };
    }
  },
  methods: {
    setResult(result) {
      this.$store.commit(`assignments/${this.assignmentId}/SET_RESULT`, result);;
    },
    completeAssignment() {
      this.$awn.asyncBlock(
        this.$store.dispatch(`assignments/${this.assignmentId}/complete`, ),
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