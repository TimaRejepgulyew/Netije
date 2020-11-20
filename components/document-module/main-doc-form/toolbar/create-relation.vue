<template>
  <div>
    <DxDropDownButton
      :use-select-mode="dropDownConfigure.useSelectMode"
      :split-button="dropDownConfigure.splitButton"
      :text="$t('buttons.createRelation')"
      :hint="$t('buttons.createRelation')"
      :drop-down-options="dropDownConfigure.dropDownOptions"
      :items="dropDownConfigure.items"
      :icon="dropDownConfigure.icon"
      :display-expr="dropDownConfigure.displayExpr"
      @item-click="createRelation"
    />
  </div>
</template>
<script>
import { createLeadingDocument } from "~/infrastructure/services/documentService.js";
import RelationDocumentType from "~/infrastructure/models/RelationDocumentType.js";
import RelationDropDownBtnOption from "~/infrastructure/builders/relationDropDown.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton,
    documentCard: async () =>
      import("~/components/document-module/main-doc-form/index.vue")
  },
  props: ["documentId"],
  data() {
    return {
      isOpenPopup: false,
      relationId: false
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    dropDownConfigure() {
      return new RelationDropDownBtnOption({
        items: this.items
      });
    },
    items() {
      return Object.values(
        new RelationDocumentType(this)
          .init(this.document.documentTypeGuid)
          .getAll()
      );
    }
  },
  methods: {
    showRelationDocument(relationId) {
      this.relationId = relationId;
      this.togglePopup();
    },
    togglePopup() {
      this.isOpenPopup = !this.isOpenPopup;
    },
    createRelation(e) {
      this.$popup.documentCard(this, {
        params: {
          leadingDocumentType: this.document.documentTypeGuid,
          leadingDocumentId: +this.documentId
        },
        handler: createLeadingDocument
      });
    }
  }
};
</script>
