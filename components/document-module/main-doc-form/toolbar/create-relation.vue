<template>
  <div>
    <DxPopup
      position="{ my: 'center', at: 'center', of: window }"
      :visible.sync="isOpenPopup"
      :drag-enabled="false"
      :close-on-outside-click="true"
      :show-title="false"
      width="90%"
      height="95%"
    >
      <div class="scrool-auto">
        <document-card v-if="isOpenPopup"  @onClose="togglePopup" :isCard="true" :documentId="relationId" />
      </div>
    </DxPopup>

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
import RelationDocumentType from "~/infrastructure/models/RelationDocumentType.js";
import { DxPopup } from "devextreme-vue/popup";
import RelationDropDownBtnOption from "~/infrastructure/builders/relationDropDown.js";
import { DxDropDownButton } from "devextreme-vue";
import { createLeadingDocument } from "~/infrastructure/constants/creatingItems.js";
export default {
  components: {
    DxDropDownButton,
    DxPopup,
    documentCard: async () =>
      import("~/components/document-module/main-doc-form/index.vue"),
  },
  props: ["documentId"],
  data() {
    return {
      isOpenPopup: false,
      relationId: false,
    };
  },
  computed: {
    document() {
      return this.$store.getters[`documents/${this.documentId}/document`];
    },
    dropDownConfigure() {
      return new RelationDropDownBtnOption({
        items: this.items,
      });
    },
    items() {
      return Object.values(
        new RelationDocumentType(this)
          .init(this.document.documentTypeGuid)
          .getAll()
      );
    },
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
      this.$awn.asyncBlock(
        e.itemData.create(this, {
          leadingDocumentType: this.document.documentTypeGuid,
          leadingDocumentId: +this.documentId,
        }),
        ({ documentId }) => {
          e.itemData.create(this, {
            leadingDocumentType: this.document.documentTypeGuid,
            leadingDocumentId: +this.documentId,
          });
          this.showRelationDocument(documentId);
        }
      );
    },
  },
};
</script>
