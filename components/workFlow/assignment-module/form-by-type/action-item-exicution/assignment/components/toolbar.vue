<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        :visible="inProcess"
        :options="completebBtnOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        :visible="actionItemExecutionAttachmentIsIncomingLetter"
        template="createOutgoingLetterBtn"
        location="after"
      />
      <template #createOutgoingLetterBtn>
        <Create-outgoing-letter-btn
          @pasteAttachment="pasteAttachment"
          :leadingDocumentId="incomingDocumentId"
        />
      </template>
      <DxItem
        :visible="inProcess"
        locateInMenu="auto"
        template="createSubTaskActionItemBtn"
        location="before"
      />
      <template #createSubTaskActionItemBtn>
        <CreateSubTaskActionItemBtn
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
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import dataApi from "~/static/dataApi";
import CreateOutgoingLetterBtn from "../../../../form-components/toolbar-components/create-outgoing-letter-btn";
import CreateSubTaskActionItemBtn from "../../../../form-components/toolbar-components/create-sub-task-action-item-btn.vue";
import { ReviewResult } from "../infrastructure.js";
import toolbarMixin from "../../../../infrastructure/mixins/toolbar.js";
export default {
  components: {
    CreateOutgoingLetterBtn,
    CreateSubTaskActionItemBtn,
  },
  mixins: [toolbarMixin],
  data() {
    return {
      incomingDocumentId: null,
    };
  },
  computed: {
    attachmentGroups() {
      return this.$store.getters[`assignments/${this.assignmentId}/assignment`]
        .attachmentGroups;
    },
    actionItemExecutionAttachmentIsIncomingLetter() {
      if (this.attachmentGroups) {
        const actionItemExecutionGroupId = 4;

        const currentAttachmentGroup = this.attachmentGroups.find(
          (attachmentGroup) => {
            return attachmentGroup.groupId === actionItemExecutionGroupId;
          }
        );
        if (currentAttachmentGroup.entities) {
          const currentDocument = currentAttachmentGroup.entities[0].entity;
          if (
            currentDocument.documentTypeGuid === DocumentTypeGuid.IncomingLetter
          ) {
            this.incomingDocumentId = currentDocument.id;
            return true;
          }
        }
      }
      return false;
    },

    completebBtnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: async () => {
          if (this.isValidForm()) {
            const hasChildActionItemItems = await this.hasChildActionItemItems();
            if (hasChildActionItemItems) {
              const needAbortChildActionItems = await this.needAbortChildActionItems();
              if (needAbortChildActionItems) {
                this.setResult(ReviewResult.Complete);
                this.completeAssignment();
              }
            } else {
              const sureActionItemDoneConfirm = await this.sureActionItemDoneConfirmation();
              if (sureActionItemDoneConfirm) {
                this.setResult(ReviewResult.Complete);
                this.completeAssignment();
              }
            }
          }
        },
      };
    },
  },
  methods: {
    created() {
      this.$emit("created");
    },
    pasteAttachment(options) {
      this.$emit("pasteAttachment", options);
    },
    async hasChildActionItemItems() {
      const { data: hasChildActionItemItems } = await this.$axios.get(
        dataApi.assignment.HasChildActionItemItems + this.assignmentId
      );
      return hasChildActionItemItems;
    },
    async needAbortChildActionItems() {
      const needAbortChildActionItems = await this.confirm(
        this.$t("assignment.confirmMessage.headerHasChildActionItem"),
        this.$t("assignment.confirmMessage.hasChildActionItem")
      );
      this.$store.commit(
        `assignments/${this.assignmentId}/SET_NEED_ABORT_CHILD_ACTION_ITEMS`,
        needAbortChildActionItems
      );
      return needAbortChildActionItems;
    },
    async sureActionItemDoneConfirmation() {
      const response = await this.confirm(
        this.$t("assignment.confirmMessage.sureActionItemDoneConfirmation"),
        this.$t("shared.confirm")
      );
      return response;
    },
  },
};
</script>
<style scoped>
.toolbar {
  margin-bottom: 10px;
}
</style>
