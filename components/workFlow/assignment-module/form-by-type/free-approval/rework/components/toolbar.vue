<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        locateInMenu="auto"
        :visible="inProcess"
        :options="btnReworkedOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        locateInMenu="auto"
        template="createChildTask"
        location="before"
      />

      <template #createChildTask>
        <slot name="createChildTask" />
      </template>
      <DxItem location="after" template="importanceIndicator" />
      <template #importanceIndicator>
        <slot name="importanceIndicator" />
      </template>
      <DxItem location="before" template="markAsUnread" />
      <template #markAsUnread>
        <slot name="markAsUnread" />
      </template>
    </DxToolbar>
  </div>
</template>
<script>
import reworkedAndStartIcon from "~/static/icons/start.svg";
import { ReviewResult } from "../infrastructure.js";
import toolbarMixin from "../../../../infrastructure/mixins/toolbar.js";
export default {
  mixins: [toolbarMixin],
  computed: {
    btnReworkedOptions() {
      return {
        icon: reworkedAndStartIcon,
        text: this.$t("buttons.reworked"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureApprovalReworkAssignmentConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.Reworked);
              this.completeAssignment();
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
