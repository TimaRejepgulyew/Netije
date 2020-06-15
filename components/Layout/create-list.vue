<template>
  <DxTreeView
    :animation-enabled="true"
    :items="creatingItems"
    expand-event="click"
    key-expr="path"
    selection-mode="single"
    display-expr="text"
    :search-enabled="true"
    @item-click="handleItemClick"
  />
</template>

<script>
import { DxTreeView } from "devextreme-vue";
import createItems from "~/infrastructure/constants/creatingItems.js";
export default {
  components: {
    DxTreeView
  },
  data() {
    return {
      creatingItems: createItems(this),
      treeView: this.$refs["treeViewRef"] && this.$refs["treeViewRef"].instance
    };
  },
  methods: {
    async handleItemClick(e) {
      if (e.itemData.create) {
        await e.itemData.create();
        this.$parent.$parent.hidePopup();
      }
    }
  }
};
</script>

<style>
</style>