<template>
  <div class="toolbar">
    <DxPopup
      :title="$t('shared.confirm')"
      :visible.sync="isPopupAccesRight"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      width="auto"
      :height="'auto'"
    >
      <div>
        <attachment-access-right-dialog
          :maxOperation="maxOperation"
          @close="hideAccessRightDialog"
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
export default {
  mixins: [toolbarMixin],
  computed: {
    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t("assignment.confirmMessage.sureFinishAcquaintance"),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.AcquaintanceFinish.Accept);
              this.completeAssignment();
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
