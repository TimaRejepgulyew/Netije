<template>
  <div>
    <DxButton
      :icon="outgoingLetter.icon"
      :hint="outgoingLetter.text"
      :text="outgoingLetter.text"
      :on-click="createOutgoingLetter"
    />
    <DxPopup
      :showTitle="false"
      :visible.sync="isOpenDocumentCard"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="true"
      width="90%"
      :height="'95%'"
    >
      <div class="scrool-auto">
        <document-card
          v-if="isOpenDocumentCard"
          :documentId="outgoingLetterId"
          @onClose="toggleDocumentCard"
          :isCard="true"
        />
      </div>
    </DxPopup>
  </div>
</template>

<script>
import DocumentTypeGuid from "~/infrastructure/constants/documentType.js";
import DocumentTypeModel from "~/infrastructure/models/DocumentType.js";
import { createLeadingDocument } from "~/infrastructure/services/documentService.js";
import { DxPopup } from "devextreme-vue/popup";
import documentCard from "~/components/document-module/main-doc-form/index.vue";
import dataApi from "~/static/dataApi.js";
import DxButton from "devextreme-vue/button";
export default {
  components: {
    DxButton,
    DxPopup,
    documentCard
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
    toggleDocumentCard() {
      this.isOpenDocumentCard = !this.isOpenDocumentCard;
    },
    createOutgoingLetter() {
      this.$awn.asyncBlock(
        createLeadingDocument(this, {
          documentType: DocumentTypeGuid.OutgoingLetter,
          leadingDocumentType: DocumentTypeGuid.IncomingLetter,
          leadingDocumentId: this.leadingDocumentId
        }),
        ({ documentId }) => {
          this.outgoingLetterId = documentId;
          this.toggleDocumentCard();
        },
        e => {
          this.$awn.alert();
        }
      );
    }
  }
};
</script>

<style></style>
