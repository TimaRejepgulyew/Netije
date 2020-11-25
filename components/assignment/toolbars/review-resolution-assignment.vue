<template>
  <div>
    <div class="toolbar">
      <DxToolbar>
        <DxItem
          locateInMenu="auto"
          :visible="inProcess"
          :options="btnSendToAssigneeOptions"
          location="before"
          widget="dxButton"
        />
        <DxItem
          :visible="inProcess"
          locateInMenu="auto"
          template="createChildActionItemBtn"
          location="before"
        />
        <template #createChildActionItemBtn>
          <createChildActionItemBtn :parentAssignmentId="assignmentId" />
        </template>
        <DxItem
          :visible="inProcess"
          locateInMenu="auto"
          template="createChildTask"
          location="before"
        />

        <template #createChildTask>
          <createChildTaskBtn :parentAssignmentId="assignmentId" />
        </template>
        <DxItem location="after" template="importanceIndicator" />
        <template #importanceIndicator>
          <slot name="importanceIndicator" />
        </template>
      </DxToolbar>
    </div>
  </div>
</template>
<script>
import createChildActionItemBtn from "~/components/assignment/components/create-children-action-item-btn.vue";
import sendToAssigneeIcon from "~/static/icons/sendToAssignee.svg";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
export default {
  mixins: [toolbarMixin],
  components: {
    createChildActionItemBtn
  },
  computed: {
    btnSendToAssigneeOptions() {
      return {
        icon: sendToAssigneeIcon,
        text: this.$t("buttons.complete"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureDocumentReviewSendToAssigneeConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.ReviewResolution.AddAssignment);
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
