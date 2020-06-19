<template>
  <DxDropDownButton
    :use-select-mode="false"
    :split-button="false"
    :text="$t('buttons.createRelation')"
    :hint="$t('buttons.createRelation')"
    :drop-down-options="{ width: 330 }"
    :items="items"
    icon="link"
    display-expr="text"
    @item-click="createRelation"
  />
</template>
<script>
import DocumentType from "~/infrastructure/constants/documentType.js";
import ActionGuid from "~/infrastructure/constants/actionGuid.js";
import { DxDropDownButton } from "devextreme-vue";
import { createDocumentRequest } from "~/infrastructure/constants/creatingItems.js";
export default {
  components: {
    DxDropDownButton
  },
  computed: {
    items() {
      const documentTypeGuid = this.$store.getters["currentDocument/document"]
        .documentTypeGuid;
      const documentId = this.$store.getters["currentDocument/document"].id;
      function generateUrl(typeGuid) {
        return `/paper-work/create/${typeGuid}?relationId=${documentId}`;
      }
      return [
        {
          icon: "plus",
          visible: documentTypeGuid === DocumentType.OutgoingLetter,
          text: this.$t("translations.headers.IncomingLetter"),
          create: async () => {
            await createDocumentRequest(this, {
              documentType: DocumentType.IncomingLetter,
              leadingDocumentId: this.$store.getters["currentDocument/document"].id,
              leadingDocumentType: this.$store.getters["currentDocument/document"].documentTypeGuid,
            });
          }
        },
        {
          icon: "plus",
          visible: documentTypeGuid === DocumentType.IncomingLetter,
          text: this.$t("translations.headers.outgoingLetter"),
          create: async () => {
            await createDocumentRequest(this, {
              documentType: DocumentType.OutgoingLetter,
              leadingDocumentId: this.$store.getters["currentDocument/document"]
                .id,
                leadingDocumentType: this.$store.getters["currentDocument/document"].documentTypeGuid,
            });
          }
        },

        {
          icon: "plus",
          text: this.$t("translations.headers.addendum"),
          create: async () => {
            await createDocumentRequest(this, {
              documentType: DocumentType.Addendum,
              leadingDocumentId: this.$store.getters["currentDocument/document"]
                .id,
                leadingDocumentType: this.$store.getters["currentDocument/document"].documentTypeGuid,
            });
          }
        }
      ];
    }
  },
  methods: {
    async createRelation(e) {
      await e.itemData.create();
    }
  }
};
</script>

<style>
</style>