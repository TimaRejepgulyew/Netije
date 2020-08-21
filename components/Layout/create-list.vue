<template>
  <DxTreeView
    :animation-enabled="true"
    :items="createItems"
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
    DxTreeView,
  },
  data() {
    return {
      createItems: createItems(this),
      treeView: this.$refs["treeViewRef"] && this.$refs["treeViewRef"].instance,
    };
  },
  methods: {
    async handleItemClick(e) {
      if (e.itemData.create) {
        await e.itemData.create(this);
        console.log(this.$parent.$parent);
        this.$parent.$parent.hidePopup();
      }
    },
  },
};
</script>

<style>
</style>