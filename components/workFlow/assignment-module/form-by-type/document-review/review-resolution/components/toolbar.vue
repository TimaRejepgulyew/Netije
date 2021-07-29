<template>
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
        <createChildActionItemBtn
          @created="created"
          :parentAssignmentId="assignmentId"
        />
      </template>
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
import createChildActionItemBtn from "../../../../form-components/toolbar-components/create-children-action-item-btn.vue";
import sendToAssigneeIcon from "~/static/icons/send-to-assignee.svg";
import { ReviewResult } from "../infrastructure.js";
import toolbarMixin from "../../../../infrastructure/mixins/toolbar.js";
export default {
  mixins: [toolbarMixin],
  components: {
    createChildActionItemBtn,
  },
  methods: {
    created() {
      this.$emit("created");
    },
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
              this.setResult(ReviewResult.AddAssignment);
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
