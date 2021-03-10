<template>
  <div class="toolbar">
    <DxToolbar>
      <DxItem
        locateInMenu="auto"
        :visible="inProcess"
        :options="btnProcessedOptions"
        location="before"
        widget="dxButton"
      />
      <DxItem
        locateInMenu="auto"
        :visible="inProcess"
        :options="btnTerminatedOptions"
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
import { load } from "~/infrastructure/services/documentService";
import processedIcon from "~/static/icons/assignment-result/success.svg";
import terminatedIcon from "~/static/icons/status/aborted.svg";
import { ReviewResult } from "../infrastructure.js";
import toolbarMixin from "../../../../infrastructure/mixins/toolbar.js";
import DocumentTypeGuid from "~/infrastructure/constants/documentType";
export default {
  mixins: [toolbarMixin],
  methods: {
    openOutgoingDocument() {
      const withoutGroupId = 0;

      const currentAttachmentGroup = this.assignment.attachmentGroups.find(
        (attachmentGroup) => {
          return attachmentGroup.groupId === withoutGroupId;
        }
      );
      const {
        id: documentId,
        documentTypeGuid,
      } = currentAttachmentGroup.entities.find((attachment) => {
        return (
          attachment.entity.documentTypeGuid === DocumentTypeGuid.IncomingLetter
        );
      }).entity;
      this.$popup.documentCard(this, {
        params: { documentTypeGuid, documentId },
        handler: load,
      });
    },
  },
  computed: {
    btnProcessedOptions() {
      return {
        icon: processedIcon,
        text: this.$t("buttons.processed"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureProcessedAssignmentConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.Processed);
              await this.completeAssignment();
              this.openOutgoingDocument();
            }
          }
        },
      };
    },
    btnTerminatedOptions() {
      return {
        icon: terminatedIcon,
        text: this.$t("buttons.terminated"),
        onClick: async () => {
          if (this.isValidForm()) {
            const response = await this.confirm(
              this.$t(
                "assignment.confirmMessage.sureTerminatedAssignmentConfirmation"
              ),
              this.$t("shared.confirm")
            );
            if (response) {
              this.setResult(ReviewResult.Terminated);
              await this.completeAssignment();
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
