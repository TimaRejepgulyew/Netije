<template>
  <div class="toolbar">
    <DxPopup
      :title="$t('shared.confirm')"
      :visible.sync="isPopupAccesRight"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="auto"
      :height="'auto'"
    >
      <div>
        <attachment-access-right-dialog
          @close="tooglePopupAccessRight"
          @selected="sendRecipientAccessRight"
        />
      </div>
    </DxPopup>
    <DxToolbar>
      <DxItem
        :visible="inProcess"
        :options="btnOptions"
        location="before"
        widget="dxButton"
      />
    </DxToolbar>
  </div>
</template>
<script>
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
import dataApi from "~/static/dataApi";
export default {
  mixins: [toolbarMixin],
  methods: {
    async hasChildActionItemItems() {
      const { data: hasChildActionItemItems } = await this.$axios.get(
        dataApi.assignment.HasChildActionItemItems + this.assignmentId
      );
      return hasChildActionItemItems;
    },
    async needAbortChildActionItems() {
      const needAbortChildActionItems = await this.confirm(
        this.$t("assignment.confirmMessage.hasChildActionItem"),
        this.$t("assignment.confirmMessage.headerHasChildActionItem")
      );
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_NEED_ABORT_CHILD_ACTION_ITEMS`,
        needAbortChildActionItems
      );
      return needAbortChildActionItems
    },
    async sureActionItemDoneConfirmetion() {
      const response = await this.confirm(
        this.$t("assignment.confirmMessage.sureActionItemDoneConfirmetion"),
        this.$t("shared.confirm")
      );
      return response;
    }
  },
  computed: {
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: async () => {
          if (this.isValidForm()) {
          const  hasChildActionItemItems =  await this.hasChildActionItemItems()
            if (hasChildActionItemItems) {
              const needAbortChildActionItems = await this.needAbortChildActionItems()
              if (needAbortChildActionItems) {
                this.setResult(ReviewResult.ActionItemExecution.Complete);
                this.completeAssignment();
              }
            } else {
              const sureActionItemDoneConfirm = await this.sureActionItemDoneConfirmetion()
              if (sureActionItemDoneConfirm) {
                console.log("past");
                this.setResult(ReviewResult.ActionItemExecution.Complete);
                this.completeAssignment();
              };
            }
          }
        }
      };
    }
  }
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
