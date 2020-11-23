<template>
  <DxDropDownButton
    styling-mode="text"
    :disabled="canUpdate"
    :drop-down-options="{ width: 230 }"
    noDataText="test"
    :selectedItemKey="currentAccessRight.id"
    :items="items"
    :useSelectMode="true"
    displayExpr="name"
    keyExpr="id"
    @item-click="onItemClick"
  />
</template>

<script>
import dataApi from "~/static/dataApi";
import { DxDropDownButton } from "devextreme-vue";
export default {
  components: {
    DxDropDownButton
  },
  props: ["accessRight", "currentAccessRight", "canUpdate", "entryId"],
  created() {},
  computed: {
    items() {
      const items = [...this.accessRight];
      if (!items.some(el => el.id === this.currentAccessRight.id)) {
        const currentItem = { ...this.currentAccessRight, disabled: true };
        items.push(currentItem);
      }
      return items;
    }
  },
  methods: {
    onItemClick(e) {
      const payload = {
        accessRightEntryId: this.entryId,
        accessRightTypeId: e.itemData.id
      };
      this.$awn.asyncBlock(
        this.$axios.put(
          dataApi.accessRights.UpdateRecipient + this.entryId,
          payload
        ),
        e => {
          this.$emit("reload");
          this.$awn.success();
        },
        e => {
          this.$alert();
        }
      );
    }
  }
};
</script>

<style>
</style>