<template>
  <div>
    <DxButton
      :icon="outgoingLetter.icon"
      :hint="outgoingLetter.text"
      :text="outgoingLetter.text"
      :on-click="createOutgoingLetter"
    />
  </div>
</template>

<script>
import { mapToEntityType } from "~/infrastructure/constants/documentType.js";
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import DocumentTypeModel from "~/infrastructure/models/DocumentType.js";
import { createLeadingDocument } from "~/infrastructure/services/documentService.js";
import dataApi from "~/static/dataApi.js";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton
  },
  props: ["leadingDocumentId"],
  data() {
    return {
      isOpenDocumentCard: false,
      outgoingLetterId: null
    };
  },
  computed: {
    outgoingLetter() {
      return new DocumentTypeModel(this).getById(
        DocumentTypeGuid.OutgoingLetter
      );
    }
  },
  methods: {
    // to popupComponent
    pasteAttachment({ id, documentTypeGuid }) {
      this.$emit("pasteAttachment", {
        attachmentId: id,
        groupId: 7,
        entityTypeGuid: mapToEntityType(documentTypeGuid)
      });
    },
    createOutgoingLetter() {
      this.$popup.documentCard(
        this,
        {
          params: {
            documentType: DocumentTypeGuid.OutgoingLetter,
            leadingDocumentType: DocumentTypeGuid.IncomingLetter,
            leadingDocumentId: this.leadingDocumentId
          },
          handler: createLeadingDocument
        },
        {
          listeners: [
            { eventName: "valueChanged", handlerName: "pasteAttachment" }
          ]
        }
      );
    }
  }
};
</script>

<style></style>
