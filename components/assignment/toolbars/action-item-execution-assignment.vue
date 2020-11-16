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
    <DxPopup
      :showTitle="false"
      :visible.sync="showItemExecutionTask"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="90%"
      :height="'auto'"
    >
      <div class="scrool-auto">
        <task-card
          @onClosed="pasteAttachment"
          @onClose="togglePopup"
          :taskId="actionItemExecutionTaskId"
          v-if="showItemExecutionTask"
          :isCard="true"
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
      <DxItem
        :visible="actionItemExecutionAttachmentIsIncomingLetter"
        template="createOutgoingLetterBtn"
        location="after"
      />
      <template #createOutgoingLetterBtn>
        <create-outgoing-letter-btn
          @pasteAttachment="pasteAttachment"
          :leadingDocumentId="incomingDocumentId"
        />
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
    </DxToolbar>
  </div>
</template>
<script>
import taskCard from "~/components/task/index.vue";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import createOutgoingLetterBtn from "~/components/assignment/form-components/create-outgoing-letter-btn.vue";
import ReviewResult from "~/infrastructure/constants/assignmentResult.js";
import toolbarMixin from "~/mixins/assignment/assignment-toolbar.js";
import dataApi from "~/static/dataApi";
export default {
  components: {
    createOutgoingLetterBtn,
    taskCard
  },
  mixins: [toolbarMixin],
  data() {
    return {
      actionItemExecutionTaskId: null,
      showItemExecutionTask: false,
      incomingDocumentId: null
    };
  },
  methods: {
    pasteAttachment(options) {
      this.$emit("pasteAttachment", options);
    },
    togglePopup() {
      this.showItemExecutionTask = !this.showItemExecutionTask;
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
    }
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
          attachmentGroup => {
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

    btnOptions() {
      return {
        icon: "check",
        text: this.$t("buttons.complete"),
        onClick: async () => {
          if (this.isValidForm()) {
            const hasChildActionItemItems = await this.hasChildActionItemItems();
            if (hasChildActionItemItems) {
              const needAbortChildActionItems = await this.needAbortChildActionItems();
              if (needAbortChildActionItems) {
                this.setResult(ReviewResult.ActionItemExecution.Complete);
                this.completeAssignment();
              }
            } else {
              const sureActionItemDoneConfirm = await this.sureActionItemDoneConfirmation();
              if (sureActionItemDoneConfirm) {
                this.setResult(ReviewResult.ActionItemExecution.Complete);
                this.completeAssignment();
              }
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
