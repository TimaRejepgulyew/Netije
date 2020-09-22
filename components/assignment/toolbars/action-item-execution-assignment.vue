<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem :visible="inProcess" :options="btnOptions" location="before" widget="dxButton" />
    </DxToolbar>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
import dataApi from "~/static/dataApi";
export default {
  mixins: [toolbarMixin],
  computed: {
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: async () => {
          if (this.isValidForm()) {
            const { data: hasChildActionItemItems } = await this.$axios.get(
              dataApi.assignment.HasChildActionItemItems + this.assignmentId
            );
            console.log(hasChildActionItemItems);
            if (hasChildActionItemItems) {
              let needAbortChildActionItems = await this.confirm(
                this.$t("assignment.confirmMessage.hasChildActionItem"),
                this.$t("shared.confirm")
              );
              console.log("complete", needAbortChildActionItems);
              this.setResult(ReviewResult.ActionItemExecution.Complete);
              this.completeAssignment({
                needAbortChildActionItems,
              });
            } else {
              const response = await this.confirm(
                this.$t(
                  "assignment.confirmMessage.sureActionItemDoneConfirmetion"
                ),
                this.$t("shared.confirm")
              );
              if (response) {
                this.setResult(ReviewResult.ActionItemExecution.Complete);
                this.completeAssignment();
              }
            }
          }
        },
      };
    },
  },
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
