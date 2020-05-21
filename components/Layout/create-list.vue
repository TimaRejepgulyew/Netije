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
import CreatingItems from "~/infrastructure/constants/creatingItems.js";
export default {
  components: {
    DxTreeView
  },
  data() {
    return {
      creatingItems: CreatingItems(this),
      treeView: this.$refs["treeViewRef"] && this.$refs["treeViewRef"].instance
    };
  },
  methods: {
    handleItemClick(e) {
      if (e.itemData.path) {
        this.$router.push(e.itemData.path);
        this.$emit("hidePopup");
      }
    }
  }
};
</script>

<style>
</style>