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
import RelationDocumentType from "~/infrastructure/models/RelationDocumentType.js";
import RelationDropDownBtnOption from "~/infrastructure/builders/relationDropDown.js";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton,
  },
  props: ["documentId"],

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
    createRelation(e) {
      e.itemData.create(this, {
        params: {
          leadingDocumentId: +this.documentId,
        },
      });
    },
  },
};
</script>
