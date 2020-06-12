<template>
  <DxDropDownButton
    :use-select-mode="false"
    :split-button="true"
    :text="$t('buttons.createRelation')"
    :hint="$t('buttons.createRelation')"
    :drop-down-options="{ width: 330 }"
    :items="items"
    :icon="addendumIcon"
    display-expr="text"
    @item-click="createRelation"
  />
</template>
<script>
import DocumentType from "~/infrastructure/constants/documentType.js";
import addendumIcon from "~/static/icons/addendum.svg";
import ActionGuid from "~/infrastructure/constants/actionGuid.js";
import { DxDropDownButton } from "devextreme-vue";
import { createDocument } from "~/infrastructure/services/create.js";
export default {
  components: {
    DxDropDownButton
  },
  data() {
    return {
      addendumIcon
    };
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
          async create() {
            await createDocument(context, {
              documentType: DocumentType.IncomingLetter
            });
          }
        },
        {
          icon: "plus",
          visible: documentTypeGuid === DocumentType.IncomingLetter,
          text: this.$t("translations.headers.outgoingLetter"),
          async create() {
            await createDocument(context, {
              documentType: DocumentType.OutgoingLetter
            });
          }
        },

        {
          icon: "plus",
          text: this.$t("translations.headers.addendum"),
          async create() {
            await createDocument(context, {
              documentType: DocumentType.Addendum
            });
          }
        }
      ];
    }
  },
  methods: {
    createRelation(e) {
      console.log(e.itemData.path);
      this.$router.push(e.itemData.path);
    }
  }
};
</script>

<style>
</style>